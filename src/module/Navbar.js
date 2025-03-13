import React from 'react';
import '../style/Navbar.css';

const Navbar = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">AK</div>
            <div className="navbar-links">
                <a onClick={() => scrollToSection('landing')} href="#landing">Home</a>
                <a onClick={() => scrollToSection('about')} href="#about">About</a>
                <a onClick={() => scrollToSection('experience')} href="#experience">Experience</a>
                <a onClick={() => scrollToSection('projects')} href="#projects">Projects</a>
                <a onClick={() => scrollToSection('contact')} href="#contact">Contact</a>
            </div>
        </nav>
    );
};

export default Navbar;