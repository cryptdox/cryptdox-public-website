import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-20">
      <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button icon={<Home size={18} />}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;