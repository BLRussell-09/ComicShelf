import React, { Component } from 'react';
import './App.css';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import authRequests from '../firebaseRequests/auth';
import BrowseComics from '../components/BrowseComics/BrowseComics';
import fbConnection from '../firebaseRequests/connection';
import firebase from 'firebase';
import Login from '../components/Login/Login';
import MyLibrary from '../components/MyLibrary/MyLibrary';
import CNavbar from '../components/Navbar/Navbar';
import Register from '../components/Register/Register';
import SplashHome from '../components/SplashHome/SplashHome';
import SearchBar from '../components/SearchBar/SearchBar';
fbConnection();

const PrivateRoute = ({component: Component, authed, ...rest}) =>
{
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ?
          (
            <Component {...props} />
          ) :
          (
            <Redirect
              to={{pathname: '/login', state: {from: props.location}}}
            />
          )
      }
    />
  );
};

const PublicRoute = ({component: Component, authed, ...rest}) =>
{
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ?
          (
            <Component {...props} />
          ) :
          (
            <Redirect
              to={{pathname: '/myLibrary', state: {from: props.location}}}
            />
          )
      }
    />
  );
};

class App extends Component {

  state =
  {
    authed: false,
  };

  componentDidMount ()
  {
    this.removeListener = firebase.auth().onAuthStateChanged((user) =>
    {
      if (user)
      {
        this.setState({authed: true});
      }
      else
      {
        this.setState({authed: false});
      }
    });
  };

  falseAuth = () =>
  {
    this.setState({authed: false});
    authRequests.logoutUser();
  }

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <CNavbar
              authed={this.state.authed}
              resetNav={this.falseAuth}
            />
            <div className="container-fluid">
              <div className="row">
                <Switch>
                  <Route path="/" exact component={SplashHome}/>
                  <Route
                    authed={this.state.authed}
                    component={SplashHome}
                    path='/home'
                  />
                  <Route
                    authed={this.state.authed}
                    component={SearchBar}
                    path='/searchBar'
                  />
                  <PrivateRoute
                    authed={this.state.authed}
                    component={MyLibrary}
                    path='/myLibrary'
                  />
                  <PrivateRoute
                    authed={this.state.authed}
                    component={BrowseComics}
                    path='/browseComics'
                  />
                  <PublicRoute
                    authed={this.state.authed}
                    component={Login}
                    path='/login'
                  />
                  <PublicRoute
                    authed={this.state.authed}
                    component={Register}
                    path='/register'
                  />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  };
}

export default App;
