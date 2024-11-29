import React, { useState, useEffect, useCallback } from 'react';
import './HomePg.css';



function HomePg({ user}) {
  const [imageSrc, setImageSrc] = useState('');
  const [imageLoading, setImageLoading] = useState(true);
  console.log(user)
  const fetchRandomImage = useCallback(() => {
    fetch('http://localhost:8080/random-image')
      .then(response => {
        if (response.ok) {
          return response.blob(); 
        }
        throw new Error('Image not found');
      })
      .then(imageBlob => {
        
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImageSrc(imageObjectURL);
        // setImageLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }, []);

  useEffect(() => {
    fetchRandomImage();

    // 24 hours (24 * 60 * 60 * 1000 ms)
    const intervalID = setInterval(fetchRandomImage, 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalID);
  }, [fetchRandomImage]);

  return (
    
    <div className='homepg'>
      <div className='home-intro'>
    <p>Welcome to Carnatic Music Tracker - your dedicated companion for mastering the art of Carnatic music. Whether you're a beginner or an advanced student our platform helps you stay organized on your musical journey. Track your daily practice by uploading recordings, and monitor your progress and finding all theory content in one place.  Let’s create harmony, one note at a time!</p>
    </div>
      {imageLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='randomimage'>
          <p>Person of the Day: Discover and Get Inspired</p>
        <img src={imageSrc} alt="Random Image"  />
        </div>
      )}
    </div>
  );
}

export default HomePg;
