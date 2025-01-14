import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './components/Home.jsx';
import SigninPage from './components/SigninPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import Header from './components/Header.jsx';
import Explore from './components/Explore.jsx';


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
        path: 'signup',
        element: <SignupPage />
      },
      {
        path: 'explore',
        element: <Explore />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
