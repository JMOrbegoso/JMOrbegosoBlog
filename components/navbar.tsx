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
      <Navbar.Brand href="/">{title}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/">
            <a className="mx-2 text-white">{localResources.home}</a>
          </Link>
          <Link href="/tags">
            <a className="mx-2 text-white">{localResources.tags}</a>
          </Link>
          <Link href="/about">
            <a className="mx-2 text-white">{localResources.about}</a>
          </Link>
          <Link href="/contact">
            <a className="mx-2 text-white">{localResources.contact}</a>
          </Link>
        </Nav>
        <LanguagePicker localResources={localResources} />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
