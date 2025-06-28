import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';

interface LogoProps {
  inverted?: boolean;
}

const Logo = ({ inverted = false }: LogoProps) => {
  const textColor = inverted ? 'text-white' : 'text-gray-800';
  const accentColor = inverted ? 'text-blue-400' : 'text-blue-600';

  return (
    <Link to="/" className="flex items-center gap-2">
      <Terminal className={`h-8 w-8 ${accentColor}`} />
      <span className={`text-2xl font-bold ${textColor}`}>
        Ab<span className={accentColor}>Dox</span>
      </span>
    </Link>
  );
};

export default Logo;