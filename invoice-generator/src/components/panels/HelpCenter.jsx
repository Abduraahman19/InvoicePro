import { motion } from 'framer-motion';
import { FiChevronDown, FiMail, FiPhone, FiClock } from 'react-icons/fi';
import { useState } from 'react';
const HelpCenter = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I create a new invoice?',
      answer: 'Navigate to the "Create Invoice" page from the sidebar. Fill in client details, add items, set payment terms, and click "Generate Invoice". You can then download or email the invoice directly.'
    },
    {
      question: 'Can I save invoice templates?',
      answer: 'Yes! Go to the "Templates" section where you can save multiple templates with different styles and default settings. You can apply these templates when creating new invoices.'
    },
    {
      question: 'How do I add my company logo?',
      answer: 'In the "Company Information" settings, you can upload your logo which will automatically appear on all your invoices. Supported formats are JPG, PNG, and SVG.'
    },
    {
      question: 'How can I manage multiple clients?',
      answer: 'The "Clients" section allows you to add, edit, and organize all your clients. You can quickly select clients when creating invoices and view their payment history.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Help Center</h2>
        <p className="text-gray-400">Find answers to common questions and get support</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQ Section */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-4"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h3>
          
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              whileHover={{ x: 5 }}
              className="bg-gray-900 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
              >
                <span className="font-medium text-white">{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="text-gray-400" />
                </motion.div>
              </button>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: activeIndex === index ? 'auto' : 0,
                  opacity: activeIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="px-4 pb-4 text-gray-300"
              >
                <p>{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900 rounded-lg p-6 h-fit"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Contact Support</h3>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="p-3 bg-blue-600 rounded-lg mr-4">
                <FiMail className="text-white" />
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Email Support</h4>
                <p className="text-gray-400 text-sm">For general inquiries</p>
                <a href="mailto:support@invoicepro.com" className="text-blue-400 hover:underline">support@invoicepro.com</a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-3 bg-green-600 rounded-lg mr-4">
                <FiPhone className="text-white" />
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Phone Support</h4>
                <p className="text-gray-400 text-sm">For urgent matters</p>
                <a href="tel:+1234567890" className="text-blue-400 hover:underline">+1 (234) 567-890</a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-3 bg-purple-600 rounded-lg mr-4">
                <FiClock className="text-white" />
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Support Hours</h4>
                <p className="text-gray-400 text-sm">Monday - Friday</p>
                <p className="text-gray-400 text-sm">9:00 AM - 5:00 PM EST</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HelpCenter;