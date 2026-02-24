// import React, { useState } from 'react'
// import Login from './components/Login'


// function App() {
  
//   return (
//     <>
//      <Login/>
//     </>
//   )
// }

// export default App

// App.js
import React, { useState } from 'react';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // login, forgot, reset
  const [resetEmail, setResetEmail] = useState('');

  const handleForgotPassword = () => {
    setCurrentScreen('forgot');
  };

  const handleOtpVerified = (email) => {
    setResetEmail(email);
    setCurrentScreen('reset');
  };

  const handleResetSuccess = () => {
    setCurrentScreen('login');
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
  };

  return (
    <div className="App">
      {currentScreen === 'login' && (
        <Login onForgotPassword={handleForgotPassword} />
      )}
      {currentScreen === 'forgot' && (
        <ForgotPassword 
          onBack={handleBackToLogin}
          onOtpVerified={handleOtpVerified}
        />
      )}
      {currentScreen === 'reset' && (
        <ResetPassword
          email={resetEmail}
          onSuccess={handleResetSuccess}
          onBack={handleBackToLogin}
        />
      )}
    </div>
  );
}

export default App;
