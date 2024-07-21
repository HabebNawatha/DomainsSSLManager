import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import AboutUsPage from './pages/AboutUsPage';
import GetStartedPage from './pages/GetStartedPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NavBar from './layouts/NavBar';
import AppContext from './hooks/useAppContext';
import ProtectedRoute from './services/ProtectedRoute';
import axios from 'axios';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const response = await axios.post('http://localhost:8000/users/authenticate-token', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          console.log(response);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error authenticating token:', error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  };
  checkAuth();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };
  if (loading) {
    return <div> Loading... </div>
  }
  return (
    <AppContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      <body className={location.pathname === '/login' || location.pathname === '/signup' ? 'noMargin' : 'margin'}>
        {location.pathname !== '/login' && location.pathname !== '/signup' && <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
        <Outlet />
      </body>
    </AppContext.Provider>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage />, errorElement: <NotFoundPage /> },
      { path: '/profile', element: <ProtectedRoute />, children: [{ path: '', element: <ProfilePage /> }] },
      { path: '/aboutus', element: <AboutUsPage /> },
      { path: '/getstarted', element: <GetStartedPage /> },
      { path: '/dashboard', element: <ProtectedRoute />, children: [{ path: '', element: <DashboardPage /> }] },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignUpPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router} />);
reportWebVitals();
