import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      // Parse the stored user data
      const user = JSON.parse(userData);
      setUserName(user.Name);  // Set the user's name in state
    } else {
      // If no user is found, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <>
      {userName ? (
        <>
          <p className="text-white">This is the dashboard</p>
          <p className="text-white">Welcome, {userName}!</p>
          <button
            onClick={handleLogout}
            className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <div className="text-white">
          <p>Please log in first to access the dashboard.</p>
          <a href="/login" className="text-[#7a56d6] hover:text-[#fa4d56]">
            Go to Login
          </a>
        </div>
      )}
    </>
  );
}

export default Dashboard;
