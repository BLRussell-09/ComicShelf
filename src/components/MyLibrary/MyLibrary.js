import React from 'react';
import './MyLibrary.css';
import auth from '../../firebaseRequests/auth';
import comics from '../../firebaseRequests/comics';
import comicVine from '../../comicVineRequests/comicVine';
import MyComicIssue from '../MyComicIssue/MyComicIssue';

class MyLibrary extends React.Component
{

  state =
  {
    issues: [],
    singleIssue: [],
    characters: [],
  }

  componentDidMount ()
  {
    const uid = auth.getUid();
    comics.getUserIssues(uid)
      .then((issues) => { this.setState({issues});
      })
      .catch((err) => { console.error(err); });
  }

  render ()
  {

    const uid = auth.getUid();

    comics.getUserIssues(uid)
      .then((issues) =>
      {
        issues.sort((a,b) =>
        {
          if (a.title < b.title)
          {
            return -1;
          }
          else if (a.title > b.title)
          {
            return 1;
          }
          else
          {
            return 0;
          }
        });
        this.setState({issues});
      })
      .catch((err) => { console.error(err); });

    const comicIssueComponent = this.state.issues.map((comicIssue) =>
    {
      const singleIssueClick = (e) =>
      {
        e.preventDefault();
        const characters = [];
        if (comicIssue.characters.available > 0)
        {
          const comicCharacters = comicIssue.characters.items;
          comicCharacters.forEach(character =>
          {
            comicVine.getCharacters(character.resourceURI)
              .then((results) =>
              {
                characters.push(results);
              })
              .catch((err) => { console.error(err); });
          });
        }
        this.setState({characters});
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
          characters={this.state.characters}
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
          <div className="col-xs-12 libContainer">
            <div className="col-xs-12 col-md-12 col-lg-6 mylibbox">
              <h2>My Library</h2>
              <div className="col-xs-12">
                {comicIssueComponent}
              </div>
            </div>
            <div className="col-xs-12 col-md-4 col-md-offset-2 mylibbox">
              <h2>My Favorites</h2>
              <div className="col-xs-12">
                Issues Coming
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MyLibrary;
