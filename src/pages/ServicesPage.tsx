import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Cloud, Film, BrainCircuit, Check } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SEOHead from '../components/seo/SEOHead';
import StructuredData from '../components/seo/StructuredData';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

interface Service {
  id: string;
  name: string;
  description: string | null;
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('id, name, description')
          .eq('is_deleted', false)
          .order('name');
          
        if (error) throw error;
        
        setServices(data || []);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  // Map of service names to icons and features
  const serviceIcons: Record<string, any> = {
    'Software Development': {
      icon: <Code className="h-16 w-16 text-blue-600 mb-4" />,
      features: [
        'Custom web and mobile application development',
        'Enterprise software solutions',
        'UI/UX design and development',
        'API development and integration',
        'Legacy system modernization',
        'Quality assurance and testing'
      ]
    },
    'Cloud & IT Infrastructure': {
      icon: <Cloud className="h-16 w-16 text-blue-600 mb-4" />,
      features: [
        'Cloud migration and setup',
        'DevOps implementation',
        'Infrastructure as code',
        'Scalable architecture design',
        'Continuous integration and deployment',
        'Security and compliance solutions'
      ]
    },
    'Media Production': {
      icon: <Film className="h-16 w-16 text-blue-600 mb-4" />,
      features: [
        'Corporate video production',
        'Professional photography',
        'Content creation and editing',
        'Social media assets',
        'Motion graphics and animation',
        'Brand identity design'
      ]
    },
    'AI Solutions': {
      icon: <BrainCircuit className="h-16 w-16 text-blue-600 mb-4" />,
      features: [
        'Machine learning model development',
        'Natural language processing (NLP)',
        'Custom LLM implementations',
        'Chatbots and virtual assistants',
        'Predictive analytics',
        'Computer vision solutions'
      ]
    }
  };

  // Default services if none are returned from the database
  const defaultServices: Service[] = [
    {
      id: '1',
      name: 'Software Development',
      description: 'Custom software solutions designed and developed to meet your specific business needs. We specialize in web applications, mobile apps, and enterprise software.'
    },
    {
      id: '2',
      name: 'Cloud & IT Infrastructure',
      description: 'Comprehensive cloud solutions and IT infrastructure services to modernize your technology stack and improve scalability, security, and performance.'
    },
    {
      id: '3',
      name: 'Media Production',
      description: 'Professional media production services including video creation, editing, and brand visuals to help you communicate effectively with your audience.'
    },
    {
      id: '4',
      name: 'AI Solutions',
      description: 'Cutting-edge artificial intelligence solutions including natural language processing, machine learning, and automation to drive innovation and efficiency.'
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  const servicesData = {
    name: "AbDox Technology Services",
    description: "Comprehensive technology solutions including software development, cloud infrastructure, media production, and AI solutions",
    services: displayServices
  };

  return (
    <div>
      <SEOHead 
        title="Technology Services - Software Development, Cloud & AI Solutions"
        description="Explore AbDox's comprehensive technology services: custom software development, cloud infrastructure, media production, and AI solutions. Transform your business with cutting-edge technology."
        keywords="software development services, cloud infrastructure, AI solutions, media production, web development, mobile app development, custom software, technology consulting, digital transformation services"
        url="https://abdox.com/services"
        image="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=2"
      />

      <StructuredData 
        type="service" 
        data={servicesData}
      />

      <PageHeader 
        title="Our Services" 
        subtitle="Comprehensive technology solutions for your business" 
        bgImage="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      
      {/* Services Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">How We Can Help You</h1>
            <p className="text-xl text-gray-600">
              We offer a comprehensive range of technology services designed to help your business thrive in the digital landscape.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-5xl">
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white p-8 rounded-lg shadow-md animate-pulse">
                  <div className="h-16 w-16 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-6 w-3/4"></div>
                </div>
              ))
            ) : (
              displayServices.map((service, index) => (
                <motion.div 
                  key={service.id} 
                  className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {serviceIcons[service.name]?.icon || (
                    index === 0 ? <Code className="h-16 w-16 text-blue-600 mb-4" /> :
                    index === 1 ? <Cloud className="h-16 w-16 text-blue-600 mb-4" /> :
                    index === 2 ? <Film className="h-16 w-16 text-blue-600 mb-4" /> :
                    <BrainCircuit className="h-16 w-16 text-blue-600 mb-4" />
                  )}
                  <h2 className="text-2xl font-bold mb-4" id={service.name.toLowerCase().replace(/\s+/g, '-')}>
                    {service.name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Detailed Service Sections */}
      {displayServices.map((service, index) => (
        <section 
          key={service.id} 
          className={`py-16 md:py-24 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                <motion.div 
                  className="md:w-1/2 mb-8 md:mb-0 md:px-8"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src={
                      service.name.includes('Software') ? 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' :
                      service.name.includes('Cloud') ? 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' :
                      service.name.includes('Media') ? 'https://images.pexels.com/photos/3944374/pexels-photo-3944374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' :
                      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    } 
                    alt={`${service.name} - Professional Technology Services by AbDox`}
                    className="rounded-xl shadow-lg w-full"
                    loading="lazy"
                  />
                </motion.div>
                <motion.div 
                  className="md:w-1/2"
                  initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold mb-6">{service.name}</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {service.description}
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-4">What We Offer:</h3>
                  <ul className="space-y-3 mb-8">
                    {(serviceIcons[service.name]?.features || [
                      'Custom solution design and development',
                      'Integration with existing systems',
                      'Ongoing support and maintenance',
                      'Performance optimization',
                      'Security implementation',
                      'Scalable and future-proof architecture'
                    ]).map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/contact">
                    <Button>
                      Discuss Your Project
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      ))}
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Reach out to us today to discuss how we can help with your technology needs.
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;