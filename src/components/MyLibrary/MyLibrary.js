import React from 'react';
import './MyLibrary.css';
import auth from '../../firebaseRequests/auth';
import comics from '../../firebaseRequests/comics';
import MyComicIssue from '../MyComicIssue/MyComicIssue';

class MyLibrary extends React.Component
{

  state =
  {
    issues: [],
    singleIssue: [],
  }

  componentDidMount ()
  {
    const uid = auth.getUid();
    comics.getUserIssues(uid)
      .then((issues) => { this.setState({issues}); })
      .catch((err) => { console.error(err); });
  }

  render ()
  {
    const uid = auth.getUid();
    comics.getUserIssues(uid)
      .then((issues) => { this.setState({issues}); })
      .catch((err) => { console.error(err); });

    const comicIssueComponents = this.state.issues.map((comicIssue) =>
    {
      const singleIssueClick = (e) =>
      {
        e.preventDefault();
        this.setState({singleIssue: comicIssue});
      };

      const favIssueClick = (e) =>
      {
        e.preventDefault();
        this.setState({singleIssue: comicIssue});
        const updatedIssue = comicIssue;
        if (!updatedIssue.isFavorite)
        {
          updatedIssue.isFavorite = true;
        }
        else
        {
          updatedIssue.isFavorite = false;
        }
        comics.updateUserIssue(updatedIssue.firebaseId, updatedIssue)
          .then(() =>
          {
            comics.getUserIssues(uid)
              .then((issues) => { this.setState({issues}); });
          })
          .catch((err) => { console.error(err); });
      };

      const rmvIssueClick = (e) =>
      {
        e.preventDefault();
        this.setState({singleIssue: comicIssue});
        const firebaseId = comicIssue.firebaseId;
        comics.deleteUserIssue(firebaseId)
          .then(() =>
          {
            comics.getUserIssues(uid)
              .then((issues) => { this.setState({issues}); });
          })
          .catch((err) => { console.error(err); });
      };

      return (
        <MyComicIssue
          issue={comicIssue}
          key={comicIssue.id}
          singleIssueClick={singleIssueClick}
          favIssueClick={favIssueClick}
          rmvIssueClick={rmvIssueClick}
        />
      );
    });

    return (
      <div className="MyLibrary">
        <div className="row">
          <h2>My Library</h2>
          <div className=" col-xs-12">
            <div className="col-xs-12  mylibbox">
              {comicIssueComponents}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MyLibrary;
