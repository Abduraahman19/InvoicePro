import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Set user from token
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        localStorage.setItem('token', token);
      } catch (err) {
        console.error('Invalid token:', err);
        logout();
      }
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
    setIsLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setToken(response.token);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Register Error:', error.response?.data); // <-- log it
      const message =
        error.response?.data?.message || error.message || 'Registration failed';
      toast.error(message);
      throw new Error(message);
    }

  };

  const register = async (name, email, password) => {
    try {
      const response = await authService.register(name, email, password);
      setToken(response.token);
      toast.success('Registration successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Register Error:', error.response?.data); // <-- log it
      const message =
        error.response?.data?.message || error.message || 'Registration failed';
      toast.error(message);
      throw new Error(message);
    }

  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const updateProfile = async (userData) => {
    try {
      const res = await authService.updateProfile(userData, token);
      if (!res.token) throw new Error('Token not received after update');

      setToken(res.token);
      toast.success('Profile updated successfully');
      return res;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Profile update failed');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
