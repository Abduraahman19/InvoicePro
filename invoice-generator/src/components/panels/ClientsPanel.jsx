// import { motion } from 'framer-motion';
// import { FiUserPlus, FiEdit2, FiTrash2, FiSearch, FiPlus } from 'react-icons/fi';
// import { useState } from 'react';

// const ClientsPanel = ({ invoice, setInvoice }) => {
//   const [clients, setClients] = useState(() => {
//     const savedClients = localStorage.getItem('clients');
//     return savedClients ? JSON.parse(savedClients) : [
//       {
//         id: '1',
//         name: 'Acme Corporation',
//         email: 'contact@acme.com',
//         phone: '+1234567890',
//         address: '123 Business Rd, New York',
//         taxId: 'US123456789',
//         createdAt: '2023-01-15'
//       },
//       {
//         id: '2',
//         name: 'Globex Inc',
//         email: 'info@globex.com',
//         phone: '+1987654321',
//         address: '456 Industry Ave, Chicago',
//         taxId: 'US987654321',
//         createdAt: '2023-02-20'
//       }
//     ];
//   });

//   const [newClient, setNewClient] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     taxId: ''
//   });

//   const [editingClient, setEditingClient] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isAddingClient, setIsAddingClient] = useState(false);

//   const filteredClients = clients.filter(client =>
//     client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     client.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (editingClient) {
//       setEditingClient(prev => ({ ...prev, [name]: value }));
//     } else {
//       setNewClient(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const addClient = () => {
//     if (!newClient.name) return;
    
//     const client = {
//       id: Date.now().toString(),
//       ...newClient,
//       createdAt: new Date().toISOString().split('T')[0]
//     };
    
//     const updatedClients = [...clients, client];
//     setClients(updatedClients);
//     localStorage.setItem('clients', JSON.stringify(updatedClients));
//     setNewClient({ name: '', email: '', phone: '', address: '', taxId: '' });
//     setIsAddingClient(false);
//   };

//   const updateClient = () => {
//     if (!editingClient?.name) return;
    
//     const updatedClients = clients.map(c => 
//       c.id === editingClient.id ? editingClient : c
//     );
    
//     setClients(updatedClients);
//     localStorage.setItem('clients', JSON.stringify(updatedClients));
//     setEditingClient(null);
//   };

//   const deleteClient = (id) => {
//     const updatedClients = clients.filter(c => c.id !== id);
//     setClients(updatedClients);
//     localStorage.setItem('clients', JSON.stringify(updatedClients));
//   };

//   const selectClient = (client) => {
//     setInvoice(prev => ({
//       ...prev,
//       client: {
//         id: client.id,
//         name: client.name,
//         email: client.email,
//         phone: client.phone,
//         address: client.address,
//         taxId: client.taxId
//       }
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
//           <h2 className="text-2xl font-bold text-white">Client Management</h2>
//           <p className="text-gray-400">Manage your client database</p>
//         </div>
        
//         <div className="flex space-x-3 mt-4 md:mt-0">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setIsAddingClient(true)}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             <FiUserPlus className="mr-2" />
//             Add Client
//           </motion.button>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="relative mb-6"
//       >
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <FiSearch className="text-gray-400" />
//         </div>
//         <input
//           type="text"
//           placeholder="Search clients..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </motion.div>

//       {/* Add/Edit Client Form */}
//       {(isAddingClient || editingClient) && (
//         <motion.div 
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: 'auto', opacity: 1 }}
//           exit={{ height: 0, opacity: 0 }}
//           className="mb-6 bg-gray-900 rounded-lg overflow-hidden"
//         >
//           <div className="p-4">
//             <h3 className="text-lg font-semibold text-white mb-4">
//               {editingClient ? 'Edit Client' : 'Add New Client'}
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Name*</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={editingClient ? editingClient.name : newClient.name}
//                   onChange={handleInputChange}
//                   className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Client name"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={editingClient ? editingClient.email : newClient.email}
//                   onChange={handleInputChange}
//                   className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="client@example.com"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={editingClient ? editingClient.phone : newClient.phone}
//                   onChange={handleInputChange}
//                   className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="+1234567890"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Tax ID</label>
//                 <input
//                   type="text"
//                   name="taxId"
//                   value={editingClient ? editingClient.taxId : newClient.taxId}
//                   onChange={handleInputChange}
//                   className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Tax identification number"
//                 />
//               </div>
              
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={editingClient ? editingClient.address : newClient.address}
//                   onChange={handleInputChange}
//                   className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="123 Client St, City, Country"
//                 />
//               </div>
//             </div>
            
//             <div className="mt-4 flex justify-end space-x-3">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => {
//                   setIsAddingClient(false);
//                   setEditingClient(null);
//                 }}
//                 className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
//               >
//                 Cancel
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={editingClient ? updateClient : addClient}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//               >
//                 {editingClient ? 'Update Client' : 'Add Client'}
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Clients Table */}
//       <div className="overflow-x-auto rounded-lg border border-gray-700">
//         <table className="min-w-full divide-y divide-gray-700">
//           <thead className="bg-gray-900">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Client</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tax ID</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Added</th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-gray-800 divide-y divide-gray-700">
//             {filteredClients.length > 0 ? (
//               filteredClients.map((client) => (
//                 <motion.tr 
//                   key={client.id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
//                   className="text-gray-300"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="font-medium text-white">{client.name}</div>
//                     <div className="text-sm text-gray-400">{client.address}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div>{client.email}</div>
//                     <div className="text-sm text-gray-400">{client.phone}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     {client.taxId || '-'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     {new Date(client.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-end space-x-2">
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => selectClient(client)}
//                         className="text-blue-400 hover:text-blue-300 px-2 py-1 rounded"
//                         title="Select for invoice"
//                       >
//                         Select
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => setEditingClient(client)}
//                         className="text-green-400 hover:text-green-300 px-2 py-1 rounded"
//                         title="Edit"
//                       >
//                         <FiEdit2 />
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => deleteClient(client.id)}
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
//                   {searchTerm ? 'No clients match your search' : 'No clients found. Add your first client!'}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </motion.div>
//   );
// };

// export default ClientsPanel;