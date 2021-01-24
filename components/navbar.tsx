import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LanguagePicker from './language-picker';
import ILocalResources from '../interfaces/ilocalresources';
import Link from 'next/link';

type Props = {
  title: string;
  localResources: ILocalResources;
};

const NavBar = ({ title, localResources }: Props) => {
  return (
    <Navbar bg="primary" variant="dark" fixed="top" expand="lg">
      <Link href="/" passHref>
        <Navbar.Brand>{title}</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/" passHref>
            <Nav.Link>{localResources.home}</Nav.Link>
          </Link>
          <Link href="/tags" passHref>
            <Nav.Link>{localResources.tags}</Nav.Link>
          </Link>
          <Link href="/about" passHref>
            <Nav.Link>{localResources.about}</Nav.Link>
          </Link>
          <Link href="/contact" passHref>
            <Nav.Link>{localResources.contact}</Nav.Link>
          </Link>
        </Nav>
        <LanguagePicker localResources={localResources} />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
