import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  fullScreen?: boolean;
}

const LoadingSpinner = ({ size = 24, fullScreen = false }: LoadingSpinnerProps) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4">
      <Loader2 
        className="text-blue-600 animate-spin" 
        size={size}
      />
    </div>
  );
};

export default LoadingSpinner;