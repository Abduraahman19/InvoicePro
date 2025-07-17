// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';
// import { useNotification } from '../../contexts/NotificationContext';

// const ForgotPasswordPage = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const notify = useNotification();
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       notify('Please enter your email address', 'error');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/forgotpassword', { 
//         email 
//       }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.data.success) {
//         notify(response.data.message, 'success');
//         navigate('/otp', { state: { email } });
//       } else {
//         throw new Error(response.data.error || 'Failed to send OTP');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       notify(error.response?.data?.error || 'Something went wrong. Please try again.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center dark:text-white">
//           {t('forgotPassword.title')}
//         </h2>
        
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               {t('forgotPassword.emailLabel')}
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//               placeholder={t('forgotPassword.emailPlaceholder')}
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//             >
//               {loading ? (
//                 <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//               ) : (
//                 t('forgotPassword.sendOtpButton')
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordPage;