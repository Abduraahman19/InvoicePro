// // src/contexts/NotificationContext.jsx
// import * as React from 'react';
// import { createContext, useContext } from 'react';
// import { Snackbar, Alert, Slide } from '@mui/material';

// const NotificationContext = createContext();

// function SlideTransition(props) {
//   return <Slide {...props} direction="right" />; // aap "left", "right", "down" bhi use kar sakte hain
// }

// export const NotificationProvider = ({ children }) => {
//   const [notification, setNotification] = React.useState({
//     open: false,
//     message: '',
//     severity: 'info',
//   });

//   const showNotification = (message, severity = 'info') => {
//     setNotification({ open: true, message, severity });
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setNotification(prev => ({ ...prev, open: false }));
//   };

//   return (
//     <NotificationContext.Provider value={showNotification}>
//       {children}
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleClose}
//         TransitionComponent={SlideTransition}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // adjust as needed
//       >
//         <Alert
//           onClose={handleClose}
//           severity={notification.severity}
//           variant="filled"
//           sx={{ width: '100%' }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </NotificationContext.Provider>
//   );
// };

// export const useNotification = () => useContext(NotificationContext);
