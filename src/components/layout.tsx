import Footer from './footer';
import Meta from './meta';
import NavBar from './navbar';
import { WEB_NAME } from '../../lib/constants';
import Author from '../../types/author';
import ILocalResources from '../../interfaces/ilocalresources';

type Props = {
  author: Author;
  children: React.ReactNode;
  localResources: ILocalResources;
};

const Layout = ({ author, children, localResources }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <NavBar title={WEB_NAME} localResources={localResources} />
        <main style={{ paddingTop: 70 }}>{children}</main>
      </div>

      <Footer author={author} localResources={localResources} />
    </>
  );
};

export default Layout;
