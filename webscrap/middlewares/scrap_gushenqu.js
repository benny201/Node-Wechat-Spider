
var cheerio = require('cheerio'); //可以像jquer一样操作界面
var charset = require('superagent-charset'); //解决乱码问题:
var superagent = require('superagent'); //发起请求
charset(superagent);
var async = require('async'); //异步抓取
var eventproxy = require('eventproxy');  //流程控制
var ep = eventproxy();

//promise
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


//scrape url
var curPageUrl = 'http://chuansong.me/n/';

//arrays
var articleIdArr = [];
var allId = [];
var requestArr = [];
var newArticleArr=[];
var errLength=[];


exports.fetchGuShen = function (url, model){
  // 命令 ep 重复监听 emit事件(get_topic_html)，当get_topic_html爬取完毕之后执行
  ep.after('get_topic_html', 1, function (eps) {
      var fetchUrl = function (myurl, callback) {
        //scrape
        superagent
          .get(myurl)
          // .set('User-Agent', 'User-Agent: MQQBrowser/26 Mozilla/5.0 (Linux; U; Android 2.3.7; zh-cn; MB200 Build/GRJ22; CyanogenMod-7) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1')
          .set("Accept","*/*")
          .set('Referer','http://www.google.com')
          .set('User-Agent', 'User-Agent:Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko')
          .charset('utf-8') //解决编码问题
          .end(function (err, ssres) {
            try {
              if (err) {
                  // callback(err, myurl + ' error happened!');
                  errLength.push(myurl);
                  throw new Error("wrong");
              }
            } catch(e) {
              console.log(e);
              return 0;
            }

            //get html dom
            var $ = cheerio.load(ssres.text);

            //construct atricle entity
            var content = $('.rich_media_content').html();
            var title = $('.rich_media_title').text();
            var articleId = articleIdArr[myurl];
            var articleEntity = {
              articleId: articleId,
              title: title,
              content: content,
              pv: 0
            }


            model.create(articleEntity)
              .then(function (result) {
                console.log(title);
                console.log(content);
              })
              .catch(function (err) {
                errLength.push(myurl);
                console.log('error');
              });

            var result = {
                 res: myurl
            };

            callback(null, result);
          });
      };

      //并发
      // mapLimit(arr, limit, iterator, [callback])
      async.mapLimit(newArticleArr, 1, function (myurl, callback) {
        fetchUrl(myurl, callback);
      }, function (err, result) {
        // 爬虫结束后的回调，可以做一些统计结果
          console.log('结束，一共抓取了: ' + newArticleArr.length + '条数据');
          console.log('出错: ' + errLength.length + '条数据');
          return 0;
      });

  });



      //index page
      (function (page) {
          superagent
          .get(page)
          .set('User-Agent', 'User-Agent:Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko')
          .charset('UTF-8')
          .end(function (err, sres) {
              // 常规的错误处理
              if (err) {
                console.log(err);
                console.log('抓取'+page+'这条信息的时候出错了')
                  return 0;
              }

              console.log('success');

              // article address
              // getAllArticleLink($);
              var $ = cheerio.load(sres.text);
              var linkElem = $('.question_link');


            	for(var i = 0; i < 5; i++) {
                var id = linkElem.eq(i).attr('href').slice(3);
            		var url= curPageUrl + id;
                console.log(url);
                // curModel.checkArticleById(id)
            		newArticleArr.push(url);
                articleIdArr["" + url] = id;
                allId.push(id);
            	}


              // //get and ckeck data in db to avoid duplicate
              // var promise = allId.map(function(id, newArticleArr) {
              //   return curModel.checkArticleById(id, newArticleArr);
              // })
              //
              // //wait all promise
              // Promise
              //   .all(promise)
              //   .then(function() {
              //     return ep.emit('get_topic_html', 'get '+page+' successful');
              //   })
              //   .catch(function() {
              //     /*流程控制语句
              //     *当首页左侧的链接爬取完毕之后，我们就开始爬取里面的详情页
              //     */
              //     return ep.emit('get_topic_html', 'get '+page+' successful');
              //   })

              ep.emit('get_topic_html', 'get '+page+' successful');

          });
      })(url);
      //
      // // get all
      // function getAllArticleLink($) {
      // };
}
