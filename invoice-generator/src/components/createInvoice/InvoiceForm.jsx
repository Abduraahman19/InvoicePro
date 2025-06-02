import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ClientInfo from './ClientInfo'
import CompanyInfo from './CompanyInfo'
import ItemTable from './ItemTable'
import PaymentDetails from './PaymentDetails'

const InvoiceForm = ({ invoice, setInvoice, saveInvoice }) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('client')

  // Initialize paymentDetails if it doesn't exist
  const safeInvoice = {
    paymentDetails: {},
    ...invoice
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInvoice(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCompanyChange = (e) => {
    const { name, value } = e.target
    setInvoice(prev => ({
      ...prev,
      company: {
        ...prev.company,
        [name]: value
      }
    }))
  }

  const handleClientChange = (e) => {
    const { name, value } = e.target
    setInvoice(prev => ({
      ...prev,
      client: {
        ...prev.client,
        [name]: value
      }
    }))
  }

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target
    setInvoice(prev => ({
      ...prev,
      paymentDetails: {
        ...(prev.paymentDetails || {}),
        [name]: value
      }
    }))
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setInvoice(prev => ({
          ...prev,
          company: {
            ...prev.company,
            logo: event.target.result
          }
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addNewItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { id: Date.now(), name: '', quantity: 1, price: 0, total: 0 }
      ]
    }))
  }

  const removeItem = (id) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }

  const updateItem = (id, field, value) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          if (field === 'quantity' || field === 'price') {
            updatedItem.total = updatedItem.quantity * updatedItem.price
          }

          return updatedItem
        }
        return item
      })
    }))
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4 overflow-x-auto">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'client' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
          onClick={() => setActiveTab('client')}
        >
          {t('labels.clientInfo')}
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'company' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
          onClick={() => setActiveTab('company')}
        >
          {t('labels.companyInfo')}
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'items' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
          onClick={() => setActiveTab('items')}
        >
          {t('labels.items')}
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'payment' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
          onClick={() => setActiveTab('payment')}
        >
          {t('labels.paymentDetails')}
        </button>
      </div>

      {activeTab === 'client' && (
        <ClientInfo client={safeInvoice.client} handleChange={handleClientChange} />
      )}

      {activeTab === 'company' && (
        <CompanyInfo
          company={safeInvoice.company}
          handleChange={handleCompanyChange}
          handleLogoUpload={handleLogoUpload}
        />
      )}

      {activeTab === 'items' && (
        <ItemTable
          items={safeInvoice.items}
          addNewItem={addNewItem}
          removeItem={removeItem}
          updateItem={updateItem}
        />
      )}

      {activeTab === 'payment' && (
        <PaymentDetails
          paymentDetails={safeInvoice.paymentDetails}
          handleChange={handlePaymentDetailsChange}
        />
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('labels.invoiceNumber')}
          </label>
          <input
            type="text"
            name="invoiceNumber"
            value={safeInvoice.invoiceNumber}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            placeholder={t('placeholders.invoiceNumber')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('labels.date')}
          </label>
          <input
            type="date"
            name="date"
            value={safeInvoice.date}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('labels.dueDate')}
          </label>
          <input
            type="date"
            name="dueDate"
            value={safeInvoice.dueDate}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('labels.taxRate')}
          </label>
          <input
            type="number"
            name="taxRate"
            value={safeInvoice.taxRate}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('labels.discount')}
          </label>
          <input
            type="number"
            name="discount"
            value={safeInvoice.discount}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('labels.currency')}
          </label>
          <select
            name="currency"
            value={safeInvoice.currency}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
            <option value="PKR">PKR (Rs)</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('labels.notes')}
        </label>
        <textarea
          name="notes"
          value={safeInvoice.notes}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          rows="3"
          placeholder={t('placeholders.notes')}
        />
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={saveInvoice}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {t('buttons.save')}
        </button>
      </div>
    </div>
  )
}

export default InvoiceForm