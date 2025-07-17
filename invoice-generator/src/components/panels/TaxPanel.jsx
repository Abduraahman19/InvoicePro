// import { motion } from 'framer-motion';
// import { FiPlus, FiTrash2, FiEdit2, FiCheck, FiX } from 'react-icons/fi';
// import React, { useState } from 'react';

// const TaxPanel = ({ invoice, setInvoice }) => {
//   const [taxRates, setTaxRates] = useState(() => {
//     const savedTaxRates = localStorage.getItem('taxRates');
//     return savedTaxRates ? JSON.parse(savedTaxRates) : [
//       { 
//         id: '1', 
//         name: 'GST', 
//         rate: 10, 
//         description: 'Goods and Services Tax',
//         appliesTo: 'all',
//         createdAt: '2023-01-01'
//       },
//       { 
//         id: '2', 
//         name: 'VAT', 
//         rate: 15, 
//         description: 'Value Added Tax',
//         appliesTo: 'services',
//         createdAt: '2023-01-15'
//       }
//     ];
//   });

//   const [newTaxRate, setNewTaxRate] = useState({
//     name: '',
//     rate: '',
//     description: '',
//     appliesTo: 'all'
//   });

//   const [editingTaxRate, setEditingTaxRate] = useState(null);
//   const [isAddingTax, setIsAddingTax] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (editingTaxRate) {
//       setEditingTaxRate(prev => ({
//         ...prev,
//         [name]: name === 'rate' ? parseFloat(value) || '' : value
//       }));
//     } else {
//       setNewTaxRate(prev => ({
//         ...prev,
//         [name]: name === 'rate' ? parseFloat(value) || '' : value
//       }));
//     }
//   };

//   const addTaxRate = () => {
//     if (!newTaxRate.name || !newTaxRate.rate) return;

//     const taxRate = {
//       id: Date.now().toString(),
//       ...newTaxRate,
//       rate: parseFloat(newTaxRate.rate),
//       createdAt: new Date().toISOString().split('T')[0]
//     };

//     const updatedTaxRates = [...taxRates, taxRate];
//     setTaxRates(updatedTaxRates);
//     localStorage.setItem('taxRates', JSON.stringify(updatedTaxRates));
//     setNewTaxRate({ name: '', rate: '', description: '', appliesTo: 'all' });
//     setIsAddingTax(false);
//   };

//   const updateTaxRate = () => {
//     if (!editingTaxRate?.name || !editingTaxRate?.rate) return;

//     const updatedTaxRates = taxRates.map(t =>
//       t.id === editingTaxRate.id ? editingTaxRate : t
//     );

//     setTaxRates(updatedTaxRates);
//     localStorage.setItem('taxRates', JSON.stringify(updatedTaxRates));
//     setEditingTaxRate(null);
//   };

//   const deleteTaxRate = (id) => {
//     const updatedTaxRates = taxRates.filter(t => t.id !== id);
//     setTaxRates(updatedTaxRates);
//     localStorage.setItem('taxRates', JSON.stringify(updatedTaxRates));
//   };

//   const applyTaxRate = (rate) => {
//     setInvoice(prev => ({
//       ...prev,
//       taxRate: rate
//     }));
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700"
//     >
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold text-white">Tax Settings</h2>
//           <p className="text-gray-400">Configure tax rates for your invoices</p>
//         </div>
        
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => setIsAddingTax(true)}
//           className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mt-4 md:mt-0"
//         >
//           <FiPlus className="mr-2" />
//           Add Tax Rate
//         </motion.button>
//       </div>

//       {/* Add/Edit Tax Form */}
//       {(isAddingTax || editingTaxRate) && (
//         <motion.div 
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: 'auto', opacity: 1 }}
//           exit={{ height: 0, opacity: 0 }}
//           className="mb-6 bg-gray-900 rounded-lg overflow-hidden"
//         >
//           <div className="p-4">
//             <h3 className="text-lg font-semibold text-white mb-4">
//               {editingTaxRate ? 'Edit Tax Rate' : 'Add New Tax Rate'}
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Name*</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={editingTaxRate ? editingTaxRate.name : newTaxRate.name}
//                   onChange={handleInputChange}
//                   className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="e.g. GST, VAT"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Rate (%)*</label>
//                 <input
//                   type="number"
//                   name="rate"
//                   value={editingTaxRate ? editingTaxRate.rate : newTaxRate.rate}
//                   onChange={handleInputChange}
//                   min="0"
//                   step="0.1"
//                   className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="10.5"
//                 />
//               </div>
              
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
//                 <input
//                   type="text"
//                   name="description"
//                   value={editingTaxRate ? editingTaxRate.description : newTaxRate.description}
//                   onChange={handleInputChange}
//                   className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Short description of the tax"
//                 />
//               </div>
              
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Applies To</label>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                   {['all', 'products', 'services', 'digital'].map((type) => (
//                     <label key={type} className="flex items-center space-x-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="appliesTo"
//                         checked={(editingTaxRate ? editingTaxRate.appliesTo : newTaxRate.appliesTo) === type}
//                         onChange={handleInputChange}
//                         value={type}
//                         className="form-radio h-4 w-4 text-blue-600"
//                       />
//                       <span className="text-gray-300 capitalize">{type}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-6 flex justify-end space-x-3">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => {
//                   setIsAddingTax(false);
//                   setEditingTaxRate(null);
//                 }}
//                 className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
//               >
//                 <FiX className="mr-2" />
//                 Cancel
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={editingTaxRate ? updateTaxRate : addTaxRate}
//                 className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//               >
//                 <FiCheck className="mr-2" />
//                 {editingTaxRate ? 'Update Tax' : 'Add Tax'}
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Tax Rates Table */}
//       <div className="overflow-x-auto rounded-lg border border-gray-700">
//         <table className="min-w-full divide-y divide-gray-700">
//           <thead className="bg-gray-900">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rate</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Applies To</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Added</th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-gray-800 divide-y divide-gray-700">
//             {taxRates.length > 0 ? (
//               taxRates.map((taxRate) => (
//                 <motion.tr 
//                   key={taxRate.id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
//                   className="text-gray-300"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="font-medium text-white">{taxRate.name}</div>
//                     {taxRate.description && (
//                       <div className="text-sm text-gray-400 mt-1">{taxRate.description}</div>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="px-2 py-1 bg-gray-700 rounded-full text-sm">
//                       {taxRate.rate}%
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap capitalize">
//                     {taxRate.appliesTo}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     {new Date(taxRate.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-end space-x-2">
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => applyTaxRate(taxRate.rate)}
//                         className="text-blue-400 hover:text-blue-300 px-2 py-1 rounded"
//                         title="Apply to current invoice"
//                       >
//                         Apply
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => setEditingTaxRate(taxRate)}
//                         className="text-green-400 hover:text-green-300 px-2 py-1 rounded"
//                         title="Edit"
//                       >
//                         <FiEdit2 />
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => deleteTaxRate(taxRate.id)}
//                         className="text-red-400 hover:text-red-300 px-2 py-1 rounded"
//                         title="Delete"
//                       >
//                         <FiTrash2 />
//                       </motion.button>
//                     </div>
//                   </td>
//                 </motion.tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
//                   No tax rates configured. Add your first tax rate.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Tax Summary */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2 }}
//         className="mt-6 bg-gray-900 rounded-lg p-4"
//       >
//         <h3 className="text-lg font-semibold text-white mb-3">Tax Summary</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <h4 className="text-sm font-medium text-gray-300 mb-1">Standard Tax Rate</h4>
//             <p className="text-2xl font-bold text-white">
//               {taxRates.find(t => t.appliesTo === 'all')?.rate || '0'}%
//             </p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <h4 className="text-sm font-medium text-gray-300 mb-1">Total Tax Rates</h4>
//             <p className="text-2xl font-bold text-white">{taxRates.length}</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <h4 className="text-sm font-medium text-gray-300 mb-1">Last Updated</h4>
//             <p className="text-2xl font-bold text-white">
//               {taxRates.length > 0 
//                 ? new Date(Math.max(...taxRates.map(t => new Date(t.createdAt))))
//                   .toLocaleDateString() 
//                 : 'Never'}
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default TaxPanel;