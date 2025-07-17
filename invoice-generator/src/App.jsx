// import AppRoutes from '../src/routes/routes'
// import { useTranslation } from 'react-i18next'
// import { I18nextProvider } from 'react-i18next'
// import i18n from './data/i18n'

// function App() {
//   return (
//     <I18nextProvider i18n={i18n}>
//       <AppRoutes />
//     </I18nextProvider>
//   )
// }

// export default App





import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import InvoiceList from './components/InvoiceList';
import InvoiceForm from './components/InvoiceForm';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import InvoicePage from './pages/InvoicePage';

// Context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto py-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Invoice Routes */}
              <Route path="/invoices" element={
                <ProtectedRoute>
                  <InvoiceList />
                </ProtectedRoute>
              } />
              <Route
                path="/invoices/new"
                element={
                  <ProtectedRoute>
                    <InvoiceForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/invoices/:id/edit"
                element={
                  <ProtectedRoute>
                    <InvoiceForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/invoices/:id"
                element={
                  <ProtectedRoute>
                    <InvoicePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
