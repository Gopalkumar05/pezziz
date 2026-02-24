// import React from 'react';

// const Button = ({ 
//   children, 
//   onClick, 
//   type = 'button', 
//   variant = 'primary', 
//   className = '',
//   disabled = false
// }) => {
//   const baseClasses = "px-10 py-3 rounded-full font-semibold cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0";
  
//   const variants = {
//     primary: "bg-gradient-to-r from-[#4361ee] to-[#3a0ca3] text-white",
//     ghost: "border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#4361ee]",
//     social: "p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-600"
//   };

//   return (
//     <button 
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className={`${baseClasses} ${variants[variant]} ${className}`}
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;

import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '',
  disabled = false
}) => {
  const baseClasses = "px-10 py-3 rounded-full font-semibold cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#4361ee] to-[#3a0ca3] text-white",
    ghost: "border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#4361ee]",
    social: "p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-600"
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;