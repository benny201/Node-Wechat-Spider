var ThreeSixKe = require('../../lib/mongo').ThreeSixKe;

module.exports = {

  //create article
  create: function (article) {
    return ThreeSixKe.create(article);
  },

  //get
  getArticles: function (articleId) {
    var query = {};
    if (articleId) {
      query.articleId = articleId;
    }
    return ThreeSixKe
      .find(query)
      .sort({ _id: -1 });
  },
  //checkArticles
  checkArticleById: function(articleId) {
    return ThreeSixKe
      .findOne({ articleId: articleId });
  },

  //increse pv
  increasePv: function(articleId) {
    return ThreeSixKe
      .update({ articleId: articleId }, { $inc: { pv: 1 } });
  }
}
