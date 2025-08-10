import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../ui/Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-200 ${
      isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'
    }`;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 h-[60px] transition-all duration-300  ${
        scrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-white backdrop-blur-md py-3'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClasses}>Home</NavLink>
            <NavLink to="/about" className={navLinkClasses}>About</NavLink>
            <NavLink to="/services" className={navLinkClasses}>Services</NavLink>
            {/* <NavLink to="/products" className={navLinkClasses}>Products</NavLink>
            <NavLink to="/portfolio" className={navLinkClasses}>Portfolio</NavLink>
            <NavLink to="/team" className={navLinkClasses}>Team</NavLink>
            <NavLink to="/blog" className={navLinkClasses}>Blog</NavLink>
            <NavLink to="/careers" className={navLinkClasses}>Careers</NavLink> */}
            <NavLink to="/contact" className={navLinkClasses}>
              <button className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Contact Us
              </button>
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>
      

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 border-t">
          <nav className="flex flex-col space-y-4">
            <NavLink to="/" className={navLinkClasses} onClick={closeMenu}>Home</NavLink>
            <NavLink to="/about" className={navLinkClasses} onClick={closeMenu}>About</NavLink>
            <NavLink to="/services" className={navLinkClasses} onClick={closeMenu}>Services</NavLink>
            {/* <NavLink to="/products" className={navLinkClasses} onClick={closeMenu}>Products</NavLink>
            <NavLink to="/portfolio" className={navLinkClasses} onClick={closeMenu}>Portfolio</NavLink>
            <NavLink to="/team" className={navLinkClasses} onClick={closeMenu}>Team</NavLink>
            <NavLink to="/blog" className={navLinkClasses} onClick={closeMenu}>Blog</NavLink>
            <NavLink to="/careers" className={navLinkClasses} onClick={closeMenu}>Careers</NavLink> */}
            <NavLink to="/contact" className={navLinkClasses} onClick={closeMenu}>Contact</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;