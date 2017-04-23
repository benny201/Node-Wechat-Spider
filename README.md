# Node-Wechat-Spider

这个Repo是使用Node通过传送门爬取公众号微信文章。

## 用到的第三方库
* express
* cheerio(Jquery的node实现)
* superagent及其自带插件
* async(并行抓取)
* eventproxy(emmiter...)
* Mongoose(操作Mongo)


## 几个问题及解决方法

### 1. 传送门的反爬虫
方法：比较简单的修改请求header信息。

### 2. Mongoose的Unique index无效问题
其实是在create()新的doc的时候, index还没有建立起来，所以无效了。

解决方法是：
```javascript
1. 给schema加一个plugin: mongoose-unique-validator

或者

2. 让Model监听on('index')事件
```

### 3.多并发抓取
未解决。。。
估计是对方服务器的限制，抓取别的网站没问题，有待考究。。。

### 4. 未知...

## 效果
![MongoDB](https://github.com/benny201/Node-Wechat-Spider/blob/master/WX20170422-163322.png)

## 使用方法
```javascript
1. sudo npm install
2. node index.js
```

## To do list
* 因为要持续跑在AWS, 还需增加稳定性
* 接口通用性...
