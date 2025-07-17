// // src/main.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { NotificationProvider } from './contexts/NotificationContext';
// import App from './App';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <GoogleOAuthProvider clientId="1070015108809-8jr341v9lqokun098drp5re34s3lkdgf.apps.googleusercontent.com">
//       <BrowserRouter>
//         <NotificationProvider>
//           <App />
//         </NotificationProvider>
//       </BrowserRouter>
//     </GoogleOAuthProvider>
//   </React.StrictMode>
// );




import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);