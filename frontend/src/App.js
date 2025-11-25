import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/home';
import { AuthProvider } from './components/authcontext';
import ProtectedRoutes from './components/protectedroutes';
import { ToastContainer } from 'react-toastify';
import { lazy, Suspense } from 'react';
import { AnimatePresence } from "framer-motion";

const CategoryProducts = lazy(() => import('./components/categories'));
const Checkout = lazy(() => import('./components/checkout'));
const About = lazy(() => import('./components/about'));
const Contact = lazy(() => import('./components/contact'));
const Orderslist = lazy(() => import("./components/orderslist"))
const Orderdetails = lazy(()=> import("./components/orderdetails"))

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>     
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category/:category" element={<ProtectedRoutes><CategoryProducts /></ProtectedRoutes>} />
        <Route path="/checkout" element={<ProtectedRoutes><Checkout /></ProtectedRoutes>} />
        <Route path="/orders" element={<ProtectedRoutes><Orderslist/></ProtectedRoutes>}/>
        <Route path="/orders/:id" element={<ProtectedRoutes><Orderdetails/></ProtectedRoutes>}/>
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <AnimatedRoutes />
          </Suspense>
        </Router>
        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

export default App;
