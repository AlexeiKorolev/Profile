import React, { useEffect, useRef } from 'react';
import '../style/Landing.css';

const Landing = () => {
    const titleRef = useRef(null);

    useEffect(() => {
        const title = titleRef.current;
        
        const handleMouseMove = (e) => {
            const rect = title.getBoundingClientRect();
            const x = e.clientX; // x position within the element
            const y = e.clientY;  // y position within the element
            
            // Calculate the percentage position
            const xPercent = e.clientX / window.innerWidth * 100;
            const yPercent = e.clientY / window.innerHeight * 100;
            // Update the gradient
            /*title.style.backgroundImage = `linear-gradient(
                ${xPercent}deg, 
                var(--primary-color), 
                var(--secondary-color), 
                var(--accent-color)
            )`;*/
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="landing-container">
            <div ref={titleRef} className="title">Alexei Korolev</div>
        
        </div>
    );
};

export default Landing;