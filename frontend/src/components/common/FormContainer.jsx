import React from 'react';

const FormContainer = ({ 
  children, 
  title, 
  isActive, 
  isSignUp,
  onSubmit 
}) => {
  const positionClasses = isSignUp 
    ? `absolute top-0 h-full w-full md:w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out left-0 ${
        isActive ? 'md:translate-x-full opacity-100 z-10' : 'md:translate-x-0 opacity-0 z-0'
      }`
    : `absolute top-0 h-full w-full md:w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out left-0 ${
        isActive ? 'md:translate-x-full opacity-0 z-0' : 'md:translate-x-0 opacity-100 z-10'
      }`;

  return (
    <div className={positionClasses}>
      <form className="w-4/5 flex flex-col items-center" onSubmit={onSubmit}>
        <h1 className="text-3xl font-bold mb-5 text-gray-800">{title}</h1>
        {children}
      </form>
    </div>
  );
};

export default FormContainer;