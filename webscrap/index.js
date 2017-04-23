
var express = require('express');
var app = express();
var scrap = require('./middlewares/scrap_gushenqu').fetchGuShen;

var urlArr = [];
var blogArr = [];
var baseUrl = "http://chuansong.me/account/gushequ";  //迅雷首页链接

//db models
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



// for (let i = 0; i < 6; i++) {
//   setTimeout(function(){
//     scrap(urlArr[i], blogArr[i])
//   }, 5000);
// }

scrap(urlArr[5], blogArr[5]);




app.get('/', function (req, res, next) {
  // setInterval(scrap, 10000);
  res.send("hello world");
});


app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
});
