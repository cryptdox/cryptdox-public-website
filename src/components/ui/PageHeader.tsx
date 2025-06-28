import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
}

const PageHeader = ({
  title,
  subtitle,
  bgImage = 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
}: PageHeaderProps) => {
  return (
    <div 
      className="relative h-[40vh] min-h-[320px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p 
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;