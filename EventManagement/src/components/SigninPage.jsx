import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SigninPage() {
  const [formData, setFormData] = useState({
    Email: '',
    Password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('https://eventmanagement-5c1x.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.message === 'Authentication successful') {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);

          setSuccessMessage('Login Successful!');
          setIsLoggedIn(true);

          window.location.href = "/";
        } else {
          setError(data.message || 'Invalid credentials');
        }
      } else {
        setError(data.message || 'Failed to log in. Please check your credentials.');
      }
    } catch (err) {
      setError('Error logging in. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = (e) => {
    e.preventDefault();
    setFormData({ Email: 'guest@example.com', Password: 'guestpassword' });
    setSuccessMessage('Logged in as guest!');
    setIsLoggedIn(true);

    localStorage.setItem('user', JSON.stringify({ Name: 'Guest', Email: 'guest@example.com', role: 'guest' }));
    localStorage.setItem('token', 'guest-token');

    window.location.href = "/";
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);

    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 space-y-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Sign In</h2>
          <p className="mt-2 text-sm text-gray-400">Welcome back! Please sign in to continue</p>
        </div>

        {successMessage && (
          <div className="text-center text-green-500 font-bold mt-4">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 font-bold mt-4">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">Email address</label>
              <input
                id="email"
                name="Email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7a56d6] bg-black opacity-90 text-white"
                placeholder="Email address"
                value={formData.Email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <input
                id="password"
                name="Password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7a56d6] bg-black opacity-90 text-white"
                placeholder="Password"
                value={formData.Password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="gap-2 flex flex-col">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-[#7a56d6] hover:scale-105 hover:bg-white bg-[#7a56d6] hover:bg-[#7a56d6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa4d56] transition duration-150 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#7a56d6] bg-white hover:scale-105 hover:bg-[#7a56d6] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa4d56] transition duration-150 ease-in-out"
            >
              Login As Guest
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="../register" className="font-medium text-[#7a56d6] hover:text-[#fa4d56] transition duration-150 ease-in-out">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
