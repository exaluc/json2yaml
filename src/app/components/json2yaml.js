'use client'

import { useState } from 'react';
import yaml from 'js-yaml';

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const [yamlOutput, setYamlOutput] = useState('');
  const [copyButtonText, setCopyButtonText] = useState('Copy to Clipboard');
  const [cleanButtonText, setCleanButtonText] = useState('Clean');

  const convertToJson = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      const yamlData = yaml.dump(jsonData);
      setYamlOutput(yamlData);
    } catch (error) {
      setYamlOutput('Invalid JSON input');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(yamlOutput);
    setCopyButtonText('Copied!');
    setTimeout(() => setCopyButtonText('Copy to Clipboard'), 2000); // Reset text after 2 seconds
  };

  const cleanFields = () => {
    setJsonInput('');
    setYamlOutput('');
    setCleanButtonText('Cleaned!');
    setTimeout(() => setCleanButtonText('Clean'), 2000); // Reset text after 2 seconds
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">JSON to YAML Converter</h1>
      <div className="flex w-full max-w-4xl">
        <div className="flex-1">
          <textarea
            className="w-full h-80 p-2 mb-4 transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
            placeholder="Enter JSON here"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={convertToJson}
          >
            Convert
          </button>
        </div>
        <div className="flex-1 ml-4">
          <textarea
            className="w-full h-80 p-2 mb-4 transition duration-300 ease-in-out focus:ring-2 focus:ring-green-500"
            placeholder="YAML output"
            value={yamlOutput}
            readOnly
          />
          <div className="flex">
            <button 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={copyToClipboard}
            >
              {copyButtonText}
            </button>
            <button 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
              onClick={cleanFields}
            >
              {cleanButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
