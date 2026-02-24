// components/ForgotPassword.js
import React, { useState } from 'react';
import InputField from './common/InputField';
import Button from './common/Button';
import useValidation from '../hooks/useValidation';
import { sendOtp, verifyOtp } from '../services/authService';

const ForgotPassword = ({ onBack, onOtpVerified }) => {
  const [step, setStep] = useState('email'); // email, otp, reset
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [timer, setTimer] = useState(0);

  const { errors, isValid, touchField, getFieldError, touchAllFields } = useValidation(
    { email },
    'forgotPassword'
  );

  const startTimer = (duration = 60) => {
    setTimer(duration);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    touchAllFields();

    if (!isValid) {
      setSubmitError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    try {
      await sendOtp(email);
      setSubmitSuccess('OTP sent successfully to your email');
      setStep('otp');
      startTimer();
    } catch (error) {
      setSubmitError(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setSubmitError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    try {
      await verifyOtp(email, otp);
      setSubmitSuccess('OTP verified successfully');
      onOtpVerified(email);
    } catch (error) {
      setSubmitError(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    try {
      await sendOtp(email);
      setSubmitSuccess('OTP resent successfully');
      startTimer();
    } catch (error) {
      setSubmitError(error.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
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
            ← Back to Login
          </button>

          {step === 'email' && (
            <>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Forgot Password?</h2>
              <p className="text-gray-600 mb-6">
                No worries! Enter your email address and we'll send you an OTP to reset your password.
              </p>

              <form onSubmit={handleSendOtp}>
                <InputField
                  type="email"
                  placeholder="Enter your email"
                  icon="envelope"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => touchField('email')}
                  error={getFieldError('email')}
                  required
                />

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
                  disabled={isSubmitting}
                  className="w-full mt-4"
                >
                  {isSubmitting ? 'Sending...' : 'Send OTP'}
                </Button>
              </form>
            </>
          )}

          {step === 'otp' && (
            <>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Enter OTP</h2>
              <p className="text-gray-600 mb-6">
                We've sent a 6-digit OTP to {email}
              </p>

              <form onSubmit={handleVerifyOtp}>
                <InputField
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  icon="lock"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  maxLength={6}
                  required
                />

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
                  disabled={isSubmitting || otp.length !== 6}
                  className="w-full mt-4"
                >
                  {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                </Button>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={timer > 0 || isSubmitting}
                    className={`text-sm ${
                      timer > 0 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-[#4361ee] hover:underline'
                    }`}
                  >
                    {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;