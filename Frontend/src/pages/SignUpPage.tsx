import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/SignUpPageStyle.css';
import image from '../assets/images/SSL_Certificates_manager_logo-2-removebg-preview.png';
import useFormSubmit from '../hooks/useFormSubmit';
import User from '../../../Backend/src/models/user'

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [user, setUser] = useState<User>({ name: '', email: '', password: '' });

    // Initialize the useFormSubmit hook with the appropriate URL
    const { handleSubmit, loading, error } = useFormSubmit<User>('http://localhost:8000/users');

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //Setting values for const user.
        setUser({ name, email, password });

        // Perform form validation
        if (!user.email || !user.password || !user.name) {
            return;
        }

        // Call the handleSubmit function from the useFormSubmit hook
        await handleSubmit(user);
        // After creating the user, showing the pop up.
        setShowSuccessPopup(true);
    };


    return (
        <div className="signup-main-container">
            {showSuccessPopup && (
                <div className="success-popup">
                    <p>Account created successfully!</p>
                    <NavLink
                        to="/login"

                    >
                        Go to Login!
                    </NavLink>
                </div>
            )}
            {loading && <p>Loading...</p>}
            <div className="signup-form-container">
                <form onSubmit={handleFormSubmit} className='signup-form'>
                    <h2 className='signup-form-h2'>Sign Up</h2>
                    <label className='signup-form-label' htmlFor="username">Username:</label>
                    <input className="signup-form-input"
                        type="text"
                        id="username"
                        name="username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label className='signup-form-label' htmlFor="email">Email Address:</label>
                    <input className="signup-form-input"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label className='signup-form-label' htmlFor="password">Password:</label>
                    <input className='signup-form-input'
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="checkbox-container">
                        <input className='signup-form-input' type="checkbox" id="remember-me" name="remember-me" />
                        <label className='signup-form-label' htmlFor="remember-me">Remember Me</label>
                    </div>

                    <button className='signup-form-button' type="submit">{loading ? 'Loading...' : 'Sign Up'}
                    </button>

                    <div className="links">
                        <a href="#">Forgot password?</a>
                        <NavLink
                            to="/login"

                        >
                            Already have an account? Sign In!
                        </NavLink>
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
