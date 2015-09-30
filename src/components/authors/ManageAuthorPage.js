var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./AuthorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({

  mixins: [
    Router.Navigation
  ],

  statics: {
    // willTransitionFrom: function(transition, component) {
    //   if(component.state.dirty && !confirm("leave without saving?")) {
    //     transition.abort();
    //   }
    // }
  },

  getInitialState: function() {
    return {
      author: {
        id: '',
        firstName: '',
        lastName: ''
      },
      errors: {},
      dirty: false
    };
  },

  componentWillMount: function() {
    var authorId = this.props.params.id
    if (authorId) {
      this.setState({
        author: AuthorStore.getAuthorById(authorId)
      });
    };
  },

  setAuthorState: function(e) {
    var field = e.target.name;
    var value = e.target.value;
    this.state.author[field] = value;
    return this.setState({
      author: this.state.author,
      dirty: true
    });
  },

  authorFormIsValid: function() {
    var formIsValid = true;
    this.state.errors = {}; //clear any previous errors
    if (this.state.author.firstName.length < 3) {

      this.state.errors.firstName = "First name must be more then threee characters"
      formIsValid = false;
    };
    if (this.state.author.lastName.length < 3) {
      this.state.errors.lastName = "Last name must be more then threee characters"
      formIsValid = false;
    };
    this.setState({
      errors: this.state.errors
    });
    return formIsValid
  },

  saveAuthor: function(e) {
    e.preventDefault();
    if (!this.authorFormIsValid()) {
      return;
    } else if (this.state.author.id) {
      AuthorActions.updateAuthor(this.state.author);
      toastr.success('Author Updated')
      this.transitionTo('authors')
    } else {
      AuthorActions.createAuthor(this.state.author);
      toastr.success('Author Saved')
      // redirection below
      this.transitionTo('authors')
      this.setState({
        dirty: false
      });
    }
  },

  render: function() {

    return (
    <div>
      <h1>Manage Author</h1>
      <AuthorForm author={this.state.author} onChange={this.setAuthorState}
        onSave={this.saveAuthor}
        errors={this.state.errors} />
    </div>
    );
  }

});

module.exports = ManageAuthorPage;