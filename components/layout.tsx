import Footer from './footer';
import Meta from './meta';
import NavBar from './navbar';
import { WEB_NAME } from '../lib/constants';
import Author from '../types/author';

type Props = {
  author: Author;
  children: React.ReactNode;
};

const Layout = ({ author, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <NavBar title={WEB_NAME} />
        <main style={{ paddingTop: 70 }}>{children}</main>
      </div>

      <Footer author={author} />
    </>
  );
};

export default Layout;
