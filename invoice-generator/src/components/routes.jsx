// src/components/AppRoutes.jsx
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import Loader from './Loader';

// Lazy-loaded components
const AuthPage = lazy(() => import('../components/AuthPage'));
const Dashboard = lazy(() => import('../components/Dashboard'));
const InvoiceForm = lazy(() => import('../components/InvoiceForm'));
const InvoicePreview = lazy(() => import('../components/InvoicePreview'));
const TemplateSelector = lazy(() => import('../components/TemplateSelector'));
const ClientsPanel = lazy(() => import('../components/ClientsPanel'));
const ProductsPanel = lazy(() => import('../components/ProductsPanel'));
const ReportsPanel = lazy(() => import('../components/ReportsPanel'));
const TaxPanel = lazy(() => import('../components/TaxPanel'));
const HistoryPanel = lazy(() => import('../components/HistoryPanel'));
const SettingsPanel = lazy(() => import('../components/SettingsPanel'));
const UserProfile = lazy(() => import('../components/UserProfile'));
const HelpCenter = lazy(() => import('../components/HelpCenter'));
const Notifications = lazy(() => import('../components/Notifications'));
const ForgotPasswordPage = lazy(() => import('../components/ForgotPasswordPage'));
const OtpModal = lazy(() => import('../components/OtpModal'));
const ResetPasswordModal = lazy(() => import('../components/ResetPasswordModal'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<AuthPage />} />
        </Route>

        {/* Public Routes */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp" element={<OtpModal />} />
        <Route path="/reset-password" element={<ResetPasswordModal />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="invoices">
            <Route path="create" element={<InvoiceForm />} />
            <Route path="preview" element={<InvoicePreview />} />
            <Route path="history" element={<HistoryPanel />} />
          </Route>
          <Route path="notifications" element={<Notifications />} />
          <Route path="templates" element={<TemplateSelector />} />
          <Route path="clients" element={<ClientsPanel />} />
          <Route path="products" element={<ProductsPanel />} />
          <Route path="reports" element={<ReportsPanel />} />
          <Route path="tax" element={<TaxPanel />} />
          <Route path="settings" element={<SettingsPanel />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="help" element={<HelpCenter />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
