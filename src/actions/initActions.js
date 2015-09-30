"use strict"

var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/actionTypes');
var AuthorApi = require('../api/authorApi');

var InitActions = {
  initApp: function(){
    Dispatcher.dispatch({
      actionType: ActionTypes.INIT,
      initDate: {
        authors: AuthorApi.getAllAuthors()
      }
    })
  }
};

module.exports = InitActions;