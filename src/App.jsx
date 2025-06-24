// src/App.jsx

import { useState } from 'react'; // Importamos o useState
import RewardPointsOptimizer from './components/RewardPointsOptimizer';
import InterestCalculator from './components/InterestCalculator';

function App() {
  // 1. Estado para controlar qual aba está ativa. Começamos com o otimizador.
  const [activeTab, setActiveTab] = useState('optimizer');

  // Estilos para reutilizar nos botões das abas
  const activeTabStyle = 'bg-yellow-500 text-gray-900 font-bold';
  const inactiveTabStyle = 'bg-gray-700 text-gray-400 hover:bg-gray-600';

  return (
    // Container principal da página
    <div className="bg-gray-900 text-white min-h-screen w-full flex flex-col items-center p-4 font-sans">

      {/* Container geral para as ferramentas */}
      <div className="w-full max-w-2xl">

        {/* 2. Botões das Abas */}
        <div className="flex justify-center space-x-2 mb-8 p-1 bg-gray-800 rounded-xl">
          <button
            onClick={() => setActiveTab('optimizer')}
            className={`w-full py-3 rounded-lg transition-colors duration-300 ${activeTab === 'optimizer' ? activeTabStyle : inactiveTabStyle}`}
          >
            Otimizador de RP
          </button>
          <button
            onClick={() => setActiveTab('interest')}
            className={`w-full py-3 rounded-lg transition-colors duration-300 ${activeTab === 'interest' ? activeTabStyle : inactiveTabStyle}`}
          >
            Calculadora de Juros
          </button>
        </div>

        {/* 3. Renderização Condicional do Componente */}
        {/* Mostra um componente ou outro baseado no estado 'activeTab' */}
        <div>
          {activeTab === 'optimizer' && <RewardPointsOptimizer />}
          {activeTab === 'interest' && <InterestCalculator />}
        </div>

      </div>

      {/* Call to Action Geral no final da página */}
      <div className="text-center mt-10">
        <a
          href="https://freebitco.in/?r=SEU_ID_AQUI" // <<<---- LEMBRE-SE DE TROCAR AQUI
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 text-gray-900 font-bold text-lg px-8 py-4 rounded-lg hover:bg-yellow-400 transition-transform transform hover:scale-105 inline-block"
        >
          Comece a Ganhar no FreeBitco.in
        </a>
      </div>

    </div>
  );
}

export default App;