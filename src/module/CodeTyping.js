import React, { useState, useEffect } from 'react';
import useTypingEffect from '../hooks/Effects';

const CodeTyping = () => {
    const pythonCode = `def fibonacci(n):
    if n <= 1:
        return n
    else:
        a, b = 0, 1
        for _ in range(n - 1):
            a, b = b, a + b
        return b

# Calculate first 10 Fibonacci numbers
result = [fibonacci(i) for i in range(10)]
print(result)`;

    const phrases = [
        pythonCode
    ];
    
    const typedText = useTypingEffect(phrases, 100, 50, 2000);

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
      <code>{typedText}</code>
    </pre>
  );
};

export default CodeTyping;