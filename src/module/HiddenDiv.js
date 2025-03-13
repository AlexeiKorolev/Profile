import React, { useState, useEffect } from 'react';

const HiddenDiv = ({ children, positionX, positionY, threshold = 200 }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const distance = Math.sqrt(
        Math.pow(event.clientX - positionX, 2) + 
        Math.pow(event.clientY - positionY, 2)
      );
      
      // Calculate opacity based on distance
      // When distance is 0, opacity is 1
      // When distance >= threshold, opacity is 0
      const newOpacity = Math.max(0, 1 - (distance / threshold));
      setOpacity(newOpacity);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [positionX, positionY, threshold]);

  return (
    <div
      style={{
        position: 'absolute',
        left: positionX,
        top: positionY,
        opacity: opacity,
        transition: 'opacity 0.2s ease-in-out',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)'
      }}
    >
      {children}
    </div>
  );
};

export default HiddenDiv;