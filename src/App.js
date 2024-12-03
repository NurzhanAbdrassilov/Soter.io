import React, { useState } from 'react';
import './App.css';

function App() {
  const [contractFile, setContractFile] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    setContractFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contractFile) {
      // Here, you would typically send the file to the backend for analysis.
      // Since the backend is not ready, we'll just set the result to 'unsafe'.
      setResult('The contract is unsafe.');
    } else {
      setResult('Please upload a smart contract file.');
    }
  };

  return (
    <div className="App">
      <h1>Smart Contract Safety Checker</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".sol" onChange={handleFileChange} />
        <button type="submit">Check Safety</button>
      </form>
      {result && <p className="result">{result}</p>}
    </div>
  );
}

export default App;
