var React = require('react');
var Link = require('react-router').Link;
var AuthorActions = require('../../actions/AuthorActions');
var toastr = require('toastr');

var AuthorsList = React.createClass({
  propTypes: {
    authors: React.PropTypes.array.isRequired
  },
  deleteAuthor: function(id, e) {
    e.preventDefault();
    AuthorActions.deleteAuthor(id);
    toastr.success('Author Deleted');
  },
  render: function() {
    var creatAuthorRow = function(author) {
      return (
        <tr key={author.id}>
          <td><a className="btn btn-danger" href="#" onClick={this.deleteAuthor.bind(this, author.id)}>Delete</a></td>
          <td>
            <Link to="manageAuthor" params={{id: author.id}}>{author.id}</Link>
          </td>
          <td>{author.firstName} {author.lastName}</td>
        </tr>
      );
    };
    return (
      <table className="table">
        <thead>
          <th></th>
          <th>ID</th>
          <th>Name</th>
        </thead>
        <tbody>
          {this.props.authors.map(creatAuthorRow, this)}
        </tbody>
      </table>
    );
  }

});

module.exports = AuthorsList;