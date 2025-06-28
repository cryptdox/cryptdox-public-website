import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Code, Cloud, Film, BrainCircuit } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { supabase } from '../lib/supabase';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface Project {
  id: string;
  title: string;
  description: string | null;
  technology_used: string[] | null;
  link: string | null;
}

const PortfolioPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('individual_projects')
          .select('*')
          .eq('is_deleted', false)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getProjectIcon = (technologies: string[] | null) => {
    if (!technologies) return <Code className="h-8 w-8 text-blue-600" />;

    const tech = technologies.join(' ').toLowerCase();
    if (tech.includes('cloud') || tech.includes('aws') || tech.includes('azure')) {
      return <Cloud className="h-8 w-8 text-blue-600" />;
    } else if (tech.includes('ai') || tech.includes('ml') || tech.includes('tensorflow')) {
      return <BrainCircuit className="h-8 w-8 text-blue-600" />;
    } else if (tech.includes('video') || tech.includes('media') || tech.includes('animation')) {
      return <Film className="h-8 w-8 text-blue-600" />;
    }
    return <Code className="h-8 w-8 text-blue-600" />;
  };

  return (
    <div>
      <PageHeader 
        title="Our Portfolio" 
        subtitle="Explore our latest projects and success stories" 
        bgImage="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Projects</h2>
              <p className="text-lg text-gray-600">
                Discover how we've helped businesses transform and grow through technology
              </p>
            </div>

            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                {error}
              </div>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        {getProjectIcon(project.technology_used)}
                      </div>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-6 w-6" />
                        </a>
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                    <p className="text-gray-600 mb-6">{project.description}</p>

                    {project.technology_used && (
                      <div className="flex flex-wrap gap-2">
                        {project.technology_used.map((tech, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">Portfolio Coming Soon</h3>
                <p className="text-gray-600">
                  We're currently updating our portfolio. Check back soon to see our latest work!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's work together to bring your vision to life with our expertise in software, media, and AI solutions.
            </p>
            <Link 
              to="/contact"
              className="inline-block px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;