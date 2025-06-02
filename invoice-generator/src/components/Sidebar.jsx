import { Link, useLocation } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import {
  FiHome, FiFileText, FiUsers, FiBox,
  FiPieChart, FiDollarSign, FiLayers, FiClock,
  FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { useEffect, useState } from 'react';
import Logo from '../assets/invoice.png';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const controls = useAnimation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const menuItems = [
    { to: "/", icon: <FiHome size={20} />, label: "Dashboard" },
    { to: "/invoices/create", icon: <FiFileText size={20} />, label: "Create Invoice" },
    { to: "/invoices/history", icon: <FiClock size={20} />, label: "Invoice History" },
    { to: "/templates", icon: <FiLayers size={20} />, label: "Templates" },
    { to: "/clients", icon: <FiUsers size={20} />, label: "Clients" },
    { to: "/products", icon: <FiBox size={20} />, label: "Products" },
    { to: "/reports", icon: <FiPieChart size={20} />, label: "Reports" },
    { to: "/tax", icon: <FiDollarSign size={20} />, label: "Tax Settings" }
  ];

  const sidebarVariants = {
    open: { width: 260 },
    closed: { width: 80 }
  };

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 }
  };

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      
      // Auto-close when below 800px, auto-open when above 800px
      if (newWidth < 800) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state based on window width
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle manual toggle - this will override the automatic behavior
  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <motion.aside
      initial={sidebarOpen ? "open" : "closed"}
      animate={sidebarOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="bg-gray-800 border-r border-gray-700 pt-[1px] flex flex-col h-full relative"
    >
      {/* Logo/Toggle Area */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 h-16">
        {sidebarOpen ? (
          <Link to="/" >
            <div className="flex items-center cursor-pointer">
              <img src={Logo} alt="Logo" className="h-8 mr-2" />
              <span className="text-xl font-bold text-white">InvoicePro</span>
            </div>
          </Link>
        ) : (
          <Link to="/" >
            <img src={Logo} alt="Logo" className="h-8 mx-auto cursor-pointer" />
          </Link>
        )}

        <button
          onClick={handleToggle}
          className="p-1 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 absolute -right-3 top-6 z-10"
        >
          {sidebarOpen ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={item.to}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${location.pathname === item.to
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <span className={`${location.pathname === item.to ? 'text-white' : 'text-blue-400'}`}>
                  {item.icon}
                </span>
                <motion.span
                  variants={itemVariants}
                  className="ml-3 font-medium"
                >
                  {sidebarOpen && item.label}
                </motion.span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      {sidebarOpen && (
        <div className="p-4 border-t border-gray-700 text-center text-xs text-gray-400">
          InvoicePro v2.0 © {new Date().getFullYear()}
        </div>
      )}
    </motion.aside>
  );
};

export default Sidebar;