var Chaoduanxiaochunjie = require('../lib/mongo').Chaoduanxiaochunjie;

module.exports = {

  //create article
  create: function (article) {
    return Chaoduanxiaochunjie.create(article);
  },

  //get
  getArticles: function (articleId) {
    var query = {};
    if (articleId) {
      query.articleId = articleId;
    }
    return Chaoduanxiaochunjie
      .find(query)
      .sort({ articleId: -1 });
  },
  //checkArticles
  checkArticleById: function(articleId) {
    return Chaoduanxiaochunjie
      .findOne({ articleId: articleId });
  },

  //increse pv
  increasePv: function(articleId) {
    return Chaoduanxiaochunjie
      .update({ articleId: articleId }, { $inc: { pv: 1 } });
  }
}
