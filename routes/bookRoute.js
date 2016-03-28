var express = require('express');
var routes = function (Book) {
  var bookRouter = express.Router();
  var bookController = require('../controllers/bookController')(Book)

  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

  bookRouter.use('/:bookId', bookController.findBookByID);

  bookRouter.route('/:bookId')
    .get(bookController.getBook)
    .put(bookController.putBook)
    .patch(bookController.patchBook)
    .delete(bookController.deleteBook);

  return bookRouter;
};

module.exports = routes;
