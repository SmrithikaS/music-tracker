import React from 'react';
import './Navigation.css'
import { Link } from 'react-router-dom';
import Icon  from '../images/icon.png';

const Navigation = () => {
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
            </nav>
        </header>
    )
}
export default Navigation
