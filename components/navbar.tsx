import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LanguagePicker from './language-picker';

type Props = {
  title: string;
};

const NavBar = ({ title }: Props) => {
  return (
    <Navbar bg="primary" variant="dark" fixed="top" expand="lg">
      <Navbar.Brand href="/">{title}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/tags">Tags</Nav.Link>
          <Nav.Link href="/about">About Me</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
        <LanguagePicker />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
