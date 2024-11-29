import React from 'react';
import './Navigation.css'
import { useNavigate  } from 'react-router-dom';
import Icon  from '../images/icon.png';



const Navigation = ({onLogout}) => {
    const navigate = useNavigate();

     
    const handleLogout = (e) => {
        
        e.preventDefault();
        onLogout(); 
        navigate('/');
      };
    return (
        <header className='navigationbar'>
            <div className='logo'>
                <img className='icon' src={Icon}/>
                  sruthilaya
            </div>
            <nav className='menu'>
                <a href='/home'>Home</a>
                <a href='/tracker'>Music Practice</a> 
                <a href='/theory'>Theory</a>
                <a href="/login" onClick={handleLogout}>
                Logout
                </a>
            </nav>
        </header>
    );
};
export default Navigation
