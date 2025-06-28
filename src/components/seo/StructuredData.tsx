import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'service' | 'product' | 'article' | 'person' | 'jobPosting' | 'faq';
  data: any;
}

const StructuredData = ({ type, data }: StructuredDataProps) => {
  const generateSchema = () => {
    switch (type) {
      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.name,
          "description": data.description,
          "provider": {
            "@type": "Organization",
            "name": "CryptDox",
            "url": "https://cryptdox.com"
          },
          "serviceType": data.serviceType || "Technology Service",
          "areaServed": "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Technology Services",
            "itemListElement": data.services?.map((service: any, index: number) => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": service.name,
                "description": service.description
              }
            })) || []
          }
        };

      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "description": data.description,
          "image": data.image,
          "url": data.url,
          "brand": {
            "@type": "Brand",
            "name": "CryptDox"
          },
          "manufacturer": {
            "@type": "Organization",
            "name": "CryptDox"
          },
          "offers": {
            "@type": "Offer",
            "price": data.price || "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "CryptDox"
            }
          }
        };

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "image": data.image,
          "author": {
            "@type": "Person",
            "name": data.author || "CryptDox Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "CryptDox",
            "logo": {
              "@type": "ImageObject",
              "url": "https://cryptdox.com/logo.png"
            }
          },
          "datePublished": data.publishedTime,
          "dateModified": data.modifiedTime || data.publishedTime,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data.url
          }
        };

      case 'person':
        return {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": data.name,
          "description": data.description,
          "image": data.image,
          "jobTitle": data.jobTitle,
          "worksFor": {
            "@type": "Organization",
            "name": "CryptDox"
          },
          "url": data.url,
          "sameAs": data.socialLinks || []
        };

      case 'jobPosting':
        return {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": data.title,
          "description": data.description,
          "datePosted": data.datePosted,
          "validThrough": data.validThrough,
          "employmentType": "FULL_TIME",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "CryptDox",
            "sameAs": "https://cryptdox.com"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Dhaka",
              "addressCountry": "BD"
            }
          },
          "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": {
              "@type": "QuantitativeValue",
              "minValue": data.minSalary || 30000,
              "maxValue": data.maxSalary || 80000,
              "unitText": "YEAR"
            }
          }
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.faqs?.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          })) || []
        };

      default:
        return null;
    }
  };

  const schema = generateSchema();

  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;