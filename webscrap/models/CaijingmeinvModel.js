var Caijingmeinv = require('../lib/mongo').Caijingmeinv;

module.exports = {

  //create article
  create: function (article) {
    return Caijingmeinv.create(article);
  },

  //get
  getArticles: function (articleId) {
    var query = {};
    if (articleId) {
      query.articleId = articleId;
    }
    return Caijingmeinv
      .find(query)
      .sort({ _id: -1 });
  },
  //checkArticles
  checkArticleById: function(articleId) {
    return Caijingmeinv
      .findOne({ articleId: articleId });
  },

  //increse pv
  increasePv: function(articleId) {
    return Caijingmeinv
      .update({ articleId: articleId }, { $inc: { pv: 1 } });
  }
}
