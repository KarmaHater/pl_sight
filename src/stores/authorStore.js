"use strict";

var Dispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ =require('lodash')
var CHANGE_EVENT = 'change';
var _authors = [];

var AuthorStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  getAllAuthors: function() {
    return _authors;
  },
  getAuthorById: function(id) {
    return _.find(_authors, {id: id});
  }
});

Dispatcher.register(function(action) {
  var ActionTypes = require('../constants/actionTypes');// should not be here
  function updateAuthor(author) {
    var existingAuthor = _.find(_authors, {id: author.id});
    var existingAuthorIdex = _.indexOf(_authors, existingAuthor);
    _authors.splice(existingAuthorIdex, 1, author)
  }

  switch(action.actionType) {
    case ActionTypes.INIT: 
      _authors = action.initDate.authors;
      AuthorStore.emitChange();
      break;
    case ActionTypes.CREATE_AUTHOR: 
      _authors.push(action.author);
      AuthorStore.emitChange();
      break;
    case ActionTypes.UPDATE_AUTHOR: 
      updateAuthor(action.author)
      AuthorStore.emitChange();
      break;
    case ActionTypes.DELETE_AUTHOR: 
      _.remove(_authors, function(author) {
        return action.id === author.id;
      })
      AuthorStore.emitChange();
      break;
    default: 
      console.log("AuthorStore is in default")
  }
});

module.exports = AuthorStore;

// Can not get this constant page only on the author page to work I have to hard code the constants var require actionType is not really working and I can't figure out why :(