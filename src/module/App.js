import '../style/App.css';
import Landing from './Landing';
import Navbar from './Navbar';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import AnimatedCursor from "react-animated-cursor";
import FollowingShapes from './FollowingShapes';
import React, { useState, useEffect, useRef } from 'react';


function App() {
  /*const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [shapePositions, setShapePositions] = useState([{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]);
  const EASINGS = [0.1, 0.2, 0.3, 0.4, 0.5];
  const CIRCLE_RADIUS = 50;
  const NUMBER_OF_SHAPES = 5;

  const animationFrameRef = useRef(0);

  const updateShapePositions = (newMousePosition) => {
    const newShapePositions = shapePositions.map((shapePosition, index) => {
      const easing = EASINGS[index];
      const newX = shapePosition.x + (targetPosition.x - shapePosition.x) * easing;
      const newY = shapePosition.y + (targetPosition.y - shapePosition.y) * easing;
      return { x: newX, y: newY };
    });
    setShapePositions(newShapePositions);
  }

  const handleMouseMove = (event) => {
    const curTime = Date.now();
    const angle = curTime // curTime / 3600 * 2 * Math.PI;
    const newX = event.clientX + CIRCLE_RADIUS * Math.cos(angle);
    const newY = event.clientY + CIRCLE_RADIUS * Math.sin(angle);
    setTargetPosition({ x: newX, y: newY });
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const update = () => {
    // Function logic to be executed on every frame
    
    // Update the shape positions
    updateShapePositions(mousePosition);
    console.log(shapePositions);

    // Request the next animation frame
    animationFrameRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    // Initial call to start the animation loop
    animationFrameRef.current = requestAnimationFrame(update);

    // Cleanup function to cancel the animation frame on component unmount
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);*/

  return (
    <div>
      <Navbar />
      <header>
        <div className="App">
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Inter:wght@400;500&display=swap" rel="stylesheet"></link>
          <Landing />
          <About />
          <Experience />
          <Projects />
          <AnimatedCursor innerSize={8}
              outerSize={35}
              innerScale={1}
              outerScale={1.7}
              outerAlpha={0}
              outerStyle={{
                border: '3px solid var(--cursor-color)'
              }}
              innerStyle={{
                backgroundColor: 'var(--cursor-color)'
              }} />

        </div>
      </header>
    </div>
  );
}

export default App;