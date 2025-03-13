import React, { useEffect, useRef } from 'react';
import useTypingEffect from '../hooks/Effects';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';

const CodeTyping = ({ 
  phrase = 
      `def fibonacci(n):
  if n <= 1:
      return n
  else:
      a, b = 0, 1
      for _ in range(n - 1):
          a, b = b, a + b
      return b

# Calculate first 10 Fibonacci numbers
result = [fibonacci(i) for i in range(10)]
print(result)`,
  language = 'python',
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000 
}) => {
    const codeRef = useRef(null);
    
    const typedText = phrase

    useEffect(() => {
      if (codeRef.current) {
          Prism.highlightElement(codeRef.current);
      }
  }, [typedText]);

  return (
    <pre style={{
      padding: '15px',
      borderRadius: '5px',
      color: '#000',
      fontFamily: 'Consolas, monospace',
      margin: 0,
      minWidth: '300px',
      textAlign: 'left',
      boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
    }}>
      <code
                ref={codeRef}
                className={`language-${language}`}>
                {typedText}
            </code>
    </pre>
  );
};

export default CodeTyping;