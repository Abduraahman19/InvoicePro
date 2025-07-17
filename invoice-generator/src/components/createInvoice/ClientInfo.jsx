// const ClientInfo = ({ client = {}, handleChange }) => {
//     // Provide default empty values for all client properties
//     const safeClient = {
//         name: '',
//         address: '',
//         email: '',
//         phone: '',
//         ...client
//     };

//     return (
//         <div>
//             <h3 className="text-lg font-medium mb-4 dark:text-white">Client Information</h3>
//             <div className="space-y-4">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                         Client Name
//                     </label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={safeClient.name}
//                         onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
//                         placeholder="John Doe"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                         Address
//                     </label>
//                     <input
//                         type="text"
//                         name="address"
//                         value={safeClient.address}
//                         onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
//                         placeholder="123 Client St, City"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                         Email
//                     </label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={safeClient.email}
//                         onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
//                         placeholder="client@example.com"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                         Phone
//                     </label>
//                     <input
//                         type="tel"
//                         name="phone"
//                         value={safeClient.phone}
//                         onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
//                         placeholder="+1234567890"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ClientInfo;