import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/LoginPageStyle.css';
import image from '../assets/images/SSL_Certificates_manager_logo-2-removebg-preview.png';
import useFormSubmit from '../hooks/useFormSubmit';
import { CircularProgress } from '@mui/material';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Initialize the useFormSubmit hook with the appropriate URL
    const { handleSubmit, loading, error } = useFormSubmit('http://localhost:8000/users/login');

    //Handle Submitting form to login
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await handleSubmit({ email, password }, (data) => { // Pass callback function

                // Successful response handling
                console.log("Data:", data);
                window.location.href = '/';
            });
        } catch (error) {
            console.error('An error occurred while logging in:', error);
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
                <form onSubmit={handleFormSubmit} className='login-form'>
                    <h2 className='login-form-h2'>Sign In</h2>

                    <label className={`login-form-label ${error ? 'error' : ''}`} htmlFor="email">Email Address:</label>
                    <input className={`login-form-input ${error ? 'error' : ''}`}
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label className={`login-form-label ${error ? 'error' : ''}`} htmlFor="password">Password:</label>
                    <input className={`login-form-input ${error ? 'error' : ''}`}
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    <div className="checkbox-container">
                        <input className='login-form-input' type="checkbox" id="remember-me" name="remember-me" />
                        <label className='login-form-label' htmlFor="remember-me">Remember Me</label>
                    </div>
                    <button className='login-form-button' type="submit" disabled={loading}>{loading ? <CircularProgress size={24} /> : 'Login'}</button>
                    <div className="links">
                        <a href="#">Forgot password?</a>
                        <NavLink
                            to="/signup"
                        >
                            Don't Have an account? Register Now!
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
