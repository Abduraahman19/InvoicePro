// import { motion } from 'framer-motion';
// import {
//   FiUpload, FiSave, FiEdit, FiUser, FiMail, FiPhone,
//   FiBriefcase, FiGlobe, FiLock, FiEye, FiEyeOff
// } from 'react-icons/fi';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import { useNotification } from '../../contexts/NotificationContext';

// const UserProfile = () => {
//   const { t } = useTranslation();
//   const notify = useNotification();
//   const [profile, setProfile] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     company: '',
//     website: '',
//     avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
//   });
//   const [newAvatar, setNewAvatar] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('profile');
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   // Fetch user profile data
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/auth/me', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });

//         if (response.data.success) {
//           const userData = response.data.data;
//           setProfile({
//             name: userData.name || '',
//             email: userData.email || '',
//             phone: userData.company?.phone || '',
//             company: userData.company?.name || '',
//             website: userData.company?.website || '',
//             avatar: userData.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'
//           });
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//         notify(t('profile.fetchError'), 'error');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [t, notify]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 2 * 1024 * 1024) { // 2MB limit
//         notify(t('profile.avatarSizeError'), 'error');
//         return;
//       }

//       // Set the file object directly (no need for FileReader)
//       setNewAvatar(file);

//       // Create a preview URL for the image
//       const previewUrl = URL.createObjectURL(file);
//       setProfile(prev => ({ ...prev, avatar: previewUrl }));
//     }
//   };

//   const saveProfile = async () => {
//     try {
//       setIsLoading(true);

//       // Prepare updated data
//       const updatedData = {
//         name: profile.name,
//         email: profile.email,
//         company: {
//           name: profile.company,
//           phone: profile.phone,
//           website: profile.website
//         },
//         darkMode: localStorage.getItem('darkMode') === 'true'
//       };

//       // Create FormData for file upload
//       const formData = new FormData();

//       // Append all profile data as JSON string
//       formData.append('data', JSON.stringify(updatedData));

//       // If new avatar was selected, append it directly (no need to convert to blob)
//       if (newAvatar) {
//         formData.append('avatar', newAvatar);
//       }

//       const response = await axios.put(
//         'http://localhost:5000/api/auth/updatedetails',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         }
//       );

//       if (response.data.success) {
//         notify(t('Profile Updated Successfully'), 'success');
//         setIsEditing(false);
//         // Update avatar in state if new one was uploaded
//         if (newAvatar) {
//           setProfile(prev => ({
//             ...prev,
//             avatar: URL.createObjectURL(newAvatar)
//           }));
//           setNewAvatar(null);
//         }
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       // More detailed error logging
//       if (error.response) {
//         console.error('Response data:', error.response.data);
//         console.error('Response status:', error.response.status);
//         console.error('Response headers:', error.response.headers);
//       }
//       notify(error.response?.data?.error || t('profile.updateError'), 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const changePassword = async () => {
//     try {
//       if (passwordData.newPassword !== passwordData.confirmPassword) {
//         notify(t('Passwords Not Match'), 'error');
//         return;
//       }

//       if (passwordData.newPassword.length < 6) {
//         notify(t('The password must be at least 6 characters long'), 'error');
//         return;
//       }

//       setIsLoading(true);

//       const response = await axios.put(
//         'http://localhost:5000/api/auth/updatepassword',
//         {
//           currentPassword: passwordData.currentPassword,
//           newPassword: passwordData.newPassword
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         }
//       );

//       if (response.data.success) {
//         notify(t('Password Changed Successfully'), 'success');
//         setPasswordData({
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: ''
//         });
//       }
//     } catch (error) {
//       console.error('Error changing password:', error);
//       notify(error.response?.data?.error || t('profile.passwordChangeError'), 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700"
//     >
//       <div className="flex flex-col xl:flex-row gap-8">
//         {/* Left Side - Navigation */}
//         <div className="w-full xl:w-1/4 space-y-4">
//           <div className="bg-gray-700 rounded-lg p-4">
//             <div className="flex flex-col items-center mb-6">
//               <div className="relative group mb-4">
//                 <img
//                   src={profile.avatar}
//                   alt="Profile"
//                   className="w-32 h-32 rounded-full object-cover border-4 border-gray-600"
//                 />
//                 {isEditing && activeTab === 'profile' && (
//                   <motion.label
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="absolute bottom-0 right-0 bg-gray-800/90 hover:bg-gray-700/90 backdrop-blur-sm text-white p-3 rounded-full cursor-pointer shadow-lg"
//                   >
//                     <FiUpload size={18} />
//                     <input
//                       type="file"
//                       className="hidden"
//                       onChange={handleAvatarChange}
//                       accept="image/*"
//                     />
//                   </motion.label>
//                 )}
//               </div>
//               <h3 className="text-xl font-bold text-white">{profile.name}</h3>
//               <p className="text-gray-400">{profile.email}</p>
//             </div>

//             <nav className="space-y-2">
//               <button
//                 onClick={() => setActiveTab('profile')}
//                 className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
//               >
//                 <FiUser className="inline mr-2" />
//                 {t('Profile Settings')}
//               </button>
//               <button
//                 onClick={() => setActiveTab('password')}
//                 className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'password' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
//               >
//                 <FiLock className="inline mr-2" />
//                 {t('Change Password')}
//               </button>
//             </nav>
//           </div>
//         </div>

//         {/* Right Side - Content */}
//         <div className="w-full xl:w-3/4">
//           {/* Profile Settings Tab */}
//           {activeTab === 'profile' && (
//             <div className="bg-gray-700 rounded-lg p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold text-white">
//                   {t('Profile Settings')}
//                 </h2>
//                 {isEditing ? (
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={saveProfile}
//                     disabled={isLoading}
//                     className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//                   >
//                     {isLoading ? (
//                       <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
//                     ) : (
//                       <FiSave className="mr-2" />
//                     )}
//                     {t('profile.saveButton')}
//                   </motion.button>
//                 ) : (
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setIsEditing(true)}
//                     className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
//                   >
//                     <FiEdit className="mr-2 inline" />
//                     {t('profile.editButton')}
//                   </motion.button>
//                 )}
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label className="text-sm font-medium text-gray-300 mb-2 flex items-center">
//                     <FiUser className="mr-2" />
//                     {t('profile.nameLabel')}
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={profile.name}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className={`w-full p-3 rounded-lg ${isEditing ? 'bg-gray-600 text-white border border-gray-500 focus:ring-2 focus:ring-blue-500' : 'bg-gray-800 text-gray-300 border-0'}`}
//                     placeholder={t('Enter your full name')}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-300 mb-2 flex items-center">
//                     <FiMail className="mr-2" />
//                     {t('profile.emailLabel')}
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={profile.email}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className={`w-full p-3 rounded-lg ${isEditing ? 'bg-gray-600 text-white border border-gray-500 focus:ring-2 focus:ring-blue-500' : 'bg-gray-800 text-gray-300 border-0'}`}
//                     placeholder={t('Enter your email address')}
//                   />
//                 </div>

//                 <div>
//                   <label className=" text-sm font-medium text-gray-300 mb-2 flex items-center">
//                     <FiPhone className="mr-2" />
//                     {t('profile.phoneLabel')}
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={profile.phone}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className={`w-full p-3 rounded-lg ${isEditing ? 'bg-gray-600 text-white border border-gray-500 focus:ring-2 focus:ring-blue-500' : 'bg-gray-800 text-gray-300 border-0'}`}
//                     placeholder={t('profile.phonePlaceholder')}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-300 mb-2 flex items-center">
//                     <FiBriefcase className="mr-2" />
//                     {t('profile.companyLabel')}
//                   </label>
//                   <input
//                     type="text"
//                     name="company"
//                     value={profile.company}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className={`w-full p-3 rounded-lg ${isEditing ? 'bg-gray-600 text-white border border-gray-500 focus:ring-2 focus:ring-blue-500' : 'bg-gray-800 text-gray-300 border-0'}`}
//                     placeholder={t('profile.companyPlaceholder')}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-300 mb-2 flex items-center">
//                     <FiGlobe className="mr-2" />
//                     {t('profile.websiteLabel')}
//                   </label>
//                   <input
//                     type="url"
//                     name="website"
//                     value={profile.website}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className={`w-full p-3 rounded-lg ${isEditing ? 'bg-gray-600 text-white border border-gray-500 focus:ring-2 focus:ring-blue-500' : 'bg-gray-800 text-gray-300 border-0'}`}
//                     placeholder={t('profile.websitePlaceholder')}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Change Password Tab */}
//           {activeTab === 'password' && (
//             <div className="bg-gray-700 rounded-lg p-6">
//               <h2 className="text-xl font-bold text-white mb-6">
//                 {t('Change Password')}
//               </h2>

//               <div className="space-y-6">
//                 <div>
//                   <label className="text-sm font-medium text-gray-300 mb-2 flex items-center">
//                     <FiLock className="mr-2" />
//                     {t('Current Password')}
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showCurrentPassword ? "text" : "password"}
//                       name="currentPassword"
//                       value={passwordData.currentPassword}
//                       onChange={handlePasswordChange}
//                       className="w-full p-3 pl-10 rounded-lg bg-gray-600 text-white border border-gray-500 focus:ring-2 focus:ring-blue-500"
//                       placeholder={t('Type Current Password')}
//                     />
//                     <FiLock className="absolute left-3 top-3.5 text-gray-400" />
//                     <button
//                       type="button"
//                       onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                       className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300"
//                     >
//                       {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-300 mb-2 flex items-center">
//                     <FiLock className="mr-2" />
//                     {t('New Password')}
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showNewPassword ? "text" : "password"}
//                       name="newPassword"
//                       value={passwordData.newPassword}
//                       onChange={handlePasswordChange}
//                       className="w-full p-3 pl-10 rounded-lg bg-gray-600 text-white border border-gray-500 focus:ring-2 focus:ring-blue-500"
//                       placeholder={t('Type New Password')}
//                     />
//                     <FiLock className="absolute left-3 top-3.5 text-gray-400" />
//                     <button
//                       type="button"
//                       onClick={() => setShowNewPassword(!showNewPassword)}
//                       className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300"
//                     >
//                       {showNewPassword ? <FiEyeOff /> : <FiEye />}
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-300 mb-2 flex items-center">
//                     <FiLock className="mr-2" />
//                     {t('Confirm Password')}
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       name="confirmPassword"
//                       value={passwordData.confirmPassword}
//                       onChange={handlePasswordChange}
//                       className="w-full p-3 pl-10 rounded-lg bg-gray-600 text-white border border-gray-500 focus:ring-2 focus:ring-blue-500"
//                       placeholder={t('Type Confirm Password')}
//                     />
//                     <FiLock className="absolute left-3 top-3.5 text-gray-400" />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300"
//                     >
//                       {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Link
//                       to="/forgot-password"
//                       className="text-sky-500 hover:text-sky-400 transition disabled:opacity-50"
//                     >
//                       {t('Forgot Password')}
//                     </Link>
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={changePassword}
//                     disabled={isLoading}
//                     className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//                   >
//                     {isLoading ? (
//                       <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                     ) : (
//                       t('Change Password')
//                     )}
//                   </motion.button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default UserProfile;