import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Navbar, Nav} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";

import './Nav.css';

export default function MainNav() {

  useEffect(() => {
    onLoad();
  }, []);

  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

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

  return (
    <Navbar bg="dark" variant="dark" className="app-navigation">
      <Navbar.Brand href="/">Navbar with text</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      {
        isAuthenticated ? (
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        ) :
          (
            <React.Fragment>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
            </React.Fragment>
          )
        }
      </Navbar.Collapse>
    </Navbar>
  );
}
