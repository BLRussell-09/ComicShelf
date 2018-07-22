import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import './Navbar.css';

class CNavbar extends React.Component
{
  render ()
  {
    const {authed, resetNav} = this.props;

    const logOut = () =>
    {
      resetNav();
    };

    return (
      <Navbar inverse fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link className="navbar-brand" to="/home">Comic Shelf</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {
            authed ? (
              <Nav pullRight>
                <li><Link to="/browseComics">Browse Comics</Link></li>
                <li><Link to="/MyLibrary">My Library</Link></li>
                <li className="navbar-form"><button className="btn btn-warning" onClick={logOut}>Log Out</button></li>
              </Nav>
            ) : (
              <Nav pullRight>
                <li><Link to="/browseComics">Browse Comics</Link></li>
                <li><Link to="/login">Log In</Link></li>
              </Nav>
            )
          }
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

export default CNavbar;
