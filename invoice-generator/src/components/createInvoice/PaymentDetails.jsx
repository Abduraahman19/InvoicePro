// import { useTranslation } from 'react-i18next'

// const PaymentDetails = ({ paymentDetails = {}, handleChange }) => {
//   const { t } = useTranslation()

//   // Provide default empty values for all payment details
//   const safePaymentDetails = {
//     bankName: '',
//     accountNumber: '',
//     iban: '',
//     swift: '',
//     upiId: '',
//     qrCode: '',
//     ...paymentDetails
//   }

//   return (
//     <div>
//       <h3 className="text-lg font-medium mb-4 dark:text-white">{t('labels.paymentDetails')}</h3>
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//             {t('labels.bankName')}
//           </label>
//           <input
//             type="text"
//             name="bankName"
//             value={safePaymentDetails.bankName}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
//             placeholder="Bank of Example"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//             {t('labels.accountNumber')}
//           </label>
//           <input
//             type="text"
//             name="accountNumber"
//             value={safePaymentDetails.accountNumber}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
//             placeholder="1234567890"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//             {t('labels.iban')}
//           </label>
//           <input
//             type="text"
//             name="iban"
//             value={safePaymentDetails.iban}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
//             placeholder="XX00XXXX0000000000"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//             {t('labels.swift')}
//           </label>
//           <input
//             type="text"
//             name="swift"
//             value={safePaymentDetails.swift}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
//             placeholder="ABCDEFGH"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//             {t('labels.upiId')}
//           </label>
//           <input
//             type="text"
//             name="upiId"
//             value={safePaymentDetails.upiId}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
//             placeholder="username@upi"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//             {t('labels.qrCode')}
//           </label>
//           <input
//             type="text"
//             name="qrCode"
//             value={safePaymentDetails.qrCode}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
//             placeholder="https://example.com/qrcode.png"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PaymentDetails