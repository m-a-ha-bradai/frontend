import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { fetchheaders } from '../../services/headerservices';

const Header = () => {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const getHeaders = async () => {
      try {
        const res = await fetchheaders();
        console.log("Images reçues:", res.data);
        setImages(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des headers:", error);
      }
    };

    getHeaders();
  }, []);

  return (
    <div className="header-carousel">
     
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {images.map((img) => (
            <Carousel.Item key={img._id}>
              <img
                className="d-block w-100"
                src={img.imageUrl}
                alt={img.title }
              />
              <Carousel.Caption>
                {img.title && <h3>{img.title}</h3>}
                {img.description && <p>{img.description}</p>}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
     
    </div>
  );
};

export default Header;












































/*

import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";




const Header = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="header-carousel">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img className="d-block w-100" src={img1} alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={img2} alt="Second slide" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={img3} alt="Third slide" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Header;
*/