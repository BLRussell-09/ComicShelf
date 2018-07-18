import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

class Navbar extends React.Component
{
  render ()
  {
    const {authed, resetNav} = this.props;

    const logOut = () =>
    {
      resetNav();
    };

    return (
      <div className="Navbar">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="/">Comic Shelf</Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              {
                authed ? (
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/BrowseComics">Browse Comics</Link></li>
                    <li><Link to="/MyLibrary">My Library</Link></li>
                    <li className="navbar-form"><button className="btn btn-warning" onClick={logOut}>Log Out</button></li>
                  </ul>
                ) : (
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/login">Log In</Link></li>
                  </ul>
                )
              }
            </div>
          </div>
        </nav>
      </div>
    );
  }
};

export default Navbar;
