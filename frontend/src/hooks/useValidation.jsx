// hooks/useValidation.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { validateForm } from '../utils/validation';

const useValidation = (formData, formType, options = {}) => {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  
  // Use ref to store previous formData to prevent unnecessary validation
  const prevFormDataRef = useRef(formData);
  const prevFormTypeRef = useRef(formType);
  const prevOptionsRef = useRef(options);

  // Memoize validate function
  const validate = useCallback(() => {
    const validationErrors = validateForm(formData, formType, options);
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0);
    return validationErrors;
  }, [formData, formType, options]); // Add dependencies here

  useEffect(() => {
    // Check if formData actually changed to prevent infinite loops
    const formDataChanged = JSON.stringify(prevFormDataRef.current) !== JSON.stringify(formData);
    const formTypeChanged = prevFormTypeRef.current !== formType;
    const optionsChanged = JSON.stringify(prevOptionsRef.current) !== JSON.stringify(options);

    if (formDataChanged || formTypeChanged || optionsChanged) {
      validate();
      
      // Update refs
      prevFormDataRef.current = formData;
      prevFormTypeRef.current = formType;
      prevOptionsRef.current = options;
    }
  }, [formData, formType, options, validate]); // Add validate to dependencies

  const touchField = useCallback((fieldName) => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));
  }, []);

  const touchAllFields = useCallback(() => {
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouchedFields(allTouched);
  }, [formData]);

  const getFieldError = useCallback((fieldName) => {
    return touchedFields[fieldName] ? errors[fieldName] : '';
  }, [touchedFields, errors]);

  const resetValidation = useCallback(() => {
    setErrors({});
    setIsValid(false);
    setTouchedFields({});
  }, []);

  return {
    errors,
    isValid,
    touchedFields,
    touchField,
    touchAllFields,
    getFieldError,
    resetValidation
  };
};

export default useValidation;