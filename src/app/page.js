'use client'

import { useState } from 'react';
import Json2Yaml from './components/json2yaml';
import Yaml2Json from './components/yaml2json';

export default function Page() {
  const [currentView, setCurrentView] = useState('json2yaml');
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex justify-center mb-6">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${currentView === 'json2yaml' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            onClick={() => setCurrentView('json2yaml')}
            disabled={currentView === 'json2yaml'}
          >
            JSON to YAML
          </button>
          <button
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${currentView === 'yaml2json' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            onClick={() => setCurrentView('yaml2json')}
            disabled={currentView === 'yaml2json'}
          >
            YAML to JSON
          </button>
        </div>
        {currentView === 'json2yaml' ? <Json2Yaml /> : <Yaml2Json />}

      </div>
      <footer className="mt-auto bg-gray-800 text-white text-center p-4">
        <p>© {currentYear}  <a target='_blank' href="https://github.com/exaluc/json2yaml" className="text-white">
          exaluc/yaml2json
        </a> </p>
      </footer>
    </>
  );
}
