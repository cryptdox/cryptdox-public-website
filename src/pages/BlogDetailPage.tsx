import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SEOHead from '../components/seo/SEOHead';
import StructuredData from '../components/seo/StructuredData';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import dayjs from 'dayjs';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

interface BlogPost {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
  created_by: string | null;
}

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('blog')
          .select('*')
          .eq('id', id)
          .eq('is_deleted', false)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error || !post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Blog post not found'}
          </h1>
          <p className="text-gray-600 mb-8">
            The blog post you're looking for might have been removed or is temporarily unavailable.
          </p>
          <Button onClick={handleBack} icon={<ArrowLeft size={18} />}>
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const articleData = {
    title: post.title,
    description: post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 160) : '',
    publishedTime: post.created_at,
    modifiedTime: post.created_at,
    author: 'cryptdox Team',
    url: `https://cryptdox.com/blog/${post.id}`,
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=2'
  };

  return (
    <div>
      <SEOHead 
        title={`${post.title} | cryptdox Blog`}
        description={post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 160) : 'Read the latest insights and updates from cryptdox technology experts.'}
        keywords="technology blog, software development, AI insights, programming tutorials, tech industry"
        url={`https://cryptdox.com/blog/${post.id}`}
        image="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=2"
        type="article"
        publishedTime={post.created_at}
        modifiedTime={post.created_at}
        author="cryptdox Team"
        section="Technology"
      />

      <StructuredData 
        type="article" 
        data={articleData}
      />

      <PageHeader 
        title={post.title}
        subtitle="Blog Post" 
        bgImage="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Button 
                variant="ghost" 
                onClick={handleBack}
                icon={<ArrowLeft className="h-4 w-4" />}
                aria-label="Go back to previous page"
              >
                Back to Blog
              </Button>
            </div>

            <article className="bg-white p-8 md:p-10 rounded-lg shadow-md">
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
                <div className="flex items-center text-gray-600 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <time dateTime={post.created_at}>
                      {dayjs(post.created_at).format('MMMM D, YYYY')}
                    </time>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>cryptdox Team</span>
                  </div>
                </div>
              </header>

              <div className="prose prose-lg max-w-none">
                {post.content ? (
                  <ReactQuill
                    value={post.content}
                    readOnly={true}
                    theme="bubble"
                    modules={{ toolbar: false }}
                  />
                ) : (
                  <p className="text-gray-600">No content available</p>
                )}
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;