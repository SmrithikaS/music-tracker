import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Theory.css';
import img1 from '../images/img1.png';
import img2 from '../images/img2.png';
import img3 from '../images/img3.png';
import img4 from '../images/img4.png';
import img5 from '../images/img5.png';
import img6 from '../images/img6.png';
import img7 from '../images/img7.png';

const Theory = ({ user}) => {
  const navigate = useNavigate();

  const images = [
    { src: img1, alt: "Image 1", route: "/image1" },
    { src: img2, alt: "Image 2", route: "/image2" },
    { src: img3, alt: "Image 3", route: "/image3" },
    { src: img4, alt: "Image 4", route: "/image4" },
    { src: img5, alt: "Image 5", route: "/image5" },
    { src: img6, alt: "Image 6", route: "/image6" },
    { src: img7, alt: "Image 7", route: "/image7" },
  ];

  const handleImageClick = (route) => {
    navigate(route); 
  };

  return (
    <div className="theory">
      <h1>Theory</h1>
      <div className="grid-container">
        {images.map((image, index) => (
          <div
            key={index}
            className="grid-item"
            onClick={() => handleImageClick(image.route)} 
          >
            <img src={image.src} alt={image.alt} className="grid-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Theory;
