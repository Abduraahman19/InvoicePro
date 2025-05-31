import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiPlus, FiFileText, FiDollarSign, 
  FiUsers, FiTrendingUp, FiActivity 
} from 'react-icons/fi';

const Dashboard = () => {
  const stats = [
    { 
      title: "Total Invoices", 
      value: "124", 
      icon: <FiFileText size={24} />,
      color: "bg-blue-500",
      change: "+12% from last month"
    },
    { 
      title: "Revenue", 
      value: "$12,450", 
      icon: <FiDollarSign size={24} />,
      color: "bg-green-500",
      change: "+8% from last month"
    },
    { 
      title: "Active Clients", 
      value: "42", 
      icon: <FiUsers size={24} />,
      color: "bg-purple-500",
      change: "+5 new clients"
    },
    { 
      title: "Pending Invoices", 
      value: "8", 
      icon: <FiActivity size={24} />,
      color: "bg-yellow-500",
      change: "2 overdue"
    }
  ];

  const recentActivities = [
    { id: 1, invoice: "INV-1001", client: "Acme Corp", amount: "$1,200", status: "paid", time: "2 hours ago" },
    { id: 2, invoice: "INV-1002", client: "Globex Inc", amount: "$850", status: "pending", time: "5 hours ago" },
    { id: 3, invoice: "INV-1003", client: "XYZ Ltd", amount: "$2,400", status: "paid", time: "1 day ago" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-8">
        <motion.h2 variants={itemVariants} className="text-2xl font-bold text-white">
          Dashboard Overview
        </motion.h2>
        <motion.div variants={itemVariants}>
          <Link
            to="/invoices/create"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
          >
            <FiPlus className="mr-2" />
            Create New Invoice
          </Link>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold text-white mt-2">{stat.value}</h3>
                <p className="text-gray-500 text-xs mt-2">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activities */}
      <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Activities</h3>
          <button className="text-blue-400 hover:text-blue-300 text-sm">View All</button>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <motion.div 
              key={activity.id}
              whileHover={{ x: 5 }}
              className="flex items-center justify-between p-4 bg-gray-900 rounded-lg"
            >
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-blue-600 text-white mr-4">
                  <FiFileText size={18} />
                </div>
                <div>
                  <p className="font-medium text-white">{activity.invoice}</p>
                  <p className="text-sm text-gray-400">{activity.client}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">{activity.amount}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activity.status === 'paid' 
                    ? 'bg-green-900 text-green-300' 
                    : 'bg-yellow-900 text-yellow-300'
                }`}>
                  {activity.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Stats Chart (Placeholder) */}
      <motion.div 
        variants={itemVariants}
        className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
          <select className="bg-gray-900 text-white text-sm rounded-lg px-3 py-1">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
        </div>
        
        <div className="h-64 bg-gray-900 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart will be displayed here</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;