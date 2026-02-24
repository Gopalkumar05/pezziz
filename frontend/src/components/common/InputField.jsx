// import React from 'react';

// const InputField = ({ 
//   type = 'text', 
//   placeholder, 
//   icon, 
//   value, 
//   onChange,
//   name, 
//   required = false,
//   pattern,
//   title,
//   className = ''
// }) => {
//   return (
//     <div className={`relative w-full my-2.5 ${className}`}>
//       <i className={`fas fa-${icon} absolute left-4 top-1/2 -translate-y-1/2 text-gray-500`}></i>
//       <input 
//         type={type}
//         placeholder={placeholder}
//         value={value}
//        name={name}
//         onChange={onChange}
//         required={required}
//         pattern={pattern}
//         title={title}
//         className="w-full py-3.5 pl-10 pr-4 rounded-lg border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-[#4361ee] transition"
//       />
//     </div>
//   );
// };

// export default InputField;


// import React from 'react';

// const InputField = ({ 
//   type = 'text', 
//   placeholder, 
//   icon, 
//   name,
//   value, 
//   onChange, 
//   required = false,
//   pattern,
//   title,
//   className = '',
//   error,
//   disabled = false,
//   autoComplete = 'off'
// }) => {
//   const handleChange = (e) => {
//     // सीधे onChange को कॉल करें
//     if (onChange) {
//       onChange(e);
//     }
//   };

//   return (
//     <div className={`relative w-full my-2.5 ${className}`}>
//       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//         <i className={`fas fa-${icon} text-gray-400`}></i>
//       </div>
//       <input 
//         type={type}
//         placeholder={placeholder}
//         name={name}
//         value={value || ''}
//         onChange={handleChange}
//         required={required}
//         pattern={pattern}
//         title={title}
//         disabled={disabled}
//         autoComplete={autoComplete}
        
//         className={`
//           w-full pl-10 pr-4 py-2.5 
//           border ${error ? 'border-red-500' : 'border-gray-300'} 
//           rounded-lg 
//           focus:outline-none focus:ring-2 focus:ring-[#4361ee] focus:border-transparent
//           disabled:bg-gray-100 disabled:cursor-not-allowed
//           text-sm sm:text-base
//           transition-colors duration-200
//         `}
//       />
//       {error && (
//         <p className="mt-1 text-xs text-red-500">{error}</p>
//       )}
//     </div>
//   );
// };

// export default InputField;


import React from 'react';

const InputField = ({ 
  type = 'text', 
  placeholder, 
  icon, 
  name,
  value, 
  onChange, 
  onBlur,
  onKeyPress,
  onInput,
  required = false,
  pattern,
  title,
  className = '',
  error,
  disabled = false,
  autoComplete = 'off',
  maxLength,
  numericOnly = false, // Add this prop
  ...rest // Spread remaining props
}) => {
  const handleKeyPress = (e) => {
    // Handle numeric only validation
    if (numericOnly && !/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
    
    // Call the original onKeyPress if provided
    if (onKeyPress) {
      onKeyPress(e);
    }
  };

  const handleInput = (e) => {
    // Handle numeric only validation
    if (numericOnly) {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
    
    // Call the original onInput if provided
    if (onInput) {
      onInput(e);
    }
    
    // Call onChange if provided (since onInput might not trigger onChange in some browsers)
    if (onChange) {
      onChange(e);
    }
  };

  const handleChange = (e) => {
    // Additional safety for numeric only
    if (numericOnly) {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
    
    // Call the original onChange if provided
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`relative w-full my-2.5 ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i className={`fas fa-${icon} text-gray-400`}></i>
      </div>
      <input 
        type={type === 'tel' ? 'tel' : type} // Keep tel type for numeric keyboard on mobile
        placeholder={placeholder}
        name={name}
        value={value || ''}
        onChange={handleChange}
        onBlur={onBlur}
        onKeyPress={handleKeyPress}
        onInput={handleInput}
        required={required}
        pattern={pattern}
        title={title}
        disabled={disabled}
        autoComplete={autoComplete}
        maxLength={maxLength}
        {...rest} // Spread remaining props
        className={`
          w-full pl-10 pr-4 py-2.5 
          border ${error ? 'border-red-500' : 'border-gray-300'} 
          rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-[#4361ee] focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          text-sm sm:text-base
          transition-colors duration-200
        `}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default InputField;