import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import validation from './LoginValidation';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value })); 
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(validation(values));
        
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
                            <Link to="/signup" className="link">Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
