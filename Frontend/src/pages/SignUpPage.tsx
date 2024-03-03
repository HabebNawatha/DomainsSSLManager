import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/SignUpPageStyle.css';
import image from '../assets/images/SSL_Certificates_manager_logo-2-removebg-preview.png';
import useFormSubmit from '../hooks/useFormSubmit';
import User from '../../../Backend/src/models/user'
import { CircularProgress, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [verifyPassword, setVerifyPassword] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    // Initialize the useFormSubmit hook with the appropriate URL
    const { handleSubmit, loading, error, setError } = useFormSubmit<User>('http://localhost:8000/users/');

    //Handle submitting form to create user
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user: User = { name, email, password };

        //Checking if passwords matching
        if (password !== verifyPassword) {
            setError('Passwords do not match!');
            return;
        }
        
        //Checking if any input is missing
        if (!user.email || !user.password || !user.name) {
            return;
        }

        //Calling the handle submit to create user
        try {
            await handleSubmit(user, (data) => {
                console.log("User created successfully:", data);
                setShowSuccessPopup(true);
            });
        } catch (error: any) {
            console.error(error.toString());
        }
    };
    //Handle show password icon
    const handleShowPassword = (show: boolean) => {
        setShowPassword(show);
    };

    return (
        <div className="signup-main-container">
            {showSuccessPopup && (
                <div className="success-popup">
                    <p>Account created successfully!</p>
                    <NavLink to="/login">Go to Login!</NavLink>
                </div>
            )}

            <div className="signup-form-container">
                <form onSubmit={handleFormSubmit} className='signup-form'>
                    <h2 className='signup-form-h2'>Sign Up</h2>
                    <label className={`signup-form-label ${error && 'error'}`} htmlFor="username">Username:</label>
                    <input
                        className={`signup-form-input ${error && 'error'}`}
                        type="text"
                        id="username"
                        name="username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label className={`signup-form-label ${error && 'error'}`} htmlFor="email">Email Address:</label>
                    <input
                        className={`signup-form-input ${error && 'error'}`}
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className='password-label-icon-div'>
                        <label className={`signup-form-label ${error && 'error'}`} htmlFor="password">Password:</label>
                        <IconButton onClick={() => { handleShowPassword(!showPassword) }}>
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </div>
                    <input
                        className={`signup-form-input ${error && 'error'}`}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label className={`signup-form-label ${error && 'error'}`} htmlFor="verify-password">Verify Password:</label>

                    <input
                        className={`signup-form-input ${error && 'error'}`}
                        type={showPassword ? 'text' : 'password'} id="verify-password"
                        name="verify-password"
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        required
                    />

                    {error && <p className="error-message">{error}</p>}
                    <button className='signup-form-button' type="submit" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                    </button>

                    <div className="links">
                        <NavLink to="/login">Already have an account? Sign In!</NavLink>
                    </div>
                </form>
            </div>
            <div className="image-container">
                <div className='image-container-heading'>
                    <img src={image} className="container-logo-img" alt="Logo" />
                    <h1 className='container-slogan'>Scertify</h1>
                </div>
                <div className='image-container-footer'>
                    <h1 className='container-footer'>Manage your certificates with ease. </h1>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
