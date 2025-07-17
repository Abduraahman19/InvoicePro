// import i18n from 'i18next'
// import { initReactI18next } from 'react-i18next'

// // Translation resources
// const resources = {
//   en: {
//     translation: {
//        profile: {
//         title: 'User Profile',
//         fetchError: 'Failed to load profile data',
//         updateError: 'Failed to update profile',
//         updateSuccess: 'Profile updated successfully',
//         saveButton: 'Save Changes',
//         editButton: 'Edit Profile',
//         avatarLabel: 'Profile Picture',
//         avatarHint: 'Max 2MB, JPG/PNG recommended',
//         avatarSizeError: 'Image size should be less than 2MB',
//         nameLabel: 'Full Name',
//         emailLabel: 'Email Address',
//         phoneLabel: 'Phone Number',
//         phonePlaceholder: 'Enter phone number with country code',
//         companyLabel: 'Company Name',
//         companyPlaceholder: 'Your company name',
//         websiteLabel: 'Website',
//         websitePlaceholder: 'https://yourwebsite.com'
//       },
//       auth: {
//         loginWithGoogle: "Continue with Google",
//         registerWithGoogle: "Continue with Google",
//         googleLoginFailed: "Google login failed. Please try again.",
//         nameTooShort: "Name must be at least 2 characters",
//         nameTooLong: "Name must be less than 50 characters",
//         passwordTooLong: "Password must be less than 50 characters",
//         companyTooLong: "Company name must be less than 100 characters",
//         unauthorized: "Please login to access this page",
//         invalidCredentials: "Invalid email or password",
//         emailExists: "Email already registered. Please login instead.",
//         loginFailed: "Login failed. Please try again.",
//         registerFailed: "Registration failed. Please try again.",
//         welcomeBack: 'Welcome Back!',
//         createAccount: 'Create Your Account',
//         fullName: 'Full Name',
//         namePlaceholder: 'John Doe',
//         email: 'Email Address',
//         emailPlaceholder: 'your@email.com',
//         password: 'Password',
//         login: 'Log In',
//         register: 'Register',
//         noAccount: "Don't have an account?",
//         haveAccount: "Already have an account?",
//         registerHere: 'Register here',
//         loginHere: 'Login here',
//         tagline: 'Professional Invoice Generator',
//         emailRequired: 'Email is required',
//         passwordRequired: 'Password is required',
//         nameRequired: 'Name is required',
//         passwordLength: 'Password must be at least 6 characters'
//       },
//       title: 'Professional Invoice Generator',
//       buttons: {
//         history: 'Invoice History',
//         download: 'Download PDF',
//         save: 'Save Invoice',
//         addItem: 'Add Item',
//         remove: 'Remove',
//         close: 'Close',
//         load: 'Load',
//         delete: 'Delete'
//       },
//       labels: {
//         clientInfo: 'Client Information',
//         companyInfo: 'Your Company Information',
//         items: 'Items',
//         description: 'Description',
//         quantity: 'Qty',
//         price: 'Price',
//         total: 'Total',
//         action: 'Action',
//         invoiceNumber: 'Invoice Number',
//         date: 'Date',
//         dueDate: 'Due Date',
//         taxRate: 'Tax Rate (%)',
//         discount: 'Discount (%)',
//         currency: 'Currency',
//         notes: 'Notes',
//         subtotal: 'Subtotal:',
//         totalAmount: 'Total:',
//         paymentDetails: 'Payment Details',
//         bankName: 'Bank Name',
//         accountNumber: 'Account Number',
//         iban: 'IBAN',
//         swift: 'SWIFT Code',
//         upiId: 'UPI ID',
//         qrCode: 'QR Code',
//         uploadLogo: 'Upload Logo'
//       },
//       forgotPassword: {
//         title: "Forgot Password",
//         emailLabel: "Email Address",
//         emailPlaceholder: "Enter your email",
//         sendOtpButton: "Send OTP",
//         otpSent: "OTP sent to your email",
//         enterOtp: "Enter 6-digit OTP",
//         otpVerified: "OTP verified successfully",
//         invalidOtp: "Invalid or expired OTP",
//         resetPassword: "Reset Your Password",
//         newPassword: "New Password",
//         confirmPassword: "Confirm Password",
//         passwordTooShort: "Password must be at least 6 characters",
//         passwordsDontMatch: "Passwords don't match",
//         passwordReset: "Password reset successfully",
//         error: "Error sending OTP",
//         resetError: "Error resetting password"
//       },
//       common: {
//         cancel: "Cancel",
//         verify: "Verify",
//         reset: "Reset"
//       },
//       placeholders: {
//         invoiceNumber: 'INV-001',
//         clientName: 'John Doe',
//         clientAddress: '123 Client St, City',
//         clientEmail: 'client@example.com',
//         clientPhone: '+1234567890',
//         itemDescription: 'Item description',
//         notes: 'Thank you for your business!'
//       },
//       templates: {
//         modern: 'Modern',
//         classic: 'Classic',
//         minimal: 'Minimal',
//         elegant: 'Elegant'
//       },
//       alerts: {
//         invoiceSaved: 'Invoice saved successfully!',
//         invoiceDeleted: 'Invoice deleted successfully!'
//       }
//     }
//   },
//   ur: {
//     translation: {
//       title: 'پروفیشنل انوائس جنریٹر',
//       buttons: {
//         history: 'انوائس تاریخ',
//         download: 'پی ڈی ایف ڈاؤن لوڈ',
//         save: 'انوائس محفوظ کریں',
//         addItem: 'آئٹم شامل کریں',
//         remove: 'حذف کریں',
//         close: 'بند کریں',
//         load: 'لوڈ کریں',
//         delete: 'حذف کریں'
//       },
//        profile: {
//         title: 'صارف پروفائل',
//         fetchError: 'پروفائل ڈیٹا لوڈ کرنے میں ناکامی',
//         updateError: 'پروفائل اپ ڈیٹ کرنے میں ناکامی',
//         updateSuccess: 'پروفائل کامیابی سے اپ ڈیٹ ہو گیا',
//         saveButton: 'تبدیلیاں محفوظ کریں',
//         editButton: 'پروفائل میں ترمیم کریں',
//         avatarLabel: 'پروفائل تصویر',
//         avatarHint: 'زیادہ سے زیادہ 2MB، JPG/PNG تجویز کردہ',
//         avatarSizeError: 'تصویر کا سائز 2MB سے کم ہونا چاہیے',
//         nameLabel: 'پورا نام',
//         emailLabel: 'ای میل ایڈریس',
//         phoneLabel: 'فون نمبر',
//         phonePlaceholder: 'ملک کے کوڈ کے ساتھ فون نمبر درج کریں',
//         companyLabel: 'کمپنی کا نام',
//         companyPlaceholder: 'آپ کی کمپنی کا نام',
//         websiteLabel: 'ویب سائٹ',
//         websitePlaceholder: 'https://yourwebsite.com'
//       },
//       auth: {
//         welcomeBack: 'خوش آمدید!',
//         createAccount: 'اپنا اکاؤنٹ بنائیں',
//         fullName: 'پورا نام',
//         namePlaceholder: 'جان ڈو',
//         email: 'ای میل ایڈریس',
//         emailPlaceholder: 'your@email.com',
//         password: 'پاس ورڈ',
//         login: 'لاگ ان',
//         register: 'رجسٹر',
//         noAccount: "اکاؤنٹ نہیں ہے؟",
//         haveAccount: "پہلے سے اکاؤنٹ ہے؟",
//         registerHere: 'یہاں رجسٹر کریں',
//         loginHere: 'یہاں لاگ ان کریں',
//         tagline: 'پروفیشنل انوائس جنریٹر',
//         emailRequired: 'ای میل درکار ہے',
//         passwordRequired: 'پاس ورڈ درکار ہے',
//         nameRequired: 'نام درکار ہے',
//         passwordLength: 'پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے'
//       },
//       labels: {
//         clientInfo: 'کلائنٹ کی معلومات',
//         companyInfo: 'اپنی کمپنی کی معلومات',
//         items: 'آئٹمز',
//         description: 'تفصیل',
//         quantity: 'مقدار',
//         price: 'قیمت',
//         total: 'کل',
//         action: 'عمل',
//         invoiceNumber: 'انوائس نمبر',
//         date: 'تاریخ',
//         dueDate: 'ادائیگی کی تاریخ',
//         taxRate: 'ٹیکس کی شرح (%)',
//         discount: 'رعایت (%)',
//         currency: 'کرنسی',
//         notes: 'نوٹس',
//         subtotal: 'ذیلی کل:',
//         totalAmount: 'کل رقم:',
//         paymentDetails: 'ادائیگی کی تفصیلات',
//         bankName: 'بینک کا نام',
//         accountNumber: 'اکاؤنٹ نمبر',
//         iban: 'آئی بین',
//         swift: 'سوئفٹ کوڈ',
//         upiId: 'یو پی آئی آئی ڈی',
//         qrCode: 'کیو آر کوڈ',
//         uploadLogo: 'لوگو اپ لوڈ کریں'
//       },
//       placeholders: {
//         invoiceNumber: 'انوائس-001',
//         clientName: 'جان ڈو',
//         clientAddress: '123 کلائنٹ سٹریٹ، شہر',
//         clientEmail: 'client@example.com',
//         clientPhone: '+1234567890',
//         itemDescription: 'آئٹم کی تفصیل',
//         notes: 'آپ کے کاروبار کا شکریہ!'
//       },
//       templates: {
//         modern: 'جدید',
//         classic: 'کلاسک',
//         minimal: 'منیمل',
//         elegant: 'خوبصورت'
//       },
//       alerts: {
//         invoiceSaved: 'انوائس کامیابی سے محفوظ ہو گئی!',
//         invoiceDeleted: 'انوائس کامیابی سے حذف ہو گئی!'
//       }
//     }
//   }
// }

// i18n
//   .use(initReactI18next)
//   .init({
//     resources,
//     lng: 'en',
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false
//     }
//   })

// export default i18n