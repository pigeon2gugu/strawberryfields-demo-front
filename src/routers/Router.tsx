import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '@/components/Layouts/AuthLayout';
import LoginPage from '@/pages/Login';
import SignupPage from '@/pages/SignUp';

const routes = [
  { 
    path: '/', 
    element: <Navigate to="/login" replace /> 
  },
  { 
    path: '/login', 
    element: <AuthLayout><LoginPage /></AuthLayout> 
  },
  { 
    path: '/signup', 
    element: <AuthLayout><SignupPage /></AuthLayout> 
  }
];

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRouter;