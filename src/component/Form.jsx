import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { MdCheckCircle, MdError } from "react-icons/md";

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  useEffect(() => {
    const form = document.getElementById("form");
    const errorMessage = document.getElementById("errorMessage");

    if (!form || !errorMessage) return;

    const handleSubmit = (e) => {
      e.preventDefault();

      let name = document.getElementById("name").value.trim();
      let email = document.getElementById("email").value.trim();
      let password = document.getElementById("password").value.trim();
      let phone = document.getElementById("phone").value.trim();

      console.log(name, email, password, phone);

      if (name === "") {
        errorMessage.textContent = "Name is required";
        errorMessage.style.color = "#ef4444";
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        errorMessage.textContent = "Invalid email";
        errorMessage.style.color = "#ef4444";
        return;
      }

      let at = email.indexOf("@");
      let dot = email.lastIndexOf(".");

      if (at > dot || dot === email.length - 1 || at === 0) {
        errorMessage.textContent = "Invalid email format";
        errorMessage.style.color = "#ef4444";
        return;
      }

      let charAfterAt = email[at + 1];
      if (!isNaN(charAfterAt)) {
        errorMessage.textContent = "Domain cannot start with a number";
        errorMessage.style.color = "#ef4444";
        return;
      }

      if (password.length < 8) {
        errorMessage.textContent = "Password must be 8 characters long";
        errorMessage.style.color = "#ef4444";
        return;
      }

      let hasUpper = false;
      for (let i = 0; i < password.length; i++) {
        if (password[i] >= 'A' && password[i] <= 'Z') {
          hasUpper = true;
          break;
        }
      }

      if (!hasUpper) {
        errorMessage.textContent = "Password must have one uppercase letter";
        errorMessage.style.color = "#ef4444";
        return;
      }

      if (phone.length !== 10) {
        errorMessage.textContent = "Phone number must be 10 digits";
        errorMessage.style.color = "#ef4444";
        return;
      }

      if (isNaN(phone)) {
        errorMessage.textContent = "Phone must contain only numbers";
        errorMessage.style.color = "#ef4444";
        return;
      }

      errorMessage.style.color = "#10b981";
      errorMessage.textContent = "Form submitted successfully!";
      
      // Reset form after successful submission
      setTimeout(() => {
        form.reset();
        setFormData({ name: '', email: '', password: '', phone: '' });
        errorMessage.textContent = "";
      }, 2000);
    };

    form.addEventListener('submit', handleSubmit);

    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Please fill in your details to continue</p>
        </div>

        <div id="errorMessage" className="mb-4 min-h-[24px] flex items-center justify-center">
          {/* Error/success messages will appear here */}
        </div>

        <form
          id="form"
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Name Field */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2 flex items-center">
              <FaUser className="mr-2 text-blue-500" />
              Full Name
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2 flex items-center">
              <FaEnvelope className="mr-2 text-blue-500" />
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2 flex items-center">
              <FaLock className="mr-2 text-blue-500" />
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Must be at least 8 characters with one uppercase letter</p>
          </div>

          {/* Phone Field */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2 flex items-center">
              <FaPhone className="mr-2 text-blue-500" />
              Phone Number
            </label>
            <div className="relative">
              <input
                id="phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="1234567890"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mt-2">10 digits only, no spaces or dashes</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl active:translate-y-0"
          >
            Create Account
          </button>

          <div className="mt-6 text-center text-gray-600">
            <p className="text-sm">
              By continuing, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account? <a href="#" className="text-blue-500 font-medium hover:underline">Sign In</a>
          </p>
        </div>

        {/* Validation Tips */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-2 flex items-center">
            <MdCheckCircle className="text-green-500 mr-2" />
            Validation Rules:
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li className="flex items-center">
              <MdError className="text-gray-400 mr-2" size={14} />
              All fields are required
            </li>
            <li className="flex items-center">
              <MdError className="text-gray-400 mr-2" size={14} />
              Valid email with proper format
            </li>
            <li className="flex items-center">
              <MdError className="text-gray-400 mr-2" size={14} />
              Password: 8+ chars with uppercase
            </li>
            <li className="flex items-center">
              <MdError className="text-gray-400 mr-2" size={14} />
              Phone: Exactly 10 digits
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Form;