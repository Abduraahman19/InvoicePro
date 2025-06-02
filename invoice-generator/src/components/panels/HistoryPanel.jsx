import { useNavigate } from 'react-router-dom'
import { FiX, FiClock, FiTrash2, FiFile } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

const HistoryPanel = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    const savedInvoices = localStorage.getItem('invoices')
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices))
    }
  }, [])

  const deleteInvoice = (id) => {
    const updatedInvoices = invoices.filter(inv => inv.id !== id)
    setInvoices(updatedInvoices)
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices))
    alert(t('alerts.invoiceDeleted'))
  }

  const loadInvoice = (invoiceToLoad) => {
    // You would typically set this in a global state or context
    // For demo, we'll just navigate to the create page
    navigate('/invoices/create', { state: { invoice: invoiceToLoad } })
  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <FiClock className="mr-2" /> {t('buttons.history')}
          </h2>
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-700"
          >
            <FiX className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        
        {invoices.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            {t('alerts.noInvoices')}
          </p>
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice, index) => (
              <div 
                key={invoice.id} 
                className={`p-4 rounded-lg border `}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FiFile className={`mr-3`} />
                    <div>
                      <h3 className="font-medium dark:text-white">
                        {invoice.invoiceNumber || `Invoice ${index + 1}`}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {invoice.date} • {invoice.client.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onLoadInvoice(invoice)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    >
                      {t('buttons.load')}
                    </button>
                    <button
                      onClick={() => deleteInvoice(invoice.id)}
                      className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      title={t('buttons.delete')}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryPanel