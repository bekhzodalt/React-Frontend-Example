import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// 
import Header from './components/Layouts/Header';
import Leftbar from './components/Layouts/Leftbar';
import Login from './Auth/Login';
import GolfClubs from './Credentials/GolfClubs';
import Tables from './Tables';
import FromEmail from './FromEmail';

import { AuthFactory } from '../factory';
import { EventEmitter } from '../events';

function Admin() {

  const [isLoggedin, setIsLoggedin] = React.useState(true);

  EventEmitter.subscribe('refreshLogin', (event) => {
    setIsLoggedin(event);
  });

  React.useEffect(() => {
    let loginStatus = AuthFactory.getAdminLoginStatus();
    setIsLoggedin(loginStatus);
  }, []);

    return (
      <Router>
        <div className="App-Admin">
          <Switch>
            <Route path="/from-email">
              <FromEmail />
            </Route>
            <Route path="/login">
              <AdminAuth />
            </Route>
            <Route path="/">
              {isLoggedin ? <AdminPanel /> : <AdminAuth />}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  
  export default Admin;

  function AdminAuth () {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    );
  }
  
  function AdminPanel () {
    return (
        <Router>
          <div className="Admin-panel">
            {/* Header */}
            <Header />
            {/* LeftNav */}
            <Leftbar />

            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <div className="App-main">
              <div className="container-fluid">
                <Switch>
                  <Route path="/tables">
                    <Tables />
                  </Route>
                  <Route path="/golf-clubs">
                    <GolfClubs />
                  </Route>
                  {/* <Route path="/login">
                    <Login />
                  </Route> */}
                  <Route path="/">
                    {/* <Dashboard /> */}
                    <GolfClubs />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </Router>
    );
  }