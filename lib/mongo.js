var config = require('config-lite');
// var Mongolass = require('mongolass');
var mongoose = require('mongoose');
//validate
var uniqueValidator = require('mongoose-unique-validator');

//create time stamp
// var idToCreateTime = require('../plugins/create_at');
//markdown plugin
// var markdownToHTML = require('../plugins/markdownToHTML');

var mogodbAddress = 'mongodb://localhost:27017/myblog';

//var mongolass = new Mongolass();
//mongolass.connect(config.mongodb);
mongoose.connect(mogodbAddress);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
      console.log("success open db!");
    });

var Schema = mongoose.Schema;

//user schema
var userSchema = new Schema({
  name: {
    type: String
  },
  password: {
    type: String
  },
  avatar: {
    type: String
  },
  gender: {
    type: String,
    enum: ['m', 'f', 'x']
  },
  bio: {
    type: String
  }
});
//schema level index
userSchema.index({ name: 1 }, { unique: true });
//create user model
exports.User = mongoose.model('User', userSchema);

//post scheme
var postSchema = new Schema({
  author: { type: Schema.Types.ObjectId },
  title: { type: String },
  content: { type: String },
  pv: { type: Number }
});
//index
postSchema.index({ author: 1, _id: -1 });
// postSchema.plugin(idToCreateTime);
// postSchema.plugin(markdownToHTML);
exports.Post = mongoose.model('Post', postSchema);

// comment schema
var commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId },
  content: { type: String },
  postId: { type: Schema.Types.ObjectId }
});
commentSchema.index({ postId: 1, _id: 1 });
commentSchema.index({ author: 1, _id: 1 });
exports.Comment = mongoose.model('Comment', commentSchema);


// wechat article
var wechatSchema = new Schema({
  articleId: { type: String, unique: true},
  title: { type: String },
  content: { type: String },
  pv: { type: Number }
});

wechatSchema.index({ articleId: 1 }, { unique: true });
wechatSchema.plugin(uniqueValidator);
//gushenqu model
exports.Gushenqu = mongoose.model('Gushenqu', wechatSchema);
//Caijingmeinv
exports.Caijingmeinv = mongoose.model('Caijingmeinv', wechatSchema);
//Chaoduanxiaochunjie
exports.Chaoduanxiaochunjie = mongoose.model('Chaoduanxiaochunjie', wechatSchema);
//Fandeyibiao
exports.Fandeyibiao = mongoose.model('Fandeyibiao', wechatSchema);
//Gufengle
exports.Gufengle = mongoose.model('Gufengle', wechatSchema);
//Linqikanpan
exports.Linqikanpan = mongoose.model('Linqikanpan', wechatSchema);
