import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import Location from './pages/Location';
import Accommodation from './pages/Accommodation';
import Transport from './pages/Transport';
import Asturias from './pages/Asturias';
import FAQs from './pages/FAQs';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"              element={<Hero />} />
          <Route path="/location"      element={<Location />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/transport"     element={<Transport />} />
          <Route path="/asturias"      element={<Asturias />} />
          <Route path="/faqs"          element={<FAQs />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
