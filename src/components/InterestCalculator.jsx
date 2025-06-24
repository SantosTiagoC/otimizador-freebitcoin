// src/components/InterestCalculator.jsx

import { useState } from 'react';

function InterestCalculator() {
    const [initialBalance, setInitialBalance] = useState(0.0003);
    const [dailyEarnings, setDailyEarnings] = useState(0.000005);
    const [years, setYears] = useState(1);

    // A taxa de juros anual do FreeBitco.in é 4.08%
    const ANNUAL_INTEREST_RATE = 0.0408;
    const DAILY_INTEREST_RATE = ANNUAL_INTEREST_RATE / 365;

    // Lógica do cálculo de juros compostos
    let projectedBalance = initialBalance;
    if (initialBalance >= 0.0003) {
        for (let i = 0; i < years * 365; i++) {
            const dailyInterest = projectedBalance * DAILY_INTEREST_RATE;
            projectedBalance += dailyInterest + dailyEarnings;
        }
    }
    const totalInterest = projectedBalance - initialBalance - (dailyEarnings * years * 365);

    return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl mt-10">

            <h1 className="text-4xl font-bold text-center text-cyan-400 mb-2">Calculadora de Juros Compostos</h1>
            <p className="text-gray-400 text-center mb-8">
                Veja o potencial de crescimento do seu saldo com os juros de 4.08% a.a.
            </p>

            {/* Inputs do Usuário */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                    <label htmlFor="initialBalance" className="block text-sm font-medium text-gray-300 mb-2">Saldo Inicial (BTC)</label>
                    <input
                        type="number"
                        step="0.00000001"
                        id="initialBalance"
                        value={initialBalance}
                        onChange={(e) => setInitialBalance(parseFloat(e.target.value))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="dailyEarnings" className="block text-sm font-medium text-gray-300 mb-2">Ganhos Diários (BTC)</label>
                    <input
                        type="number"
                        step="0.00000001"
                        id="dailyEarnings"
                        value={dailyEarnings}
                        onChange={(e) => setDailyEarnings(parseFloat(e.target.value))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="years" className="block text-sm font-medium text-gray-300 mb-2">Período (Anos)</label>
                    <input
                        type="number"
                        id="years"
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* Resultados */}
            <div>
                <h2 className="text-2xl font-semibold text-center mb-4">Projeção de Ganhos</h2>
                <div className="bg-gray-700 p-6 rounded-lg text-center">
                    {initialBalance < 0.0003 ? (
                        <p className="text-xl text-red-400">Seu saldo inicial precisa ser de no mínimo 0.0003 BTC para render juros.</p>
                    ) : (
                        <>
                            <p className="text-lg text-gray-300">Após {years} ano(s), seu saldo será de:</p>
                            <p className="text-4xl font-bold text-cyan-400 my-2">{projectedBalance.toFixed(8)} BTC</p>
                            <p className="text-md text-gray-400">Total ganho apenas com juros: {totalInterest.toFixed(8)} BTC</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InterestCalculator;