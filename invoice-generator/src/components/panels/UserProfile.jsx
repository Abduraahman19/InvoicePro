// src/components/panels/UserProfile.jsx
import { motion } from 'framer-motion';
import { FiUpload, FiSave, FiEdit, FiUser, FiMail, FiPhone, FiBriefcase, FiGlobe } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const UserProfile = () => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  });
  const [newAvatar, setNewAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.data.success) {
          const userData = response.data.data;
          setProfile({
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.company?.phone || '',
            company: userData.company?.name || '',
            website: userData.company?.website || '',
            avatar: userData.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error(t('profile.fetchError'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error(t('profile.avatarSizeError'));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = async () => {
    try {
      setIsLoading(true);
      
      // Prepare updated data
      const updatedData = {
        name: profile.name,
        email: profile.email,
        company: {
          name: profile.company,
          phone: profile.phone,
          website: profile.website
        },
        darkMode: localStorage.getItem('darkMode') === 'true'
      };

      // If new avatar was uploaded, add it to FormData
      let formData;
      if (newAvatar) {
        formData = new FormData();
        formData.append('avatar', newAvatar);
        for (const key in updatedData) {
          formData.append(key, JSON.stringify(updatedData[key]));
        }
      }

      const response = await axios.put(
        'http://localhost:5000/api/auth/updatedetails',
        newAvatar ? formData : updatedData,
        {
          headers: {
            'Content-Type': newAvatar ? 'multipart/form-data' : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        toast.success(t('profile.updateSuccess'));
        setIsEditing(false);
        // Update avatar in state if new one was uploaded
        if (newAvatar) {
          setProfile(prev => ({ ...prev, avatar: URL.createObjectURL(newAvatar) }));
          setNewAvatar(null);
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.error || t('profile.updateError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{t('profile.title')}</h2>
        {isEditing ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={saveProfile}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            ) : (
              <FiSave className="mr-2" />
            )}
            {t('profile.saveButton')}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            <FiEdit className="mr-2 inline" />
            {t('profile.editButton')}
          </motion.button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <img
              src={newAvatar || profile.avatar}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-700"
            />
            {isEditing && (
              <motion.label 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-0 right-0 bg-gray-800/90 hover:bg-gray-700/90 backdrop-blur-sm text-white p-3 rounded-full cursor-pointer shadow-lg"
              >
                <FiUpload size={18} />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleAvatarChange}
                  accept="image/*"
                />
              </motion.label>
            )}
          </div>
          <span className="mt-4 text-sm text-gray-400">{t('profile.avatarLabel')}</span>
          
          {isEditing && (
            <p className="mt-2 text-xs text-gray-500 text-center">
              {t('profile.avatarHint')}
            </p>
          )}
        </div>

        {/* Form Section */}
        <div className="flex-1 space-y-6">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <FiUser className="mr-2" />
                {t('profile.nameLabel')}
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500' : 'bg-gray-900 text-gray-300 border-0'}`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <FiMail className="mr-2" />
                {t('profile.emailLabel')}
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500' : 'bg-gray-900 text-gray-300 border-0'}`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <FiPhone className="mr-2" />
                {t('profile.phoneLabel')}
              </label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500' : 'bg-gray-900 text-gray-300 border-0'}`}
                placeholder={t('profile.phonePlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <FiBriefcase className="mr-2" />
                {t('profile.companyLabel')}
              </label>
              <input
                type="text"
                name="company"
                value={profile.company}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500' : 'bg-gray-900 text-gray-300 border-0'}`}
                placeholder={t('profile.companyPlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <FiGlobe className="mr-2" />
                {t('profile.websiteLabel')}
              </label>
              <input
                type="url"
                name="website"
                value={profile.website}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500' : 'bg-gray-900 text-gray-300 border-0'}`}
                placeholder={t('profile.websitePlaceholder')}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;