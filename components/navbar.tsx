import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LanguagePicker from './language-picker';
import ILocalResources from '../interfaces/ilocalresources';

type Props = {
  title: string;
  localResources: ILocalResources;
};

const NavBar = ({ title, localResources }: Props) => {
  return (
    <Navbar bg="primary" variant="dark" fixed="top" expand="lg">
      <Navbar.Brand href="/">{title}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">{localResources.home}</Nav.Link>
          <Nav.Link href="/tags">{localResources.tags}</Nav.Link>
          <Nav.Link href="/about">{localResources.about}</Nav.Link>
          <Nav.Link href="/contact">{localResources.contact}</Nav.Link>
        </Nav>
        <LanguagePicker />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
