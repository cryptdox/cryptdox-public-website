import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: Record<string, string> = {
    about: 'About Us',
    services: 'Services',
    products: 'Products',
    portfolio: 'Portfolio',
    team: 'Team',
    blog: 'Blog',
    contact: 'Contact',
    careers: 'Careers',
    apply: 'Apply'
  };

  const generateBreadcrumbSchema = () => {
    const itemListElement = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://cryptdox.com"
      }
    ];

    pathnames.forEach((pathname, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      const name = breadcrumbNameMap[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);
      
      itemListElement.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": `https://cryptdox.com${routeTo}`
      });
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    };
  };

  if (pathnames.length === 0) return null;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema())}
        </script>
      </Helmet>
      
      <nav aria-label="Breadcrumb" className="fixed bg-gray-50 py-3 top-[60px] z-30 left-0 right-0">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link 
                to="/" 
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Go to homepage"
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
            </li>
            
            {pathnames.map((pathname, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              const name = breadcrumbNameMap[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);

              return (
                <li key={pathname} className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                  {isLast ? (
                    <span className="text-gray-900 font-medium" aria-current="page">
                      {name}
                    </span>
                  ) : (
                    <Link 
                      to={routeTo} 
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;