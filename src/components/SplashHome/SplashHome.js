import React from 'react';
import './SplashHome.css';
import SearchBar from '../SearchBar/SearchBar';

class SplashHome extends React.Component
{
  render ()
  {
    return (
      <div className="SplashHome">
        <h2>Splash Home</h2>
        <SearchBar/>
      </div>
    );
  }
};

export default SplashHome;
