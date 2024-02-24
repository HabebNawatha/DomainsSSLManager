import React, { useState } from 'react';
import '../assets/styles/LoginPageStyle.css';
import image from '../assets/images/SSL_Certificates_manager_logo-2-removebg-preview.png';
import { Height } from '@mui/icons-material';
import { height } from '@mui/system';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
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
                        <a href="#">Don't have an account? Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
