import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HomeIcon,
  DocumentTextIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,   // Logout icon
  ArrowRightOnRectangleIcon,  // Login icon
  UserPlusIcon                // Register icon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">InvoicePro</span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/dashboard"
              className="py-4 px-2 text-gray-500 font-semibold hover:text-primary-500 transition duration-300 flex items-center"
            >
              <HomeIcon className="h-5 w-5 mr-1" />
              Dashboard
            </Link>
            <Link
              to="/invoices"
              className="py-4 px-2 text-gray-500 font-semibold hover:text-primary-500 transition duration-300 flex items-center"
            >
              <DocumentTextIcon className="h-5 w-5 mr-1" />
              Invoices
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="py-4 px-2 text-gray-500 font-semibold hover:text-primary-500 transition duration-300 flex items-center"
                >
                  <UserIcon className="h-5 w-5 mr-1" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-4 px-2 text-gray-500 font-semibold hover:text-primary-500 transition duration-300 flex items-center"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-4 px-2 text-gray-500 font-semibold hover:text-primary-500 transition duration-300 flex items-center"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="py-4 px-2 text-gray-500 font-semibold hover:text-primary-500 transition duration-300 flex items-center"
                >
                  <UserPlusIcon className="h-5 w-5 mr-1" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;