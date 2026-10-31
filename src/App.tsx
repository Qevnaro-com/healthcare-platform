/**
 * Pulse n Care — Healthcare Platform
 * Public Website Shell
 * (All internal admin, staff, b2b, and client panels removed per agreement)
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/common/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { NotificationProvider } from './context/NotificationContext';

// Public Layout
import { PublicLayout } from './components/layout/PublicLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
const ServicesPage = lazy(() => import('./pages/public/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/public/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })));
const HomeNursingServicePage = lazy(() => import('./pages/public/HomeNursingServicePage').then((m) => ({ default: m.HomeNursingServicePage })));
const PrivacyPolicyPage = lazy(() => import('./pages/public/LegalPages').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/public/LegalPages').then((m) => ({ default: m.TermsPage })));
const MedicalDisclaimerPage = lazy(() => import('./pages/public/LegalPages').then((m) => ({ default: m.MedicalDisclaimerPage })));
const CareersPage = lazy(() => import('./pages/public/CareersPage').then((m) => ({ default: m.CareersPage })));
const NotFoundPage = lazy(() => import('./pages/utility/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BookingProvider>
        <NotificationProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
            <Routes>
              {/* Public Website Routes */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="services/home-nursing" element={<HomeNursingServicePage />} />
                <Route path="services/post-operative-nursing-care" element={<Navigate to="/services/post-operative-recovery" replace />} />
                <Route path="services/:id" element={<ServiceDetailPage />} />
                <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="medical-disclaimer" element={<MedicalDisclaimerPage />} />
                
                {/* Fallback & Redirects for any old panel links directly to home */}
                <Route path="admin/*" element={<Navigate to="/" replace />} />
                <Route path="staff/*" element={<Navigate to="/" replace />} />
                <Route path="organization/*" element={<Navigate to="/" replace />} />
                <Route path="client/*" element={<Navigate to="/" replace />} />
                <Route path="book" element={<Navigate to="/" replace />} />
                <Route path="organizations" element={<Navigate to="/services" replace />} />
                <Route path="careers" element={<CareersPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
            </Suspense>
          </BrowserRouter>
        </NotificationProvider>
      </BookingProvider>
    </AuthProvider>
  );
};

export default App;
