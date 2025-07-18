import axios from 'axios';

const API_URL = 'http://localhost:5000/api/invoices';

// Enhanced auth header function with token validation
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error('No token found in localStorage');
    throw new Error('Authentication token not found. Please login again.');
  }

  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
};

// Unified error handler
const handleError = (error, context) => {
  console.error(`Error in ${context}:`, {
    message: error.message,
    response: error.response?.data,
    status: error.response?.status,
    config: error.config
  });

  // Handle specific HTTP status codes
  if (error.response?.status === 401) {
    // Token expired or invalid - redirect to login
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  throw error.response?.data || error.message;
};

// Create new invoice with enhanced validation
const createInvoice = async (invoiceData) => {
  try {
    // Validate required fields
    if (!invoiceData.client || !invoiceData.items || invoiceData.items.length === 0) {
      throw new Error('Client information and at least one item are required');
    }

    const config = getAuthHeader();
    console.log('Creating invoice with data:', invoiceData);

    const response = await axios.post(API_URL, invoiceData, config);
    console.log('Invoice created successfully:', response.data);
    return response.data;
  } catch (error) {
    return handleError(error, 'createInvoice');
  }
};

// Get all invoices with pagination support
const getInvoices = async (params = {}) => {
  try {
    const config = {
      ...getAuthHeader(),
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
        status: params.status,
        sort: params.sort
      }
    };

    const response = await axios.get(API_URL, config);
    console.log('Fetched invoices:', response.data);
    
    // Handle both array and object responses
    return Array.isArray(response.data) 
      ? { invoices: response.data, total: response.data.length }
      : response.data;
  } catch (error) {
    return handleError(error, 'getInvoices');
  }
};

// Get single invoice by ID
const getInvoiceById = async (invoiceId) => {
  try {
    if (!invoiceId) throw new Error('Invoice ID is required');

    const config = getAuthHeader();
    const response = await axios.get(`${API_URL}/${invoiceId}`, config);
    return response.data;
  } catch (error) {
    return handleError(error, 'getInvoiceById');
  }
};

const deleteInvoice = async (invoiceId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    
    const response = await axios.delete(`${API_URL}/${invoiceId}`, config);
    return response.data;
    
  } catch (error) {
    let errorMessage = 'Failed to delete invoice';
    
    if (error.response) {
      // Handle specific status codes consistently with your other endpoints
      if (error.response.status === 401) {
        errorMessage = 'Session expired - please login again';
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (error.response.status === 404) {
        errorMessage = 'Invoice not found';
      } else if (error.response.data?.message) {
        errorMessage = error.response.data.message;
      }
    } else if (error.request) {
      errorMessage = 'No response from server';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};
// Update the updateInvoice function
const updateInvoice = async (invoiceId, invoiceData) => {
  try {
    if (!invoiceId) throw new Error('Invoice ID is required');
    if (!invoiceData) throw new Error('Invoice data is required');

    const config = getAuthHeader();
    const response = await axios.put(`${API_URL}/${invoiceId}`, invoiceData, config);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Failed to update invoice';
    throw new Error(errorMessage);
  }
};

// Send invoice via email
const sendInvoice = async (invoiceId) => {
  try {
    if (!invoiceId) throw new Error('Invoice ID is required');

    const config = getAuthHeader();
    const response = await axios.post(`${API_URL}/${invoiceId}/send`, {}, config);
    return response.data;
  } catch (error) {
    return handleError(error, 'sendInvoice');
  }
};

export default {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
  sendInvoice
};