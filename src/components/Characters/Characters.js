import React from 'react';
import './Characters.css';

class Characters extends React.Component
{
  render ()
  {
    const {character} = this.props;
    const characterThumb = `${character[0].thumbnail.path}.${character[0].thumbnail.extension}`;
    const characterAlt = `${character[0].name}`;
    return (
      <div className="col-md-3">
        <img className="Characters" src={characterThumb} alt={characterAlt} data-toggle="tooltip" data-placement="left" title={characterAlt}/>
      </div>
    );
  };
};

export default Characters;
