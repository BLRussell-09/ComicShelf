import React from 'react';
import './SplashHome.css';
import comicVine from '../../comicVineRequests/comicVine';
import Character from '../Character/Character';

class SplashHome extends React.Component
{
  state =
  {
    characters: ['Wolverine', 'Storm', 'Hulk', 'Captain%20America', 'Iron%20Man', 'Spider-Man', 'Thanos', 'Thor'],
    character: [],
  }

  componentDidMount ()
  {
    const characters = {...this.state.characters};
    const randomNumber = Math.floor(Math.random() * 8) + 0;
    comicVine.getCharactersbyName(characters[randomNumber])
      .then((character) => { this.setState({character}); })
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
    return (
      <div className="SplashHome">
        <h2>Home</h2>
        <div className="row">
          <div className="col-xs-12 characterContainer">
            {comicCharacterComponent}
          </div>
        </div>
      </div>
    );
  }
};

export default SplashHome;
