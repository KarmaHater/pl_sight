'use strict'
var React = require('react');
var Router = require('react-router')
var Link = Router.Link;
var AuthorStore = require('../../stores/authorStore');
var AuthorActions = require('../../actions/AuthorActions');
var AuthorsList = require('./AuthorsList');

var AuthorsPage = React.createClass({
  getInitialState: function() {
    return {
      authors: AuthorStore.getAllAuthors()
    };
  },
  //when we add a compenent it will adds its listeners we do this because the page does not redirect
  componentWillMount: function() {
    AuthorStore.addChangeListener(this._onChange);
  },
  //when we remove a compenent it will remove its listeners
  componentWillUnmount: function() {
    AuthorStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      authors: AuthorStore.getAllAuthors()
    });
  },
  render: function() {
    return (
      <div>
        <h1>Authors</h1>
        <Link to="addAuthor" className="btn btn-default">Add Author</Link>
        <AuthorsList authors={this.state.authors}/>
      </div>
    );
  }

});

module.exports = AuthorsPage;