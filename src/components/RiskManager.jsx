// src/components/RiskManager.jsx

import { useState } from 'react';

function RiskManager() {
    const [initialBet, setInitialBet] = useState(1); // 1 satoshi
    const [balance, setBalance] = useState(0.00010000); // 10,000 satoshis
    const [stopLossPercent, setStopLossPercent] = useState(10); // 10%
    const [stopGainPercent, setStopGainPercent] = useState(20); // 20%

    // Simulação da sequência de Martingale
    const martingaleSequence = [];
    let currentBet = initialBet;
    let totalLost = 0;
    for (let i = 1; i <= 15; i++) { // Simulamos 15 derrotas seguidas
        totalLost += currentBet;
        martingaleSequence.push({ lossNumber: i, bet: currentBet, totalLost: totalLost });
        currentBet *= 2;
    }

    // Cálculo dos limites de sessão
    const stopLossValue = balance * (1 - stopLossPercent / 100);
    const stopGainValue = balance * (1 + stopGainPercent / 100);

    return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl">
            <h1 className="text-4xl font-bold text-center text-red-400 mb-2">Gerenciador de Risco</h1>
            <p className="text-gray-400 text-center mb-8">
                Entenda os riscos do jogo "Multiply BTC" e jogue de forma responsável.
            </p>

            {/* Seção 1: Simulador Martingale */}
            <div className="mb-10">
                <h2 className="text-2xl font-semibold text-red-400 mb-4">O Perigo da Estratégia Martingale</h2>
                <p className="text-gray-400 mb-4">Martingale (dobrar a aposta a cada perda) parece seguro, mas cresce exponencialmente. Veja o que acontece em uma sequência de derrotas começando com uma aposta de 1 satoshi:</p>
                <div className="bg-gray-900 p-4 rounded-lg max-h-60 overflow-y-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="p-2">Derrota #</th>
                                <th className="p-2">Aposta Necessária</th>
                                <th className="p-2">Perda Acumulada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {martingaleSequence.map(item => (
                                <tr key={item.lossNumber} className="border-b border-gray-800">
                                    <td className="p-2">{item.lossNumber}</td>
                                    <td className="p-2">{item.bet.toLocaleString('en-US')} satoshis</td>
                                    <td className="p-2 text-red-500">{item.totalLost.toLocaleString('en-US')} satoshis</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Seção 2: Gerenciador de Sessão */}
            <div>
                <h2 className="text-2xl font-semibold text-green-400 mb-4">Defina Seus Limites</h2>
                <p className="text-gray-400 mb-6">A única forma de não quebrar é ter disciplina. Defina suas metas e limites **antes** de começar a jogar.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label htmlFor="balance" className="block text-sm font-medium text-gray-300 mb-1">Seu Saldo (BTC)</label>
                        <input type="number" step="0.00000001" id="balance" value={balance} onChange={e => setBalance(parseFloat(e.target.value))} className="w-full bg-gray-700 p-2 rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="stopLoss" className="block text-sm font-medium text-gray-300 mb-1">Stop-Loss (%)</label>
                        <input type="number" id="stopLoss" value={stopLossPercent} onChange={e => setStopLossPercent(Number(e.target.value))} className="w-full bg-gray-700 p-2 rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="stopGain" className="block text-sm font-medium text-gray-300 mb-1">Stop-Gain (%)</label>
                        <input type="number" id="stopGain" value={stopGainPercent} onChange={e => setStopGainPercent(Number(e.target.value))} className="w-full bg-gray-700 p-2 rounded-lg" />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 text-center">
                    <div className="bg-red-900 bg-opacity-50 p-4 rounded-lg w-full">
                        <h3 className="font-bold text-red-400">PARE DE JOGAR SE</h3>
                        <p className="text-lg">Seu saldo atingir {stopLossValue.toFixed(8)} BTC</p>
                    </div>
                    <div className="bg-green-900 bg-opacity-50 p-4 rounded-lg w-full">
                        <h3 className="font-bold text-green-400">SAIA COM LUCRO SE</h3>
                        <p className="text-lg">Seu saldo atingir {stopGainValue.toFixed(8)} BTC</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RiskManager;