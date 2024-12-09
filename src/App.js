import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [contractFile, setContractFile] = useState(null);
  const [contractCode, setContractCode] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setContractCode(event.target.result);
        setContractFile(file.name);
      };
      reader.readAsText(file);

      // Reset file input for re-upload
      e.target.value = '';
    }
  };

  const handleCodeChange = (e) => {
    setContractCode(e.target.value);
    setContractFile(null); // Clear the file input state when code is manually entered
  };

  const resetFileInput = () => {
    setContractFile(null);
    setContractCode('');
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input element
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contractCode) {
      setResult('Please upload a smart contract file or paste the code.');
      return;
    }

    setLoading(true);
    setResult(''); // Clear previous results

    try {
      const response = await fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contractCode }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        const vulnerabilities = data.vulnerabilities;
        const formattedResult = Object.keys(vulnerabilities)
          .map(
            (vulnerability) =>
              `${vulnerability}: ${vulnerabilities[vulnerability].length} instance(s)`
          )
          .join('\n');

        setResult(formattedResult || 'No vulnerabilities detected.');
      } else {
        setResult(data.error || 'An error occurred.');
      }
    } catch (error) {
      setLoading(false);
      setResult('Failed to connect to the backend.');
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
                ></textarea>
                <p className="or-text">OR</p>
                <div className="file-upload-wrapper">
                  <label className="file-upload">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".sol"
                      onChange={handleFileChange}
                    />
                    Upload
                  </label>
                  {contractFile && (
                    <span className="file-name">
                      <strong>Uploaded file:</strong> {contractFile}
                    </span>
                  )}
                </div>
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
            <div className="result-container">
              {result && (
                <pre className="result">
                  {result}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
