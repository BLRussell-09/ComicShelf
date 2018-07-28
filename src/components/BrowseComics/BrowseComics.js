import React from 'react';
import './BrowseComics.css';
import auth from '../../firebaseRequests/auth';
import comics from '../../firebaseRequests/comics';
import comicVine from '../../comicVineRequests/comicVine';
import ComicIssue from '../ComicIssue/ComicIssue';
import SearchBar from '../SearchBar/SearchBar';

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
        this.setState({issues: res});
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

        const doc = new DOMParser().parseFromString(comicIssue.description, 'text/html');
        const desc = doc.body.textContent;

        this.setState({singleIssue: comicIssue});
        if (comicIssue.uid !== auth.getUid())
        {
          comicIssue.uid = auth.getUid();
          comicIssue.isFavorite = false;
          comicIssue.description = desc;
          comics.saveComicsbyIssue(comicIssue);
          this.props.history.push(`/MyLibrary/`);
        }
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
      <div className="row BrowseComics">
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
