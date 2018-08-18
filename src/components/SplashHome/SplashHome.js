import React from 'react';
import './SplashHome.css';
import comics from '../../firebaseRequests/comics';
import comicVine from '../../comicVineRequests/comicVine';
import Character from '../Character/Character';
import CollectedComics from '../CollectedComics/CollectedComics';
// import ComicIssue from '../ComicIssue/ComicIssue';

class SplashHome extends React.Component
{
  state =
  {
    characters: ['Wolverine', 'Storm', 'Hulk', 'Captain%20America', 'Iron%20Man', 'Spider-Man', 'Thanos', 'Thor'],
    character: [],
    issues: [],
    featuredIssues: [],
  }

  componentDidMount ()
  {
    const characters = {...this.state.characters};
    const randomNumber = Math.floor(Math.random() * 8) + 0;
    comicVine.getCharactersbyName(characters[randomNumber])
      .then((character) => { this.setState({character}); })
      .catch((err) => { console.error(err); });
    comics.getAllIssues()
      .then((issues) =>
      {
        this.setState({issues});
      })
      .catch((err) => { console.error(err); });
  }

  render ()
  {
    const featIssues = [];
    const demIssues = [];

    const comicCharacterComponent = this.state.character.map((character) =>
    {
      return (
        <Character  character={this.state.character} key={character.id}/>
      );
    });

    featIssues.map((issue) =>
    {
      issue.forEach(element =>
      {
        comicVine.getIssuesbyCharacter(element.resourceURI)
          .then((res) =>
          {
            demIssues.push(`${res[0].thumbnail.path}.${res[0].thumbnail.extension}`);
            if (demIssues.length === 6)
            {
              demIssues.shift();
            }
          })
          .catch((err) => { console.error(err); });
      });
      console.error(demIssues);
      return (demIssues);
    });

    const collectedComicsComponent = this.state.issues.map((issue) =>
    {
      return (
        <CollectedComics key={issue.firebaseId} issue={issue}/>
      );
    });

    const featCoversComponent = demIssues.map((issue) =>
    {
      return (
        <img src={issue} alt="featCover"/>
      );
    });

    return (
      <div className="SplashHome">
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3 characterContainer">
            {comicCharacterComponent}
          </div>
          <div className="col-xs-6">
            {featCoversComponent}
          </div>
          <div className="row">
            <div className="col-xs-12">
              <h3>Reccomended Reading</h3>
              {collectedComicsComponent}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SplashHome;
