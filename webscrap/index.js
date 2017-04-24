
var express = require('express');
var app = express();
var scrap = require('./middlewares/scrap_gushenqu').fetchGuShen;

var urlArr = [];
var blogArr = [];

//stock models
var GushenquModel = require('./models/GushenModel');
// tradelikewater 范德依彪 http://chuansong.me/account/tradelikewater
var FandeyibiaoModel = require('./models/FandeyibiaoModel');
// gufengle 股蜂乐 http://chuansong.me/account/gufengle0509
var GufengleModel = require('./models/GufengleModel');
// hkwoniumei 财经美女蜗牛妹 http://chuansong.me/account/hkwoniumei
var CaijingmeinvModel = require('./models/CaijingmeinvModel');
// cdxiaochunjie 超短小纯杰 http://chuansong.me/account/cdxiaochunjie
var ChaoduanxiaochunjieModel = require('./models/ChaoduanxiaochunjieModel');
// peterlinqi 林奇看盘  http://chuansong.me/account/peterlinqi888
var LinqikanpanModel = require('./models/LinqikanpanModel');
// setInterval(function (){
//   scrap(baseUrl, GushenquModel)
// }, 5000);



//tech models
// DeveloperWorks http://chuansong.me/account/developerWorks
var DeveloperWorksModel = require('./models/techModel/DeveloperWorksModel');
// GuoLin 郭霖 http://chuansong.me/account/guolin_blog
var GuoLinModel = require('./models/techModel/GuoLinModel');
// QianDuanZaoDuKe 前端早读课 http://chuansong.me/account/FeZaoDuKe
var QianDuanZaoDuKeModel = require('./models/techModel/QianDuanZaoDuKeModel');
// QianDuanDaQuan 前端大全 http://chuansong.me/account/FrontDev
var QianDuanDaQuanModel = require('./models/techModel/QianDuanDaQuanModel');
// ThreeSixKe  http://chuansong.me/account/wow36kr
var ThreeSixKeModel = require('./models/techModel/ThreeSixKeModel');
// HuLianWangPingLun 互联网评论 http://chuansong.me/account/italk007
var HuLianWangPingLunModel = require('./models/techModel/HuLianWangPingLunModel');

//stock
urlArr.push('http://chuansong.me/account/gushequ');
urlArr.push('http://chuansong.me/account/tradelikewater');
urlArr.push('http://chuansong.me/account/gufengle0509');
urlArr.push('http://chuansong.me/account/hkwoniumei');
urlArr.push('http://chuansong.me/account/cdxiaochunjie');
urlArr.push('http://chuansong.me/account/peterlinqi888');

blogArr.push(GushenquModel);
blogArr.push(FandeyibiaoModel);
blogArr.push(GufengleModel);
blogArr.push(CaijingmeinvModel);
blogArr.push(ChaoduanxiaochunjieModel);
blogArr.push(LinqikanpanModel);

//tech
urlArr.push('http://chuansong.me/account/developerWorks');
urlArr.push('http://chuansong.me/account/guolin_blog');
urlArr.push('http://chuansong.me/account/FeZaoDuKe');
urlArr.push('http://chuansong.me/account/FrontDev');
urlArr.push('http://chuansong.me/account/wow36kr');
urlArr.push('http://chuansong.me/account/italk007');

blogArr.push(DeveloperWorksModel);
blogArr.push(GuoLinModel);
blogArr.push(QianDuanZaoDuKeModel);
blogArr.push(QianDuanDaQuanModel);
blogArr.push(ThreeSixKeModel);
blogArr.push(HuLianWangPingLunModel);



// for (let i = 0; i < 12; i++) {
//
//   (function(u) {
//     setInterval(function(){
//       scrap(urlArr[u], blogArr[u])
//     }, 18000000 + u * 600000);
//   })(i);
//
// }
scrap(urlArr[11], blogArr[11]);




app.get('/', function (req, res, next) {
  // setInterval(scrap, 10000);
  res.send("hello world");
});


app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
});
