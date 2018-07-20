import React from 'react';
import './ComicIssue.css';

class ComicIssue extends React.Component
{
  render ()
  {
    const {issue} = this.props;
    return (
      <div className="ComicIssue col-xs-3">
        <a href="/" className="thumbnail">
          <img src={issue.image.original_url} alt={issue.image.name}/>
        </a>
      </div>
    );
  };
};

export default ComicIssue;
