'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var HomePage = React.createClass({

  render: function() {
    return (
      <div className="jumbotron">
        <h1>Website Administration</h1>
        <p>React practice app for a websites Administration</p>
        <Link to="about" className="btn btn-info">Learn More</Link>
      </div>
    );
  }

});

module.exports = HomePage;