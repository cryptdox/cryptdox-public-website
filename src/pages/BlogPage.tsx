import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SEOHead from '../components/seo/SEOHead';
import StructuredData from '../components/seo/StructuredData';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import dayjs from 'dayjs';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface BlogPost {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
  created_by: string | null;
}

const ITEMS_PER_PAGE = 6;

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  const fetchPosts = async (page: number, search: string = '') => {
    try {
      setIsLoading(true);
      
      // Count total posts for pagination
      const countQuery = supabase
        .from('blog')
        .select('id', { count: 'exact' })
        .eq('is_deleted', false);
        
      if (search) {
        countQuery.ilike('title', `%${search}%`);
      }
      
      const { count, error: countError } = await countQuery;
      
      if (countError) throw countError;
      setTotalPosts(count || 0);

      // Fetch posts with pagination
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage - 1;

      let query = supabase
        .from('blog')
        .select('*')
        .eq('is_deleted', false)
        .order('created_at', { ascending: false })
        .range(start, end);

      if (search) {
        query = query.ilike('title', `%${search}%`);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('Failed to load blog posts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage, searchTerm);
  }, [currentPage, itemsPerPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    fetchPosts(1, searchTerm);
  };

  const totalPages = Math.ceil(totalPosts / itemsPerPage);

  const blogData = {
    name: "AbDox Blog",
    description: "Insights, tutorials, and updates from our technology experts",
    articles: posts.map(post => ({
      title: post.title,
      description: post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 160) : '',
      publishedTime: post.created_at,
      url: `https://abdox.com/blog/${post.id}`
    }))
  };

  return (
    <div>
      <SEOHead 
        title="Blog - Technology Insights & Tutorials | AbDox"
        description="Stay updated with the latest insights, tutorials, and industry trends from AbDox's technology experts. Learn about software development, AI, cloud solutions, and more."
        keywords="technology blog, software development tutorials, AI insights, cloud computing, web development tips, programming tutorials, tech industry news, digital transformation"
        url="https://abdox.com/blog"
        image="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=2"
      />

      <StructuredData 
        type="article" 
        data={blogData}
      />

      <PageHeader 
        title="Blog" 
        subtitle="Insights, tutorials, and updates from our team" 
        bgImage="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Search and Limit Controls */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
              <form onSubmit={handleSearch} className="w-full md:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search posts..."
                    className="w-full md:w-80 px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    aria-label="Search blog posts"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
                    aria-label="Search"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </form>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Posts per page:</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  aria-label="Posts per page"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                {error}
              </div>
            ) : posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {posts.map((post) => (
                    <article 
                      key={post.id} 
                      className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <h2 className="text-2xl font-bold mb-4">
                        <Link 
                          to={`/blog/${post.id}`} 
                          className="text-gray-800 hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      
                      <div className="flex items-center text-gray-600 mb-4 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <time dateTime={post.created_at}>
                            {dayjs(post.created_at).format('MMMM D, YYYY')}
                          </time>
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          <span>AbDox Team</span>
                        </div>
                      </div>
                      
                      <div className="text-gray-600 mb-4 line-clamp-3">
                        {post.content ? (
                          <div dangerouslySetInnerHTML={{ 
                            __html: post.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'
                          }} />
                        ) : (
                          'No content available'
                        )}
                      </div>
                      
                      <Link 
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        aria-label={`Read more about ${post.title}`}
                      >
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                <nav aria-label="Blog pagination" className="mt-12 flex justify-center items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    icon={<ChevronLeft className="h-4 w-4" />}
                    aria-label="Previous page"
                  >
                    Previous
                  </Button>
                  
                  <span className="text-gray-600" aria-live="polite">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    icon={<ChevronRight className="h-4 w-4" />}
                    aria-label="Next page"
                  >
                    Next
                  </Button>
                </nav>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No Blog Posts Found</h3>
                <p className="text-gray-600">
                  {searchTerm ? 'Try different search terms.' : 'Check back soon for updates and insights from our team.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;