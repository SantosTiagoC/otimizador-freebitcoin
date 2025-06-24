// src/App.jsx

import { useState } from 'react';
import RewardPointsOptimizer from './components/RewardPointsOptimizer';
import InterestCalculator from './components/InterestCalculator';
import RiskManager from './components/RiskManager';

function App() {
  const [activeTab, setActiveTab] = useState('optimizer');

  const activeTabStyle = 'bg-yellow-500 text-gray-900 font-bold';
  const inactiveTabStyle = 'bg-gray-700 text-gray-400 hover:bg-gray-600';

  return (
    <div className="bg-gray-900 text-white min-h-screen w-full flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center space-x-2 mb-8 p-1 bg-gray-800 rounded-xl">
          <button onClick={() => setActiveTab('optimizer')} className={`w-full py-3 rounded-lg transition-colors duration-300 ${activeTab === 'optimizer' ? activeTabStyle : inactiveTabStyle}`}>
            Otimizador de RP
          </button>
          <button onClick={() => setActiveTab('interest')} className={`w-full py-3 rounded-lg transition-colors duration-300 ${activeTab === 'interest' ? activeTabStyle : inactiveTabStyle}`}>
            Calculadora de Juros
          </button>
          <button onClick={() => setActiveTab('risk')} className={`w-full py-3 rounded-lg transition-colors duration-300 ${activeTab === 'risk' ? activeTabStyle : inactiveTabStyle}`}>
            Gerenciador de Risco
          </button>
        </div>

        <div>
          {activeTab === 'optimizer' && <RewardPointsOptimizer />}
          {activeTab === 'interest' && <InterestCalculator />}
          {activeTab === 'risk' && <RiskManager />}
        </div>
      </div>

      <div className="text-center mt-10">
        <a href="https://freebitco.in/?r=10071414" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-gray-900 font-bold text-lg px-8 py-4 rounded-lg hover:bg-yellow-400 transition-transform transform hover:scale-105 inline-block">
          Comece a Ganhar no FreeBitco.in
        </a>
      </div>

      {/* --- NOVO --- */}
      {/* Rodapé com link de doação */}
      <footer className="text-center text-gray-500 text-sm mt-12 mb-4">
        <p>Gostou desta ferramenta? Considere fazer uma doação para apoiar o desenvolvimento.</p>
        <p className="mt-2 font-mono bg-gray-800 p-2 rounded-md inline-block">
          BTC: 1MvEbq26gPVxw5VYeDQc82wPHjDab1dFYM
        </p>
      </footer>

    </div>
  );
}

export default App;