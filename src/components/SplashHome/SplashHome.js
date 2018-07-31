import React from 'react';
import './SplashHome.css';
import comics from '../../firebaseRequests/comics';
import comicVine from '../../comicVineRequests/comicVine';
import Character from '../Character/Character';
import CollectedComics from '../CollectedComics/CollectedComics';

class SplashHome extends React.Component
{
  state =
  {
    characters: ['Wolverine', 'Storm', 'Hulk', 'Captain%20America', 'Iron%20Man', 'Spider-Man', 'Thanos', 'Thor'],
    character: [],
    issues: [],
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
    const comicCharacterComponent = this.state.character.map((character) =>
    {
      return (
        <Character  character={this.state.character} key={character.id}/>
      );
    });

    const collectedComicsComponent = this.state.issues.map((issue) =>
    {
      return (
        <CollectedComics key={issue.firebaseId} issue={issue}/>
      );
    });

    return (
      <div className="SplashHome">
        <h2>Home</h2>
        <div className="row">
          <div className="col-xs-6 characterContainer">
            {comicCharacterComponent}
          </div>
          <div className="row">
            <div className="col-xs-12">
              <h3>Comics Collected</h3>
              {collectedComicsComponent}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SplashHome;
