import React, { useState } from 'react';
import { Smartphone, QrCode, ChevronDown } from 'lucide-react';
import TikTokLogo from './TikTokLogo';
import LoginForm from './LoginForm';
import toast, { Toaster } from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'phone' | 'email'>('email');
  const [loggedIn, setLoggedIn] = useState(false);
  
  if (loggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <TikTokLogo />
        <div className="mt-10 w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your login information has been stored for educational purposes.
          </p>
          <button
            onClick={() => setLoggedIn(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Toaster position="top-center" />
      
      <div className="w-full max-w-md">
        <TikTokLogo />
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Log in to TikTok
          </h1>
          
          <div className="flex border-b mb-6">
            <button
              className={`flex-1 pb-2 text-center font-medium ${
                activeTab === 'phone'
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500'
              }`}
              onClick={() => {
                setActiveTab('phone');
                toast('Phone login is disabled in this demo', {
                  icon: '📱',
                });
              }}
            >
              <div className="flex items-center justify-center">
                <Smartphone size={20} className="mr-1" />
                <span>Phone</span>
              </div>
            </button>
            
            <button
              className={`flex-1 pb-2 text-center font-medium ${
                activeTab === 'email'
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('email')}
            >
              <div className="flex items-center justify-center">
                <AtSymbol size={20} className="mr-1" />
                <span>Email / Username</span>
              </div>
            </button>
          </div>
          
          <LoginForm onLoginSuccess={() => setLoggedIn(true)} />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">Or continue with</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <SocialButton icon="facebook" label="Continue with Facebook" />
              <SocialButton icon="google" label="Continue with Google" />
              <SocialButton icon="twitter" label="Continue with Twitter" />
            </div>
            
            <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
              <QrCode size={16} className="mr-1" />
              <span>Use QR code</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <button 
              onClick={() => toast('Sign up is disabled in this demo')}
              className="text-pink-500 font-medium hover:underline focus:outline-none"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
      
      <footer className="mt-10 text-center text-xs text-gray-500 pb-4">
        <div className="flex items-center justify-center mb-2">
          <span>English</span>
          <ChevronDown size={14} className="ml-1" />
        </div>
        <p>© 2025 TikTok Clone - For Educational Purposes Only</p>
      </footer>
    </div>
  );
};

function AtSymbol(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      {...props}
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
    </svg>
  );
}

interface SocialButtonProps {
  icon: 'facebook' | 'google' | 'twitter';
  label: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, label }) => {
  return (
    <button
      onClick={() => toast(`${label} is disabled in this demo`)}
      className="flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      aria-label={label}
    >
      {icon === 'facebook' && (
        <svg className="w-6 h-6 text-[#3b5998]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      )}
      {icon === 'google' && (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
      )}
      {icon === 'twitter' && (
        <svg className="w-6 h-6 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      )}
    </button>
  );
};

export default LoginPage;