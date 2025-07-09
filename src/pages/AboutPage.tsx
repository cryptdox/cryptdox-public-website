import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Medal, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SEOHead from '../components/seo/SEOHead';
import StructuredData from '../components/seo/StructuredData';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

interface AboutInfo {
  title: string;
  founder_name: string | null;
  mission: string | null;
  description: string | null;
  story: string | null;
  core_values: string[] | null;
  founder_image_url: string | null;
}

const AboutPage = () => {
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutInfo = async () => {
      try {
        const { data, error } = await supabase
          .from('about')
          .select('title, founder_name, mission, description, story, core_values, founder_image_url')
          .limit(1)
          .single();

        if (error) throw error;
        setAboutInfo(data);
      } catch (err) {
        console.error('Error fetching about info:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutInfo();
  }, []);

  const defaultValues: AboutInfo = {
    title: 'About CryptDox',
    founder_name: 'Abir Hosen Ashik',
    mission: 'To revolutionize digital solutions through innovation, excellence, and integrity.',
    description: 'CryptDox is a tech startup specializing in software development, media production, and AI-powered solutions. We help businesses leverage technology to grow and innovate in the digital age.',
    story: 'CryptDox was founded by Abir Hosen Ashik with a vision to create technology solutions that make a difference. The name "CryptDox" combines "Abir" (the founder\'s name) with "Doxology" (an expression of praise), reflecting our commitment to creating praiseworthy digital solutions.',
    core_values: ['Innovation', 'Excellence', 'Integrity', 'Collaboration', 'Customer-Focus'],
    // founder_image_url: 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    founder_image_url: 'https://scontent.fdac3-1.fna.fbcdn.net/v/t39.30808-6/471507556_2484043331799993_7428727398560408109_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFI3VuhWrTDsoIwiimH28V6EcHtnQYt-7gRwe2dBi37uCtcn8lucNl8mFDGU6053e0ubKchDZBbJ4gxKsROKk2d&_nc_ohc=eNAiiXTCvfIQ7kNvwEtzfCc&_nc_oc=Adk8JCuFxjo769iT5IOnDk9D229BOQKHCejdW7GkZDhvWqd2eo1rrEXxqh6r2P2kNLnzJ_FYP155n1eDn8H9vQkC&_nc_zt=23&_nc_ht=scontent.fdac3-1.fna&_nc_gid=RBPVxyLvpmb5XawR5TisrQ&oh=00_AfMaB_Gb-hZteM5NmxOHJwQIHzECfBqm9sGIZAX0jL3rFA&oe=68659906'
  };

  const info = aboutInfo || defaultValues;

  const organizationData = {
    name: "CryptDox",
    description: info.description,
    founder: info.founder_name,
    mission: info.mission,
    values: info.core_values
  };

  return (
    <div>
      <SEOHead 
        title="About CryptDox - Leading Software Development Company"
        description="Learn about CryptDox, a technology company founded by Abir Hosen Ashik, specializing in software development, media production, and AI solutions. Discover our mission, values, and story."
        keywords="about CryptDox, software development company, abir hosen ashik, technology startup, ai solutions, media production, company history, mission values"
        url="https://cryptdox.com/about"
        image="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=2"
      />

      <StructuredData 
        type="service" 
        data={organizationData}
      />

      <PageHeader 
        title="About Us" 
        subtitle="Our story, mission, and values" 
        bgImage="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      
      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                {isLoading ? (
                  <span className="block h-6 w-3/4 mx-auto bg-gray-200 animate-pulse rounded"></span>
                ) : (
                  info.mission
                )}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold mb-4">Innovative Solutions</h2>
                <p className="text-gray-600">
                  We create cutting-edge technology solutions that address complex challenges and drive growth.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Medal className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold mb-4">Excellence in Delivery</h2>
                <p className="text-gray-600">
                  We are committed to delivering high-quality solutions that exceed expectations and create lasting value.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-4">Client Partnerships</h2>
                <p className="text-gray-600">
                  We build lasting relationships with our clients, working collaboratively to achieve their goals.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Story Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                className="md:w-1/2 mb-8 md:mb-0 md:pr-12"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img 
                  src={isLoading ? 'https://via.placeholder.com/600x400' : (info.founder_image_url || defaultValues.founder_image_url) || ''} 
                  alt={`${info.founder_name || 'Founder'} - CryptDox Founder and CEO`}
                  className="rounded-xl shadow-lg object-cover w-full aspect-[4/3]"
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
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                  {isLoading ? (
                    <span className="block h-7 w-1/2 bg-gray-200 animate-pulse rounded"></span>
                  ) : (
                    `Founded by ${info.founder_name || 'Abir Hosen Ashik'}`
                  )}
                </h3>
                <div className="text-lg text-gray-600 space-y-4">
                  {isLoading ? (
                    <>
                      <div className="h-5 bg-gray-200 animate-pulse rounded mb-2"></div>
                      <div className="h-5 bg-gray-200 animate-pulse rounded mb-2"></div>
                      <div className="h-5 bg-gray-200 animate-pulse rounded mb-2"></div>
                      <div className="h-5 bg-gray-200 animate-pulse rounded mb-2 w-3/4"></div>
                    </>
                  ) : (
                    <p>{info.story}</p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Values</h2>
              <p className="text-xl text-gray-600">
                These principles guide everything we do at CryptDox
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="bg-white p-8 rounded-lg shadow-md animate-pulse">
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-gray-200 mr-4 mt-1"></div>
                      <div>
                        <div className="h-7 bg-gray-200 rounded w-24 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                info.core_values?.map((value, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white p-8 rounded-lg shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-3">{value}</h3>
                        {value === 'Innovation' && (
                          <p className="text-gray-600">We embrace creativity and forward-thinking approaches to stay ahead of the curve and deliver cutting-edge solutions.</p>
                        )}
                        {value === 'Excellence' && (
                          <p className="text-gray-600">We strive for the highest quality in everything we do, consistently pushing boundaries to exceed expectations.</p>
                        )}
                        {value === 'Integrity' && (
                          <p className="text-gray-600">We conduct business with honesty, transparency, and ethical principles, building trust with our clients and partners.</p>
                        )}
                        {value === 'Collaboration' && (
                          <p className="text-gray-600">We believe in the power of teamwork, fostering an environment where diverse perspectives lead to better outcomes.</p>
                        )}
                        {value === 'Customer-Focus' && (
                          <p className="text-gray-600">We prioritize understanding and addressing our clients' needs, building long-lasting relationships based on mutual success.</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work With Us?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's collaborate to bring your vision to life with innovative technology solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white hover:text-blue-600 transition-colors">
                Contact Us
              </Link>
              <Link to="/services" className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white hover:text-blue-600 transition-colors">
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;