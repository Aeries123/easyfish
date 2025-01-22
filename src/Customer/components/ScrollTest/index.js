import { useState, useRef } from "react";
import "./index.css";

const ScrollTest = () => {
  const scrollContainerRef = useRef(null);
  const [cards, setCards] = useState([
    {
      name: "Test 1",
      description: "This is a description for Test 1",
    },
    {
      name: "Test 2",
      description: "This is a description for Test 2",
    },
    {
      name: "Test 3",
      description: "This is a description for Test 3",
    },
    {
      name: "Test 4",
      description: "This is a description for Test 4",
    },
    {
      name: "Test 5",
      description: "This is a description for Test 5",
    },
    {
      name: "Test 6",
      description: "This is a description for Test 6",
    },
    {
      name: "Test 7",
      description: "This is a description for Test 7",
    },
    {
      name: "Test 8",
      description: "This is a description for Test 8",
    },
    {
      name: "Test 9",
      description: "This is a description for Test 9",
    },
  ]);

  const handleScroll = (direction) => {
    const containerWidth = scrollContainerRef.current.offsetWidth;
    const scrollAmount = containerWidth / 3; // Scroll one-third of the visible width

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="test-home-container">
      <div className="test-scroll-wrapper">
        {/* Left Arrow Button */}
        <button
          className="test-scroll-button left"
          onClick={() => handleScroll("left")}
          aria-label="Scroll left"
        >
          &#8592; {/* Left Arrow */}
        </button>

        {/* Cards Container */}
        <div className="test-individual-cards-container" ref={scrollContainerRef}>
          {cards.slice(0, 6).map((card, index) => (
            <div className="test-individual-card" key={index}>
              <h4>{card.name}</h4>
              <p>{card.description}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          className="test-scroll-button right"
          onClick={() => handleScroll("right")}
          aria-label="Scroll right"
        >
          &#8594; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
};

export default ScrollTest;
