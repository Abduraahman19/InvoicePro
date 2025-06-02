// src/components/AppRoutes.jsx
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/protectedroutes/ProtectedRoute';
import Loader from '../components/loader/Loader';

// Lazy-loaded components
const AuthPage = lazy(() => import('../components/auth/AuthPage'));
const Dashboard = lazy(() => import('../components/Dashboard'));
const InvoiceForm = lazy(() => import('../components/createInvoice/InvoiceForm'));
const InvoicePreview = lazy(() => import('../components/createInvoice/InvoicePreview'));
const TemplateSelector = lazy(() => import('../components/panels/TemplateSelector'));
const ClientsPanel = lazy(() => import('../components/panels/ClientsPanel'));
const ProductsPanel = lazy(() => import('../components/panels/ProductsPanel'));
const ReportsPanel = lazy(() => import('../components/panels/ReportsPanel'));
const TaxPanel = lazy(() => import('../components/panels/TaxPanel'));
const HistoryPanel = lazy(() => import('../components/panels/HistoryPanel'));
const SettingsPanel = lazy(() => import('../components/panels/SettingsPanel'));
const UserProfile = lazy(() => import('../components/panels/UserProfile'));
const HelpCenter = lazy(() => import('../components/panels/HelpCenter'));
const Notifications = lazy(() => import('../components/panels/Notifications'));
const ForgotPasswordPage = lazy(() => import('../components/auth/ForgotPasswordPage'));
const OtpModal = lazy(() => import('../components/auth/OtpModal'));
const ResetPasswordModal = lazy(() => import('../components/auth/ResetPasswordModal'));

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
