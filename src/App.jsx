import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { Home } from "@/pages/Home";
import { ScrollToTop } from "@/utils/ScrollToTop";
import { FocusManager } from "@/utils/FocusManager";
import { Suspense, lazy } from "react";
import CustomCursor from "@/components/CustomCursor";

// Only use lazy imports - no static imports for pages
const About = lazy(() => import("@/pages/About").then(m => ({ default: m.About })));
const Achievements = lazy(() => import("@/pages/Achievements").then(m => ({ default: m.Achievements })));
const Contact = lazy(() => import("@/pages/Contact").then(m => ({ default: m.Contact })));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center" role="status">
    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin">
      <span className="sr-only">Loading page...</span>
    </div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main id="main-content" tabIndex="-1">
        <ScrollToTop />
        <FocusManager />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;