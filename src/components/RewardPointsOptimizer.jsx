// src/components/RewardPointsOptimizer.jsx

import { useState } from 'react';

// Dados dos bônus que podemos ativar com Reward Points
const bonusTiers = [
    { cost: 12, bonus: '10%' },
    { cost: 120, bonus: '50%' },
    { cost: 600, bonus: '100%' },
    { cost: 1200, bonus: '500%' },
    { cost: 2400, bonus: '1000%' },
];

function RewardPointsOptimizer() {
    const [currentRP, setCurrentRP] = useState(0);
    const [rpPerRoll, setRpPerRoll] = useState(4);

    return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl">

            <h1 className="text-4xl font-bold text-center text-yellow-400 mb-2">Otimizador de Reward Points</h1>
            <p className="text-gray-400 text-center mb-8">
                Calcule quantos rolos faltam para ativar os bônus e maximizar seus ganhos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label htmlFor="currentRP" className="block text-sm font-medium text-gray-300 mb-2">Seus Reward Points Atuais:</label>
                    <input
                        type="number"
                        id="currentRP"
                        value={currentRP}
                        onChange={(e) => setCurrentRP(Number(e.target.value))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                        placeholder="Ex: 1500"
                    />
                </div>
                <div>
                    <label htmlFor="rpPerRoll" className="block text-sm font-medium text-gray-300 mb-2">RP ganhos por Rolo Gratuito:</label>
                    <select
                        id="rpPerRoll"
                        value={rpPerRoll}
                        onChange={(e) => setRpPerRoll(Number(e.target.value))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    >
                        <option value="2">2 RP</option>
                        <option value="4">4 RP (com bônus)</option>
                        <option value="6">6 RP (com bônus)</option>
                    </select>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-center mb-4">Meta de Bônus "Free BTC"</h2>
                <div className="space-y-3">
                    {bonusTiers.map((tier) => {
                        const neededRP = tier.cost - currentRP;
                        const rollsNeeded = neededRP > 0 ? Math.ceil(neededRP / rpPerRoll) : 0;

                        return (
                            <div key={tier.cost} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center transition-all hover:bg-gray-600">
                                <div>
                                    <span className="text-xl font-bold text-yellow-500">{tier.bonus}</span>
                                    <span className="text-gray-400 text-sm"> (Custo: {tier.cost} RP)</span>
                                </div>
                                <div className="text-right">
                                    {neededRP > 0 ? (
                                        <p className="text-lg">{rollsNeeded} rolos restantes</p>
                                    ) : (
                                        <p className="text-lg font-bold text-green-400">✅ Você já pode ativar!</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div> // Esta era a tag </div> que provavelmente foi apagada
    );
}

export default RewardPointsOptimizer;