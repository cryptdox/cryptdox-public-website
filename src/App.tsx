import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './routes';
import { Toaster } from './components/ui/Toaster';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppRoutes />
        <Toaster />
      </Router>
    </HelmetProvider>
  );
}

export default App;