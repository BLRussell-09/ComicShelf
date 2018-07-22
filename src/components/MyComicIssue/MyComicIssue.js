import React from 'react';
import './MyComicIssue.css';

class MyComicIssue extends React.Component
{

  hoverClick = (e) =>
  {
    e.preventDefault();
  } ;

  render ()
  {
    const {issue} = this.props;
    const {singleIssueClick} = this.props;
    const {favIssueClick} = this.props;
    const {rmvIssueClick} = this.props;

    if (!issue.isFavorite)
    {
      return (
        <div className="MyComicIssue col-xs-3">
          <a href="/" className="thumbnail" onClick={singleIssueClick}>
            <img src={issue.image.original_url} alt={issue.image.name}/>
          </a>
          <nav className="navContainer">
            <li className="buttons material-icons md-48" onClick={favIssueClick} tooltip="Favorite">star</li>
            <li className="buttons material-icons md-48" onClick={singleIssueClick} tooltip="Add Review">library_add</li>
            <li className="buttons material-icons md-48" tooltip="View Covers">insert_photo</li>
            <li className="buttons material-icons md-48" onClick={rmvIssueClick} tooltip="Remove from Library">cancel</li>
            <i onClick={this.hoverClick}className="buttons material-icons md-48">add</i>
          </nav>
        </div>
      );
    } else
    {
      return (
        <div className="MyComicIssue col-xs-3">
          <a href="/" className="thumbnail" onClick={singleIssueClick}>
            <img src={issue.image.original_url} alt={issue.image.name}/>
          </a>
          <nav className="navContainer">
            <li className="buttons material-icons md-48" onClick={favIssueClick} tooltip="un-Favorite" style={{color: 'red'}}>report</li>
            <li className="buttons material-icons md-48" onClick={singleIssueClick} tooltip="Add Review">library_add</li>
            <li className="buttons material-icons md-48" tooltip="View Covers">insert_photo</li>
            <li className="buttons material-icons md-48" onClick={rmvIssueClick} tooltip="Remove from Library">cancel</li>
            <i onClick={this.hoverClick}className="buttons material-icons md-48">add</i>
          </nav>
        </div>
      );
    }
  };
};

export default MyComicIssue;
