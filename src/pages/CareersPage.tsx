import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Briefcase, Users } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import dayjs from 'dayjs';

interface Job {
  id: string;
  title: string;
  description: string | null;
  recruitment_expire_date: string | null;
  created_at: string;
}

const CareersPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        
        const { data, error } = await supabase
          .from('job_circular')
          .select('id, title, description, recruitment_expire_date, created_at')
          .eq('is_deleted', false)
          .gte('recruitment_expire_date', today)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setJobs(data || []);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load job listings');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  return (
    <div>
      <PageHeader 
        title="Careers at AbDox" 
        subtitle="Join our innovative team" 
        bgImage="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Current Job Openings</h2>
              <p className="text-lg text-gray-600">
                Join our team of innovators and help shape the future of technology
              </p>
            </div>
            
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-8 rounded-lg shadow-md animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-6 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-6 w-3/4"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                {error}
              </div>
            ) : jobs.length > 0 ? (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-800">{job.title}</h3>
                      
                      <div className="flex items-center text-gray-600 mt-2 md:mt-0">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>
                          Deadline: {job.recruitment_expire_date 
                            ? dayjs(job.recruitment_expire_date).format('MMM D, YYYY') 
                            : 'Open until filled'}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {job.description || 'Join our team and be part of an innovative company working on cutting-edge technology solutions.'}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mb-8">
                      <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span>Full-time</span>
                      </div>
                      <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Remote / On-site</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Link to={`/careers/${job.id}`}>
                        <Button variant="secondary">
                          View Details
                        </Button>
                      </Link>
                      <Link to={`/careers/${job.id}/apply`}>
                        <Button>
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">No Open Positions</h3>
                <p className="text-gray-600 mb-6">
                  We don't have any open positions at the moment, but we're always looking for talent.
                </p>
                <Link to="/contact">
                  <Button>
                    Contact Us
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Why Join Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Join AbDox?</h2>
              <p className="text-lg text-gray-600">
                Be part of a forward-thinking team working on cutting-edge technologies
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Innovative Projects</h3>
                <p className="text-gray-600">
                  Work on cutting-edge technologies and challenging projects that make a real impact in the industry.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Flexible Work Environment</h3>
                <p className="text-gray-600">
                  Enjoy a flexible work schedule and the ability to work remotely or in our collaborative office space.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Growth Opportunities</h3>
                <p className="text-gray-600">
                  Continuous learning and career advancement opportunities with mentorship from industry experts.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Collaborative Culture</h3>
                <p className="text-gray-600">
                  Join a diverse team of talented professionals who inspire and support each other in a positive work culture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-10 md:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">No Open Positions That Match Your Skills?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep it on file for future opportunities.
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;