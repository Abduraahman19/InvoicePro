import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import DownloadButton from './DownloadButton'

const InvoicePreview = ({ invoice, darkMode }) => {
  const { t } = useTranslation()
  const invoiceRef = useRef()

  // Safe default values for invoice
  const safeInvoice = {
    items: [],
    taxRate: 0,
    discount: 0,
    currency: 'USD',
    company: {},
    client: {},
    paymentDetails: {},
    template: {},
    ...invoice
  }

  const downloadPDF = async () => {
    try {
      const element = invoiceRef.current
      const canvas = await html2canvas(element, { 
        scale: 2,
        backgroundColor: safeInvoice.template?.backgroundColor || (darkMode ? '#1F2937' : '#FFFFFF')
      })
      const imgData = canvas.toDataURL('image/png')
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm'
      })
      
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`invoice_${safeInvoice.invoiceNumber || 'unnamed'}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  const calculateSubtotal = () => {
    return safeInvoice.items.reduce((sum, item) => sum + (item.total || 0), 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * ((safeInvoice.taxRate || 0) / 100)
  }

  const calculateDiscount = () => {
    return calculateSubtotal() * ((safeInvoice.discount || 0) / 100)
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() - calculateDiscount()
  }

  const getCurrencySymbol = () => {
    switch(safeInvoice.currency) {
      case 'USD': return '$'
      case 'EUR': return '€'
      case 'GBP': return '£'
      case 'INR': return '₹'
      case 'PKR': return 'Rs'
      default: return '$'
    }
  }

  // Apply template styles with fallbacks
  const templateStyles = safeInvoice.template?.styles || {}

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white">{t('title')} Preview</h2>
        <DownloadButton onClick={downloadPDF} />
      </div>

      <div 
        ref={invoiceRef} 
        className="p-6"
        style={{
          backgroundColor: templateStyles.backgroundColor || (darkMode ? '#1F2937' : '#FFFFFF'),
          color: templateStyles.textColor || (darkMode ? '#F3F4F6' : '#111827'),
          fontFamily: templateStyles.fontFamily || 'inherit',
          ...templateStyles
        }}
      >
        {/* Invoice Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            {safeInvoice.company?.logo && (
              <img 
                src={safeInvoice.company.logo} 
                alt="Company Logo" 
                className="h-16 mb-4"
              />
            )}
            <h1 
              className="text-2xl font-bold"
              style={{ color: templateStyles.headerColor }}
            >
              INVOICE
            </h1>
            {safeInvoice.invoiceNumber && (
              <p className="opacity-80"># {safeInvoice.invoiceNumber}</p>
            )}
          </div>
          <div className="text-right">
            <p className="font-semibold">{safeInvoice.company?.name || 'Your Company'}</p>
            <p className="text-sm opacity-80">{safeInvoice.company?.address || '123 Business St'}</p>
            <p className="text-sm opacity-80">{safeInvoice.company?.email || 'contact@example.com'}</p>
            <p className="text-sm opacity-80">{safeInvoice.company?.phone || '+1234567890'}</p>
          </div>
        </div>

        {/* Invoice Dates */}
        <div className="flex justify-between mb-8">
          <div>
            <p className="font-semibold">Bill To:</p>
            <p>{safeInvoice.client?.name || 'Client Name'}</p>
            <p className="text-sm opacity-80">{safeInvoice.client?.address || '123 Client St'}</p>
            <p className="text-sm opacity-80">{safeInvoice.client?.email || 'client@example.com'}</p>
            <p className="text-sm opacity-80">{safeInvoice.client?.phone || '+1234567890'}</p>
          </div>
          <div className="text-right">
            <p>
              <span className="font-semibold">Date:</span> {safeInvoice.date || new Date().toISOString().split('T')[0]}
            </p>
            {safeInvoice.dueDate && (
              <p>
                <span className="font-semibold">Due Date:</span> {safeInvoice.dueDate}
              </p>
            )}
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ backgroundColor: templateStyles.tableHeaderBg || (darkMode ? '#374151' : '#F3F4F6') }}>
                <th className="p-3 text-left border-b">{t('labels.description')}</th>
                <th className="p-3 text-right border-b">{t('labels.quantity')}</th>
                <th className="p-3 text-right border-b">{t('labels.price')}</th>
                <th className="p-3 text-right border-b">{t('labels.total')}</th>
              </tr>
            </thead>
            <tbody>
              {safeInvoice.items?.map((item, index) => (
                <tr 
                  key={item.id || index} 
                  style={{ 
                    backgroundColor: index % 2 === 0 
                      ? (templateStyles.tableRowEvenBg || (darkMode ? '#1F2937' : '#FFFFFF'))
                      : (templateStyles.tableRowOddBg || (darkMode ? '#111827' : '#F9FAFB'))
                  }}
                >
                  <td className="p-3 border-b">{item.name || t('placeholders.itemDescription')}</td>
                  <td className="p-3 text-right border-b">{item.quantity || 1}</td>
                  <td className="p-3 text-right border-b">
                    {getCurrencySymbol()}{(item.price || 0).toFixed(2)}
                  </td>
                  <td className="p-3 text-right border-b">
                    {getCurrencySymbol()}{(item.total || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="ml-auto w-64">
          <div className="flex justify-between mb-2">
            <span>{t('labels.subtotal')}</span>
            <span>{getCurrencySymbol()}{calculateSubtotal().toFixed(2)}</span>
          </div>
          {(safeInvoice.taxRate || 0) > 0 && (
            <div className="flex justify-between mb-2">
              <span>Tax ({safeInvoice.taxRate}%):</span>
              <span>{getCurrencySymbol()}{calculateTax().toFixed(2)}</span>
            </div>
          )}
          {(safeInvoice.discount || 0) > 0 && (
            <div className="flex justify-between mb-2">
              <span>Discount ({safeInvoice.discount}%):</span>
              <span>-{getCurrencySymbol()}{calculateDiscount().toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg pt-2 border-t-2">
            <span>{t('labels.totalAmount')}</span>
            <span>{getCurrencySymbol()}{calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Details - Now safely accessed */}
        {(safeInvoice.paymentDetails?.bankName || safeInvoice.paymentDetails?.upiId) && (
          <div className="mt-8 pt-4 border-t">
            <h3 className="font-semibold mb-2">Payment Details:</h3>
            {safeInvoice.paymentDetails.bankName && (
              <p className="text-sm">
                <span className="font-medium">Bank:</span> {safeInvoice.paymentDetails.bankName}
                {safeInvoice.paymentDetails.accountNumber && ` (A/C: ${safeInvoice.paymentDetails.accountNumber})`}
              </p>
            )}
            {safeInvoice.paymentDetails.upiId && (
              <p className="text-sm">
                <span className="font-medium">UPI ID:</span> {safeInvoice.paymentDetails.upiId}
              </p>
            )}
            {safeInvoice.paymentDetails.qrCode && (
              <div className="mt-2">
                <img 
                  src={safeInvoice.paymentDetails.qrCode} 
                  alt="Payment QR Code" 
                  className="h-24"
                />
              </div>
            )}
          </div>
        )}

        {/* Notes */}
        {safeInvoice.notes && (
          <div className="mt-8 pt-4 border-t">
            <p className="text-sm italic">{safeInvoice.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default InvoicePreview