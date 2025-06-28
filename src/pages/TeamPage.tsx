import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { supabase } from '../lib/supabase';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface TeamMember {
  id: string;
  name: string;
  description: string | null;
}

const TeamPage = () => {
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const { data, error } = await supabase
          .from('team')
          .select('*')
          .eq('is_deleted', false)
          .order('name');

        if (error) throw error;
        setTeams(data || []);
      } catch (err) {
        console.error('Error fetching team data:', err);
        setError('Failed to load team data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <PageHeader 
        title="Our Team" 
        subtitle="Meet the talented individuals behind AbDox" 
        bgImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Experts</h2>
              <p className="text-lg text-gray-600">
                Our diverse team of professionals brings together expertise in software development,
                media production, and AI solutions.
              </p>
            </div>

            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                {error}
              </div>
            ) : teams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teams.map((member, index) => (
                  <motion.div
                    key={member.id}
                    className="bg-white p-6 rounded-lg shadow-md text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <img
                      src={`https://images.pexels.com/photos/${3831645 + index}/pexels-photo-${3831645 + index}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-gray-600 mb-4">{member.description}</p>
                    <div className="flex justify-center space-x-4">
                      <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                        <Github className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">Team Information Coming Soon</h3>
                <p className="text-gray-600">
                  We're currently updating our team information. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-lg text-gray-600">
                The principles that guide our work and collaboration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-white p-8 rounded-lg shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We embrace creativity and forward-thinking approaches to solve complex challenges.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-8 rounded-lg shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Excellence</h3>
                <p className="text-gray-600">
                  We strive for the highest quality in everything we do, consistently exceeding expectations.
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
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Collaboration</h3>
                <p className="text-gray-600">
                  We believe in the power of teamwork and open communication to achieve great results.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;