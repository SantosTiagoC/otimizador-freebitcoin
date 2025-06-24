// src/App.jsx

import { useState, useEffect } from 'react';
import RewardPointsOptimizer from './components/RewardPointsOptimizer';
import InterestCalculator from './components/InterestCalculator';
import RiskManager from './components/RiskManager';

function App() {
  const [activeTab, setActiveTab] = useState('optimizer');
  const [btcPrice, setBtcPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,brl')
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao buscar dados da API');
        }
        return response.json();
      })
      .then(data => {
        setBtcPrice(data.bitcoin);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const activeTabStyle = 'bg-yellow-500 text-gray-900 font-bold';
  const inactiveTabStyle = 'bg-gray-700 text-gray-400 hover:bg-gray-600';

  return (
    <div className="bg-gray-900 text-white min-h-screen w-full flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-2xl text-center mb-6 p-3 bg-gray-800 rounded-lg h-12 flex items-center justify-center">
        {isLoading && <p className="text-gray-400">Carregando cotação...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {btcPrice && (
          <p className="font-semibold text-gray-300">
            Cotação BTC:
            <span className="text-green-400 font-bold ml-2">${btcPrice.usd.toLocaleString('en-US')} USD</span>
            <span className="text-gray-500 mx-2">|</span>
            <span className="text-green-400 font-bold">R$ {btcPrice.brl.toLocaleString('pt-BR')} BRL</span>
          </p>
        )}
      </div>

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

      {/* --- ALTERAÇÃO AQUI --- */}
      <div className="text-center mt-10">
        <a href="https://freebitco.in/?r=10071414" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-gray-900 font-bold text-lg px-8 py-4 rounded-lg hover:bg-yellow-400 transition-transform transform hover:scale-105 inline-block">
          Comece a Ganhar no FreeBitco.in
        </a>
      </div>

      {/* --- ALTERAÇÃO AQUI --- */}
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