// App.jsx
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import SigninPage from './components/SigninPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import Explore from './components/Explore.jsx';
import Dashboard from './components/Dashboard.jsx';

// Layout Component (with Header and Outlet)
function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />  {/* This will render the route-specific content */}
      
      </main>
    </div>
  );
}

// Router Configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,  // Use Layout as a wrapper for all routes
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'login',
        element: <SigninPage />
      },
      {
        path: 'register',
        element: <SignupPage />
      },
      {
        path: 'explore',
        element: <Explore />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      }
    ]
  }
]);

export default router;
