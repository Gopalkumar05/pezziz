// utils/validation.js

export const validationRules = {
  fullName: (value) => {
    if (!value?.trim()) {
      return { isValid: false, message: "Full name is required" };
    }
    if (value.trim().length < 2) {
      return { isValid: false, message: "Name must be at least 2 characters" };
    }
    if (value.trim().length > 50) {
      return { isValid: false, message: "Name must be less than 50 characters" };
    }
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return { isValid: false, message: "Name can only contain letters and spaces" };
    }
    return { isValid: true, message: "" };
  },

  email: (value, required = true) => {
    if (!value?.trim()) {
      return required 
        ? { isValid: false, message: "Email is required" }
        : { isValid: true, message: "" };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { isValid: false, message: "Please enter a valid email address" };
    }
    return { isValid: true, message: "" };
  },

  mobile: (value, required = true) => {
    if (!value?.trim()) {
      return required 
        ? { isValid: false, message: "Mobile number is required" }
        : { isValid: true, message: "" };
    }
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(value)) {
      return { isValid: false, message: "Please enter a valid 10-digit mobile number" };
    }
    return { isValid: true, message: "" };
  },

  password: (value, options = { minLength: 8, requireStrong: true }) => {
    if (!value) {
      return { isValid: false, message: "Password is required" };
    }

    if (options.requireStrong) {
      const passwordChecks = {
        length: value.length >= options.minLength,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      };

      if (!passwordChecks.length) {
        return { isValid: false, message: `Password must be at least ${options.minLength} characters long` };
      }
      if (!passwordChecks.uppercase) {
        return { isValid: false, message: "Password must contain at least one uppercase letter" };
      }
      if (!passwordChecks.lowercase) {
        return { isValid: false, message: "Password must contain at least one lowercase letter" };
      }
      if (!passwordChecks.number) {
        return { isValid: false, message: "Password must contain at least one number" };
      }
      if (!passwordChecks.special) {
        return { isValid: false, message: "Password must contain at least one special character" };
      }
    } else {
      if (value.length < options.minLength) {
        return { isValid: false, message: `Password must be at least ${options.minLength} characters` };
      }
    }
    return { isValid: true, message: "" };
  },

  confirmPassword: (password, confirmPassword) => {
    if (!confirmPassword) {
      return { isValid: false, message: "Please confirm your password" };
    }
    if (password !== confirmPassword) {
      return { isValid: false, message: "Passwords do not match" };
    }
    return { isValid: true, message: "" };
  },

  credential: (email, mobile) => {
    if (!email?.trim() && !mobile?.trim()) {
      return { isValid: false, message: "Please provide either email or mobile number" };
    }
    return { isValid: true, message: "" };
  }
};

export const validateField = (fieldName, value, formData = {}, options = {}) => {
  switch (fieldName) {
    case 'fullName':
      return validationRules.fullName(value);
    case 'email':
      return validationRules.email(value, options.required);
    case 'mobile':
      return validationRules.mobile(value, options.required);
    case 'password':
      return validationRules.password(value, options);
    case 'confirmPassword':
      return validationRules.confirmPassword(formData.password, value);
    case 'credential':
      return validationRules.credential(formData.email, formData.mobile);
    default:
      return { isValid: true, message: "" };
  }
};

export const validateForm = (formData, formType, options = {}) => {
  const errors = {};

  // Ensure formData exists
  if (!formData) return errors;

  switch (formType) {
    case 'signup':
      if (formData.fullName !== undefined) {
        const nameValidation = validateField('fullName', formData.fullName);
        if (!nameValidation.isValid) errors.fullName = nameValidation.message;
      }

      if (formData.email !== undefined) {
        const emailValidation = validateField('email', formData.email, {}, { required: false });
        if (!emailValidation.isValid) errors.email = emailValidation.message;
      }

      if (formData.mobile !== undefined) {
        const mobileValidation = validateField('mobile', formData.mobile, {}, { required: false });
        if (!mobileValidation.isValid) errors.mobile = mobileValidation.message;
      }

      if (formData.password !== undefined) {
        const passwordValidation = validateField('password', formData.password, {}, { minLength: 8, requireStrong: true });
        if (!passwordValidation.isValid) errors.password = passwordValidation.message;
      }
      break;

    case 'signin':
      { const credentialValidation = validateField('credential', null, formData);
      if (!credentialValidation.isValid) errors.credential = credentialValidation.message;

      if (formData.email) {
        const emailValidation = validateField('email', formData.email, {}, { required: true });
        if (!emailValidation.isValid) errors.email = emailValidation.message;
      }

      if (formData.mobile) {
        const mobileValidation = validateField('mobile', formData.mobile, {}, { required: true });
        if (!mobileValidation.isValid) errors.mobile = mobileValidation.message;
      }

      if (formData.password !== undefined) {
        const passwordValidationSignIn = validateField('password', formData.password, {}, { minLength: 6, requireStrong: false });
        if (!passwordValidationSignIn.isValid) errors.password = passwordValidationSignIn.message;
      }
      break; }

    case 'forgotPassword':
      if (formData.email !== undefined) {
        const emailValidationFP = validateField('email', formData.email, {}, { required: true });
        if (!emailValidationFP.isValid) errors.email = emailValidationFP.message;
      }
      break;

    case 'resetPassword':
      if (formData.password !== undefined) {
        const passwordValidationRP = validateField('password', formData.password, {}, { minLength: 8, requireStrong: true });
        if (!passwordValidationRP.isValid) errors.password = passwordValidationRP.message;
      }

      if (formData.confirmPassword !== undefined) {
        const confirmPasswordValidation = validateField('confirmPassword', formData.confirmPassword, formData);
        if (!confirmPasswordValidation.isValid) errors.confirmPassword = confirmPasswordValidation.message;
      }
      break;

    default:
      break;
  }

  return errors;
};