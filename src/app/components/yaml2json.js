'use client'

import { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';

export default function Home() {
  const [yamlInput, setYamlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  useEffect(() => {
    Prism.highlightAll();
  }, [yamlInput, jsonOutput]);

  const convertToYaml = () => {
    try {
      const jsonData = yaml.load(yamlInput);
      const jsonString = JSON.stringify(jsonData, null, 2);
      setJsonOutput(jsonString);
    } catch (error) {
      setJsonOutput('Invalid YAML input');
    }
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(yamlOutput).then(() => {
        setCopyButtonText('Copied!');
        setTimeout(() => setCopyButtonText('Copy'), 2000);
      }).catch(err => {
        console.error('Failed to copy text to clipboard', err);
      });
    } else {
      // Fallback for navigator.clipboard API not available
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'Copied!' : 'Failed to copy';
        setCopyButtonText(msg);
        setTimeout(() => setCopyButtonText('Copy'), 2000);
      } catch (err) {
        console.error('Fallback: Error copying text', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const cleanFields = () => {
    setYamlInput('');
    setJsonOutput('');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">YAML to JSON Converter</h1>
      <div className="flex w-full">
        <div className="w-1/2 h-full pt-2 mr-2">
          <textarea
            className="w-full h-80 p-2 mb-4 border border-gray-300"
            placeholder="Enter YAML here"
            value={yamlInput}
            onChange={(e) => setYamlInput(e.target.value)}
          />
          <div className="flex justify-start">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={convertToYaml}
            >
              Convert
            </button>
            {yamlInput && (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={cleanFields}
              >
                Clean
              </button>
            )}
          </div>
        </div>
        <div className="w-1/2 h-full ml-2">
          {jsonOutput && (
            <div className="w-full mb-4">
              <pre className="overflow-x-auto h-80 max-h-full">
                <code className="language-json">
                  {jsonOutput}
                </code>
              </pre>
            </div>
          )}
          <div className="flex justify-end">
            {jsonOutput && (
              <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={copyToClipboard}
            >
              {copyButtonText}
            </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
