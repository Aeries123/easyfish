import React, { useState } from 'react';
import './Carousel.css';
import TestCard from '../TestCard/TestCard';

const testCards = [
    {
      title: 'Blood Sugar',
      price: 180,
      originalPrice: 253,
      discount: '29%',
      reportsTime: '6 hours',
      testsIncluded: '1',
    },
    {
      title: 'Beta HCG - Pregnancy Marker',
      price: 750,
      originalPrice: 951,
      discount: '21%',
      reportsTime: '6 hours',
      testsIncluded: '1',
    },
    {
      title: 'Platelet Count',
      price: 600,
      originalPrice: 700,
      discount: '15%',
      reportsTime: '6 hours',
      testsIncluded: '1',
    },
  ];

const Carousel = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div className="carousel">
      <button className="prev" onClick={prev}>←</button>
      <div className="carousel-cards">
        {testCards.map((card, index) => (
          <div
            key={index}
            className={`carousel-card ${index === currentIndex ? 'active' : ''}`}
          >
            <TestCard {...card} />
          </div>
        ))}
      </div>
      <button className="next" onClick={next}>→</button>
    </div>
  );
};

export default Carousel;
