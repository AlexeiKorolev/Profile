import React, { useState, useEffect } from 'react';

function FollowingShapes() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [shapePositions, setShapePositions] = useState([]);
  const numberOfShapes = 5;

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      //updateShapePositions({ x: event.clientX, y: event.clientY });
    };

    
      window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const updateFrame = () => {
    updateShapePositions(mousePosition);
    requestAnimationFrame(updateFrame);
  };

  requestAnimationFrame(updateFrame);

  

  useEffect(() => {
    const initialShapePositions = Array.from({ length: numberOfShapes }, () => ({ x: 0, y: 0 }));
    setShapePositions(initialShapePositions);
  }, [numberOfShapes]);

  const updateShapePositions = (newMousePosition) => {
    setShapePositions((prevShapePositions) => {
      const updatedShapePositions = [...prevShapePositions];
      for (let i = 0; i < numberOfShapes; i++) {
        const easingFactor = 0.1 * (i + 1);
        updatedShapePositions[i] = {
          x: updatedShapePositions[i].x + (newMousePosition.x - updatedShapePositions[i].x) * easingFactor,
          y: updatedShapePositions[i].y + (newMousePosition.y - updatedShapePositions[i].y) * easingFactor,
        };
      }
      return updatedShapePositions;
    });
  };

  return (
    <div>
      {shapePositions.map((position, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: 20,
            height: 20,
            backgroundColor: 'red',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
}

export default FollowingShapes;