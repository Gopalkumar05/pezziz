// services/authService.js
// This is a mock service - replace with actual API calls

const API_BASE_URL =  'http://localhost:5000/api';

// Mock storage for OTPs (in production, this should be on the server)
const otpStore = new Map();

export const sendOtp = async (email) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with timestamp (expires in 10 minutes)
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    });

    // In production, send actual email here
    console.log(`OTP for ${email}: ${otp}`);
    
    // For demo purposes, store in localStorage (remove in production)
    localStorage.setItem(`otp_${email}`, JSON.stringify({
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    }));

    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    throw new Error('Failed to send OTP');
  }
};

export const verifyOtp = async (email, otp) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In production, verify with backend
    const stored = otpStore.get(email);
    
    if (!stored) {
      throw new Error('OTP not found or expired');
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(email);
      throw new Error('OTP has expired');
    }

    if (stored.otp !== otp) {
      throw new Error('Invalid OTP');
    }

    // Clear OTP after successful verification
    otpStore.delete(email);

    return { success: true, message: 'OTP verified successfully' };
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email, newPassword) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In production, call API to update password
    console.log(`Password reset for ${email}: ${newPassword}`);

    return { success: true, message: 'Password reset successfully' };
  } catch (error) {
    throw new Error('Failed to reset password');
  }
};

export const signUp = async (userData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In production, call API
    console.log('Sign up:', userData);

    return { success: true, message: 'Registration successful' };
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const signIn = async (credentials) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In production, call API
    console.log('Sign in:', credentials);

    return { success: true, message: 'Login successful', token: 'dummy-token' };
  } catch (error) {
    throw new Error('Login failed');
  }
};