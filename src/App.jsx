// src/App.jsx

import RewardPointsOptimizer from './components/RewardPointsOptimizer';
import InterestCalculator from './components/InterestCalculator';

function App() {
  return (
    // Este é o container principal da página
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-4 font-sans">

      {/* Renderiza o primeiro módulo */}
      <RewardPointsOptimizer />

      {/* Renderiza o segundo módulo */}
      <InterestCalculator />

      {/* Call to Action Geral (opcional, pois já existe em um dos componentes) */}
      <div className="text-center my-10">
        <a
          href="https://freebitco.in/?r=10071414" // <<<---- LEMBRE-SE DE TROCAR AQUI
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