from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

import re

# Define vulnerability signatures
SIGNATURES = {
    "Reentrancy": [r"call\.value\((.+?)\)"],
    "Access Control": [r"function\s+\w+\(.*\)\s+(public|external)\s+(?!.*\bonlyOwner\b)"],
    "Arithmetic Issues": [r"\b(\+|\-|\*|\/)\b(?!.*SafeMath)"],
    "Unchecked Low-Level Calls": [r"address\((.+?)\)\.call\((.+?)\)"],
    "Floating Pragma": [r"pragma\s+solidity\s+\^"],
    "Tx. Origin Authentication": [r"tx\.origin"],
    "Unprotected Self-Destruct": [r"selfdestruct\((.+?)\)"],
    "Front Running": [r"block\.timestamp"],
    "Poor Randomness": [r"blockhash\((.+?)\)"]
}

# Function to check vulnerabilities in the contract code
def check_vulnerabilities(contract_code):
    results = {}
    for vulnerability, patterns in SIGNATURES.items():
        matches = []
        for pattern in patterns:
            matches.extend(re.findall(pattern, contract_code))
        if matches:
            results[vulnerability] = matches
    return results



@app.route('/analyze', methods=['POST'])
def analyze_contract():
    data = request.json
    contract_code = data.get('contractCode', '')
    if not contract_code:
        return jsonify({"error": "No contract code provided"}), 400

    vulnerabilities = check_vulnerabilities(contract_code)
    return jsonify({"vulnerabilities": vulnerabilities})

if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5000, debug=True)
