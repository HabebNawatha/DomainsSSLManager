import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,Outlet,RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import AboutUsPage from './pages/AboutUsPage';
import GetStartedPage from './pages/GetStartedPage';
import NavBar from './layouts/NavBar';
import { ChildProcess } from 'child_process';

const AppLayout = () => {
  return(
    <>
      <NavBar/>
      <Outlet/>
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
      }
    ]
  },
 ]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
reportWebVitals();
