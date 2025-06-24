// src/App.jsx - Versão Completa e Final

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import RewardPointsOptimizer from './components/RewardPointsOptimizer';
import InterestCalculator from './components/InterestCalculator';
import RiskManager from './components/RiskManager';
import StrategyLab from './components/StrategyLab';

function App() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('optimizer');
  const [btcPrice, setBtcPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Busca o preço do BTC na CoinGecko quando o componente é montado
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,brl')
      .then(response => {
        if (!response.ok) {
          throw new Error(t('price_error'));
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
  }, [t]); // A dependência [t] garante que o texto de erro seja recarregado se o idioma mudar

  const activeTabStyle = 'bg-yellow-500 text-gray-900 font-bold';
  const inactiveTabStyle = 'bg-gray-700 text-gray-400 hover:bg-gray-600';

  return (
    <div className="bg-gray-900 text-white min-h-screen w-full flex flex-col items-center p-4 font-sans">

      <div className="w-full max-w-2xl flex justify-end gap-2 mb-2">
        <button onClick={() => i18n.changeLanguage('pt')} className={`text-xs px-2 py-1 rounded ${i18n.language.startsWith('pt') ? 'text-yellow-400 font-semibold' : 'text-gray-500'}`}>PT-BR</button>
        <button onClick={() => i18n.changeLanguage('en')} className={`text-xs px-2 py-1 rounded ${i18n.language.startsWith('en') ? 'text-yellow-400 font-semibold' : 'text-gray-500'}`}>EN-US</button>
      </div>

      <div className="w-full max-w-2xl text-center mb-6 p-3 bg-gray-800 rounded-lg h-12 flex items-center justify-center">
        {isLoading && <p className="text-gray-400">{t('loading_price')}</p>}
        {error && <p className="text-red-500">{error}</p>}
        {btcPrice && (
          <p className="font-semibold text-gray-300 text-sm md:text-base">
            {t('btc_price_label')}:
            <span className="text-green-400 font-bold ml-2">${btcPrice.usd.toLocaleString('en-US')} USD</span>
            <span className="text-gray-500 mx-2">|</span>
            <span className="text-green-400 font-bold">R$ {btcPrice.brl.toLocaleString('pt-BR')} BRL</span>
          </p>
        )}
      </div>

      <div className="w-full max-w-2xl">
        <div className="flex flex-wrap justify-center gap-2 mb-8 p-1 bg-gray-800 rounded-xl">
          <button onClick={() => setActiveTab('optimizer')} className={`flex-grow py-3 px-2 rounded-lg transition-colors duration-300 text-sm ${activeTab === 'optimizer' ? activeTabStyle : inactiveTabStyle}`}>
            {t('rp_optimizer_tab')}
          </button>
          <button onClick={() => setActiveTab('interest')} className={`flex-grow py-3 px-2 rounded-lg transition-colors duration-300 text-sm ${activeTab === 'interest' ? activeTabStyle : inactiveTabStyle}`}>
            {t('interest_calculator_tab')}
          </button>
          <button onClick={() => setActiveTab('risk')} className={`flex-grow py-3 px-2 rounded-lg transition-colors duration-300 text-sm ${activeTab === 'risk' ? activeTabStyle : inactiveTabStyle}`}>
            {t('risk_manager_tab')}
          </button>
          <button onClick={() => setActiveTab('lab')} className={`flex-grow py-3 px-2 rounded-lg transition-colors duration-300 text-sm ${activeTab === 'lab' ? 'bg-purple-500 text-white font-bold' : inactiveTabStyle}`}>
            {t('strategy_lab_tab')}
          </button>
        </div>

        <div>
          {activeTab === 'optimizer' && <RewardPointsOptimizer />}
          {activeTab === 'interest' && <InterestCalculator />}
          {activeTab === 'risk' && <RiskManager />}
          {activeTab === 'lab' && <StrategyLab />}
        </div>
      </div>

      <div className="text-center mt-10">
        <a href="https://freebitco.in/?r=10071414" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-gray-900 font-bold text-lg px-8 py-4 rounded-lg hover:bg-yellow-400 transition-transform transform hover:scale-105 inline-block">
          {t('cta_button')}
        </a>
      </div>

      <footer className="text-center text-gray-500 text-sm mt-12 mb-4">
        <p>{t('donation_text')}</p>
        <p className="mt-2 font-mono bg-gray-800 p-2 rounded-md inline-block">
          BTC: 1MvEbq26gPVxw5VYeDQc82wPHjDab1dFYM
        </p>
      </footer>
    </div>
  );
}

export default App;