import React from 'react'
import'./IntroPg.css'
import homebg from '../images/home.jpg'
import { useNavigate } from "react-router-dom"

const Intropg = () => {
  const navigate = useNavigate() 
  const goToLogin = () =>{
    navigate("/login");
  }
    
  return (
    <div className='intro'>
      <div className='intro-text'>
        <h2 className='header'>Welcome to Sruthilya!</h2>
        <p>Keep track of your music practice sessions with ease. Our tool helps you set goals, log practice times, save recordings and monitor progress over time. Whether you're a beginner or an experienced musician, this app provides insights to stay consistent, measure improvement, and reach your musical goals.</p>
        <button onClick={goToLogin} className="button">Login</button>
      </div>
      <div className="image-section">
      <img className='image'src={homebg} alt=""/>
      </div>
    </div>
  );
}

export default Intropg