import React, { useState } from 'react';
import './App.css';

function App() {
  const [contractFile, setContractFile] = useState(null);
  const [contractCode, setContractCode] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setContractFile(file.name); // Update state with the file name
      setContractCode(''); // Clear the textarea if a file is uploaded
    }
  };

  const handleCodeChange = (e) => {
    setContractCode(e.target.value);
    setContractFile(null); // Clear the file input if text is entered
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contractFile || contractCode) {
      // Simulate backend processing
      setLoading(true);
      setTimeout(() => {
        setLoading(false); // Stop the loading state
        setResult('The contract is unsafe.'); // Display the result
      }, Math.random() * 2000 + 3000); // Random delay between 3-5 seconds
    } else {
      setResult('Please upload a smart contract file or paste the code.');
      return;
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
                {contractFile && (
                    <span className="file-name">
                      <strong>Uploaded file:</strong> {contractFile}
                    </span>
                  )}
              </div>
              <button type="submit" className="scan-button" disabled={loading}>
                {loading ? (
                  <span className="loading">
                    <span className="spinner"></span> Scanning...
                  </span>
                ) : (
                  'Scan for Safety'
                )}
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
