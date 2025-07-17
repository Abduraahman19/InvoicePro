import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import invoiceService from '../services/invoiceService';
import { toast } from 'react-toastify';
import InputField from './InputField';

const InvoiceForm = ({ invoiceToEdit }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState([]); // ✅ This line fixes the error
  const [formData, setFormData] = useState({
    client: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [
      {
        description: '',
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ],
    taxRate: 0,
    discount: 0,
    notes: '',
    status: 'unpaid',
    currency: 'USD',
  });

  useEffect(() => {
    if (invoiceToEdit) {
      setFormData({
        ...invoiceToEdit,
        date: new Date(invoiceToEdit.date).toISOString().split('T')[0],
        dueDate: new Date(invoiceToEdit.dueDate).toISOString().split('T')[0],
      });
    }
  }, [invoiceToEdit]);

  useEffect(() => {
    // In a real app, you would fetch clients from an API
    setClients([
      { id: 1, name: 'Client One', email: 'client1@example.com' },
      { id: 2, name: 'Client Two', email: 'client2@example.com' },
    ]);
  }, []);

  const handleClientChange = (e) => {
    const selectedClient = clients.find(c => c.name === e.target.value);
    setFormData({
      ...formData,
      client: {
        name: selectedClient?.name || '',
        email: selectedClient?.email || '',
        phone: selectedClient?.phone || '',
        address: selectedClient?.address || '',
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const numericFields = ['taxRate', 'discount'];
    const parsedValue = numericFields.includes(name) ? parseFloat(value) || 0 : value;

    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleClientFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      client: {
        ...formData.client,
        [name]: value,
      },
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [name]: name === 'quantity' || name === 'rate' ? parseFloat(value) || 0 : value,
    };

    // Calculate amount if quantity or rate changes
    if (name === 'quantity' || name === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }

    setFormData({
      ...formData,
      items: newItems,
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          description: '',
          quantity: 1,
          rate: 0,
          amount: 0,
        },
      ],
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: newItems,
    });
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = subtotal * (formData.taxRate / 100);
    const total = subtotal + taxAmount - formData.discount;

    return { subtotal, taxAmount, total };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login again');
        navigate('/login');
        return;
      }

      setIsLoading(true);

      // Calculate totals
      const subtotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
      const taxAmount = subtotal * (formData.taxRate / 100);
      const total = subtotal + taxAmount - formData.discount;

      // Prepare the invoice data for API
      const invoiceData = {
        client: {
          name: formData.client.name,
          email: formData.client.email,
          phone: formData.client.phone || '',
          address: formData.client.address || ''
        },
        date: formData.date,
        dueDate: formData.dueDate,
        items: formData.items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          rate: item.rate
        })),
        taxRate: formData.taxRate,
        discount: formData.discount,
        notes: formData.notes || '',
        status: formData.status || 'unpaid', // Ensure status is included
        currency: formData.currency,
        subtotal,
        taxAmount,
        total
      };

      console.log('Sending invoice data:', invoiceData); // Debug log

      if (invoiceToEdit) {
        await invoiceService.updateInvoice(invoiceToEdit._id, invoiceData);
      } else {
        await invoiceService.createInvoice(invoiceData);
      }

      navigate('/invoices');
    } catch (error) {
      console.error('Full error details:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
      toast.error(error.response?.data?.message || 'Failed to save invoice');
    }
  }
  
    const { subtotal, taxAmount, total } = calculateTotals();

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {invoiceToEdit ? 'Edit Invoice' : 'Create New Invoice'}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Client
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.client.name}
                onChange={handleClientChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.name}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Invoice Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

              <InputField
                label="Due Date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Client Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Client Name"
                name="name"
                value={formData.client.name}
                onChange={handleClientFieldChange}
                required
              />

              <InputField
                label="Client Email"
                name="email"
                type="email"
                value={formData.client.email}
                onChange={handleClientFieldChange}
                required
              />

              <InputField
                label="Client Phone"
                name="phone"
                value={formData.client.phone}
                onChange={handleClientFieldChange}
              />

              <InputField
                label="Client Address"
                name="address"
                value={formData.client.address}
                onChange={handleClientFieldChange}
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          name="description"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, e)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          name="quantity"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, e)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          name="rate"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => handleItemChange(index, e)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          name="amount"
                          value={item.amount.toFixed(2)}
                          readOnly
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:text-red-900"
                          disabled={formData.items.length <= 1}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={addItem}
              className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Add Item
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <InputField
                label="Tax Rate (%)"
                name="taxRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={formData.taxRate}
                onChange={handleChange}
              />
            </div>

            <div>
              <InputField
                label="Discount"
                name="discount"
                type="number"
                min="0"
                step="0.01"
                value={formData.discount}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <InputField
              label="Notes"
              name="notes"
              type="textarea"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional notes..."
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-4 max-w-md ml-auto">
              <div className="text-gray-600">Subtotal:</div>
              <div className="text-right">
                {formData.currency} {subtotal.toFixed(2)}
              </div>

              <div className="text-gray-600">Tax ({formData.taxRate}%):</div>
              <div className="text-right">
                {formData.currency} {taxAmount.toFixed(2)}
              </div>

              <div className="text-gray-600">Discount:</div>
              <div className="text-right">
                -{formData.currency} {formData.discount.toFixed(2)}
              </div>

              <div className="font-bold text-gray-800 border-t pt-2 mt-2">Total:</div>
              <div className="font-bold text-gray-800 border-t pt-2 mt-2 text-right">
                {formData.currency} {total.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/invoices')}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Invoice'}
            </button>
          </div>
        </form>
      </div>
    );
  };
  export default InvoiceForm;
