import React from "react";
import { Navbar } from "react-bootstrap";
import './Nav.css';

export default function MainNav() {

  return (
    <Navbar bg="dark" variant="dark" className="app-navigation">
      <Navbar.Brand href="#home">
       Something in the nav
      </Navbar.Brand>
    </Navbar>
  );
}
