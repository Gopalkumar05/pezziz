// import React, { useState, useEffect } from "react";
// import InputField from "./common/InputField";
// import Button from "./common/Button";
// import ToggleSwitch from "./common/ToggleSwitch";
// import PasswordField from "./common/PasswordField";

// // Custom validation hook
// const useValidation = (formData, formType) => {
//   const [errors, setErrors] = useState({});
//   const [isValid, setIsValid] = useState(false);

//   const validateSignUp = () => {
//     const newErrors = {};

//     // Full Name validation
//     if (!formData.fullName?.trim()) {
//       newErrors.fullName = "Full name is required";
//     } else if (formData.fullName.trim().length < 2) {
//       newErrors.fullName = "Name must be at least 2 characters";
//     } else if (formData.fullName.trim().length > 50) {
//       newErrors.fullName = "Name must be less than 50 characters";
//     } else if (!/^[a-zA-Z\s]*$/.test(formData.fullName)) {
//       newErrors.fullName = "Name can only contain letters and spaces";
//     }

//     // Email validation
//     if (formData.email?.trim()) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(formData.email)) {
//         newErrors.email = "Please enter a valid email address";
//       }
//     }

//     // Mobile validation
//     if (formData.mobile?.trim()) {
//       const mobileRegex = /^[0-9]{10}$/;
//       if (!mobileRegex.test(formData.mobile)) {
//         newErrors.mobile = "Please enter a valid 10-digit mobile number";
//       }
//     }

//     // Password validation
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else {
//       const passwordChecks = {
//         length: formData.password.length >= 8,
//         uppercase: /[A-Z]/.test(formData.password),
//         lowercase: /[a-z]/.test(formData.password),
//         number: /[0-9]/.test(formData.password),
//         special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
//       };

//       if (!passwordChecks.length) {
//         newErrors.password = "Password must be at least 8 characters long";
//       } else if (!passwordChecks.uppercase) {
//         newErrors.password =
//           "Password must contain at least one uppercase letter";
//       } else if (!passwordChecks.lowercase) {
//         newErrors.password =
//           "Password must contain at least one lowercase letter";
//       } else if (!passwordChecks.number) {
//         newErrors.password = "Password must contain at least one number";
//       } else if (!passwordChecks.special) {
//         newErrors.password =
//           "Password must contain at least one special character";
//       }
//     }

//     return newErrors;
//   };

//   const validateSignIn = () => {
//     const newErrors = {};

//     // Either email or mobile must be provided
//     if (!formData.email?.trim() && !formData.mobile?.trim()) {
//       newErrors.credential = "Please provide either email or mobile number";
//     } else {
//       // Validate email if provided
//       if (formData.email?.trim()) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(formData.email)) {
//           newErrors.email = "Please enter a valid email address";
//         }
//       }

//       // Validate mobile if provided
//       if (formData.mobile?.trim()) {
//         const mobileRegex = /^[0-9]{10}$/;
//         if (!mobileRegex.test(formData.mobile)) {
//           newErrors.mobile = "Please enter a valid 10-digit mobile number";
//         }
//       }
//     }

//     // Password validation
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     return newErrors;
//   };

//   useEffect(() => {
//     const validationErrors =
//       formType === "signup" ? validateSignUp() : validateSignIn();
//     setErrors(validationErrors);
//     setIsValid(Object.keys(validationErrors).length === 0);
//   }, [formData, formType]);

//   return { errors, isValid };
// };

// const Login = () => {
//   const [isSignUpActive, setIsSignUpActive] = useState(false);
//   // Set mobile as default for both
//   const [signInMethod, setSignInMethod] = useState("mobile");
//   const [signUpMethod, setSignUpMethod] = useState("mobile");

//   // Add state to control ToggleSwitch visibility (set to false to hide by default)
//   const [showToggleSwitch, setShowToggleSwitch] = useState(false);

//   // Password visibility states
//   const [showSignUpPassword, setShowSignUpPassword] = useState(false);
//   const [showSignInPassword, setShowSignInPassword] = useState(false);

//   // Form submission status
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   const [submitSuccess, setSubmitSuccess] = useState("");

//   // Form state
//   const [signUpData, setSignUpData] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     password: "",
//   });

//   const [signInData, setSignInData] = useState({
//     email: "",
//     mobile: "",
//     password: "",
//     rememberMe: false,
//   });

//   // Apply validation
//   const { errors: signUpErrors, isValid: isSignUpValid } = useValidation(
//     signUpData,
//     "signup",
//   );
//   const { errors: signInErrors, isValid: isSignInValid } = useValidation(
//     signInData,
//     "signin",
//   );

//   // Track touched fields for better UX
//   const [touchedFields, setTouchedFields] = useState({
//     signUp: {},
//     signIn: {},
//   });

//   const handleSignUpChange = (e) => {
//     console.log("SignUp - Changing field:", e.target.name, e.target.value);
//     setSignUpData({
//       ...signUpData,
//       [e.target.name]: e.target.value,
//     });

//     // Clear any previous submit messages
//     setSubmitError("");
//     setSubmitSuccess("");
//   };

//   const handleSignInChange = (e) => {
//     console.log("SignIn - Changing field:", e.target.name, e.target.value);
//     const value =
//       e.target.type === "checkbox" ? e.target.checked : e.target.value;
//     setSignInData({
//       ...signInData,
//       [e.target.name]: value,
//     });

//     // Clear any previous submit messages
//     setSubmitError("");
//     setSubmitSuccess("");
//   };

//   const handleFieldBlur = (formType, fieldName) => {
//     setTouchedFields((prev) => ({
//       ...prev,
//       [formType]: {
//         ...prev[formType],
//         [fieldName]: true,
//       },
//     }));
//   };

//   const handleSignUpSubmit = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     // Mark all fields as touched
//     const allTouched = {};
//     Object.keys(signUpData).forEach((key) => {
//       allTouched[key] = true;
//     });
//     setTouchedFields((prev) => ({
//       ...prev,
//       signUp: allTouched,
//     }));

//     if (!isSignUpValid) {
//       setSubmitError("Please fix the errors before submitting");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitError("");
//     setSubmitSuccess("");

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       console.log("Sign Up Data:", signUpData);
//       setSubmitSuccess(
//         "Registration successful! Please check your email/mobile for verification.",
//       );

//       // Optional: Reset form after successful submission
//       // setSignUpData({ fullName: '', email: '', mobile: '', password: '' });
//     } catch (error) {
//       setSubmitError("Registration failed. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSignInSubmit = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     // Mark all fields as touched
//     const allTouched = {};
//     Object.keys(signInData).forEach((key) => {
//       if (key !== "rememberMe") allTouched[key] = true;
//     });
//     setTouchedFields((prev) => ({
//       ...prev,
//       signIn: allTouched,
//     }));

//     if (!isSignInValid) {
//       setSubmitError("Please fix the errors before submitting");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitError("");
//     setSubmitSuccess("");

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       console.log("Sign In Data:", signInData);
//       setSubmitSuccess("Login successful! Redirecting...");

//       // Redirect logic here
//     } catch (error) {
//       setSubmitError("Login failed. Please check your credentials.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Toggle password visibility
//   const toggleSignUpPassword = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setShowSignUpPassword(!showSignUpPassword);
//   };

//   const toggleSignInPassword = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setShowSignInPassword(!showSignInPassword);
//   };

//   // Function to manually show toggle switch when needed (can be called from console)
//   const unhideToggleSwitch = () => {
//     setShowToggleSwitch(true);
//   };

//   // Pezzi Softech Logo SVG Component
//   const PezziLogo = ({ isWhite = false, isMobile = false }) => {
//     const primaryColor = isWhite ? "#ffffff" : "#2563EB";
//     const textColor = isWhite ? "#ffffff" : "#111827";
//     const subTextColor = isWhite ? "#ffffff" : "#374151";
//     const taglineColor = isWhite ? "#ffffff" : "#6B7280";

//     // Adjust sizes for mobile
//     const iconSize = isMobile ? 25 : 35;
//     const iconSize2 = isMobile ? 20 : 30;
//     const rectWidth = isMobile ? 60 : 80;
//     const rectHeight = isMobile ? 25 : 35;
//     const titleSize = isMobile ? 28 : 48;
//     const subTitleSize = isMobile ? 16 : 28;
//     const taglineSize = 18;
//     const translateX = isMobile ? 40 : 60;

//     return (
//       <svg
//         width="100%"
//         height={isMobile ? "40" : "60"}
//         viewBox="0 0 600 200"
//         xmlns="http://www.w3.org/2000/svg"
//         style={{ maxWidth: "100%" }}
//       >
       
//  <rect width="600" height="200" fill="transparent" />
//         <g transform={`translate(${translateX},60)`}>
//           <circle cx="50" cy="40" r={iconSize} fill={primaryColor} />
//           <circle cx="90" cy="40" r={iconSize2} fill={primaryColor} />
//           <circle cx="70" cy="20" r={iconSize2} fill={primaryColor} />
//           <rect
//             x="40"
//             y="40"
//             width={rectWidth}
//             height={rectHeight}
//             fill={primaryColor}
//           />
//           {/* Tech circuit lines */}
//           <line
//             x1="55"
//             y1="50"
//             x2="85"
//             y2="50"
//             stroke={isWhite ? "#4361ee" : "#ffffff"}
//             strokeWidth={isMobile ? "3" : "4"}
//           />
//           <circle
//             cx="55"
//             cy="50"
//             r={isMobile ? "3" : "5"}
//             fill={isWhite ? "#4361ee" : "#ffffff"}
//           />
//           <circle
//             cx="85"
//             cy="50"
//             r={isMobile ? "3" : "5"}
//             fill={isWhite ? "#4361ee" : "#ffffff"}
//           />
//         </g>

//         <text
//           x={isMobile ? "140" : "200"}
//           y={isMobile ? "80" : "100"}
//           fontFamily="Arial, Helvetica, sans-serif"
//           fontSize={titleSize}
//           fontWeight="bold"
//           fill={textColor}
//         >
//           Pezzi
//         </text>

//         <text
//           x={isMobile ? "140" : "200"}
//           y={isMobile ? "110" : "140"}
//           fontFamily="Arial, Helvetica, sans-serif"
//           fontSize={subTitleSize}
//           fill={subTextColor}
//         >
//           {isMobile ? "Softech" : "Softech India LLP"}
//         </text>

//         {!isMobile && (
//           <text
//             x="200"
//             y="170"
//             fontFamily="Arial, Helvetica, sans-serif"
//             fontSize={taglineSize}
//             fill={taglineColor}
//           >
//             Cloud Payroll & Attendance Solutions
//           </text>
//         )}
//       </svg>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center p-2 sm:p-4">
//       {/* Hidden developer button to unhide toggle switch - can be removed in production */}
//       {process.env.NODE_ENV === "development" && (
//         <button
//           onClick={() => setShowToggleSwitch(!showToggleSwitch)}
//           className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700 transition-colors"
//         >
//           {showToggleSwitch ? "Hide" : "Show"} Toggle
//         </button>
//       )}

//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="relative w-full max-w-4xl min-h-[500px] sm:min-h-[550px] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
//         {/* Sign Up Form */}
//         <div
//           className={`
//           absolute top-0 h-full w-full md:w-1/2 flex justify-center items-center
//           transition-all duration-700 ease-in-out left-0
//           ${isSignUpActive ? "translate-x-0 opacity-100 z-10 md:translate-x-full" : "translate-x-0 opacity-0 z-0 md:translate-x-0"}
//         `}
//         >
//           <form
//             className="w-11/12 sm:w-4/5 flex flex-col items-center"
//             onSubmit={handleSignUpSubmit}
//             noValidate
//           >
//             <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-gray-800">
//               Create Account
//             </h1>

//             {/* ToggleSwitch - hidden by default, shows only when showToggleSwitch is true */}
//             {showToggleSwitch && (
//               <ToggleSwitch
//                 leftLabel="Email"
//                 rightLabel="Mobile"
//                 leftIcon="envelope"
//                 rightIcon="phone"
//                 checked={signUpMethod === "mobile"}
//                 onChange={setSignUpMethod}
//                 leftValue="email"
//                 rightValue="mobile"
//               />
//             )}

//             <InputField
//               type="text"
//               placeholder="Full Name"
//               icon="user"
//               name="fullName"
//               value={signUpData.fullName}
//               onChange={handleSignUpChange}
//               onBlur={() => handleFieldBlur("signUp", "fullName")}
//               // error={touchedFields.signUp.fullName ? signUpErrors.fullName : ''}
//               required
//             />

//             {/* Show Mobile field first (preferred) */}
//             {signUpMethod === "mobile" ? (
//               <InputField
//                 type="tel"
//                 placeholder="Enter Your Mobile Number"
//                 icon="phone"
//                 name="mobile"
//                 value={signUpData.mobile}
//                 onChange={handleSignUpChange}
//                 onBlur={() => handleFieldBlur("signUp", "mobile")}
//                 onKeyPress={(e) => {
//                   // Allow only numbers (0-9)
//                   if (!/[0-9]/.test(e.key)) {
//                     e.preventDefault();
//                   }
//                 }}
//                 onInput={(e) => {
//                   // Remove any non-numeric characters if they somehow get through
//                   e.target.value = e.target.value.replace(/[^0-9]/g, "");
//                 }}
//                 // error={touchedFields.signUp.mobile ? signUpErrors.mobile : ''}
//                 pattern="[0-9]{10}"
//                 title="Please enter 10 digit mobile number"
//                 maxLength={10}
//                 required
//               />
//             ) : (
//               <InputField
//                 type="email"
//                 placeholder="Enter Your Email"
//                 icon="envelope"
//                 name="email"
//                 value={signUpData.email}
//                 onChange={handleSignUpChange}
//                 onBlur={() => handleFieldBlur("signUp", "email")}
//                 // error={touchedFields.signUp.email ? signUpErrors.email : ''}
//                 required
//               />
//             )}

//             {/* Password field */}
//             <PasswordField
//               placeholder="Enter Your Password"
//               name="password"
//               value={signUpData.password}
//               onChange={handleSignUpChange}
//               onBlur={() => handleFieldBlur("signUp", "password")}
//               showPassword={showSignUpPassword}
//               onTogglePassword={toggleSignUpPassword}
//               // error={touchedFields.signUp.password ? signUpErrors.password : ''}
//               required
//             />

//             {/* Password strength indicator */}
//             {signUpData.password && signUpData.password.length > 0 && (
//               <div className="w-full mb-4">
//                 <div className="flex justify-between mb-1">
//                   <span className="text-xs text-gray-600">
//                     Password strength:
//                   </span>
//                   <span className="text-xs font-medium">
//                     {signUpData.password.length < 8
//                       ? "Weak"
//                       : /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
//                             signUpData.password,
//                           )
//                         ? "Strong"
//                         : "Medium"}
//                   </span>
//                 </div>
//                 <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className={`h-full transition-all duration-300 ${
//                       signUpData.password.length < 8
//                         ? "bg-red-500 w-1/3"
//                         : /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
//                               signUpData.password,
//                             )
//                           ? "bg-green-500 w-full"
//                           : "bg-yellow-500 w-2/3"
//                     }`}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Submit messages */}
//             {submitError && (
//               <div className="w-full mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-xs text-red-600 text-center">
//                   {submitError}
//                 </p>
//               </div>
//             )}

//             {submitSuccess && (
//               <div className="w-full mb-4 p-2 bg-green-50 border border-green-200 rounded-lg">
//                 <p className="text-xs text-green-600 text-center">
//                   {submitSuccess}
//                 </p>
//               </div>
//             )}

//             <Button
//               type="submit"
//               variant="primary"
//               disabled={isSubmitting || !isSignUpValid}
//               className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
//             >
//               {isSubmitting ? "Creating Account..." : "Sign Up"}
//             </Button>

//             {/* Mobile-only switch to Sign In */}
//             <p className="mt-4 text-sm text-gray-600 md:hidden">
//               Already have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => setIsSignUpActive(false)}
//                 className="text-[#4361ee] font-semibold hover:underline focus:outline-none"
//               >
//                 Sign In
//               </button>
//             </p>
//           </form>
//         </div>

//         {/* Sign In Form */}
//         <div
//           className={`
//           absolute top-0 h-full w-full md:w-1/2 flex justify-center items-center
//           transition-all duration-700 ease-in-out left-0
//           ${isSignUpActive ? "translate-x-0 opacity-0 z-0 md:translate-x-full" : "translate-x-0 opacity-100 z-10 md:translate-x-0"}
//         `}
//         >
//           <form
//             className="w-11/12 sm:w-4/5 flex flex-col items-center"
//             onSubmit={handleSignInSubmit}
//             noValidate
//           >
//             <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-gray-800">
//               Sign In
//             </h1>

//             {/* ToggleSwitch - hidden by default, shows only when showToggleSwitch is true */}
//             {showToggleSwitch && (
//               <ToggleSwitch
//                 leftLabel="Email"
//                 rightLabel="Mobile"
//                 leftIcon="envelope"
//                 rightIcon="phone"
//                 checked={signInMethod === "mobile"}
//                 onChange={setSignInMethod}
//                 leftValue="email"
//                 rightValue="mobile"
//               />
//             )}

//             {/* Show credential error if both fields are empty */}
//             {touchedFields.signIn.credential && signInErrors.credential && (
//               <div className="w-full mb-2">
//                 <p className="text-xs text-red-500">
//                   {signInErrors.credential}
//                 </p>
//               </div>
//             )}

//             {/* Show Mobile field first (preferred) */}
//             {signInMethod === "mobile" ? (
//               <InputField
//                 type="tel"
//                 placeholder="Enter Your Mobile Number"
//                 icon="phone"
//                 name="mobile"
//                 value={signInData.mobile}
//                 onChange={handleSignInChange}
//                 onBlur={() => handleFieldBlur("signIn", "mobile")}
//                 onKeyPress={(e) => {
//                   // Allow only numbers (0-9)
//                   if (!/[0-9]/.test(e.key)) {
//                     e.preventDefault();
//                   }
//                 }}
//                 onInput={(e) => {
//                   // Remove any non-numeric characters if they somehow get through
//                   e.target.value = e.target.value.replace(/[^0-9]/g, "");
//                 }}
//                 // error={touchedFields.signIn.mobile ? signInErrors.mobile : ''}
//                 pattern="[0-9]{10}"
//                 title="Please enter 10 digit mobile number"
//                 maxLength={10}
//                 required
//               />
//             ) : (
//               <InputField
//                 type="email"
//                 placeholder="Enter the UserId"
//                 icon="envelope"
//                 name="email"
//                 value={signInData.email}
//                 onChange={handleSignInChange}
//                 onBlur={() => handleFieldBlur("signIn", "email")}
//                 // error={touchedFields.signIn.email ? signInErrors.email : ''}
//                 required
//               />
//             )}

//             {/* Password field */}
//             <PasswordField
//               placeholder="Password"
//               name="password"
//               value={signInData.password}
//               onChange={handleSignInChange}
//               onBlur={() => handleFieldBlur("signIn", "password")}
//               showPassword={showSignInPassword}
//               onTogglePassword={toggleSignInPassword}
//               // error={touchedFields.signIn.password ? signInErrors.password : ''}
//               required
//             />

//             <div className="flex items-center justify-between w-full my-2.5">
//               <label className="flex items-center text-xs sm:text-sm text-gray-600 whitespace-nowrap">
//                 <input
//                   type="checkbox"
//                   name="rememberMe"
//                   checked={signInData.rememberMe}
//                   onChange={handleSignInChange}
//                   className="mr-2 rounded"
//                 />
//                 Remember me
//               </label>
//               <a
//                 href="#"
//                 className="text-xs sm:text-sm text-gray-600 hover:text-[#4361ee] whitespace-nowrap ml-2"
//               >
//                 Forgot password?
//               </a>
//             </div>

//             {/* Submit messages */}
//             {submitError && (
//               <div className="w-full mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-xs text-red-600 text-center">
//                   {submitError}
//                 </p>
//               </div>
//             )}

//             {submitSuccess && (
//               <div className="w-full mb-4 p-2 bg-green-50 border border-green-200 rounded-lg">
//                 <p className="text-xs text-green-600 text-center">
//                   {submitSuccess}
//                 </p>
//               </div>
//             )}

//             <Button
//               type="submit"
//               variant="primary"
//               disabled={isSubmitting || !isSignInValid}
//               className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
//             >
//               {isSubmitting ? "Signing In..." : "Sign In"}
//             </Button>

//             {/* Register Link for New Users */}
//             <p className="mt-4 text-xs sm:text-sm text-gray-600">
//               New user?{" "}
//               <button
//                 type="button"
//                 onClick={() => setIsSignUpActive(true)}
//                 className="text-[#4361ee] font-semibold hover:underline focus:outline-none"
//               >
//                 Register here
//               </button>
//             </p>
//           </form>
//         </div>

//         {/* Overlay Container - Keep existing overlay code */}
//         <div
//           className={`hidden md:block absolute top-0 left-0 md:left-1/2 w-full md:w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-20 ${
//             isSignUpActive ? "md:-translate-x-full" : "md:translate-x-0"
//           }`}
//         >
//           <div
//             className={`relative -left-full md:-left-full w-full md:w-[200%] h-full bg-gradient-to-r from-[#4361ee] to-[#3a0ca3] text-white transition-all duration-700 ease-in-out ${
//               isSignUpActive ? "md:translate-x-1/2" : "md:translate-x-0"
//             }`}
//           >
//             {/* Overlay Left */}
//             <div
//               className={`absolute w-full md:w-1/2 h-full flex flex-col justify-center items-center text-center p-8 transition-all duration-700 ease-in-out top-0 left-0 ${
//                 isSignUpActive
//                   ? "md:translate-x-0 opacity-100"
//                   : "md:-translate-x-1/5 opacity-0"
//               }`}
//             >
//               <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
//               <p className="mb-4">Already have an account?</p>

//               {/* Toggle Switch for Sign In Method - also hidden based on showToggleSwitch */}
//               {showToggleSwitch && (
//                 <div className="bg-white/20 rounded-full p-2 mb-6 w-full max-w-[250px]">
//                   <div className="flex items-center justify-center gap-2">
//                     <span
//                       className={`text-sm font-medium transition-colors ${
//                         signInMethod === "email"
//                           ? "text-white"
//                           : "text-white/60"
//                       }`}
//                     >
//                       <i className="fas fa-envelope mr-1"></i>
//                       Email
//                     </span>

//                     <label className="switch">
//                       <input
//                         type="checkbox"
//                         checked={signInMethod === "mobile"}
//                         onChange={(e) =>
//                           setSignInMethod(e.target.checked ? "mobile" : "email")
//                         }
//                       />
//                       <span className="slider round bg-white/30"></span>
//                     </label>

//                     <span
//                       className={`text-sm font-medium transition-colors ${
//                         signInMethod === "mobile"
//                           ? "text-white"
//                           : "text-white/60"
//                       }`}
//                     >
//                       <i className="fas fa-phone mr-1"></i>
//                       Mobile
//                     </span>
//                   </div>
//                 </div>
//               )}

//               <Button
//                 onClick={() => setIsSignUpActive(false)}
//                 variant="ghost"
//                 className="mt-2"
//               >
//                 Sign In with {signInMethod === "email" ? "Email" : "Mobile"}
//               </Button>
//             </div>

//             {/* Overlay Right */}
//             <div
//               className={`absolute w-full md:w-1/2 h-full flex flex-col justify-center items-center p-8 transition-all duration-700 ease-in-out top-0 right-0 ${
//                 isSignUpActive
//                   ? "md:translate-x-0 opacity-0"
//                   : "md:translate-x-0 opacity-100"
//               }`}
//             >
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full">
//                 <div className="hidden sm:block">
//                   <PezziLogo isWhite={true} isMobile={false} />
//                 </div>
//                 <div className="block sm:hidden">
//                   <PezziLogo isWhite={true} isMobile={true} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         /* Toggle Switch Styles */
//         .switch {
//           position: relative;
//           display: inline-block;
//           width: 46px;
//           height: 22px;
//           margin: 0 4px;
//         }

//         @media (min-width: 768px) {
//           .switch {
//             width: 50px;
//             height: 24px;
//             margin: 0 8px;
//           }
//         }

//         .switch input {
//           opacity: 0;
//           width: 0;
//           height: 0;
//           z-index: 10;
//           position: relative;
//           cursor: pointer;
//         }

//         .slider {
//           position: absolute;
//           cursor: pointer;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: #ccc;
//           transition: .3s;
//         }

//         .slider:before {
//           position: absolute;
//           content: "";
//           height: 16px;
//           width: 16px;
//           left: 3px;
//           bottom: 3px;
//           background-color: white;
//           transition: .3s;
//         }

//         @media (min-width: 768px) {
//           .slider:before {
//             height: 18px;
//             width: 18px;
//           }
//         }

//         input:checked + .slider {
//           background-color: #4361ee;
//         }

//         input:focus + .slider {
//           box-shadow: 0 0 1px #4361ee;
//         }

//         input:checked + .slider:before {
//           transform: translateX(24px);
//         }

//         @media (min-width: 768px) {
//           input:checked + .slider:before {
//             transform: translateX(26px);
//           }
//         }

//         .slider.round {
//           border-radius: 24px;
//         }

//         .slider.round:before {
//           border-radius: 50%;
//         }

//         .method-container {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-bottom: 16px;
//           background: #f3f4f6;
//           padding: 6px 12px;
//           border-radius: 40px;
//           width: 100%;
//         }

//         @media (min-width: 768px) {
//           .method-container {
//             margin-bottom: 20px;
//             padding: 8px 16px;
//           }
//         }

//         .method-label {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           font-size: 12px;
//           color: #4b5563;
//         }

//         @media (min-width: 768px) {
//           .method-label {
//             gap: 6px;
//             font-size: 14px;
//           }
//         }

//         .method-label.active {
//           color: #4361ee;
//           font-weight: 500;
//         }

//         .method-label i {
//           font-size: 12px;
//         }

//         @media (min-width: 768px) {
//           .method-label i {
//             font-size: 14px;
//           }
//         }
//  @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }



//       `}</style>
//     </div>
//   );
// };

// export default Login;


// import React, { useState, useEffect } from "react";
// import InputField from "./common/InputField";
// import Button from "./common/Button";
// import ToggleSwitch from "./common/ToggleSwitch";
// import PasswordField from "./common/PasswordField";

// // Custom validation hook
// const useValidation = (formData, formType) => {
//   const [errors, setErrors] = useState({});
//   const [isValid, setIsValid] = useState(false);

//   const validateSignUp = () => {
//     const newErrors = {};

//     // Full Name validation
//     if (!formData.fullName?.trim()) {
//       newErrors.fullName = "Full name is required";
//     } else if (formData.fullName.trim().length < 2) {
//       newErrors.fullName = "Name must be at least 2 characters";
//     } else if (formData.fullName.trim().length > 50) {
//       newErrors.fullName = "Name must be less than 50 characters";
//     } else if (!/^[a-zA-Z\s]*$/.test(formData.fullName)) {
//       newErrors.fullName = "Name can only contain letters and spaces";
//     }

//     // Email validation
//     if (formData.email?.trim()) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(formData.email)) {
//         newErrors.email = "Please enter a valid email address";
//       }
//     }

//     // Mobile validation
//     if (formData.mobile?.trim()) {
//       const mobileRegex = /^[0-9]{10}$/;
//       if (!mobileRegex.test(formData.mobile)) {
//         newErrors.mobile = "Please enter a valid 10-digit mobile number";
//       }
//     }

//     // Password validation
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else {
//       const passwordChecks = {
//         length: formData.password.length >= 8,
//         uppercase: /[A-Z]/.test(formData.password),
//         lowercase: /[a-z]/.test(formData.password),
//         number: /[0-9]/.test(formData.password),
//         special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
//       };

//       if (!passwordChecks.length) {
//         newErrors.password = "Password must be at least 8 characters long";
//       } else if (!passwordChecks.uppercase) {
//         newErrors.password =
//           "Password must contain at least one uppercase letter";
//       } else if (!passwordChecks.lowercase) {
//         newErrors.password =
//           "Password must contain at least one lowercase letter";
//       } else if (!passwordChecks.number) {
//         newErrors.password = "Password must contain at least one number";
//       } else if (!passwordChecks.special) {
//         newErrors.password =
//           "Password must contain at least one special character";
//       }
//     }

//     return newErrors;
//   };

//   const validateSignIn = () => {
//     const newErrors = {};

//     // Either email or mobile must be provided
//     if (!formData.email?.trim() && !formData.mobile?.trim()) {
//       newErrors.credential = "Please provide either email or mobile number";
//     } else {
//       // Validate email if provided
//       if (formData.email?.trim()) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(formData.email)) {
//           newErrors.email = "Please enter a valid email address";
//         }
//       }

//       // Validate mobile if provided
//       if (formData.mobile?.trim()) {
//         const mobileRegex = /^[0-9]{10}$/;
//         if (!mobileRegex.test(formData.mobile)) {
//           newErrors.mobile = "Please enter a valid 10-digit mobile number";
//         }
//       }
//     }

//     // Password validation
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     return newErrors;
//   };

//   useEffect(() => {
//     const validationErrors =
//       formType === "signup" ? validateSignUp() : validateSignIn();
//     setErrors(validationErrors);
//     setIsValid(Object.keys(validationErrors).length === 0);
//   }, [formData, formType]);

//   return { errors, isValid };
// };

// const Login = () => {
//   const [isSignUpActive, setIsSignUpActive] = useState(false);
//   // Set mobile as default for both
//   const [signInMethod, setSignInMethod] = useState("mobile");
//   const [signUpMethod, setSignUpMethod] = useState("mobile");

//   // Add state to control ToggleSwitch visibility (set to false to hide by default)
//   const [showToggleSwitch, setShowToggleSwitch] = useState(false);

//   // Password visibility states
//   const [showSignUpPassword, setShowSignUpPassword] = useState(false);
//   const [showSignInPassword, setShowSignInPassword] = useState(false);

//   // Form submission status
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   const [submitSuccess, setSubmitSuccess] = useState("");

//   // Form state
//   const [signUpData, setSignUpData] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     password: "",
//   });

//   const [signInData, setSignInData] = useState({
//     email: "",
//     mobile: "",
//     password: "",
//     rememberMe: false,
//   });

//   // Apply validation
//   const { errors: signUpErrors, isValid: isSignUpValid } = useValidation(
//     signUpData,
//     "signup",
//   );
//   const { errors: signInErrors, isValid: isSignInValid } = useValidation(
//     signInData,
//     "signin",
//   );

//   // Track touched fields for better UX
//   const [touchedFields, setTouchedFields] = useState({
//     signUp: {},
//     signIn: {},
//   });

//   const handleSignUpChange = (e) => {
//     console.log("SignUp - Changing field:", e.target.name, e.target.value);
//     setSignUpData({
//       ...signUpData,
//       [e.target.name]: e.target.value,
//     });

//     // Clear any previous submit messages
//     setSubmitError("");
//     setSubmitSuccess("");
//   };

//   const handleSignInChange = (e) => {
//     console.log("SignIn - Changing field:", e.target.name, e.target.value);
//     const value =
//       e.target.type === "checkbox" ? e.target.checked : e.target.value;
//     setSignInData({
//       ...signInData,
//       [e.target.name]: value,
//     });

//     // Clear any previous submit messages
//     setSubmitError("");
//     setSubmitSuccess("");
//   };

//   const handleFieldBlur = (formType, fieldName) => {
//     setTouchedFields((prev) => ({
//       ...prev,
//       [formType]: {
//         ...prev[formType],
//         [fieldName]: true,
//       },
//     }));
//   };

//   const handleSignUpSubmit = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     // Mark all fields as touched
//     const allTouched = {};
//     Object.keys(signUpData).forEach((key) => {
//       allTouched[key] = true;
//     });
//     setTouchedFields((prev) => ({
//       ...prev,
//       signUp: allTouched,
//     }));

//     if (!isSignUpValid) {
//       setSubmitError("Please fix the errors before submitting");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitError("");
//     setSubmitSuccess("");

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       console.log("Sign Up Data:", signUpData);
//       setSubmitSuccess(
//         "Registration successful! Please check your email/mobile for verification.",
//       );

//       // Optional: Reset form after successful submission
//       // setSignUpData({ fullName: '', email: '', mobile: '', password: '' });
//     } catch (error) {
//       setSubmitError("Registration failed. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSignInSubmit = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     // Mark all fields as touched
//     const allTouched = {};
//     Object.keys(signInData).forEach((key) => {
//       if (key !== "rememberMe") allTouched[key] = true;
//     });
//     setTouchedFields((prev) => ({
//       ...prev,
//       signIn: allTouched,
//     }));

//     if (!isSignInValid) {
//       setSubmitError("Please fix the errors before submitting");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitError("");
//     setSubmitSuccess("");

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       console.log("Sign In Data:", signInData);
//       setSubmitSuccess("Login successful! Redirecting...");

//       // Redirect logic here
//     } catch (error) {
//       setSubmitError("Login failed. Please check your credentials.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Toggle password visibility
//   const toggleSignUpPassword = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setShowSignUpPassword(!showSignUpPassword);
//   };

//   const toggleSignInPassword = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setShowSignInPassword(!showSignInPassword);
//   };

//   // Function to manually show toggle switch when needed (can be called from console)
//   const unhideToggleSwitch = () => {
//     setShowToggleSwitch(true);
//   };

//   // New Simple Pezzi Logo SVG Component
//   const PezziLogo = () => (
//     <svg
//       width="200"
//       height="80"
//       viewBox="0 0 1200 400"
//       xmlns="http://www.w3.org/2000/svg"
//       style={{ maxWidth: "100%", height: "auto" }}
//     >
//       <defs>
//         <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
//           <stop offset="0%" stopColor="#f7f7f7" />
//           <stop offset="100%" stopColor="#f7f7f7" />
//         </linearGradient>
//       </defs>

//       {/* Text Logo */}
//       <text
//         x="40"
//         y="290"
//         fontFamily="Arial, Helvetica, sans-serif"
//         fontWeight="900"
//         fontSize="260"
//         fill="url(#grad)"
//         letterSpacing="5"
//       >
//         Pezzi
//       </text>
//     </svg>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center p-2 sm:p-4">
//       {/* Hidden developer button to unhide toggle switch - can be removed in production */}
//       {process.env.NODE_ENV === "development" && (
//         <button
//           onClick={() => setShowToggleSwitch(!showToggleSwitch)}
//           className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700 transition-colors"
//         >
//           {showToggleSwitch ? "Hide" : "Show"} Toggle
//         </button>
//       )}

//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="relative w-full max-w-4xl min-h-[500px] sm:min-h-[550px] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
//         {/* Sign Up Form */}
//         <div
//           className={`
//           absolute top-0 h-full w-full md:w-1/2 flex justify-center items-center
//           transition-all duration-700 ease-in-out left-0
//           ${isSignUpActive ? "translate-x-0 opacity-100 z-10 md:translate-x-full" : "translate-x-0 opacity-0 z-0 md:translate-x-0"}
//         `}
//         >
//           <form
//             className="w-11/12 sm:w-4/5 flex flex-col items-center"
//             onSubmit={handleSignUpSubmit}
//             noValidate
//           >
//  <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-12 text-blue-800">
//            Pezzi
//             </h1>

//             <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-gray-800">
//               Create Account
//             </h1>

//             {/* ToggleSwitch - hidden by default, shows only when showToggleSwitch is true */}
//             {showToggleSwitch && (
//               <ToggleSwitch
//                 leftLabel="Email"
//                 rightLabel="Mobile"
//                 leftIcon="envelope"
//                 rightIcon="phone"
//                 checked={signUpMethod === "mobile"}
//                 onChange={setSignUpMethod}
//                 leftValue="email"
//                 rightValue="mobile"
//               />
//             )}

//             <InputField
//               type="text"
//               placeholder="Full Name"
//               icon="user"
//               name="fullName"
//               value={signUpData.fullName}
//               onChange={handleSignUpChange}
//               onBlur={() => handleFieldBlur("signUp", "fullName")}
//               // error={touchedFields.signUp.fullName ? signUpErrors.fullName : ''}
//               required
//             />

//             {/* Show Mobile field first (preferred) */}
//             {signUpMethod === "mobile" ? (
//               <InputField
//                 type="tel"
//                 placeholder="Enter Your Mobile Number"
//                 icon="phone"
//                 name="mobile"
//                 value={signUpData.mobile}
//                 onChange={handleSignUpChange}
//                 onBlur={() => handleFieldBlur("signUp", "mobile")}
//                 onKeyPress={(e) => {
//                   // Allow only numbers (0-9)
//                   if (!/[0-9]/.test(e.key)) {
//                     e.preventDefault();
//                   }
//                 }}
//                 onInput={(e) => {
//                   // Remove any non-numeric characters if they somehow get through
//                   e.target.value = e.target.value.replace(/[^0-9]/g, "");
//                 }}
//                 // error={touchedFields.signUp.mobile ? signUpErrors.mobile : ''}
//                 pattern="[0-9]{10}"
//                 title="Please enter 10 digit mobile number"
//                 maxLength={10}
//                 required
//               />
//             ) : (
//               <InputField
//                 type="email"
//                 placeholder="Enter Your Email"
//                 icon="envelope"
//                 name="email"
//                 value={signUpData.email}
//                 onChange={handleSignUpChange}
//                 onBlur={() => handleFieldBlur("signUp", "email")}
//                 // error={touchedFields.signUp.email ? signUpErrors.email : ''}
//                 required
//               />
//             )}

//             {/* Password field */}
//             <PasswordField
//               placeholder="Enter Your Password"
//               name="password"
//               value={signUpData.password}
//               onChange={handleSignUpChange}
//               onBlur={() => handleFieldBlur("signUp", "password")}
//               showPassword={showSignUpPassword}
//               onTogglePassword={toggleSignUpPassword}
//               // error={touchedFields.signUp.password ? signUpErrors.password : ''}
//               required
//             />

//             {/* Password strength indicator */}
//             {signUpData.password && signUpData.password.length > 0 && (
//               <div className="w-full mb-4">
//                 <div className="flex justify-between mb-1">
//                   <span className="text-xs text-gray-600">
//                     Password strength:
//                   </span>
//                   <span className="text-xs font-medium">
//                     {signUpData.password.length < 8
//                       ? "Weak"
//                       : /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
//                             signUpData.password,
//                           )
//                         ? "Strong"
//                         : "Medium"}
//                   </span>
//                 </div>
//                 <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className={`h-full transition-all duration-300 ${
//                       signUpData.password.length < 8
//                         ? "bg-red-500 w-1/3"
//                         : /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
//                               signUpData.password,
//                             )
//                           ? "bg-green-500 w-full"
//                           : "bg-yellow-500 w-2/3"
//                     }`}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Submit messages */}
//             {submitError && (
//               <div className="w-full mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-xs text-red-600 text-center">
//                   {submitError}
//                 </p>
//               </div>
//             )}

//             {submitSuccess && (
//               <div className="w-full mb-4 p-2 bg-green-50 border border-green-200 rounded-lg">
//                 <p className="text-xs text-green-600 text-center">
//                   {submitSuccess}
//                 </p>
//               </div>
//             )}

//             <Button
//               type="submit"
//               variant="primary"
//               disabled={isSubmitting || !isSignUpValid}
//               className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
//             >
//               {isSubmitting ? "Creating Account..." : "Sign Up"}
//             </Button>

//             {/* Mobile-only switch to Sign In */}
//             <p className="mt-4 text-sm text-gray-600 md:hidden">
//               Already have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => setIsSignUpActive(false)}
//                 className="text-[#4361ee] font-semibold hover:underline focus:outline-none"
//               >
//                 Sign In
//               </button>
//             </p>
//           </form>
//         </div>

//         {/* Sign In Form */}
//         <div
//           className={`
//           absolute top-0 h-full w-full md:w-1/2 flex justify-center items-center
//           transition-all duration-700 ease-in-out left-0
//           ${isSignUpActive ? "translate-x-0 opacity-0 z-0 md:translate-x-full" : "translate-x-0 opacity-100 z-10 md:translate-x-0"}
//         `}
//         >
//           <form
//             className="w-11/12 sm:w-4/5 flex flex-col items-center"
//             onSubmit={handleSignInSubmit}
//             noValidate
//           >
//              <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-12 text-blue-800">
//            Pezzi
//             </h1>
//             <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-gray-800">
//               Sign In
//             </h1>

//             {/* ToggleSwitch - hidden by default, shows only when showToggleSwitch is true */}
//             {showToggleSwitch && (
//               <ToggleSwitch
//                 leftLabel="Email"
//                 rightLabel="Mobile"
//                 leftIcon="envelope"
//                 rightIcon="phone"
//                 checked={signInMethod === "mobile"}
//                 onChange={setSignInMethod}
//                 leftValue="email"
//                 rightValue="mobile"
//               />
//             )}

//             {/* Show credential error if both fields are empty */}
//             {touchedFields.signIn.credential && signInErrors.credential && (
//               <div className="w-full mb-2">
//                 <p className="text-xs text-red-500">
//                   {signInErrors.credential}
//                 </p>
//               </div>
//             )}

//             {/* Show Mobile field first (preferred) */}
//             {signInMethod === "mobile" ? (
//               <InputField
//                 type="tel"
//                 placeholder="Enter Your Mobile Number"
//                 icon="phone"
//                 name="mobile"
//                 value={signInData.mobile}
//                 onChange={handleSignInChange}
//                 onBlur={() => handleFieldBlur("signIn", "mobile")}
//                 onKeyPress={(e) => {
//                   // Allow only numbers (0-9)
//                   if (!/[0-9]/.test(e.key)) {
//                     e.preventDefault();
//                   }
//                 }}
//                 onInput={(e) => {
//                   // Remove any non-numeric characters if they somehow get through
//                   e.target.value = e.target.value.replace(/[^0-9]/g, "");
//                 }}
//                 // error={touchedFields.signIn.mobile ? signInErrors.mobile : ''}
//                 pattern="[0-9]{10}"
//                 title="Please enter 10 digit mobile number"
//                 maxLength={10}
//                 required
//               />
//             ) : (
//               <InputField
//                 type="email"
//                 placeholder="Enter the UserId"
//                 icon="envelope"
//                 name="email"
//                 value={signInData.email}
//                 onChange={handleSignInChange}
//                 onBlur={() => handleFieldBlur("signIn", "email")}
//                 // error={touchedFields.signIn.email ? signInErrors.email : ''}
//                 required
//               />
//             )}

//             {/* Password field */}
//             <PasswordField
//               placeholder="Password"
//               name="password"
//               value={signInData.password}
//               onChange={handleSignInChange}
//               onBlur={() => handleFieldBlur("signIn", "password")}
//               showPassword={showSignInPassword}
//               onTogglePassword={toggleSignInPassword}
//               // error={touchedFields.signIn.password ? signInErrors.password : ''}
//               required
//             />

//             <div className="flex items-center justify-between w-full my-2.5">
//               <label className="flex items-center text-xs sm:text-sm text-gray-600 whitespace-nowrap">
//                 <input
//                   type="checkbox"
//                   name="rememberMe"
//                   checked={signInData.rememberMe}
//                   onChange={handleSignInChange}
//                   className="mr-2 rounded"
//                 />
//                 Remember me
//               </label>
//               <a
//                 href="#"
//                 className="text-xs sm:text-sm text-gray-600 hover:text-[#4361ee] whitespace-nowrap ml-2"
//               >
//                 Forgot password?
//               </a>
//             </div>

//             {/* Submit messages */}
//             {submitError && (
//               <div className="w-full mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-xs text-red-600 text-center">
//                   {submitError}
//                 </p>
//               </div>
//             )}

//             {submitSuccess && (
//               <div className="w-full mb-4 p-2 bg-green-50 border border-green-200 rounded-lg">
//                 <p className="text-xs text-green-600 text-center">
//                   {submitSuccess}
//                 </p>
//               </div>
//             )}

//             <Button
//               type="submit"
//               variant="primary"
//               disabled={isSubmitting || !isSignInValid}
//               className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
//             >
//               {isSubmitting ? "Signing In..." : "Sign In"}
//             </Button>

//             {/* Register Link for New Users */}
//             <p className="mt-4 text-xs sm:text-sm text-gray-600">
//               New user?{" "}
//               <button
//                 type="button"
//                 onClick={() => setIsSignUpActive(true)}
//                 className="text-[#4361ee] font-semibold hover:underline focus:outline-none"
//               >
//                 Register here
//               </button>
//             </p>
//           </form>
//         </div>

//         {/* Overlay Container - Keep existing overlay code */}
//         <div
//           className={`hidden md:block absolute top-0 left-0 md:left-1/2 w-full md:w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-20 ${
//             isSignUpActive ? "md:-translate-x-full" : "md:translate-x-0"
//           }`}
//         >
//           <div
//             className={`relative -left-full md:-left-full w-full md:w-[200%] h-full bg-gradient-to-r from-[#4361ee] to-[#3a0ca3] text-white transition-all duration-700 ease-in-out ${
//               isSignUpActive ? "md:translate-x-1/2" : "md:translate-x-0"
//             }`}
//           >
//             {/* Overlay Left */}
//             <div
//               className={`absolute w-full md:w-1/2 h-full flex flex-col justify-center items-center text-center p-8 transition-all duration-700 ease-in-out top-0 left-0 ${
//                 isSignUpActive
//                   ? "md:translate-x-0 opacity-100"
//                   : "md:-translate-x-1/5 opacity-0"
//               }`}
//             >
//               <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
//               <p className="mb-4">Already have an account?</p>

//               {/* Toggle Switch for Sign In Method - also hidden based on showToggleSwitch */}
//               {showToggleSwitch && (
//                 <div className="bg-white/20 rounded-full p-2 mb-6 w-full max-w-[250px]">
//                   <div className="flex items-center justify-center gap-2">
//                     <span
//                       className={`text-sm font-medium transition-colors ${
//                         signInMethod === "email"
//                           ? "text-white"
//                           : "text-white/60"
//                       }`}
//                     >
//                       <i className="fas fa-envelope mr-1"></i>
//                       Email
//                     </span>

//                     <label className="switch">
//                       <input
//                         type="checkbox"
//                         checked={signInMethod === "mobile"}
//                         onChange={(e) =>
//                           setSignInMethod(e.target.checked ? "mobile" : "email")
//                         }
//                       />
//                       <span className="slider round bg-white/30"></span>
//                     </label>

//                     <span
//                       className={`text-sm font-medium transition-colors ${
//                         signInMethod === "mobile"
//                           ? "text-white"
//                           : "text-white/60"
//                       }`}
//                     >
//                       <i className="fas fa-phone mr-1"></i>
//                       Mobile
//                     </span>
//                   </div>
//                 </div>
//               )}

//               <Button
//                 onClick={() => setIsSignUpActive(false)}
//                 variant="ghost"
//                 className="mt-2"
//               >
//                 Sign In with {signInMethod === "email" ? "Email" : "Mobile"}
//               </Button>
//             </div>

//             {/* Overlay Right */}
//             <div
//               className={`absolute w-full md:w-1/2 h-full flex flex-col justify-center items-center p-8 transition-all duration-700 ease-in-out top-0 right-0 ${
//                 isSignUpActive
//                   ? "md:translate-x-0 opacity-0"
//                   : "md:translate-x-0 opacity-100"
//               }`}
//             >
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full flex justify-center">
//                 {/* New Simple Logo */}
//                 <PezziLogo />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         /* Toggle Switch Styles */
//         .switch {
//           position: relative;
//           display: inline-block;
//           width: 46px;
//           height: 22px;
//           margin: 0 4px;
//         }

//         @media (min-width: 768px) {
//           .switch {
//             width: 50px;
//             height: 24px;
//             margin: 0 8px;
//           }
//         }

//         .switch input {
//           opacity: 0;
//           width: 0;
//           height: 0;
//           z-index: 10;
//           position: relative;
//           cursor: pointer;
//         }

//         .slider {
//           position: absolute;
//           cursor: pointer;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: #ccc;
//           transition: .3s;
//         }

//         .slider:before {
//           position: absolute;
//           content: "";
//           height: 16px;
//           width: 16px;
//           left: 3px;
//           bottom: 3px;
//           background-color: white;
//           transition: .3s;
//         }

//         @media (min-width: 768px) {
//           .slider:before {
//             height: 18px;
//             width: 18px;
//           }
//         }

//         input:checked + .slider {
//           background-color: #4361ee;
//         }

//         input:focus + .slider {
//           box-shadow: 0 0 1px #4361ee;
//         }

//         input:checked + .slider:before {
//           transform: translateX(24px);
//         }

//         @media (min-width: 768px) {
//           input:checked + .slider:before {
//             transform: translateX(26px);
//           }
//         }

//         .slider.round {
//           border-radius: 24px;
//         }

//         .slider.round:before {
//           border-radius: 50%;
//         }

//         .method-container {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-bottom: 16px;
//           background: #f3f4f6;
//           padding: 6px 12px;
//           border-radius: 40px;
//           width: 100%;
//         }

//         @media (min-width: 768px) {
//           .method-container {
//             margin-bottom: 20px;
//             padding: 8px 16px;
//           }
//         }

//         .method-label {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           font-size: 12px;
//           color: #4b5563;
//         }

//         @media (min-width: 768px) {
//           .method-label {
//             gap: 6px;
//             font-size: 14px;
//           }
//         }

//         .method-label.active {
//           color: #4361ee;
//           font-weight: 500;
//         }

//         .method-label i {
//           font-size: 12px;
//         }

//         @media (min-width: 768px) {
//           .method-label i {
//             font-size: 14px;
//           }
//         }

//         @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import InputField from "./common/InputField";
// import Button from "./common/Button";
// import ToggleSwitch from "./common/ToggleSwitch";
// import PasswordField from "./common/PasswordField";
// import useValidation from "../hooks/useValidation";
// import { signIn, signUp } from "../services/authService";

// const Login = ({ onForgotPassword }) => {
//   const [isSignUpActive, setIsSignUpActive] = useState(false);
//   const [signInMethod, setSignInMethod] = useState("mobile");
//   const [signUpMethod, setSignUpMethod] = useState("mobile");
//   const [showToggleSwitch, setShowToggleSwitch] = useState(false);

//   // Password visibility states
//   const [showSignUpPassword, setShowSignUpPassword] = useState(false);
//   const [showSignInPassword, setShowSignInPassword] = useState(false);

//   // Form submission status
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   const [submitSuccess, setSubmitSuccess] = useState("");

//   // Form state
//   const [signUpData, setSignUpData] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     password: "",
//   });

//   const [signInData, setSignInData] = useState({
//     email: "",
//     mobile: "",
//     password: "",
//     rememberMe: false,
//   });

//   // Apply validation
//   const signUpValidation = useValidation(signUpData, "signup");
//   const signInValidation = useValidation(signInData, "signin");

//   const handleSignUpChange = (e) => {
//     setSignUpData({
//       ...signUpData,
//       [e.target.name]: e.target.value,
//     });
//     setSubmitError("");
//     setSubmitSuccess("");
//   };

//   const handleSignInChange = (e) => {
//     const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
//     setSignInData({
//       ...signInData,
//       [e.target.name]: value,
//     });
//     setSubmitError("");
//     setSubmitSuccess("");
//   };

//   const handleSignUpSubmit = async (e) => {
//     e.preventDefault();
//     signUpValidation.touchAllFields();

//     if (!signUpValidation.isValid) {
//       setSubmitError("Please fix the errors before submitting");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitError("");
//     setSubmitSuccess("");

//     try {
//       await signUp(signUpData);
//       setSubmitSuccess("Registration successful! Please check your email/mobile for verification.");
      
//       // Optional: Reset form after successful submission
//       // setSignUpData({ fullName: '', email: '', mobile: '', password: '' });
//     } catch (error) {
//       setSubmitError(error.message || "Registration failed. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSignInSubmit = async (e) => {
//     e.preventDefault();
//     signInValidation.touchAllFields();

//     if (!signInValidation.isValid) {
//       setSubmitError("Please fix the errors before submitting");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitError("");
//     setSubmitSuccess("");

//     try {
//       const response = await signIn(signInData);
//       setSubmitSuccess("Login successful! Redirecting...");
      
//       // Store token if remember me is checked
//       if (signInData.rememberMe && response.token) {
//         localStorage.setItem("authToken", response.token);
//       }
      
//       // Redirect logic here
//       // window.location.href = '/dashboard';
//     } catch (error) {
//       setSubmitError(error.message || "Login failed. Please check your credentials.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const toggleSignUpPassword = (e) => {
//     e.preventDefault();
//     setShowSignUpPassword(!showSignUpPassword);
//   };

//   const toggleSignInPassword = (e) => {
//     e.preventDefault();
//     setShowSignInPassword(!showSignInPassword);
//   };

//   // Pezzi Logo Component
//   const PezziLogo = () => (
//     <svg
//       width="200"
//       height="80"
//       viewBox="0 0 1200 400"
//       xmlns="http://www.w3.org/2000/svg"
//       style={{ maxWidth: "100%", height: "auto" }}
//     >
//       <defs>
//         <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
//           <stop offset="0%" stopColor="#0d1a8c" />
//           <stop offset="100%" stopColor="#1e64c8" />
//         </linearGradient>
//       </defs>
//       <text
//         x="40"
//         y="290"
//         fontFamily="Arial, Helvetica, sans-serif"
//         fontWeight="900"
//         fontSize="260"
//         fill="url(#grad)"
//         letterSpacing="5"
//       >
//         Pezzi
//       </text>
//     </svg>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center p-2 sm:p-4">
//       {/* Hidden developer button */}
//       {process.env.NODE_ENV === "development" && (
//         <button
//           onClick={() => setShowToggleSwitch(!showToggleSwitch)}
//           className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700 transition-colors"
//         >
//           {showToggleSwitch ? "Hide" : "Show"} Toggle
//         </button>
//       )}

//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="relative w-full max-w-4xl min-h-[500px] sm:min-h-[550px] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
//         {/* Sign Up Form */}
//         <div
//           className={`
//           absolute top-0 h-full w-full md:w-1/2 flex justify-center items-center
//           transition-all duration-700 ease-in-out left-0
//           ${isSignUpActive ? "translate-x-0 opacity-100 z-10 md:translate-x-full" : "translate-x-0 opacity-0 z-0 md:translate-x-0"}
//         `}
//         >
//           <form
//             className="w-11/12 sm:w-4/5 flex flex-col items-center"
//             onSubmit={handleSignUpSubmit}
//             noValidate
//           >
//              <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-15 text-blue-800">
//              Pezzi
//             </h1>
//             <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-gray-800">
//               Create Account
//             </h1>

//             {showToggleSwitch && (
//               <ToggleSwitch
//                 leftLabel="Email"
//                 rightLabel="Mobile"
//                 leftIcon="envelope"
//                 rightIcon="phone"
//                 checked={signUpMethod === "mobile"}
//                 onChange={setSignUpMethod}
//                 leftValue="email"
//                 rightValue="mobile"
//               />
//             )}

//             <InputField
//               type="text"
//               placeholder="Full Name"
//               icon="user"
//               name="fullName"
//               value={signUpData.fullName}
//               onChange={handleSignUpChange}
//               onBlur={() => signUpValidation.touchField("fullName")}
//               // error={signUpValidation.getFieldError("fullName")}
//               required
//             />

//             {signUpMethod === "mobile" ? (
//               <InputField
//                 type="tel"
//                 placeholder="Enter Your Mobile Number"
//                 icon="phone"
//                 name="mobile"
//                 value={signUpData.mobile}
//                 onChange={handleSignUpChange}
//                 onBlur={() => signUpValidation.touchField("mobile")}
//                 onKeyPress={(e) => {
//                   if (!/[0-9]/.test(e.key)) {
//                     e.preventDefault();
//                   }
//                 }}
//                 onInput={(e) => {
//                   e.target.value = e.target.value.replace(/[^0-9]/g, "");
//                 }}
//                 // error={signUpValidation.getFieldError("mobile")}
//                 pattern="[0-9]{10}"
//                 title="Please enter 10 digit mobile number"
//                 maxLength={10}
//                 required
//               />
//             ) : (
//               <InputField
//                 type="email"
//                 placeholder="Enter Your Email"
//                 icon="envelope"
//                 name="email"
//                 value={signUpData.email}
//                 onChange={handleSignUpChange}
//                 onBlur={() => signUpValidation.touchField("email")}
//                 // error={signUpValidation.getFieldError("email")}
//                 required
//               />
//             )}

//             <PasswordField
//               placeholder="Enter Your Password"
//               name="password"
//               value={signUpData.password}
//               onChange={handleSignUpChange}
//               onBlur={() => signUpValidation.touchField("password")}
//               showPassword={showSignUpPassword}
//               onTogglePassword={toggleSignUpPassword}
//               error={signUpValidation.getFieldError("password")}
//               required
//             />

//             {/* Password strength indicator */}
//             {signUpData.password && signUpData.password.length > 0 && (
//               <div className="w-full mb-4">
//                 <div className="flex justify-between mb-1">
//                   <span className="text-xs text-gray-600">Password strength:</span>
//                   <span className="text-xs font-medium">
//                     {signUpData.password.length < 8
//                       ? "Weak"
//                       : /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(signUpData.password)
//                         ? "Strong"
//                         : "Medium"}
//                   </span>
//                 </div>
//                 <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className={`h-full transition-all duration-300 ${
//                       signUpData.password.length < 8
//                         ? "bg-red-500 w-1/3"
//                         : /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(signUpData.password)
//                           ? "bg-green-500 w-full"
//                           : "bg-yellow-500 w-2/3"
//                     }`}
//                   />
//                 </div>
//               </div>
//             )}

//             {submitError && (
//               <div className="w-full mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-xs text-red-600 text-center">{submitError}</p>
//               </div>
//             )}

//             {submitSuccess && (
//               <div className="w-full mb-4 p-2 bg-green-50 border border-green-200 rounded-lg">
//                 <p className="text-xs text-green-600 text-center">{submitSuccess}</p>
//               </div>
//             )}

//             <Button
//               type="submit"
//               variant="primary"
//               disabled={isSubmitting || !signUpValidation.isValid}
//               className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
//             >
//               {isSubmitting ? "Creating Account..." : "Sign Up"}
//             </Button>

//             <p className="mt-4 text-sm text-gray-600 md:hidden">
//               Already have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => setIsSignUpActive(false)}
//                 className="text-[#4361ee] font-semibold hover:underline focus:outline-none"
//               >
//                 Sign In
//               </button>
//             </p>
//           </form>
//         </div>

//         {/* Sign In Form */}
//         <div
//           className={`
//           absolute top-0 h-full w-full md:w-1/2 flex justify-center items-center
//           transition-all duration-700 ease-in-out left-0
//           ${isSignUpActive ? "translate-x-0 opacity-0 z-0 md:translate-x-full" : "translate-x-0 opacity-100 z-10 md:translate-x-0"}
//         `}
//         >
//           <form
//             className="w-11/12 sm:w-4/5 flex flex-col items-center"
//             onSubmit={handleSignInSubmit}
//             noValidate
//           >
//              <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-15 text-blue-800">
//              Pezzi
//             </h1>
//             <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-gray-800">
//               Sign In
//             </h1>

//             {showToggleSwitch && (
//               <ToggleSwitch
//                 leftLabel="Email"
//                 rightLabel="Mobile"
//                 leftIcon="envelope"
//                 rightIcon="phone"
//                 checked={signInMethod === "mobile"}
//                 onChange={setSignInMethod}
//                 leftValue="email"
//                 rightValue="mobile"
//               />
//             )}

//             {signInValidation.touchedFields.credential && signInValidation.errors.credential && (
//               <div className="w-full mb-2">
//                 <p className="text-xs text-red-500">{signInValidation.errors.credential}</p>
//               </div>
//             )}

//             {signInMethod === "mobile" ? (
//               <InputField
//                 type="tel"
//                 placeholder="Enter Your Mobile Number"
//                 icon="phone"
//                 name="mobile"
//                 value={signInData.mobile}
//                 onChange={handleSignInChange}
//                 onBlur={() => signInValidation.touchField("mobile")}
//                 onKeyPress={(e) => {
//                   if (!/[0-9]/.test(e.key)) {
//                     e.preventDefault();
//                   }
//                 }}
//                 onInput={(e) => {
//                   e.target.value = e.target.value.replace(/[^0-9]/g, "");
//                 }}
//                 // error={signInValidation.getFieldError("mobile")}
//                 pattern="[0-9]{10}"
//                 title="Please enter 10 digit mobile number"
//                 maxLength={10}
//                 required
//               />
//             ) : (
//               <InputField
//                 type="email"
//                 placeholder="Enter the UserId"
//                 icon="envelope"
//                 name="email"
//                 value={signInData.email}
//                 onChange={handleSignInChange}
//                 onBlur={() => signInValidation.touchField("email")}
//                 // error={signInValidation.getFieldError("email")}
//                 required
//               />
//             )}

//             <PasswordField
//               placeholder="Password"
//               name="password"
//               value={signInData.password}
//               onChange={handleSignInChange}
//               onBlur={() => signInValidation.touchField("password")}
//               showPassword={showSignInPassword}
//               onTogglePassword={toggleSignInPassword}
//               error={signInValidation.getFieldError("password")}
//               required
//             />

//             <div className="flex items-center justify-between w-full my-2.5">
//               <label className="flex items-center text-xs sm:text-sm text-gray-600 whitespace-nowrap">
//                 <input
//                   type="checkbox"
//                   name="rememberMe"
//                   checked={signInData.rememberMe}
//                   onChange={handleSignInChange}
//                   className="mr-2 rounded"
//                 />
//                 Remember me
//               </label>
//               <button
//                 type="button"
//                 onClick={onForgotPassword}
//                 className="text-xs sm:text-sm text-gray-600 hover:text-[#4361ee] whitespace-nowrap ml-2"
//               >
//                 Forgot password?
//               </button>
//             </div>

//             {submitError && (
//               <div className="w-full mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-xs text-red-600 text-center">{submitError}</p>
//               </div>
//             )}

//             {submitSuccess && (
//               <div className="w-full mb-4 p-2 bg-green-50 border border-green-200 rounded-lg">
//                 <p className="text-xs text-green-600 text-center">{submitSuccess}</p>
//               </div>
//             )}

//             <Button
//               type="submit"
//               variant="primary"
//               disabled={isSubmitting || !signInValidation.isValid}
//               className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
//             >
//               {isSubmitting ? "Signing In..." : "Sign In"}
//             </Button>

//             <p className="mt-4 text-xs sm:text-sm text-gray-600">
//               New user?{" "}
//               <button
//                 type="button"
//                 onClick={() => setIsSignUpActive(true)}
//                 className="text-[#4361ee] font-semibold hover:underline focus:outline-none"
//               >
//                 Register here
//               </button>
//             </p>
//           </form>
//         </div>

//         {/* Overlay Container */}
//         <div
//           className={`hidden md:block absolute top-0 left-0 md:left-1/2 w-full md:w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-20 ${
//             isSignUpActive ? "md:-translate-x-full" : "md:translate-x-0"
//           }`}
//         >
//           <div
//             className={`relative -left-full md:-left-full w-full md:w-[200%] h-full bg-gradient-to-r from-[#4361ee] to-[#3a0ca3] text-white transition-all duration-700 ease-in-out ${
//               isSignUpActive ? "md:translate-x-1/2" : "md:translate-x-0"
//             }`}
//           >
//             {/* Overlay Left */}
//             <div
//               className={`absolute w-full md:w-1/2 h-full flex flex-col justify-center items-center text-center p-8 transition-all duration-700 ease-in-out top-0 left-0 ${
//                 isSignUpActive
//                   ? "md:translate-x-0 opacity-100"
//                   : "md:-translate-x-1/5 opacity-0"
//               }`}
//             >
//               <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
//               <p className="mb-4">Already have an account?</p>

//               {showToggleSwitch && (
//                 <div className="bg-white/20 rounded-full p-2 mb-6 w-full max-w-[250px]">
//                   <div className="flex items-center justify-center gap-2">
//                     <span
//                       className={`text-sm font-medium transition-colors ${
//                         signInMethod === "email" ? "text-white" : "text-white/60"
//                       }`}
//                     >
//                       <i className="fas fa-envelope mr-1"></i>
//                       Email
//                     </span>

//                     <label className="switch">
//                       <input
//                         type="checkbox"
//                         checked={signInMethod === "mobile"}
//                         onChange={(e) =>
//                           setSignInMethod(e.target.checked ? "mobile" : "email")
//                         }
//                       />
//                       <span className="slider round bg-white/30"></span>
//                     </label>

//                     <span
//                       className={`text-sm font-medium transition-colors ${
//                         signInMethod === "mobile" ? "text-white" : "text-white/60"
//                       }`}
//                     >
//                       <i className="fas fa-phone mr-1"></i>
//                       Mobile
//                     </span>
//                   </div>
//                 </div>
//               )}

//               <Button
//                 onClick={() => setIsSignUpActive(false)}
//                 variant="ghost"
//                 className="mt-2"
//               >
//                 Sign In with {signInMethod === "email" ? "Email" : "Mobile"}
//               </Button>
//             </div>

//             {/* Overlay Right */}
//             <div
//               className={`absolute w-full md:w-1/2 h-full flex flex-col justify-center items-center p-8 transition-all duration-700 ease-in-out top-0 right-0 ${
//                 isSignUpActive
//                   ? "md:translate-x-0 opacity-0"
//                   : "md:translate-x-0 opacity-100"
//               }`}
//             >
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full flex justify-center">
//                 <PezziLogo />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//  <style>{`
//         /* Toggle Switch Styles */
//         .switch {
//           position: relative;
//           display: inline-block;
//           width: 46px;
//           height: 22px;
//           margin: 0 4px;
//         }

//         @media (min-width: 768px) {
//           .switch {
//             width: 50px;
//             height: 24px;
//             margin: 0 8px;
//           }
//         }

//         .switch input {
//           opacity: 0;
//           width: 0;
//           height: 0;
//           z-index: 10;
//           position: relative;
//           cursor: pointer;
//         }

//         .slider {
//           position: absolute;
//           cursor: pointer;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: #ccc;
//           transition: .3s;
//         }

//         .slider:before {
//           position: absolute;
//           content: "";
//           height: 16px;
//           width: 16px;
//           left: 3px;
//           bottom: 3px;
//           background-color: white;
//           transition: .3s;
//         }

//         @media (min-width: 768px) {
//           .slider:before {
//             height: 18px;
//             width: 18px;
//           }
//         }

//         input:checked + .slider {
//           background-color: #4361ee;
//         }

//         input:focus + .slider {
//           box-shadow: 0 0 1px #4361ee;
//         }

//         input:checked + .slider:before {
//           transform: translateX(24px);
//         }

//         @media (min-width: 768px) {
//           input:checked + .slider:before {
//             transform: translateX(26px);
//           }
//         }

//         .slider.round {
//           border-radius: 24px;
//         }

//         .slider.round:before {
//           border-radius: 50%;
//         }

//         .method-container {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-bottom: 16px;
//           background: #f3f4f6;
//           padding: 6px 12px;
//           border-radius: 40px;
//           width: 100%;
//         }

//         @media (min-width: 768px) {
//           .method-container {
//             margin-bottom: 20px;
//             padding: 8px 16px;
//           }
//         }

//         .method-label {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           font-size: 12px;
//           color: #4b5563;
//         }

//         @media (min-width: 768px) {
//           .method-label {
//             gap: 6px;
//             font-size: 14px;
//           }
//         }

//         .method-label.active {
//           color: #4361ee;
//           font-weight: 500;
//         }

//         .method-label i {
//           font-size: 12px;
//         }

//         @media (min-width: 768px) {
//           .method-label i {
//             font-size: 14px;
//           }
//         }

//         @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//       </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import InputField from "./common/InputField";
import Button from "./common/Button";
import ToggleSwitch from "./common/ToggleSwitch";
import PasswordField from "./common/PasswordField";
import useValidation from "../hooks/useValidation";
import { signIn, signUp } from "../services/authService";

const Login = ({ onForgotPassword }) => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [signInMethod, setSignInMethod] = useState("mobile");
  const [signUpMethod, setSignUpMethod] = useState("mobile");
  const [showToggleSwitch, setShowToggleSwitch] = useState(false);

  // Password visibility states
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  // Form state
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [signInData, setSignInData] = useState({
    email: "",
    mobile: "",
    password: "",
    rememberMe: false,
  });

  // Apply validation
  const signUpValidation = useValidation(signUpData, "signup");
  const signInValidation = useValidation(signInData, "signin");

  const handleSignUpChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
    setSubmitError("");
    setSubmitSuccess("");
  };

  const handleSignInChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setSignInData({
      ...signInData,
      [e.target.name]: value,
    });
    setSubmitError("");
    setSubmitSuccess("");
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    signUpValidation.touchAllFields();

    if (!signUpValidation.isValid) {
      setSubmitError("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      await signUp(signUpData);
      setSubmitSuccess("Registration successful! Please check your email/mobile for verification.");
      
      // Optional: Reset form after successful submission
      // setSignUpData({ fullName: '', email: '', mobile: '', password: '' });
    } catch (error) {
      setSubmitError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    signInValidation.touchAllFields();

    if (!signInValidation.isValid) {
      setSubmitError("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const response = await signIn(signInData);
      setSubmitSuccess("Login successful! Redirecting...");
      
      // Store token if remember me is checked
      if (signInData.rememberMe && response.token) {
        localStorage.setItem("authToken", response.token);
      }
      
      // Redirect logic here
      // window.location.href = '/dashboard';
    } catch (error) {
      setSubmitError(error.message || "Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSignUpPassword = (e) => {
    e.preventDefault();
    setShowSignUpPassword(!showSignUpPassword);
  };

  const toggleSignInPassword = (e) => {
    e.preventDefault();
    setShowSignInPassword(!showSignInPassword);
  };

  // Pezzi Logo Component
  const PezziLogo = () => (
    <svg
      width="200"
      height="80"
      viewBox="0 0 1200 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: "100%", height: "auto" }}
    >
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d1a8c" />
          <stop offset="100%" stopColor="#1e64c8" />
        </linearGradient>
      </defs>
      <text
        x="40"
        y="290"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="900"
        fontSize="260"
        fill="url(#grad)"
        letterSpacing="5"
      >
        Pezzi
      </text>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center p-2 sm:p-4">
      {/* Hidden developer button */}
      {process.env.NODE_ENV === "development" && (
        <button
          onClick={() => setShowToggleSwitch(!showToggleSwitch)}
          className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700 transition-colors"
        >
          {showToggleSwitch ? "Hide" : "Show"} Toggle
        </button>
      )}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-4xl min-h-[500px] sm:min-h-[550px] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
        {/* Sign Up Form */}
        <div
          className={`
          absolute top-0 h-full w-full md:w-1/2 flex justify-center items-center
          transition-all duration-700 ease-in-out left-0
          ${isSignUpActive ? "translate-x-0 opacity-100 z-10 md:translate-x-full" : "translate-x-0 opacity-0 z-0 md:translate-x-0"}
        `}
        >
          <form
            className="w-11/12 sm:w-4/5 flex flex-col items-center"
            onSubmit={handleSignUpSubmit}
            noValidate
          >
            {/* Combined heading section for Sign Up */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-2">
                Pezzi
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Create Account
              </h2>
            </div>

            {showToggleSwitch && (
              <ToggleSwitch
                leftLabel="Email"
                rightLabel="Mobile"
                leftIcon="envelope"
                rightIcon="phone"
                checked={signUpMethod === "mobile"}
                onChange={setSignUpMethod}
                leftValue="email"
                rightValue="mobile"
              />
            )}

            <InputField
              type="text"
              placeholder="Full Name"
              icon="user"
              name="fullName"
              value={signUpData.fullName}
              onChange={handleSignUpChange}
              onBlur={() => signUpValidation.touchField("fullName")}
              // error={signUpValidation.getFieldError("fullName")}
              required
            />

            {signUpMethod === "mobile" ? (
              <InputField
                type="tel"
                placeholder="Enter Your Mobile Number"
                icon="phone"
                name="mobile"
                value={signUpData.mobile}
                onChange={handleSignUpChange}
                onBlur={() => signUpValidation.touchField("mobile")}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                // error={signUpValidation.getFieldError("mobile")}
                pattern="[0-9]{10}"
                title="Please enter 10 digit mobile number"
                maxLength={10}
                required
              />
            ) : (
              <InputField
                type="email"
                placeholder="Enter Your Email"
                // icon="envelope"
                icon="user"
                name="email"
                value={signUpData.email}
                onChange={handleSignUpChange}
                onBlur={() => signUpValidation.touchField("email")}
                // error={signUpValidation.getFieldError("email")}
                required
              />
            )}

            <PasswordField
              placeholder="Enter Your Password"
              name="password"
              value={signUpData.password}
              onChange={handleSignUpChange}
              onBlur={() => signUpValidation.touchField("password")}
              showPassword={showSignUpPassword}
              onTogglePassword={toggleSignUpPassword}
              error={signUpValidation.getFieldError("password")}
              required
            />

            {/* Password strength indicator */}
            {signUpData.password && signUpData.password.length > 0 && (
              <div className="w-full mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-600">Password strength:</span>
                  <span className="text-xs font-medium">
                    {signUpData.password.length < 8
                      ? "Weak"
                      : /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(signUpData.password)
                        ? "Strong"
                        : "Medium"}
                  </span>
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      signUpData.password.length < 8
                        ? "bg-red-500 w-1/3"
                        : /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(signUpData.password)
                          ? "bg-green-500 w-full"
                          : "bg-yellow-500 w-2/3"
                    }`}
                  />
                </div>
              </div>
            )}

            {submitError && (
              <div className="w-full mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs text-red-600 text-center">{submitError}</p>
              </div>
            )}

            {submitSuccess && (
              <div className="w-full mb-4 p-2 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-600 text-center">{submitSuccess}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || !signUpValidation.isValid}
              className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </Button>

            <p className="mt-4 text-sm text-gray-600 md:hidden">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUpActive(false)}
                className="text-[#4361ee] font-semibold hover:underline focus:outline-none"
              >
                Sign In
              </button>
            </p>
          </form>
        </div>

        {/* Sign In Form */}
        <div
          className={`
          absolute top-0 h-full w-full md:w-1/2 flex justify-center items-center
          transition-all duration-700 ease-in-out left-0
          ${isSignUpActive ? "translate-x-0 opacity-0 z-0 md:translate-x-full" : "translate-x-0 opacity-100 z-10 md:translate-x-0"}
        `}
        >
          <form
            className="w-11/12 sm:w-4/5 flex flex-col items-center"
            onSubmit={handleSignInSubmit}
            noValidate
          >
            {/* Combined heading section for Sign In */}
            <div className="text-center mb-8 sm:mb-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-2">
                Pezzi
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Sign In
              </h2>
            </div>

            {showToggleSwitch && (
              <ToggleSwitch
                leftLabel="Email"
                rightLabel="Mobile"
                leftIcon="envelope"
                rightIcon="phone"
                checked={signInMethod === "mobile"}
                onChange={setSignInMethod}
                leftValue="email"
                rightValue="mobile"
              />
            )}

            {signInValidation.touchedFields.credential && signInValidation.errors.credential && (
              <div className="w-full mb-2">
                <p className="text-xs text-red-500">{signInValidation.errors.credential}</p>
              </div>
            )}

            {signInMethod === "mobile" ? (
              <InputField
                type="tel"
                placeholder="Enter Your Mobile Number"
                icon="phone"
                name="mobile"
                value={signInData.mobile}
                onChange={handleSignInChange}
                onBlur={() => signInValidation.touchField("mobile")}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                // error={signInValidation.getFieldError("mobile")}
                pattern="[0-9]{10}"
                title="Please enter 10 digit mobile number"
                maxLength={10}
                required
              />
            ) : (
              <InputField
                type="email"
                placeholder="Enter the UserId"
                // icon="envelope"
                icon="user"
                name="email"
                value={signInData.email}
                onChange={handleSignInChange}
                onBlur={() => signInValidation.touchField("email")}
                // error={signInValidation.getFieldError("email")}
                required
              />
            )}

            <PasswordField
              placeholder="Password"
              name="password"
              value={signInData.password}
              onChange={handleSignInChange}
              onBlur={() => signInValidation.touchField("password")}
              showPassword={showSignInPassword}
              onTogglePassword={toggleSignInPassword}
              error={signInValidation.getFieldError("password")}
              required
            />

            <div className="flex items-center justify-between w-full my-2.5">
              <label className="flex items-center text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={signInData.rememberMe}
                  onChange={handleSignInChange}
                  className="mr-2 rounded"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs sm:text-sm text-gray-600 hover:text-[#4361ee] whitespace-nowrap ml-2"
              >
                Forgot password?
              </button>
            </div>

            {submitError && (
              <div className="w-full mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs text-red-600 text-center">{submitError}</p>
              </div>
            )}

            {submitSuccess && (
              <div className="w-full mb-4 p-2 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-600 text-center">{submitSuccess}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || !signInValidation.isValid}
              className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>

            <p className="mt-4 text-xs sm:text-sm text-gray-600">
              New user?{" "}
              <button
                type="button"
                onClick={() => setIsSignUpActive(true)}
                className="text-[#4361ee] font-semibold hover:underline focus:outline-none"
              >
                Register here
              </button>
            </p>
          </form>
        </div>

        {/* Overlay Container */}
        <div
          className={`hidden md:block absolute top-0 left-0 md:left-1/2 w-full md:w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-20 ${
            isSignUpActive ? "md:-translate-x-full" : "md:translate-x-0"
          }`}
        >
          <div
            className={`relative -left-full md:-left-full w-full md:w-[200%] h-full bg-gradient-to-r from-[#4361ee] to-[#3a0ca3] text-white transition-all duration-700 ease-in-out ${
              isSignUpActive ? "md:translate-x-1/2" : "md:translate-x-0"
            }`}
          >
            {/* Overlay Left */}
            <div
              className={`absolute w-full md:w-1/2 h-full flex flex-col justify-center items-center text-center p-8 transition-all duration-700 ease-in-out top-0 left-0 ${
                isSignUpActive
                  ? "md:translate-x-0 opacity-100"
                  : "md:-translate-x-1/5 opacity-0"
              }`}
            >
              <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
              <p className="mb-4">Already have an account?</p>

              {showToggleSwitch && (
                <div className="bg-white/20 rounded-full p-2 mb-6 w-full max-w-[250px]">
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className={`text-sm font-medium transition-colors ${
                        signInMethod === "email" ? "text-white" : "text-white/60"
                      }`}
                    >
                      <i className="fas fa-envelope mr-1"></i>
                      Email
                    </span>

                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={signInMethod === "mobile"}
                        onChange={(e) =>
                          setSignInMethod(e.target.checked ? "mobile" : "email")
                        }
                      />
                      <span className="slider round bg-white/30"></span>
                    </label>

                    <span
                      className={`text-sm font-medium transition-colors ${
                        signInMethod === "mobile" ? "text-white" : "text-white/60"
                      }`}
                    >
                      <i className="fas fa-phone mr-1"></i>
                      Mobile
                    </span>
                  </div>
                </div>
              )}

              <Button
                onClick={() => setIsSignUpActive(false)}
                variant="ghost"
                className="mt-2"
              >
                Sign In with {signInMethod === "email" ? "Email" : "Mobile"}
              </Button>
            </div>

            {/* Overlay Right */}
            <div
              className={`absolute w-full md:w-1/2 h-full flex flex-col justify-center items-center p-8 transition-all duration-700 ease-in-out top-0 right-0 ${
                isSignUpActive
                  ? "md:translate-x-0 opacity-0"
                  : "md:translate-x-0 opacity-100"
              }`}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full flex justify-center">
                <PezziLogo />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        /* Toggle Switch Styles */
        .switch {
          position: relative;
          display: inline-block;
          width: 46px;
          height: 22px;
          margin: 0 4px;
        }

        @media (min-width: 768px) {
          .switch {
            width: 50px;
            height: 24px;
            margin: 0 8px;
          }
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
          z-index: 10;
          position: relative;
          cursor: pointer;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .3s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
        }

        @media (min-width: 768px) {
          .slider:before {
            height: 18px;
            width: 18px;
          }
        }

        input:checked + .slider {
          background-color: #4361ee;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #4361ee;
        }

        input:checked + .slider:before {
          transform: translateX(24px);
        }

        @media (min-width: 768px) {
          input:checked + .slider:before {
            transform: translateX(26px);
          }
        }

        .slider.round {
          border-radius: 24px;
        }

        .slider.round:before {
          border-radius: 50%;
        }

        .method-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          background: #f3f4f6;
          padding: 6px 12px;
          border-radius: 40px;
          width: 100%;
        }

        @media (min-width: 768px) {
          .method-container {
            margin-bottom: 20px;
            padding: 8px 16px;
          }
        }

        .method-label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #4b5563;
        }

        @media (min-width: 768px) {
          .method-label {
            gap: 6px;
            font-size: 14px;
          }
        }

        .method-label.active {
          color: #4361ee;
          font-weight: 500;
        }

        .method-label i {
          font-size: 12px;
        }

        @media (min-width: 768px) {
          .method-label i {
            font-size: 14px;
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;