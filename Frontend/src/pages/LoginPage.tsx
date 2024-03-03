import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/LoginPageStyle.css';
import image from '../assets/images/SSL_Certificates_manager_logo-2-removebg-preview.png';
import { Height } from '@mui/icons-material';
import { height } from '@mui/system';
import axios from 'axios';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (event : any) => {
        console.log("!!!");
        
        event.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8000/users/login', {
                email,
                password
            });
    
            const data = response.data;
            if (response.status === 200) {
                // If the request is successful, you can handle the response data here
                const token = data.token;
                // Save the token to localStorage or sessionStorage
                // Redirect the user to a new page or perform any other actions
                // For example, redirect to the dashboard page
                window.location.href = '/';
            } else {
                // Handle errors from the server response
                console.error('Failed to log in:', data.message);
                // You can display an error message to the user
            }
        } catch (error) {
            // Handle network errors or unexpected errors
            console.error('An error occurred while logging in:', error);
            // You can display an error message to the user
        }
    };

    return (
        <div className="login-main-container">
            <div className="image-container">
                <div className='image-container-heading'>
                    <img src={image} className="container-logo-img" alt="Logo" />
                    <h1 className='container-slogan'>Scertify</h1>
                </div>
                <div className='image-container-footer'>
                    <h1 className='container-footer'>Manage your certificates with ease. </h1>
                </div>
            </div>
            <div className="login-form-container">
                <form onSubmit={handleSubmit} className='login-form'>
                    <h2 className='login-form-h2'>Sign In</h2>

                    <label className='login-form-label' htmlFor="email">Email Address:</label>
                    <input className="login-form-input"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label className='login-form-label' htmlFor="password">Password:</label>
                    <input className='login-form-input'
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="checkbox-container">
                        <input className='login-form-input' type="checkbox" id="remember-me" name="remember-me" />
                        <label className='login-form-label' htmlFor="remember-me">Remember Me</label>
                    </div>

                    <button className='login-form-button' type="submit">Sign In</button>

                    <div className="links">
                        <a href="#">Forgot password?</a>
                        <NavLink
                            to="/signup"
                        >
                            Don't Have an account? Register Now!
                        </NavLink>                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
