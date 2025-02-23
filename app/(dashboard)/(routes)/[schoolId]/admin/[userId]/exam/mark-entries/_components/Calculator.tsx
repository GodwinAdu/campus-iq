'use client';

// components/ScientificCalculator.tsx
import React, { useState } from 'react';
import { evaluate } from 'mathjs';

const ScientificCalculator: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | string>(0);

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        // Safely evaluate the input expression
        const evaluatedResult = evaluate(input);
        setResult(evaluatedResult);
        setInput('');
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      // Clear the input and result
      setInput('');
      setResult(0);
    } else {
      // Append the value to the input for other buttons
      setInput(input + value);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="p-4 z-50 bg-white rounded-lg shadow-lg max-w-sm mx-auto">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="w-full mb-4 p-2 border rounded text-right text-xl font-semibold"
        placeholder="Enter calculation"
      />
      <div className="mb-4 text-right text-xl font-semibold">{result}</div>
      <div className="grid grid-cols-4 gap-2">
        {/* Scientific Functions */}
        {['(', ')', 'sqrt(', '^'].map((value) => (
          <button key={value} className="p-2 bg-gray-200 rounded" onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
        {['sin(', 'cos(', 'tan(', 'log('].map((value) => (
          <button key={value} className="p-2 bg-gray-200 rounded" onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
        {['7', '8', '9', '/'].map((value) => (
          <button key={value} className="p-2 bg-gray-200 rounded" onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
        {['4', '5', '6', '*'].map((value) => (
          <button key={value} className="p-2 bg-gray-200 rounded" onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
        {['1', '2', '3', '-'].map((value) => (
          <button key={value} className="p-2 bg-gray-200 rounded" onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
        {['0', '.', '=', '+'].map((value) => (
          <button key={value} className="p-2 bg-gray-200 rounded" onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}

        <button className="col-span-2 p-2 bg-red-200 rounded" onClick={() => handleButtonClick('C')}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default ScientificCalculator;
