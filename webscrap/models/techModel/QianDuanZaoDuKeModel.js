var QianDuanZaoDuKe = require('../../lib/mongo').QianDuanZaoDuKe;

module.exports = {

  //create article
  create: function (article) {
    return QianDuanZaoDuKe.create(article);
  },

  //get
  getArticles: function (articleId) {
    var query = {};
    if (articleId) {
      query.articleId = articleId;
    }
    return QianDuanZaoDuKe
      .find(query)
      .sort({ _id: -1 });
  },
  //checkArticles
  checkArticleById: function(articleId) {
    return QianDuanZaoDuKe
      .findOne({ articleId: articleId });
  },

  //increse pv
  increasePv: function(articleId) {
    return QianDuanZaoDuKe
      .update({ articleId: articleId }, { $inc: { pv: 1 } });
  }
}
