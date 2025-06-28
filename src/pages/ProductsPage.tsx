import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Package, Sparkles, Tag, ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { supabase } from '../lib/supabase';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface Product {
  id: string;
  name: string;
  description: string | null;
  service_id: string;
  site_url: string;
  image_url: string;
  service_id: string;
  free: boolean | null;
  price: number | null;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('product')
          .select(`
            *,
            services (
              name,
              description
            )
          `)
          .eq('is_deleted', false)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <PageHeader 
        title="Our Products" 
        subtitle="Discover our innovative solutions" 
        bgImage="https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
                  <Package className="h-4 w-4 mr-2" />
                  Product Catalog
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Innovative Solutions for Modern Challenges</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Explore our range of products designed to help businesses thrive in the digital age
                </p>
              </motion.div>
            </div>

            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                {error}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Product Image */}
                    <img src="https://bambooagile.eu/wp-content/uploads/2021/09/1-10.png"/>
                    

                    {/* Product Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            {product.services?.name || 'Software'}
                          </span>
                        </div>
                        {product.free ? (
                          <span className="text-green-600 font-medium">Free</span>
                        ) : (
                          <span className="text-gray-900 font-bold">
                            ${product.price?.toFixed(2) || '0.00'}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Tag className="h-4 w-4 mr-2" />
                          <span>{product.services?.name}</span>
                        </div>
                        <Link 
                          to={`/contact?product=${product.name}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Learn More
                          <ArrowUpRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Products Available</h3>
                <p className="text-gray-600 mb-8">
                  We're currently updating our product catalog. Check back soon for our latest offerings!
                </p>
                <Link 
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Sales Team
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how our products can help you achieve your business goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/contact"
                className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors"
              >
                Schedule a Demo
              </Link>
              <Link 
                to="/services"
                className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;