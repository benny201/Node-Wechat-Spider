var Fandeyibiao = require('../lib/mongo').Fandeyibiao;

module.exports = {

  //create article
  create: function (article) {
    return Fandeyibiao.create(article);
  },

  //get
  getArticles: function (articleId) {
    var query = {};
    if (articleId) {
      query.articleId = articleId;
    }
    return Fandeyibiao
      .find(query)
      .sort({ _id: -1 });
  },
  //checkArticles
  checkArticleById: function(articleId) {
    return Fandeyibiao
      .findOne({ articleId: articleId });
  },

  //increse pv
  increasePv: function(articleId) {
    return Fandeyibiao
      .update({ articleId: articleId }, { $inc: { pv: 1 } });
  }
}
