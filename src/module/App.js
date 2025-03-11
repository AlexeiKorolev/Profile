import '../style/App.css';
import Landing from './Landing';
import Navbar from './Navbar';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';

function App() {
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
        </div>
      </header>
    </div>
  );
}

export default App;