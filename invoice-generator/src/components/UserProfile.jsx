import { motion } from 'framer-motion';
import { FiUpload, FiSave } from 'react-icons/fi';
import { useState } from 'react';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  });

  const [newAvatar, setNewAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    if (newAvatar) {
      setProfile(prev => ({ ...prev, avatar: newAvatar }));
    }
    setIsEditing(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">User Profile</h2>
        {isEditing ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={saveProfile}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FiSave className="mr-2" />
            Save Changes
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Edit Profile
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
          <span className="mt-4 text-sm text-gray-400">Profile Picture</span>
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-900 text-gray-300 border-0'}`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-900 text-gray-300 border-0'}`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-900 text-gray-300 border-0'}`}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;