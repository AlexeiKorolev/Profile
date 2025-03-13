import React from 'react';
import '../style/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="contact-info">
                    <h3>Contact Me</h3>
                    <div className="contact-links">
                        <a href="mailto:your.email@example.com" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-envelope"></i>
                            Email
                        </a>
                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                            GitHub
                        </a>
                        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                            LinkedIn
                        </a>
                    </div>
                </div>
                <p className="copyright">© {new Date().getFullYear()} Alexei Korolev. All rights reserved. Crafted with care and without templates ;)</p>
            </div>
        </footer>
    );
};

export default Footer;