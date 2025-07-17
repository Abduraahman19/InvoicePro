// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FiUser, FiLock, FiMail, FiEye, FiEyeOff, FiArrowRight, FiBriefcase, FiMoon, FiSun } from 'react-icons/fi';
// import { useNavigate, Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { FcGoogle } from 'react-icons/fc';
// import { useGoogleLogin } from '@react-oauth/google';
// import { useNotification } from '../../contexts/NotificationContext';

// const AuthPage = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const notify = useNotification();
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const validationSchema = Yup.object().shape({
//     name: !isLogin ? Yup.string().required(t('auth.nameRequired')) : Yup.string(),
//     email: Yup.string()
//       .email(t('auth.invalidEmail'))
//       .required(t('auth.emailRequired')),
//     password: Yup.string()
//       .min(6, t('auth.passwordLength'))
//       .required(t('auth.passwordRequired')),
//     company: Yup.string()
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       email: '',
//       password: '',
//       company: '',
//       darkMode: false
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       if (isLogin) {
//         await handleLogin(values);
//       } else {
//         await handleRegister(values);
//       }
//     }
//   });

//   useEffect(() => {
//     const savedDarkMode = localStorage.getItem('darkMode') === 'true';
//     setDarkMode(savedDarkMode);
//     document.documentElement.classList.toggle('dark', savedDarkMode);
//   }, []);

//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     formik.setFieldValue('darkMode', newMode);
//     localStorage.setItem('darkMode', newMode);
//     document.documentElement.classList.toggle('dark', newMode);
//   };

//   const toggleAuthMode = () => {
//     setIsAnimating(true);
//     setTimeout(() => {
//       setIsLogin(!isLogin);
//       formik.setErrors({});
//       setIsAnimating(false);
//     }, 500);
//   };

//   const handleGoogleLogin = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         setIsLoading(true);
        
//         const userInfo = await axios.get(
//           'https://www.googleapis.com/oauth2/v3/userinfo',
//           { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
//         );

//         const response = await axios.post('http://localhost:5000/api/auth/google', {
//           token: tokenResponse.access_token,
//           email: userInfo.data.email,
//           name: userInfo.data.name,
//         });

//         const { token, data } = response.data;
//         localStorage.setItem('token', token);

//         setDarkMode(data.darkMode || false);
//         localStorage.setItem('darkMode', data.darkMode || false);
//         document.documentElement.classList.toggle('dark', data.darkMode || false);

//         notify(t('User Login Successfully'), 'success');
//         navigate('/');
//       } catch (error) {
//         console.error('Google login error:', error);
//         notify(t('Google Login Failed'), 'error');
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     onError: (error) => {
//       console.error('Google login error:', error);
//       notify(t('Google Login Failed'), 'error');
//     },
//   });

//   const handleLogin = async (values) => {
//     try {
//       setIsLoading(true);
//       const response = await axios.post('http://localhost:5000/api/auth/login', {
//         email: values.email,
//         password: values.password
//       });

//       const { token, data } = response.data;
//       localStorage.setItem('token', token);

//       setDarkMode(data.darkMode || false);
//       localStorage.setItem('darkMode', data.darkMode || false);
//       document.documentElement.classList.toggle('dark', data.darkMode || false);

//       notify(t('User Login Successfully'), 'success');
//       navigate('/');
//     } catch (error) {
//       console.error('Login error:', error);
//       let errorMessage = t('Login Failed');

//       if (error.response) {
//         if (error.response.status === 401) {
//           errorMessage = t('Invalid Credentials');
//         }
//         if (error.response.data?.error) {
//           errorMessage = error.response.data.error;
//         }
//       }

//       notify(errorMessage, 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRegister = async (values) => {
//     try {
//       setIsLoading(true);
//       const response = await axios.post('http://localhost:5000/api/auth/register', {
//         name: values.name,
//         email: values.email,
//         password: values.password,
//         company: values.company,
//         darkMode: darkMode
//       });

//       if (response.data.success) {
//         const { token, data } = response.data;
//         localStorage.setItem('token', token);

//         setDarkMode(data.darkMode || false);
//         localStorage.setItem('darkMode', data.darkMode || false);
//         document.documentElement.classList.toggle('dark', data.darkMode || false);

//         notify(t('User Registered Successfully'), 'success');
//         navigate('/');
//       } else {
//         throw new Error(response.data.error || t('Register Failed'));
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       let errorMsg = t('Register Failed');

//       if (error.response) {
//         if (error.response.status === 400 && error.response.data.error.includes('duplicate')) {
//           errorMsg = t('auth.emailExists');
//         } else if (error.response.data?.error) {
//           errorMsg = error.response.data.error;
//         }
//       }

//       notify(errorMsg, 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         when: "beforeChildren",
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { opacity: 1, y: 0 }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-800 transition-colors duration-300 relative"
//       >
//         {/* Dark mode toggle */}
//         <button
//           onClick={toggleDarkMode}
//           className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//           aria-label={darkMode ? t('auth.switchToLight') : t('auth.switchToDark')}
//         >
//           {darkMode ? (
//             <FiSun className="text-yellow-400 text-xl" />
//           ) : (
//             <FiMoon className="text-gray-600 dark:text-gray-300 text-xl" />
//           )}
//         </button>

//         <div className="flex justify-center mb-8">
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//             className="p-4 rounded-full bg-blue-100 dark:bg-blue-900"
//           >
//             <FiUser className="text-3xl text-blue-600 dark:text-blue-300" />
//           </motion.div>
//         </div>

//         <motion.h2
//           variants={itemVariants}
//           className="text-2xl font-bold text-center mb-6 dark:text-white"
//         >
//           {isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}
//         </motion.h2>

//         <form onSubmit={formik.handleSubmit}>
//           {!isLogin && (
//             <motion.div variants={itemVariants} className="mb-4">
//               <label className={`block text-sm font-medium mb-1 dark:text-gray-300`}>
//                 {t('auth.fullName')}
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="name"
//                   value={formik.values.name}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className={`w-full p-3 pl-10 rounded-lg border ${formik.touched.name && formik.errors.name
//                     ? 'border-red-500'
//                     : 'border-gray-300 dark:border-gray-600'
//                     } dark:bg-gray-700 dark:text-white transition-colors`}
//                   placeholder={t('auth.namePlaceholder')}
//                 />
//                 <FiUser className={`absolute left-3 top-3.5 dark:text-gray-400`} />
//               </div>
//               {formik.touched.name && formik.errors.name && (
//                 <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
//               )}
//             </motion.div>
//           )}

//           <motion.div variants={itemVariants} className="mb-4">
//             <label className={`block text-sm font-medium mb-1 dark:text-gray-300`}>
//               {t('auth.email')}
//             </label>
//             <div className="relative">
//               <input
//                 type="email"
//                 name="email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className={`w-full p-3 pl-10 rounded-lg border ${formik.touched.email && formik.errors.email
//                   ? 'border-red-500'
//                   : 'border-gray-300 dark:border-gray-600'
//                   } dark:bg-gray-700 dark:text-white transition-colors`}
//                 placeholder={t('auth.emailPlaceholder')}
//               />
//               <FiMail className={`absolute left-3 top-3.5 dark:text-gray-400`} />
//             </div>
//             {formik.touched.email && formik.errors.email && (
//               <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
//             )}
//           </motion.div>

//           {!isLogin && (
//             <motion.div variants={itemVariants} className="mb-4">
//               <label className={`block text-sm font-medium mb-1 dark:text-gray-300`}>
//                 {t('Company')} ({t('Optional')})
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="company"
//                   value={formik.values.company}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className={`w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-colors`}
//                   placeholder={t('Company Name')}
//                 />
//                 <FiBriefcase className={`absolute left-3 top-3.5 dark:text-gray-400`} />
//               </div>
//             </motion.div>
//           )}

//           <motion.div variants={itemVariants} className="mb-6">
//             <label className={`block text-sm font-medium mb-1 dark:text-gray-300`}>
//               {t('auth.password')}
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className={`w-full p-3 pl-10 pr-10 rounded-lg border ${formik.touched.password && formik.errors.password
//                   ? 'border-red-500'
//                   : 'border-gray-300 dark:border-gray-600'
//                   } dark:bg-gray-700 dark:text-white transition-colors`}
//                 placeholder="••••••••"
//               />
//               <FiLock className={`absolute left-3 top-3.5 dark:text-gray-400`} />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className={`absolute right-3 top-3.5 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`}
//                 aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
//               >
//                 {showPassword ? <FiEyeOff /> : <FiEye />}
//               </button>
//             </div>
//             {formik.touched.password && formik.errors.password && (
//               <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
//             )}
//             {isLogin && (
//               <div className="mt-2 text-right">
//                 <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
//                   {t('Forgot Password')}
//                 </Link>
//               </div>
//             )}
//           </motion.div>

//           <motion.button
//             variants={itemVariants}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             disabled={isLoading || !formik.isValid}
//             className={`w-full py-3 px-4 rounded-lg flex items-center justify-center ${!formik.isValid ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//               } text-white font-medium transition-colors disabled:opacity-70`}
//           >
//             {isLoading ? (
//               <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//             ) : (
//               <>
//                 {isLogin ? t('auth.login') : t('auth.register')}
//                 <FiArrowRight className="ml-2" />
//               </>
//             )}
//           </motion.button>
//           <motion.button
//             variants={itemVariants}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="button"
//             onClick={handleGoogleLogin}
//             disabled={isLoading}
//             className="w-full py-3 px-4 mt-3 rounded-lg flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium transition-colors disabled:opacity-70"
//           >
//             <FcGoogle className="text-xl mr-2" />
//             {isLogin ? t('auth.loginWithGoogle') : t('auth.registerWithGoogle')}
//           </motion.button>
//         </form>

//         <motion.div
//           variants={itemVariants}
//           className={`mt-6 text-center dark:text-gray-400`}
//         >
//           {isLogin ? t('auth.noAccount') : t('auth.haveAccount')}{' '}
//           <button
//             type="button"
//             onClick={toggleAuthMode}
//             disabled={isAnimating || isLoading}
//             className={`font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none disabled:opacity-50`}
//           >
//             {isLogin ? t('auth.registerHere') : t('auth.loginHere')}
//           </button>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default AuthPage;