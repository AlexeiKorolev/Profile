import '../style/App.css';
import Landing from './Landing';
import Navbar from './Navbar';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Leadership from './Leadership';
import Footer from './Footer';

import AnimatedCursor from "react-animated-cursor";

import React from 'react';
import { HashRouter as Router } from 'react-router-dom';  // Changed import



function App() {
  return (
    <Router basename="/Profile">
    <div>
      <Navbar />
      <header>
        <div className="App">
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Inter:wght@400;500&display=swap" rel="stylesheet"></link>
          <Landing />
          <About />
          <Experience />
          <Projects />
          <Leadership />
          <Footer />
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
    </Router>
  );
}

export default App;