

import React from 'react';

const ToggleSwitch = ({ 
  leftLabel, 
  rightLabel, 
  leftIcon, 
  rightIcon, 
  checked, 
  onChange,
  leftValue,
  rightValue
}) => {
  const handleChange = (e) => {
    // Make sure we're calling onChange with the correct value
    onChange(e.target.checked ? rightValue : leftValue);
  };

  return (
    <div className="method-container">
      <span className={`method-label ${!checked ? 'active' : ''}`}>
        <i className={`fas fa-${leftIcon}`}></i>
        {leftLabel}
      </span>
      
      <label className="switch">
        <input 
          type="checkbox" 
          checked={checked}
          onChange={handleChange}
        />
        <span className="slider round"></span>
      </label>

      <span className={`method-label ${checked ? 'active' : ''}`}>
        <i className={`fas fa-${rightIcon}`}></i>
        {rightLabel}
      </span>
    </div>
  );
};

export default ToggleSwitch;