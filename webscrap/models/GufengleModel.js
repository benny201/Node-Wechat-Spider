var Gufengle = require('../lib/mongo').Gufengle;

module.exports = {

  //create article
  create: function (article) {
    return Gufengle.create(article);
  },

  //get
  getArticles: function (articleId) {
    var query = {};
    if (articleId) {
      query.articleId = articleId;
    }
    return Gufengle
      .find(query)
      .sort({ _id: -1 });
  },
  //checkArticles
  checkArticleById: function(articleId) {
    return Gufengle
      .findOne({ articleId: articleId });
  },

  //increse pv
  increasePv: function(articleId) {
    return Gufengle
      .update({ articleId: articleId }, { $inc: { pv: 1 } });
  }
}
