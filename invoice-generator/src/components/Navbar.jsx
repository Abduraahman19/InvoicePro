// import { motion } from 'framer-motion';
// import { FiBell, FiHelpCircle, FiSettings, FiUser, FiLogOut } from 'react-icons/fi';
// import LanguageToggle from './free/LanguageToggle';
// import { Link, useNavigate } from 'react-router-dom';
// import Notifications from './panels/Notifications';
// import { useTranslation } from 'react-i18next';
// import { toast } from 'react-toastify';

// const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       // Call your logout API if you have one
//       // await axios.post('/api/auth/logout');
      
//       // Clear user data from local storage
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
      
//       // Show success message
//       toast.success(t('navbar.logoutSuccess'));
      
//       // Redirect to auth page
//       navigate('/auth');
//     } catch (error) {
//       console.error('Logout error:', error);
//       toast.error(t('navbar.logoutError'));
//     }
//   };

//   return (
//     <header className="bg-gray-800 border-b border-gray-700 shadow-sm">
//       <div className="flex items-center justify-between px-4 h-16">
//         {/* Left side */}
//         <div className="flex items-center space-x-4">
//           {/* Add your left side content here if needed */}
//         </div>

//         {/* Right side */}
//         <div className="flex items-center space-x-4">
//           <Link to="/notifications">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className="p-2 rounded-full text-gray-300 hover:bg-gray-700 relative"
//               aria-label={t('navbar.notifications')}
//             >
//               <FiBell size={20} />
//               <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
//             </motion.button>
//           </Link>
          
//           <LanguageToggle />
          
//           <Link to="/help">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className="p-2 rounded-full text-gray-300 hover:bg-gray-700"
//               aria-label={t('navbar.help')}
//             >
//               <FiHelpCircle size={20} />
//             </motion.button>
//           </Link>

//           <Link to="/settings">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className="p-2 rounded-full text-gray-300 hover:bg-gray-700"
//               aria-label={t('navbar.settings')}
//             >
//               <FiSettings size={20} />
//             </motion.button>
//           </Link>

//           {/* Logout Button */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleLogout}
//             className="p-2 rounded-full text-gray-300 hover:bg-gray-700 hidden sm:block"
//             aria-label={t('Logout')}
//             title={t('Logout')}
//           >
//             <FiLogOut size={20} />
//           </motion.button>

//           <Link to="/profile">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="flex items-center space-x-2 cursor-pointer"
//             >
//               <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
//                 <FiUser size={16} />
//               </div>
//               <span className="hidden md:inline-block text-sm font-medium text-white">
//                 {t('Admin')}
//               </span>
//             </motion.div>
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;








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
                <span className="font-semibold text-gray-500 text-lg">Invoice App</span>
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