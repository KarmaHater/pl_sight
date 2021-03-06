// 'use strict'
var React = require('react');
var Header = require('./common/Header');
var RouteHandler = require('react-router').RouteHandler;
// $ = jQuery = require('jquery');

var App = React.createClass({

  render: function() {
    return (
     <div>
       <Header />
       <div className="fulid-container">
         <RouteHandler />
       </div>
     </div>
    );
  }

});

module.exports = App;