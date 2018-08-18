import React from 'react';
import './FavoriteIssues.css';

class FavoriteIssues extends React.Component
{
  render ()
  {
    const {issue} = this.props;
    const imgSrc = `${issue.images[0].path}.${issue.images[0].extension}`;
    return (
      <img className='favorites' src={imgSrc} alt={issue.title}/>
    );
  }
};

export default FavoriteIssues;
