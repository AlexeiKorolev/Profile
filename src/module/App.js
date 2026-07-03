import '../style/App.css';
import React from 'react';
import PlusNav from './PlusNav';
import AnimatedCursor from 'react-animated-cursor';

function App() {
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  return (
    <div className="App">
      <PlusNav />
      {finePointer && (
        <AnimatedCursor
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={1.7}
          outerAlpha={0}
          outerStyle={{ border: '3px solid var(--cursor-color)' }}
          innerStyle={{ backgroundColor: 'var(--cursor-color)' }}
        />
      )}
    </div>
  );
}

export default App;
