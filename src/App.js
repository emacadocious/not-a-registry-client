import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory, NavLink } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import { AppContext } from "./libs/contextLib";
import { onError } from "./libs/errorLib";
import Routes from "./Routes";
import { Footer, ErrorBoundary } from './components';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {

  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
      onLoad();
    }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    history.push("/login");
  }

  function renderNav() {
    return (
      <Navbar className="app-navigation">
        <NavLink to="/">
          <Navbar.Brand>Not A Registry</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        {
          isAuthenticated ? (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          ) :
            (
              <React.Fragment>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
              </React.Fragment>
            )
          }
        </Navbar.Collapse>
      </Navbar>
    );
  }

  return (
    !isAuthenticating && (
      <div className="app">
        {renderNav()}
        <ErrorBoundary>
          <AppContext.Provider value={{
              isAuthenticated,
              userHasAuthenticated
            }}>
            <Routes />
            <ToastContainer
              autoClose={10000}
              hideProgressBar={false}
              closeOnClick={false}
              pauseOnHover={true}
              draggable={true}
            />
          </AppContext.Provider>
        </ErrorBoundary>
        <Footer />
      </div>
    )
  );
}

export default App;
