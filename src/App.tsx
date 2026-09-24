import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ChiropractorTemplate } from '@/ChiropractorTemplate';
import { ServicePageTemplate } from '@/pages/ServicePageTemplate';
import { FAQPage } from '@/pages/FAQPage';

function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<ChiropractorTemplate />} />
          <Route path="/palvelut/:slug" element={<ServicePageTemplate />} />
          <Route path="/usein-kysyttya" element={<FAQPage />} />
        </Routes>
      </HashRouter>
    </HelmetProvider>
  );
}

export default App;
