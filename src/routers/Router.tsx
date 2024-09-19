import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '@/components/Layouts/AuthLayout';
import ComposerLayout from '@/components/Layouts/ComposerLayout';
import AgencyLayout from '@/components/Layouts/AgencyLayout';
import LoginPage from '@/pages/Login';
import SignupPage from '@/pages/SignUp';
import TrackListPage from '@/pages/Composer/Track/TrackList';
import PitchingListPage from '@/pages/Composer/Pitching/PitchingList';
import AgencyPitchingListPage from '@/pages/Agency/Pitching/PitchingList';

const authRoutes = [
  { 
    path: '/login', 
    element: <LoginPage />
  },
  { 
    path: '/signup', 
    element: <SignupPage />
  }
];

const composerRoutes = [
  {
    path: 'tracks',
    element: <TrackListPage />
  },
  {
    path: 'pitchings',
    element: <PitchingListPage />
  }
];

const agencyRoutes = [
  {
    path: 'pitchings',
    element: <AgencyPitchingListPage />
  },
];

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route element={<AuthLayout />}>
          {authRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route path="/composer" element={<ComposerLayout />}>
          {composerRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route path="/agency" element={<AgencyLayout />}>
          {agencyRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;