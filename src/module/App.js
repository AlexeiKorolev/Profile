import '../style/App.css';
import Landing from './Landing';
import Navbar from './Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <header>
        <div className="App">
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Inter:wght@400;500&display=swap" rel="stylesheet"></link>
          <Landing />
        </div>
      </header>
    </div>
  );
}

export default App;