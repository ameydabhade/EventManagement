import { createBrowserRouter, Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import SigninPage from './components/SigninPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import Explore from './components/Explore.jsx';
import Dashboard from './components/Dashboard.jsx';
import EventPage from './components/EventPage.jsx';
import AddEvent from './components/AddEvent.jsx';

function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
      },
      {
        path: 'events/:id',
        element: <EventPage />
      },
      {
        path: 'addevent',
        element: <AddEvent />
      }
    ]
  }
]);

export default router;
