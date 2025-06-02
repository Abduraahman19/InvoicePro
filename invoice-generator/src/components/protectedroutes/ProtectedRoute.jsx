// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const { t } = useTranslation();
  const token = localStorage.getItem('token');

  if (!token) {
    toast.error(t('auth.unauthorized'));
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;