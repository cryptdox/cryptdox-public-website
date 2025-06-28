import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Upload, File, X } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import dayjs from 'dayjs';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface Job {
  id: string;
  title: string;
  recruitment_expire_date: string | null;
}

interface ApplicationFormData {
  applicant_name: string;
  email: string;
  objective: string;
}

const JobApplicationPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ApplicationFormData>();
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('job_circular')
          .select('id, title, recruitment_expire_date')
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
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileError(null);
    
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setFileError('Please upload a PDF or Word document');
        setCvFile(null);
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File size must be less than 5MB');
        setCvFile(null);
        return;
      }
      
      setCvFile(file);
    }
  };
  
  const onSubmit = async (data: ApplicationFormData) => {
    if (!job) return;
    
    if (!cvFile) {
      setFileError('Please upload your CV');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // 1. Upload CV to Supabase Storage
      const fileExt = cvFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `cvs/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('applications')
        .upload(filePath, cvFile);
        
      if (uploadError) throw uploadError;
      
      // 2. Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('applications')
        .getPublicUrl(filePath);
      
      // 3. Submit application details to database
      const { error: submitError } = await supabase
        .from('applications')
        .insert([
          {
            job_id: job.id,
            applicant_name: data.applicant_name,
            email: data.email,
            objective: data.objective,
            cv_url: publicUrl,
            reviewed: false,
            approved: false
          }
        ]);
        
      if (submitError) throw submitError;
      
      setSubmitSuccess(true);
    } catch (err) {
      console.error('Error submitting application:', err);
      setError('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }
  
  if (error && !job) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error}
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
  
  if (submitSuccess) {
    return (
      <div>
        <PageHeader 
          title="Application Submitted" 
          subtitle="Thank you for applying" 
          bgImage="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white p-8 md:p-10 rounded-lg shadow-md">
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Application Submitted Successfully!</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Thank you for applying for the {job?.title} position at AbDox. We will review your application and get back to you soon.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/careers">
                    <Button variant="secondary" icon={<ArrowLeft size={18} />}>
                      Back to Careers
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button>
                      Go to Homepage
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  return (
    <div>
      <PageHeader 
        title={`Apply for ${job?.title || 'Job'}`} 
        subtitle="Submit your application" 
        bgImage="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link to={`/careers/${id}`} className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Job Details
              </Link>
            </div>
            
            <div className="bg-white p-8 md:p-10 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Application Form</h2>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <label htmlFor="applicant_name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    id="applicant_name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.applicant_name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="John Doe"
                    {...register('applicant_name', { required: 'Name is required' })}
                  />
                  {errors.applicant_name && (
                    <p className="mt-1 text-red-500 text-sm">{errors.applicant_name.message}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="john@example.com"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="objective" className="block text-gray-700 font-medium mb-2">Objective / Cover Letter</label>
                  <textarea
                    id="objective"
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.objective ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Tell us why you're interested in this position and what makes you a good fit..."
                    {...register('objective', { 
                      required: 'Objective is required',
                      minLength: {
                        value: 50,
                        message: 'Objective must be at least 50 characters'
                      }
                    })}
                  ></textarea>
                  {errors.objective && (
                    <p className="mt-1 text-red-500 text-sm">{errors.objective.message}</p>
                  )}
                </div>
                
                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-2">Upload CV</label>
                  
                  {!cvFile ? (
                    <div 
                      className={`border-2 border-dashed rounded-lg p-6 text-center ${
                        fileError ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-500'
                      } transition cursor-pointer`}
                      onClick={() => document.getElementById('cv')?.click()}
                    >
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-500 mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400">PDF or Word Document (Max 5MB)</p>
                      
                      <input
                        type="file"
                        id="cv"
                        className="hidden"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                      />
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <File className="h-6 w-6 text-blue-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium">{cvFile.name}</p>
                          <p className="text-xs text-gray-500">{(cvFile.size / 1024).toFixed(0)} KB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCvFile(null)}
                        className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                      >
                        <X className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                  )}
                  
                  {fileError && (
                    <p className="mt-1 text-red-500 text-sm">{fileError}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  fullWidth
                  isLoading={isSubmitting}
                >
                  Submit Application
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobApplicationPage;