import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// Lazy loaded routes
const HomePage = lazy(() => import('../pages/HomePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ServicesPage = lazy(() => import('../pages/ServicesPage'));
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const PortfolioPage = lazy(() => import('../pages/PortfolioPage'));
const TeamPage = lazy(() => import('../pages/TeamPage'));
const BlogPage = lazy(() => import('../pages/BlogPage'));
const BlogDetailPage = lazy(() => import('../pages/BlogDetailPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const CareersPage = lazy(() => import('../pages/CareersPage'));
const JobDetailPage = lazy(() => import('../pages/JobDetailPage'));
const JobApplicationPage = lazy(() => import('../pages/JobApplicationPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:id" element={<JobDetailPage />} />
          <Route path="/careers/:id/apply" element={<JobApplicationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;