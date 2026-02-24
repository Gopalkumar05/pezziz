// const PasswordInput = ({ 
//   placeholder, 
//   value, 
//   onChange, 
//   name, 
//   showPassword, 
//   togglePassword,
//   required = true 
// }) => {
//   // Handle input change - बस सीधे onChange को कॉल करें
//   const handleInputChange = (e) => {
//     console.log('Password input changed:', name, e.target.value);
//     onChange(e);
//   };

//   // Handle eye icon click
//   const handleToggleClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     togglePassword(e);
//   };

//   return (
//     <div className="relative w-full mb-4">
//       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//         <i className="fas fa-lock text-gray-400"></i>
//       </div>
//       <input
//         type={showPassword ? "text" : "password"}
//         placeholder={placeholder}
//         name={name}
//         value={value || ''}
//         onChange={handleInputChange}
//         required={required}
//         className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4361ee] focus:border-transparent text-sm"
//         autoComplete={showPassword ? "off" : "current-password"}
//       />
//       <button
//         type="button"
//         onClick={handleToggleClick}
//         className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
//         tabIndex="-1"
//       >
//         <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 hover:text-[#4361ee]`}></i>
//       </button>
//     </div>
//   );
// };

// export default PasswordInput;


import React from 'react';

const PasswordField = ({ 
  placeholder, 
  value, 
  onChange, 
  name, 
  showPassword, 
  onTogglePassword,
  required = true 
}) => {
  // Handle input change
  const handleInputChange = (e) => {
    console.log('Password input changed:', name, e.target.value);
    onChange(e);
  };

  // Handle eye icon click
  const handleToggleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onTogglePassword(e);
  };

  return (
    <div className="relative w-full mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i className="fas fa-lock text-gray-400"></i>
      </div>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        name={name}
        value={value || ''}
        onChange={handleInputChange}
        required={required}
        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4361ee] focus:border-transparent text-sm"
        autoComplete={showPassword ? "off" : "current-password"}
      />
      <button
        type="button"
        onClick={handleToggleClick}
        className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
        tabIndex="-1"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 hover:text-[#4361ee]`}></i>
      </button>
    </div>
  );
};

export default PasswordField;