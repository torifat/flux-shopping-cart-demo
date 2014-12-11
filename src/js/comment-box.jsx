var React = require('react'),
    CommentList = require('./comment-list.jsx'),
    CommentForm = require('./comment-form.jsx');

var CommentBox = React.createClass({

  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }

});

module.exports = CommentBox;
