import React from 'react';
import './SplashHome.css';
import SearchBar from '../SearchBar/SearchBar';
import comicVine from '../../comicVineRequests/comicVine';

class SplashHome extends React.Component
{
  state =
  {
    issues: [],
    query: '',
  }

  queryStr = e =>
  {
    let tempQuery = {...this.state.query};
    const query = e.target.value;
    tempQuery = query.split(' ').join('%20');;
    this.setState({query: tempQuery});
  };

  searchApi = e =>
  {
    const {query} = this.state;
    e.preventDefault();
    comicVine
      .getIssues(query)
      .then((res) =>
      {
        this.props.history.push('/BrowseComics');
      })
      .catch((err) =>
      {
        console.error(err);
      });
  };

  render ()
  {
    return (
      <div className="SplashHome">
        <h2>Splash Home</h2>
        <SearchBar searchApi={this.searchApi} queryStr={this.queryStr}/>
      </div>
    );
  }
};

export default SplashHome;
