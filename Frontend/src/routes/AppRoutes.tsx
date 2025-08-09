import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Store from '../pages/Store';
import OrderTracking from '../pages/OrderTracking';
import AdminDashboard from '../pages/AdminDashboard';
import NotFound from '../pages/NotFound';
import Layout from '../components/Layout';
import { SignedIn, SignIn, SignUp } from '@clerk/clerk-react';


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SignedIn>{children}</SignedIn>;
};

const AppRoutes: React.FC = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/track" element={<OrderTracking />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </Router>
);

export default AppRoutes;
