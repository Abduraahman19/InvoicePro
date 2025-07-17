// import { motion } from 'framer-motion';
// import { FiDownload, FiFilter, FiCalendar, FiRefreshCw } from 'react-icons/fi';
// import React, { useState } from 'react';

// const ReportsPanel = () => {
//   const [activeTab, setActiveTab] = useState('revenue');
//   const [dateRange, setDateRange] = useState('last30');
//   const [isGenerating, setIsGenerating] = useState(false);

//   const reports = [
//     { 
//       id: 1, 
//       type: 'revenue',
//       name: 'Revenue Summary', 
//       period: 'June 2023', 
//       format: 'PDF',
//       size: '1.2 MB'
//     },
//     { 
//       id: 2, 
//       type: 'clients',
//       name: 'Top Clients', 
//       period: 'Q2 2023', 
//       format: 'CSV',
//       size: '0.8 MB'
//     },
//     { 
//       id: 3, 
//       type: 'products',
//       name: 'Product Sales', 
//       period: 'Year to Date', 
//       format: 'Excel',
//       size: '2.1 MB'
//     },
//     { 
//       id: 4, 
//       type: 'tax',
//       name: 'Tax Report', 
//       period: 'May 2023', 
//       format: 'PDF',
//       size: '1.5 MB'
//     }
//   ];

//   const filteredReports = reports.filter(report => 
//     activeTab === 'all' ? true : report.type === activeTab
//   );

//   const generateReport = () => {
//     setIsGenerating(true);
//     setTimeout(() => {
//       setIsGenerating(false);
//     }, 2000);
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700"
//     >
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-white mb-2">Reports & Analytics</h2>
//         <p className="text-gray-400">Generate and download business reports</p>
//       </div>

//       {/* Report Controls */}
//       <div className="flex flex-col xl:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <div className="flex space-x-1 bg-gray-900 rounded-lg p-1">
//           {['revenue', 'clients', 'products', 'tax', 'all'].map((tab) => (
//             <motion.button
//               key={tab}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-2 text-sm rounded-md capitalize ${
//                 activeTab === tab 
//                   ? 'bg-blue-600 text-white' 
//                   : 'text-gray-300 hover:bg-gray-800'
//               }`}
//             >
//               {tab === 'all' ? 'All Reports' : tab}
//             </motion.button>
//           ))}
//         </div>
        
//         <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiCalendar className="text-gray-400" />
//             </div>
//             <select
//               value={dateRange}
//               onChange={(e) => setDateRange(e.target.value)}
//               className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//             >
//               <option value="last7">Last 7 Days</option>
//               <option value="last30">Last 30 Days</option>
//               <option value="last90">Last 90 Days</option>
//               <option value="custom">Custom Range</option>
//             </select>
//           </div>
          
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={generateReport}
//             disabled={isGenerating}
//             className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-700"
//           >
//             {isGenerating ? (
//               <>
//                 <FiRefreshCw className="animate-spin mr-2" />
//                 Generating...
//               </>
//             ) : (
//               <>
//                 <FiFilter className="mr-2" />
//                 Generate Report
//               </>
//             )}
//           </motion.button>
//         </div>
//       </div>

//       {/* Reports List */}
//       <div className="space-y-4">
//         {filteredReports.length > 0 ? (
//           filteredReports.map((report) => (
//             <motion.div
//               key={report.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               whileHover={{ scale: 1.01 }}
//               className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-900 rounded-lg border border-gray-700"
//             >
//               <div className="mb-3 sm:mb-0">
//                 <h3 className="font-medium text-white">{report.name}</h3>
//                 <div className="flex items-center text-sm text-gray-400 mt-1">
//                   <span>{report.period}</span>
//                   <span className="mx-2">•</span>
//                   <span className="capitalize">{report.type}</span>
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-4">
//                 <div className="text-sm text-gray-400">
//                   {report.format} • {report.size}
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   className="flex items-center px-3 py-1 bg-gray-800 text-blue-400 rounded-lg hover:bg-gray-700"
//                 >
//                   <FiDownload className="mr-2" />
//                   Download
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <div className="p-8 text-center text-gray-400 bg-gray-900 rounded-lg border border-gray-700">
//             No reports available for the selected filters
//           </div>
//         )}
//       </div>

//       {/* Report Preview Placeholder */}
//       {isGenerating && (
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="mt-8 bg-gray-900 rounded-lg border border-gray-700 p-6"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold text-white">Report Preview</h3>
//             <div className="flex space-x-2">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
//               >
//                 Export as PDF
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
//               >
//                 Export as CSV
//               </motion.button>
//             </div>
//           </div>
          
//           <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
//             <div className="text-center">
//               <div className="inline-block mb-4">
//                 <FiRefreshCw className="animate-spin text-3xl text-blue-500" />
//               </div>
//               <p className="text-gray-400">Generating report preview...</p>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default ReportsPanel;