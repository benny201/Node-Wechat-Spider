var QianDuanDaQuan = require('../../lib/mongo').QianDuanDaQuan;

module.exports = {

  //create article
  create: function (article) {
    return QianDuanDaQuan.create(article);
  },

  //get
  getArticles: function (articleId) {
    var query = {};
    if (articleId) {
      query.articleId = articleId;
    }
    return QianDuanDaQuan
      .find(query)
      .sort({ _id: -1 });
  },
  //checkArticles
  checkArticleById: function(articleId) {
    return QianDuanDaQuan
      .findOne({ articleId: articleId });
  },

  //increse pv
  increasePv: function(articleId) {
    return QianDuanDaQuan
      .update({ articleId: articleId }, { $inc: { pv: 1 } });
  }
}
