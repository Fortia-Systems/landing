import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Brands from "@/pages/Brands";
import Contact from "@/pages/Contact";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = () => (
  <>
    <ScrollToTop />
    <Nav />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <div className="App grain">
      <BrowserRouter>
        <SmoothScroll>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/marcas" element={<Brands />} />
              <Route path="/contacto" element={<Contact />} />
            </Route>
          </Routes>
        </SmoothScroll>
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#1a1a1e",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0",
            color: "#fff",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "13px",
          },
        }}
      />
    </div>
  );
}

export default App;
