// import { motion } from 'framer-motion';
// import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiCheck, FiX } from 'react-icons/fi';
// import React, { useState } from 'react';

// const ProductsPanel = ({ invoice, setInvoice }) => {
//   const [products, setProducts] = useState(() => {
//     const savedProducts = localStorage.getItem('products');
//     return savedProducts ? JSON.parse(savedProducts) : [
//       {
//         id: '1',
//         name: 'Web Design',
//         description: 'Professional website design',
//         price: 500,
//         tax: true,
//         createdAt: '2023-01-10'
//       },
//       {
//         id: '2',
//         name: 'SEO Service',
//         description: 'Search engine optimization',
//         price: 300,
//         tax: false,
//         createdAt: '2023-01-15'
//       }
//     ];
//   });

//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     description: '',
//     price: 0,
//     tax: false
//   });

//   const [editingProduct, setEditingProduct] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isAddingProduct, setIsAddingProduct] = useState(false);

//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (editingProduct) {
//       setEditingProduct(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     } else {
//       setNewProduct(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//   };

//   const addProduct = () => {
//     if (!newProduct.name) return;
    
//     const product = {
//       id: Date.now().toString(),
//       ...newProduct,
//       price: parseFloat(newProduct.price) || 0,
//       createdAt: new Date().toISOString().split('T')[0]
//     };
    
//     const updatedProducts = [...products, product];
//     setProducts(updatedProducts);
//     localStorage.setItem('products', JSON.stringify(updatedProducts));
//     setNewProduct({ name: '', description: '', price: 0, tax: false });
//     setIsAddingProduct(false);
//   };

//   const updateProduct = () => {
//     if (!editingProduct?.name) return;
    
//     const updatedProduct = {
//       ...editingProduct,
//       price: parseFloat(editingProduct.price) || 0
//     };
    
//     const updatedProducts = products.map(p => 
//       p.id === updatedProduct.id ? updatedProduct : p
//     );
    
//     setProducts(updatedProducts);
//     localStorage.setItem('products', JSON.stringify(updatedProducts));
//     setEditingProduct(null);
//   };

//   const deleteProduct = (id) => {
//     const updatedProducts = products.filter(p => p.id !== id);
//     setProducts(updatedProducts);
//     localStorage.setItem('products', JSON.stringify(updatedProducts));
//   };

//   const addToInvoice = (product) => {
//     setInvoice(prev => ({
//       ...prev,
//       items: [
//         ...prev.items,
//         {
//           id: Date.now(),
//           name: product.name,
//           description: product.description,
//           quantity: 1,
//           price: product.price,
//           total: product.price,
//           tax: product.tax
//         }
//       ]
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
//           <h2 className="text-2xl font-bold text-white">Product Catalog</h2>
//           <p className="text-gray-400">Manage your products and services</p>
//         </div>
        
//         <div className="flex space-x-3 mt-4 md:mt-0">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setIsAddingProduct(true)}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             <FiPlus className="mr-2" />
//             Add Product
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
//           placeholder="Search products..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </motion.div>

//       {/* Add/Edit Product Form */}
//       {(isAddingProduct || editingProduct) && (
//         <motion.div 
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: 'auto', opacity: 1 }}
//           exit={{ height: 0, opacity: 0 }}
//           className="mb-6 bg-gray-900 rounded-lg overflow-hidden"
//         >
//           <div className="p-4">
//             <h3 className="text-lg font-semibold text-white mb-4">
//               {editingProduct ? 'Edit Product' : 'Add New Product'}
//             </h3>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Name*</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={editingProduct ? editingProduct.name : newProduct.name}
//                   onChange={handleInputChange}
//                   className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Product/service name"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
//                 <textarea
//                   name="description"
//                   value={editingProduct ? editingProduct.description : newProduct.description}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Detailed description of the product/service"
//                 />
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">Price*</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={editingProduct ? editingProduct.price : newProduct.price}
//                     onChange={handleInputChange}
//                     min="0"
//                     step="0.01"
//                     className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="0.00"
//                   />
//                 </div>
                
//                 <div className="flex items-center justify-end md:justify-start">
//                   <label className="flex items-center space-x-3 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="tax"
//                       checked={editingProduct ? editingProduct.tax : newProduct.tax}
//                       onChange={handleInputChange}
//                       className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
//                     />
//                     <span className="text-gray-300">Taxable</span>
//                   </label>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-6 flex justify-end space-x-3">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => {
//                   setIsAddingProduct(false);
//                   setEditingProduct(null);
//                 }}
//                 className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
//               >
//                 <FiX className="mr-2" />
//                 Cancel
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={editingProduct ? updateProduct : addProduct}
//                 className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//               >
//                 <FiCheck className="mr-2" />
//                 {editingProduct ? 'Update Product' : 'Add Product'}
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Products Table */}
//       <div className="overflow-x-auto rounded-lg border border-gray-700">
//         <table className="min-w-full divide-y divide-gray-700">
//           <thead className="bg-gray-900">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Product</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tax</th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-gray-800 divide-y divide-gray-700">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product) => (
//                 <motion.tr 
//                   key={product.id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
//                   className="text-gray-300"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
//                     {product.name}
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm max-w-xs truncate">{product.description}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     ${product.price.toFixed(2)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       product.tax ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'
//                     }`}>
//                       {product.tax ? 'Taxable' : 'Non-taxable'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-end space-x-2">
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => addToInvoice(product)}
//                         className="text-blue-400 hover:text-blue-300 px-2 py-1 rounded"
//                         title="Add to invoice"
//                       >
//                         Add to Invoice
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => setEditingProduct(product)}
//                         className="text-green-400 hover:text-green-300 px-2 py-1 rounded"
//                         title="Edit"
//                       >
//                         <FiEdit2 />
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => deleteProduct(product.id)}
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
//                   {searchTerm ? 'No products match your search' : 'No products found. Add your first product!'}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductsPanel;