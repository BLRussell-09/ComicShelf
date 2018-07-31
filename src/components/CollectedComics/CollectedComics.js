import React from 'react';
import './CollectedComics.css';

class CollectedComics extends React.Component
{
  render ()
  {
    const {issue} = this.props;
    const imgSrc = `${issue.images[0].path}.${issue.images[0].extension}`;
    return (
      <div className="col-xs-4">
        <img src={imgSrc} alt={issue.title}/>
      </div>
    );
  }
};

export default CollectedComics;
