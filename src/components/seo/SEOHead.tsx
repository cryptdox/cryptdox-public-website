import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  canonicalUrl?: string;
}

const SEOHead = ({
  title = 'AbDox - Software Development, Media Production & AI Solutions',
  description = 'AbDox specializes in custom software development, cloud infrastructure, media production, and AI-powered solutions. Transform your business with cutting-edge technology.',
  keywords = 'software development, web development, mobile apps, cloud infrastructure, AI solutions, media production, custom software, technology consulting, digital transformation',
  image = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=2',
  url = 'https://abdox.com',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'AbDox Team',
  section,
  tags = [],
  noIndex = false,
  canonicalUrl
}: SEOHeadProps) => {
  const fullTitle = title.includes('AbDox') ? title : `${title} | AbDox`;
  const currentUrl = canonicalUrl || url;

  // Generate structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AbDox",
    "description": "Technology company specializing in software development, media production, and AI solutions",
    "url": "https://abdox.com",
    "logo": "https://abdox.com/logo.png",
    "foundingDate": "2016",
    "founder": {
      "@type": "Person",
      "name": "Abir Hosen Ashik"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "C-8 #54, Green Model Town",
      "addressLocality": "Dhaka",
      "addressCountry": "BD"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+88-01310-685450",
      "contactType": "customer service",
      "email": "info@abdox.com"
    },
    "sameAs": [
      "https://linkedin.com/company/abdox",
      "https://github.com/abdox",
      "https://twitter.com/abdox"
    ],
    "services": [
      "Custom Software Development",
      "Cloud & IT Infrastructure",
      "Media Production",
      "AI Solutions"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AbDox",
    "url": "https://abdox.com",
    "description": description,
    "publisher": {
      "@type": "Organization",
      "name": "AbDox"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://abdox.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://abdox.com"
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="AbDox" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@abdox" />
      <meta name="twitter:creator" content="@abdox" />
      
      {/* Article specific meta tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {type === 'article' && tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://images.pexels.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//images.pexels.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    </Helmet>
  );
};

export default SEOHead;