import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component
{
  state =
  {
    issues: [],
  };

  render ()
  {
    return (
      <div className="SearchBar row">
        <div className="col-lg-6">
          <div className="input-group">
            <input type="text" className="form-control" onSubmit={this.props.searchApi} onChange={this.props.queryStr} placeholder="Search for..."/>
            <span className="input-group-btn">
              <button className="btn btn-default" onClick={this.props.searchApi} type="button" >Go!</button>
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default SearchBar;