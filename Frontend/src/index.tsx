import React, { useState, useEffect, createContext, useContext } from 'react';
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

const AppLayout: React.FC = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };
  if(loading){
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
