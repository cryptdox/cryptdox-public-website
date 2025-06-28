import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code, Cloud, Film, BrainCircuit, 
  CheckCircle, ChevronRight, ArrowRight
} from 'lucide-react';
import Button from '../components/ui/Button';
import SEOHead from '../components/seo/SEOHead';
import StructuredData from '../components/seo/StructuredData';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const HomePage = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [stats, setStats] = useState({
    projects: 0,
    experience: 8,
    clients: 0,
    teamMembers: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch approved testimonials
        const { data: testimonialsData, error: testimonialsError } = await supabase
          .from('testimonials')
          .select(`
            id, content, rating,
            clients (
              id, organization,
              platform_user (id, user_id)
            )
          `)
          .eq('approved', true)
          .eq('is_deleted', false)
          .limit(6);

        if (testimonialsError) throw testimonialsError;
        
        // Fetch services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('is_deleted', false)
          .limit(4);

        if (servicesError) throw servicesError;

        // Fetch projects count (from both individual_projects and projects tables)
        const { count: individualProjectsCount, error: individualProjectsError } = await supabase
          .from('individual_projects')
          .select('id', { count: 'exact' })
          .eq('is_deleted', false);

        if (individualProjectsError) throw individualProjectsError;

        const { count: projectsCount, error: projectsError } = await supabase
          .from('projects')
          .select('id', { count: 'exact' })
          .eq('is_deleted', false);

        if (projectsError) throw projectsError;

        // Fetch clients count
        const { count: clientsCount, error: clientsError } = await supabase
          .from('clients')
          .select('id', { count: 'exact' })
          .eq('is_deleted', false);

        if (clientsError) throw clientsError;

        // Fetch team members count
        const { count: teamCount, error: teamError } = await supabase
          .from('team')
          .select('id', { count: 'exact' })
          .eq('is_deleted', false);

        if (teamError) throw teamError;

        // Calculate total projects
        const totalProjects = (individualProjectsCount || 0) + (projectsCount || 0);

        // Calculate years of experience (from the earliest created_at in platform_user or a fixed start date)
        const { data: oldestUser, error: userError } = await supabase
          .from('platform_user')
          .select('created_at')
          .eq('is_deleted', false)
          .order('created_at', { ascending: true })
          .limit(1);

        let yearsExperience = 8; // Default fallback
        if (!userError && oldestUser && oldestUser.length > 0) {
          const startDate = new Date(oldestUser[0].created_at);
          const currentDate = new Date();
          const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
          const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
          yearsExperience = Math.max(diffYears, 1); // At least 1 year
        }
        
        setTestimonials(testimonialsData || []);
        setServices(servicesData || []);
        setStats({
          projects: Math.max(totalProjects, 50), // Ensure minimum of 50 for display
          experience: Math.max(yearsExperience, 8), // Ensure minimum of 8 for display
          clients: Math.max(clientsCount || 0, 30), // Ensure minimum of 30 for display
          teamMembers: Math.max(teamCount || 0, 15) // Ensure minimum of 15 for display
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set fallback values on error
        setStats({
          projects: 50,
          experience: 8,
          clients: 30,
          teamMembers: 15
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const organizationData = {
    name: "AbDox",
    description: "Technology company specializing in software development, media production, and AI solutions",
    services: services.length > 0 ? services : [
      { name: "Custom Software Development", description: "Tailored applications designed to meet your specific business requirements" },
      { name: "Cloud & IT Infrastructure", description: "Scalable cloud solutions and IT infrastructure setup" },
      { name: "Media Production", description: "Professional content creation, editing, and brand visuals" },
      { name: "AI Solutions", description: "Cutting-edge AI implementations including NLP and automation" }
    ]
  };

  return (
    <div>
      <SEOHead 
        title="AbDox - Leading Software Development & AI Solutions Company"
        description="Transform your business with AbDox's expert software development, cloud infrastructure, media production, and AI solutions. 50+ projects completed, 8+ years experience."
        keywords="software development company, custom software development, AI solutions, cloud infrastructure, media production, web development, mobile app development, digital transformation, technology consulting"
        url="https://abdox.com"
        image="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=2"
      />

      <StructuredData 
        type="service" 
        data={organizationData}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-indigo-900 text-white pt-32 pb-16 md:pb-24">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Transforming Ideas into<br />
                <span className="text-blue-400">Digital Excellence</span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 mb-8 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                AbDox specializes in software development, media production, and AI-powered solutions to help your business thrive in the digital age.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to="/services">
                  <Button size="lg">
                    Explore Our Services
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                    Get in Touch
                  </Button>
                </Link>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.img 
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Digital Solutions and Software Development" 
                className="rounded-xl shadow-2xl w-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                loading="eager"
              />
            </div>
          </div>
        </div>
        
        {/* Dynamic Stats */}
        <div className="container mx-auto px-4 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
              whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                {isLoading ? (
                  <span className="inline-block w-16 h-10 bg-blue-400/30 animate-pulse rounded"></span>
                ) : (
                  `${stats.projects}+`
                )}
              </p>
              <p className="text-gray-300">Projects Completed</p>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
              whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                {isLoading ? (
                  <span className="inline-block w-12 h-10 bg-blue-400/30 animate-pulse rounded"></span>
                ) : (
                  `${stats.experience}+`
                )}
              </p>
              <p className="text-gray-300">Years Experience</p>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
              whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                {isLoading ? (
                  <span className="inline-block w-16 h-10 bg-blue-400/30 animate-pulse rounded"></span>
                ) : (
                  `${stats.clients}+`
                )}
              </p>
              <p className="text-gray-300">Happy Clients</p>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
              whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                {isLoading ? (
                  <span className="inline-block w-16 h-10 bg-blue-400/30 animate-pulse rounded"></span>
                ) : (
                  `${stats.teamMembers}+`
                )}
              </p>
              <p className="text-gray-300">Team Members</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              We offer a range of technology solutions to help your business succeed in the digital landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white p-8 rounded-lg shadow-md animate-pulse">
                  <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))
            ) : services.length > 0 ? (
              services.map((service, index) => (
                <motion.div 
                  key={service.id} 
                  className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {service.name.includes('Software') ? (
                    <Code className="h-12 w-12 text-blue-600 mb-4" />
                  ) : service.name.includes('Cloud') ? (
                    <Cloud className="h-12 w-12 text-blue-600 mb-4" />
                  ) : service.name.includes('Media') ? (
                    <Film className="h-12 w-12 text-blue-600 mb-4" />
                  ) : (
                    <BrainCircuit className="h-12 w-12 text-blue-600 mb-4" />
                  )}
                  <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link to={`/services#${service.name.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              ))
            ) : (
              <>
                <motion.div 
                  className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Code className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Custom Software Development</h3>
                  <p className="text-gray-600 mb-4">Tailored applications designed to meet your specific business requirements and goals.</p>
                  <Link to="/services" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>

                <motion.div 
                  className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Cloud className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Cloud & IT Infrastructure</h3>
                  <p className="text-gray-600 mb-4">Scalable cloud solutions and IT infrastructure setup for modern businesses.</p>
                  <Link to="/services" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>

                <motion.div 
                  className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Film className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Media Production</h3>
                  <p className="text-gray-600 mb-4">Professional content creation, editing, and brand visuals for your business.</p>
                  <Link to="/services" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>

                <motion.div 
                  className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <BrainCircuit className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">AI Solutions</h3>
                  <p className="text-gray-600 mb-4">Cutting-edge AI implementations including NLP, LLMs, and intelligent automation.</p>
                  <Link to="/services" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="secondary" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0 md:pr-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="AbDox Team - Software Development Experts" 
                className="rounded-xl shadow-lg w-full"
                loading="lazy"
              />
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About AbDox</h2>
              <p className="text-lg text-gray-600 mb-6">
                AbDox is a technology startup founded by Abir Hosen Ashik, specializing in software development, media production, and AI-powered solutions. Our mission is to help businesses leverage technology to grow and innovate.
              </p>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Our Core Values</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Innovation</strong> - Constantly exploring new technologies and approaches</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Excellence</strong> - Delivering high-quality solutions in everything we do</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Integrity</strong> - Building trust through honest relationships</span>
                  </li>
                </ul>
              </div>
              <Link to="/about">
                <Button>
                  Learn More About Us
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-blue-200 max-w-xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with AbDox.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm p-8 rounded-lg animate-pulse">
                  <div className="h-4 bg-white/30 rounded mb-2 w-1/4"></div>
                  <div className="h-6 bg-white/30 rounded mb-4 w-3/4"></div>
                  <div className="h-4 bg-white/30 rounded mb-2"></div>
                  <div className="h-4 bg-white/30 rounded mb-2"></div>
                  <div className="h-4 bg-white/30 rounded mb-2"></div>
                  <div className="h-4 bg-white/30 rounded w-2/3"></div>
                </div>
              ))
            ) : testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <motion.div 
                  key={testimonial.id} 
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-lg"
                  whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex mb-2">
                    {Array(5).fill(0).map((_, i) => (
                      <svg 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-400'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{testimonial.clients?.organization || 'Happy Client'}</h3>
                  <p className="text-blue-100 mb-6">"{testimonial.content}"</p>
                </motion.div>
              ))
            ) : (
              <>
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-lg"
                  whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex mb-2">
                    {Array(5).fill(0).map((_, i) => (
                      <svg 
                        key={i} 
                        className="h-5 w-5 text-yellow-500" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-4">TechInnovate Corp</h3>
                  <p className="text-blue-100 mb-6">"AbDox transformed our business with their custom software solutions. The team was professional, responsive, and delivered beyond our expectations."</p>
                </motion.div>

                <motion.div 
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-lg"
                  whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex mb-2">
                    {Array(5).fill(0).map((_, i) => (
                      <svg 
                        key={i} 
                        className={`h-5 w-5 ${i < 4 ? 'text-yellow-500' : 'text-gray-400'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-4">Global Media Productions</h3>
                  <p className="text-blue-100 mb-6">"Working with AbDox on our media production needs was a breeze. They delivered high-quality content that aligned perfectly with our brand vision."</p>
                </motion.div>

                <motion.div 
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-lg"
                  whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex mb-2">
                    {Array(5).fill(0).map((_, i) => (
                      <svg 
                        key={i} 
                        className={`h-5 w-5 ${i < 5 ? 'text-yellow-500' : 'text-gray-400'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-4">AI Innovations Ltd</h3>
                  <p className="text-blue-100 mb-6">"The AI solutions provided by AbDox revolutionized our customer service. The chatbot implementation increased our efficiency by 40% and improved customer satisfaction."</p>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-10 md:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's work together to bring your vision to life with our expertise in software, media, and AI solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Contact Us Today
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  View Our Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;