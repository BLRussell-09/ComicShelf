import React from 'react';
import './ComicIssue.css';
import {Link} from 'react-router-dom';

class ComicIssue extends React.Component
{

  hoverClick = (e) =>
  {
    e.preventDefault();
  } ;

  render ()
  {
    const {issue} = this.props;
    const {singleIssueClick} = this.props;

    if (!issue.isOwned)
    {
      return (
        <div className="ComicIssue col-xs-3">
          <a href="/" className="thumbnail" onClick={singleIssueClick}>
            <img src={issue.image.original_url} alt={issue.image.name}/>
          </a>
          <nav className="navContainer">
            <li className="buttons material-icons md-48" onClick={singleIssueClick} tooltip="Save to Library">
              <Link to="/MyLibrary">add_circle</Link>
            </li>
            <i href="/" className="buttons material-icons md-48" tooltip="View Covers">pageview</i>
            <i onClick={this.hoverClick}className="buttons material-icons md-48">add</i>
          </nav>
        </div>
      );
    }
    else
    {
      return (
        <div className="ComicIssue col-xs-3">
          <a href="/" className="thumbnail" onClick={singleIssueClick}>
            <img src={issue.image.original_url} alt={issue.image.name}/>
          </a>
          <nav className="navContainer">
            <li className="buttons material-icons md-48" tooltip="You already own this issue">
              <Link to="/MyLibrary">check_box</Link>
            </li>
            <i href="/" className="buttons material-icons md-48" tooltip="View Covers">pageview</i>
            <i onClick={this.hoverClick}className="buttons material-icons md-48">add</i>
          </nav>
        </div>
      );
    }
  };
};

export default ComicIssue;
