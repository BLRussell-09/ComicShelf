import React from 'react';
import './BrowseComics.css';
import comicVine from '../../comicVineRequests/comicVine';
import SearchBar from '../SearchBar/SearchBar';
import ComicIssue from '../ComicIssue/ComicIssue';

class BrowseComics extends React.Component
{
  state =
  {
    issues: [],
    query: '',
    singleIssue: [],
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
        this.setState({issues: res[0]});
        this.props.history.push('/BrowseComics');
      })
      .catch((err) =>
      {
        console.error(err);
      });
  };

  render ()
  {
    const comicIssueComponents = this.state.issues.map((comicIssue) =>
    {
      const singleIssueClick = (e) =>
      {
        e.preventDefault();
        this.props.history.push(`/browseComics/${comicIssue.id}`);
        this.setState({singleIssue: comicIssue});
      };

      return (
        <ComicIssue
          issue={comicIssue}
          key={comicIssue.id}
          singleIssueClick={singleIssueClick}
        />
      );
    });

    return (
      <div className="BrowseComics">
        <h2>Browse Comics</h2>
        <SearchBar searchApi={this.searchApi} queryStr={this.queryStr}/>
        <div className="row" id="comics">
          {comicIssueComponents}
        </div>
      </div>
    );
  }
};

export default BrowseComics;
