import React, { useState } from 'react';
import './App.css';

function App() {
  const [contractFile, setContractFile] = useState(null);
  const [contractCode, setContractCode] = useState('');
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    setContractFile(e.target.files[0]);
    setContractCode(''); // Clear the text area if a file is selected
  };

  const handleCodeChange = (e) => {
    setContractCode(e.target.value);
    setContractFile(null); // Clear the file input if text is entered
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contractFile || contractCode) {
      // Simulate backend processing
      setResult('The contract is unsafe.');
    } else {
      setResult('Please upload a smart contract file or paste the code.');
    }
  };

  return (
    <div className="App">
      <div className="dynamic-background"></div>
      <div className="container">
        {/* Left Section */}
        <div className="left-section">
        <h1 className="slogan">Soter.io: Safeguarding the Future of Blockchain, One Contract at a Time.</h1>
          <p className="description">
          Named after the Greek deity of safety, Soter.io is a smart contract security analysis platform designed to enhance the safety of blockchain applications.
          </p>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="input-section">
                <textarea
                  placeholder="Paste your smart contract code here..."
                  value={contractCode}
                  onChange={handleCodeChange}
                  disabled={contractFile !== null}
                ></textarea>
                <p className="or-text">OR</p>
                <label className="file-upload">
                  <input
                    type="file"
                    accept=".sol"
                    onChange={handleFileChange}
                    disabled={contractCode !== ''}
                  />
                  Upload
                </label>
              </div>
              <button type="submit" className="scan-button">
                Scan for Safety
              </button>
            </form>
            {result && <p className="result">{result}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
