import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { lazy, Suspense } from 'react';
import { AnimatePresence } from "framer-motion";
import ProtectedRoutes from './pages/ProtectedRoutes'
import { AuthProvider } from './pages/authcontext';

const Login = lazy(()=>import("./pages/admin-login"))
const AdminDashboard = lazy(()=> import("./pages/admin-dashboard"))
const StatusUpdate = lazy(()=> import("./pages/status_update"))
const UserStatusUpdate = lazy(() => import("./pages/user-status_update"))


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>     
        <Route path="/" element={<Login/>} />
        <Route path="/admin-dashboard" element={<ProtectedRoutes><AdminDashboard/></ProtectedRoutes>} />
        <Route path="/status-update" element={<ProtectedRoutes><StatusUpdate/></ProtectedRoutes>} />
        <Route path="/user-status-update" element={<ProtectedRoutes><UserStatusUpdate/></ProtectedRoutes>} />
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
