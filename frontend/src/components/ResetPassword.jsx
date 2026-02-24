// components/ResetPassword.js
import React, { useState } from 'react';
import InputField from './common/InputField';
import PasswordField from './common/PasswordField';
import Button from './common/Button';
import useValidation from '../hooks/useValidation';
import { resetPassword } from '../services/authService';

const ResetPassword = ({ email, onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const { errors, isValid, touchField, getFieldError, touchAllFields } = useValidation(
    formData,
    'resetPassword'
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setSubmitError('');
    setSubmitSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    touchAllFields();

    if (!isValid) {
      setSubmitError('Please fix the errors before submitting');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    try {
      await resetPassword(email, formData.password);
      setSubmitSuccess('Password reset successfully!');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (error) {
      setSubmitError(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePassword = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <button
            onClick={onBack}
            className="mb-6 text-gray-600 hover:text-[#4361ee] transition-colors"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-bold mb-2 text-gray-800">Reset Password</h2>
          <p className="text-gray-600 mb-6">
            Create a new password for your account
          </p>

          <form onSubmit={handleSubmit}>
            <PasswordField
              placeholder="New Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => touchField('password')}
              showPassword={showPassword}
              onTogglePassword={() => togglePassword('password')}
              error={getFieldError('password')}
              required
            />

            <PasswordField
              placeholder="Confirm New Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={() => touchField('confirmPassword')}
              showPassword={showConfirmPassword}
              onTogglePassword={() => togglePassword('confirmPassword')}
              error={getFieldError('confirmPassword')}
              required
            />

            {/* Password strength indicator */}
            {formData.password && formData.password.length > 0 && (
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-600">Password strength:</span>
                  <span className="text-xs font-medium">
                    {formData.password.length < 8
                      ? 'Weak'
                      : /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)
                        ? 'Strong'
                        : 'Medium'}
                  </span>
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      formData.password.length < 8
                        ? 'bg-red-500 w-1/3'
                        : /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)
                          ? 'bg-green-500 w-full'
                          : 'bg-yellow-500 w-2/3'
                    }`}
                  />
                </div>
              </div>
            )}

            {submitError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{submitError}</p>
              </div>
            )}

            {submitSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600">{submitSuccess}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || !isValid}
              className="w-full mt-4"
            >
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;