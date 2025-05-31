import { motion } from 'framer-motion';
import { FiBell, FiHelpCircle, FiSettings, FiUser, FiLogOut } from 'react-icons/fi';
import LanguageToggle from './LanguageToggle';
import { Link, useNavigate } from 'react-router-dom';
import Notifications from './Notifications';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call your logout API if you have one
      // await axios.post('/api/auth/logout');
      
      // Clear user data from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Show success message
      toast.success(t('navbar.logoutSuccess'));
      
      // Redirect to auth page
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(t('navbar.logoutError'));
    }
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 shadow-sm">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          {/* Add your left side content here if needed */}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <Link to="/notifications">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full text-gray-300 hover:bg-gray-700 relative"
              aria-label={t('navbar.notifications')}
            >
              <FiBell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </motion.button>
          </Link>
          
          <LanguageToggle />
          
          <Link to="/help">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full text-gray-300 hover:bg-gray-700"
              aria-label={t('navbar.help')}
            >
              <FiHelpCircle size={20} />
            </motion.button>
          </Link>

          <Link to="/settings">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full text-gray-300 hover:bg-gray-700"
              aria-label={t('navbar.settings')}
            >
              <FiSettings size={20} />
            </motion.button>
          </Link>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="p-2 rounded-full text-gray-300 hover:bg-gray-700 hidden sm:block"
            aria-label={t('Logout')}
            title={t('Logout')}
          >
            <FiLogOut size={20} />
          </motion.button>

          <Link to="/profile">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <FiUser size={16} />
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-white">
                {t('Admin')}
              </span>
            </motion.div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;