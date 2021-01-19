import Footer from './footer';
import Meta from './meta';
import NavBar from './navbar';
import { WEB_NAME } from '../lib/constants';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <NavBar title={WEB_NAME} />
        <main style={{ paddingTop: 70 }}>{children}</main>
      </div>

      <Footer />
    </>
  );
};

export default Layout;
