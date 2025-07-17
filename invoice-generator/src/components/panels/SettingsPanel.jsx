// import { motion } from 'framer-motion';
// import { FiSave, FiCheck, FiX } from 'react-icons/fi';
// import { useState } from 'react';

// const SettingsPanel = () => {
//   const [formData, setFormData] = useState({
//     companyName: 'Acme Inc.',
//     email: 'contact@acme.com',
//     notifications: true,
//     autoSave: true,
//     currency: 'USD',
//     language: 'en'
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const saveSettings = () => {
//     setIsEditing(false);
//     // Here you would typically save to API
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700"
//     >
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-2xl font-bold text-white">Application Settings</h2>
//         {isEditing ? (
//           <div className="flex space-x-2">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsEditing(false)}
//               className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
//             >
//               <FiX className="mr-2" />
//               Cancel
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={saveSettings}
//               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//             >
//               <FiCheck className="mr-2" />
//               Save Changes
//             </motion.button>
//           </div>
//         ) : (
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setIsEditing(true)}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             <FiSave className="mr-2" />
//             Edit Settings
//           </motion.button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Company Settings */}
//         <motion.div 
//           initial={{ x: -20, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.1 }}
//           className="p-4 bg-gray-900 rounded-lg"
//         >
//           <h3 className="text-lg font-semibold mb-4 text-white border-b border-gray-700 pb-2">Company Information</h3>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
//               <input
//                 type="text"
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className={`w-full p-3 rounded-lg ${isEditing ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-800 text-gray-300 border-0'}`}
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">Contact Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className={`w-full p-3 rounded-lg ${isEditing ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-800 text-gray-300 border-0'}`}
//               />
//             </div>
//           </div>
//         </motion.div>

//         {/* Application Preferences */}
//         <motion.div 
//           initial={{ x: -20, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="p-4 bg-gray-900 rounded-lg"
//         >
//           <h3 className="text-lg font-semibold mb-4 text-white border-b border-gray-700 pb-2">Preferences</h3>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">Enable Notifications</label>
//                 <p className="text-xs text-gray-500">Receive email notifications</p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="notifications"
//                   checked={formData.notifications}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//               </label>
//             </div>

//             <div className="flex items-center justify-between">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">Auto Save</label>
//                 <p className="text-xs text-gray-500">Automatically save changes</p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="autoSave"
//                   checked={formData.autoSave}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//               </label>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">Default Currency</label>
//               <select
//                 name="currency"
//                 value={formData.currency}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className={`w-full p-3 rounded-lg ${isEditing ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-800 text-gray-300 border-0'}`}
//               >
//                 <option value="USD">US Dollar (USD)</option>
//                 <option value="EUR">Euro (EUR)</option>
//                 <option value="GBP">British Pound (GBP)</option>
//                 <option value="PKR">Pakistani Rupee (PKR)</option>
//               </select>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default SettingsPanel;