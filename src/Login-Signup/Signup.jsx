import React, { useState } from 'react';
import './Signup.css';
import { Link, Route, useNavigate, Navigate} from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import validation from './LoginValidation';
// import Login from './Login-Signup/Login';


export const Signup = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value })); 
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
        try {
            const response = await fetch("http://localhost:8080/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                return <Navigate to="/login" />;
            } else {
                console.error("Error:", "Signup failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    };

    return (
        <div className='register'>
            <div className='register-form'>
                <form action='' onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <div className='input'>
                        <input type='text' placeholder='Username' name='username' onChange={handleInput} />
                        <FaUser className='icon' />
                        {errors.name && <span className='manage-error'>{errors.name}</span>}
                    </div>
                    <div className='input'>
                        <input type='email' placeholder='Email' name='email' onChange={handleInput} />
                        <MdEmail className='icon' />
                        {errors.email && <span className='manage-error'>{errors.email}</span>}
                    </div>
                    <div className='input'>
                        <input type='password' placeholder='Create Password' name='password' onChange={handleInput} />
                        <FaLock className='icon' />
                        {errors.password && <span className='manage-error'>{errors.password}</span>}
                    </div>
                    <button type='submit'>Register</button>
                    <div className='login-link'>
                        <p>Already have an account?{' '}
                            <Link to="/login" className="link">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
