import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SEOHead from '../components/seo/SEOHead';
import StructuredData from '../components/seo/StructuredData';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('contact')
        .insert([
          { 
            name: data.name,
            email: data.email,
            message: data.message,
            status: 'unread'
          }
        ]);
        
      if (error) throw error;
      
      setFormSubmitted(true);
      reset();
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactData = {
    name: "CryptDox Contact",
    description: "Get in touch with CryptDox for technology solutions and consulting services",
    address: "C-8 #54, Green Model Town, Dhaka",
    phone: "+88 01310 685450",
    email: "cryptdox.ethos@gmail.com"
  };

  return (
    <div>
      <SEOHead 
        title="Contact CryptDox - Get in Touch for Technology Solutions"
        description="Contact CryptDox for custom software development, AI solutions, cloud infrastructure, and media production services. Get in touch with our expert team today."
        keywords="contact CryptDox, software development consultation, technology services contact, get quote, business inquiry, custom software consultation"
        url="https://cryptdox.com/contact"
        image="https://images.pexels.com/photos/1181304/pexels-photo-1181304.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=2"
      />

      <StructuredData 
        type="service" 
        data={contactData}
      />

      <PageHeader 
        title="Contact Us" 
        subtitle="Get in touch with our team" 
        bgImage="https://images.pexels.com/photos/1181304/pexels-photo-1181304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:gap-12">
              {/* Contact Info */}
              <div className="md:w-1/3 mb-12 md:mb-0">
                <h1 className="text-2xl font-bold mb-6">Get In Touch</h1>
                <p className="text-gray-600 mb-8">
                  Have a question or want to work with us? We'd love to hear from you. Fill out the form or reach out through our contact information.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Our Location</h2>
                      <address className="text-gray-600 not-italic">C-8 #54, Green Model Town, Dhaka.</address>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Email Us</h2>
                      <a 
                        href="mailto:info@cryptdox.com" 
                        className="text-blue-600 hover:text-blue-800"
                        aria-label="Send email to info@cryptdox.com"
                      >
                        cryptdox.ethos@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Call Us</h2>
                      <a 
                        href="tel:+8801310685450" 
                        className="text-blue-600 hover:text-blue-800"
                        aria-label="Call +88 01310 685450"
                      >
                        +88 01310 685450
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="md:w-2/3 bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                {formSubmitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-2">Thank you for your message!</h3>
                    <p>We've received your inquiry and will get back to you as soon as possible.</p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 text-green-700 underline hover:text-green-900"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6" role="alert">
                        {error}
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="John Doe"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        {...register('name', { required: 'Name is required' })}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-red-500 text-sm" role="alert">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="john@example.com"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-red-500 text-sm" role="alert">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                      <textarea
                        id="message"
                        rows={5}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Tell us how we can help you..."
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        {...register('message', { 
                          required: 'Message is required',
                          minLength: {
                            value: 10,
                            message: 'Message must be at least 10 characters'
                          }
                        })}
                      ></textarea>
                      {errors.message && (
                        <p id="message-error" className="mt-1 text-red-500 text-sm" role="alert">{errors.message.message}</p>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      fullWidth 
                      size="lg"
                      isLoading={isSubmitting}
                      icon={<Send size={18} />}
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-lg overflow-hidden shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d435.6634906011182!2d90.44821593274474!3d23.724314344993285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sbd!4v1746384322211!5m2!1sen!2sbd" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                loading="lazy"
                title="CryptDox Office Location - C-8 #54, Green Model Town, Dhaka"
                aria-label="Map showing CryptDox office location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;