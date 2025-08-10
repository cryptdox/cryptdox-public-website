import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import Breadcrumbs from '../seo/Breadcrumbs';

const PageLayout = () => {
  return (
    <div className="flex flex-col min-h-screen mt-[60px]">
      <ScrollToTop />
      <Header />
      <Breadcrumbs />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;