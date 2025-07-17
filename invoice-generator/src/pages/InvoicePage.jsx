import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import invoiceService from '../services/invoiceService';
import { toast } from 'react-toastify';
import html2pdf from 'html2pdf.js';
import { DocumentTextIcon, PrinterIcon, ArrowLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const InvoicePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const data = await invoiceService.getInvoiceById(id, user.token);
        setInvoice(data);
      } catch (error) {
        toast.error('Failed to fetch invoice');
        navigate('/invoices');
      } finally {
        setIsLoading(false);
      }
    };

    if (user && id) {
      fetchInvoice();
    }
  }, [id, user, navigate]);

  const handleSendInvoice = async () => {
    setIsSending(true);
    try {
      await invoiceService.sendInvoice(id, user.token);
      toast.success('Invoice sent successfully');
    } catch (error) {
      toast.error('Failed to send invoice');
    } finally {
      setIsSending(false);
    }
  };

  const handleDownloadPdf = () => {
    const element = document.getElementById('invoice-to-print');
    const opt = {
      margin: 10,
      filename: `invoice_${invoice.invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  };

  const handlePrint = () => {
    window.print();
  };

if (isLoading) {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  );
}

if (!invoice) {
  return (
    <div className="text-center py-8">
      <p className="mb-4">Invoice not found.</p>
      <button
        onClick={() => navigate('/invoices')}
        className="px-4 py-2 bg-primary-600 text-white rounded"
      >
        Go Back
      </button>
    </div>
  );
}


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/invoices"
          className="flex items-center text-primary-600 hover:text-primary-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Invoices
        </Link>

        <div className="flex space-x-2">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            <DocumentTextIcon className="h-5 w-5 mr-1" />
            Download PDF
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            <PrinterIcon className="h-5 w-5 mr-1" />
            Print
          </button>

          <button
            onClick={handleSendInvoice}
            disabled={isSending}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50"
          >
            <PaperAirplaneIcon className="h-5 w-5 mr-1" />
            {isSending ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </div>

      <div id="invoice-to-print" className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
            <p className="text-gray-600">#{invoice.invoiceNumber}</p>
          </div>

          <div className="text-right">
            <h2 className="text-xl font-semibold text-gray-800">
              {user.companyName || user.name}
            </h2>
            {user.address && <p className="text-gray-600">{user.address}</p>}
            {user.phone && <p className="text-gray-600">{user.phone}</p>}
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Bill To:</h3>
            <p className="font-medium text-gray-800">{invoice.client.name}</p>
            {invoice.client.address && (
              <p className="text-gray-600">{invoice.client.address}</p>
            )}
            {invoice.client.phone && (
              <p className="text-gray-600">{invoice.client.phone}</p>
            )}
            <p className="text-gray-600">{invoice.client.email}</p>
          </div>

          <div className="md:text-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-gray-600">Invoice Date:</div>
              <div>{new Date(invoice.date).toLocaleDateString()}</div>

              <div className="text-gray-600">Due Date:</div>
              <div>{new Date(invoice.dueDate).toLocaleDateString()}</div>

              <div className="text-gray-600">Status:</div>
              <div>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${invoice.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    }`}
                >
                  {invoice.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.currency} {item.rate.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.currency} {item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {invoice.notes && (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Notes</h3>
                <p className="text-gray-600 whitespace-pre-line">{invoice.notes}</p>
              </>
            )}
          </div>

          <div className="md:text-right">
            <div className="grid grid-cols-2 gap-4 max-w-md ml-auto">
              <div className="text-gray-600">Subtotal:</div>
              <div>
                {invoice.currency} {invoice.subtotal.toFixed(2)}
              </div>

              {invoice.taxRate > 0 && (
                <>
                  <div className="text-gray-600">Tax ({invoice.taxRate}%):</div>
                  <div>
                    {invoice.currency} {invoice.taxAmount.toFixed(2)}
                  </div>
                </>
              )}

              {invoice.discount > 0 && (
                <>
                  <div className="text-gray-600">Discount:</div>
                  <div>
                    -{invoice.currency} {invoice.discount.toFixed(2)}
                  </div>
                </>
              )}

              <div className="font-bold text-gray-800 border-t pt-2 mt-2">Total:</div>
              <div className="font-bold text-gray-800 border-t pt-2 mt-2">
                {invoice.currency} {invoice.total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;