import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.Name);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
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
