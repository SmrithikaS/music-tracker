import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import validation from './LoginValidation';

const Login = ({ onLogin }) => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
   
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validation(values);
        setErrors(validation(values));

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch("http://localhost:8080/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Login successful:", data.message);
                    onLogin(data)
                    navigate("/home");
                } else {
                    console.error("Error:", "login failed");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    return (
        <div className='login'>
            <div className='login-form'>
                <form action='' onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className='input'>
                        <input 
                            type='email' 
                            placeholder='Email' 
                            onChange={handleInput} 
                            name='email' 
                            value={values.email} 
                        />
                        <FaUser className='icon' />
                        {errors.email && <span className='manage-error'>{errors.email}</span>}
                    </div>
                    <div className='input'>
                        <input 
                            type='password' 
                            placeholder='Password' 
                            onChange={handleInput} 
                            name='password' 
                            value={values.password} 
                        />
                        <FaLock className='icon' />
                        {errors.password && <span className='manage-error'>{errors.password}</span>}
                    </div>
                    <div className='forgot-password'>
                        <a href='#'>Forgot password?</a>
                    </div>
                    <button type='submit'>Login</button>
                    <div className='register-link'>
                        <p>Don't have an account?{' '}
                            <a><Link to="/signup" className="link">Register</Link></a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
