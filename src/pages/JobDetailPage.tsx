import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Briefcase, Clock, User, Send } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import dayjs from 'dayjs';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface Job {
  id: string;
  title: string;
  description: string | null;
  recruitment_expire_date: string | null;
  created_at: string;
}

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('job_circular')
          .select('id, title, description, recruitment_expire_date, created_at')
          .eq('id', id)
          .eq('is_deleted', false)
          .single();
          
        if (error) throw error;
        
        // Check if job has expired
        if (data) {
          const today = new Date();
          const expiryDate = data.recruitment_expire_date ? new Date(data.recruitment_expire_date) : null;
          
          if (expiryDate && expiryDate < today) {
            setError('This job posting has expired');
          } else {
            setJob(data);
          }
        } else {
          setError('Job not found');
        }
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobDetails();
  }, [id]);
  
  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }
  
  if (error || !job) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Job not found'}
          </h2>
          <p className="text-gray-600 mb-8">
            The job posting you're looking for is either expired or no longer available.
          </p>
          <Link to="/careers">
            <Button icon={<ArrowLeft size={18} />}>
              Back to Careers
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <PageHeader 
        title={job.title}
        subtitle="Job Details" 
        bgImage="https://images.pexels.com/photos/3182755/pexels-photo-3182755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 md:p-10 rounded-lg shadow-md">
              <div className="flex justify-between mb-8">
                <Link to="/careers" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Careers
                </Link>
                
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>
                    Application Deadline: {job.recruitment_expire_date 
                      ? dayjs(job.recruitment_expire_date).format('MMMM D, YYYY') 
                      : 'Open until filled'}
                  </span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{job.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
                  <Briefcase className="h-5 w-5 mr-2" />
                  <span>Full-time</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                  <User className="h-5 w-5 mr-2" />
                  <span>Remote / On-site</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Posted {dayjs(job.created_at).format('MMM D, YYYY')}</span>
                </div>
              </div>
              
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Job Description</h2>
                <div className="text-gray-700 space-y-4">
                  {job.description ? (
                    <div dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, '<br />') }} />
                  ) : (
                    <>
                      <p>
                        We are looking for a talented and passionate professional to join our team. As a {job.title}, you will be responsible for contributing to our innovative projects and helping us deliver exceptional solutions to our clients.
                      </p>
                      <p>
                        The ideal candidate will have a strong background in technology, excellent problem-solving skills, and a commitment to quality and customer satisfaction.
                      </p>
                      <h3 className="text-xl font-semibold mt-6 mb-2">Responsibilities:</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Collaborate with cross-functional teams to design, develop, and implement solutions</li>
                        <li>Participate in the full software development lifecycle</li>
                        <li>Stay up-to-date with industry trends and emerging technologies</li>
                        <li>Troubleshoot and resolve technical issues</li>
                        <li>Document processes and maintain technical documentation</li>
                      </ul>
                      <h3 className="text-xl font-semibold mt-6 mb-2">Requirements:</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Bachelor's degree in Computer Science, Engineering, or related field</li>
                        <li>Previous experience in a similar role</li>
                        <li>Strong problem-solving and analytical skills</li>
                        <li>Excellent communication and teamwork abilities</li>
                        <li>Ability to work independently and manage multiple priorities</li>
                      </ul>
                    </>
                  )}
                </div>
              </div>
              
              <div className="text-center">
                <Link to={`/careers/${job.id}/apply`}>
                  <Button size="lg" icon={<Send size={18} />}>
                    Apply for this Position
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetailPage;