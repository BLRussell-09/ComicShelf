import React from 'react';
import './Character.css';

class Character extends React.Component
{
  render ()
  {
    const {character} = this.props;
    const characterName = `${character[0].name}`;
    const characterThumb = `${character[0].thumbnail.path}.${character[0].thumbnail.extension}`;
    const characterDesc = `${character[0].description}`;
    const chararacterIssues = character[0].comics.items;
    console.error(chararacterIssues);
    return (
      <div className="col-md-12 Character">
        <div className="row">
          <div className="col-xs-12">
            <h3>{characterName}</h3>
            <img src={characterThumb} alt={characterName}/>
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <p>{characterDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  };
};

export default Character;
