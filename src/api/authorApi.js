'use strict'
var authors = require('./authorData').authors
var _ = require('lodash');

var _gernerateId = function(author) {
  return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
};

var _clone = function(item) {
  return JSON.parse(JSON.stringify(item));
};

var AuthorApi = {
  getAllAuthors: function() {
    return _clone(authors);
  },
  saveAuthor: function(author) {
    console.log("saved authoer ajax call")
    if (author.id) {
      var existingAuthorIndex = _.indexOf(authors, _.find(authors, {id: author.id}));
      authors.splice(existingAuthorIndex, 1, author);
    } else {
      author.id = _gernerateId(author);
      authors.push(author);
    };
    return _clone(author);
  },
  deleteAuthor: function(id) {
    console.log("delete author ajax call");
    _.remove(authors, {id: id});
  }
};

module.exports = AuthorApi;