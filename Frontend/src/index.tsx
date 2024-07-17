import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,Outlet,RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import AboutUsPage from './pages/AboutUsPage';
import GetStartedPage from './pages/GetStartedPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NavBar from './layouts/NavBar';
import { useLocation } from 'react-router-dom';
import { ChildProcess } from 'child_process';


const AppLayout = () => {
  const location = useLocation();
  return(
    <>
<body className={location.pathname === '/login' || location.pathname === '/signup' ? 'noMargin' : 'margin'}>
 {location.pathname !== '/login' && location.pathname !== '/signup' && <NavBar />}      <Outlet/>
 </body>
 </>
  );
};
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path:'/',
        element:<HomePage/>,
        errorElement:<NotFoundPage/>
      },{
        path:'/profile',
        element:<ProfilePage/>,
      },{
        path:'/aboutus',
        element:<AboutUsPage/>,
      },{
        path:'/getstarted',
        element:<GetStartedPage/>,
      },{
        path:'/dashboard',
        element:<DashboardPage/>,
      },{
        path:'/login',
        element:<LoginPage/>,
      },{
        path:'/signup',
        element:<SignUpPage/>,
      }
    ]
  },
 ]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <RouterProvider router={router}/>
);
reportWebVitals();
