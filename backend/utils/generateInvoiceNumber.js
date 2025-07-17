const generateInvoiceNumber = async (userId) => {
  const count = await Invoice.countDocuments({ user: userId });
  return `INV-${(count + 1).toString().padStart(5, '0')}`;
};

module.exports = generateInvoiceNumber;