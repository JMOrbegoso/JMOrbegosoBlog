import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';
import LanguagePicker from './language-picker';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../enums/translationResource';

type Props = {
  title: string;
};

const NavBar = ({ title }: Props) => {
  const { t, lang } = useTranslation('common');

  return (
    <Navbar bg="primary" variant="dark" fixed="top" expand="lg">
      <Link href="/" passHref>
        <Navbar.Brand>{title}</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/" passHref>
            <Nav.Link>{t(TranslationResource.home)}</Nav.Link>
          </Link>
          <Link href="/tags" passHref>
            <Nav.Link>{t(TranslationResource.tags)}</Nav.Link>
          </Link>
          <Link href="/posts/search" passHref>
            <Nav.Link>{t(TranslationResource.search_post)}</Nav.Link>
          </Link>
          <Link href="/about" passHref>
            <Nav.Link>{t(TranslationResource.about)}</Nav.Link>
          </Link>
        </Nav>
        <LanguagePicker />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
