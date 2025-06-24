// src/components/StrategyLab.jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const strategyPresets = [
    { id: 'martingale_classic', nameKey: 'preset_martingale_classic', descKey: 'preset_martingale_classic_desc', config: { multiplier: 2, winStreakLimit: null } },
    { id: 'martingale_aggressive', nameKey: 'preset_martingale_aggressive', descKey: 'preset_martingale_aggressive_desc', config: { multiplier: 2.2, winStreakLimit: null } },
    { id: 'anti_martingale', nameKey: 'preset_anti_martingale', descKey: 'preset_anti_martingale_desc', config: { multiplier: 2, winStreakLimit: 3 } },
    { id: 'dalembert', nameKey: 'preset_dalembert', descKey: 'preset_dalembert_desc', config: { multiplier: null, winStreakLimit: null } },
    { id: 'flat_betting', nameKey: 'preset_flat_betting', descKey: 'preset_flat_betting_desc', config: { multiplier: null, winStreakLimit: null } },
];

function StrategyLab() {
    const { t } = useTranslation();
    const [config, setConfig] = useState({
        initialBalance: 100000, // 100k sats
        baseBet: 1,
        numberOfBets: 1000,
        strategy: strategyPresets[0],
    });
    const [results, setResults] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const handleConfigChange = (e) => {
        const { name, value } = e.target;
        if (name === "strategy") {
            const selectedStrategy = strategyPresets.find(p => p.id === value);
            setConfig(prev => ({ ...prev, strategy: selectedStrategy }));
        } else {
            setConfig(prev => ({ ...prev, [name]: Number(value) }));
        }
    };

    const runSimulation = () => {
        setIsRunning(true);
        setResults(null);

        // Simular em um timeout para permitir que a UI atualize para "Simulando..."
        setTimeout(() => {
            let balance = config.initialBalance;
            let currentBet = config.baseBet;
            let balanceHistory = [balance];
            let longestLosingStreak = 0;
            let currentLosingStreak = 0;
            let winStreak = 0;
            let profitLoss = 0;
            let timesBusted = 0;

            for (let i = 0; i < config.numberOfBets; i++) {
                if (balance <= 0) {
                    timesBusted++;
                    break; // Para a simulação se quebrar
                }
                if (currentBet > balance) currentBet = balance; // All-in se a aposta for maior que o saldo

                const hasWon = Math.random() < 0.475; // 47.5% de chance de ganhar

                if (hasWon) {
                    balance += currentBet;
                    currentLosingStreak = 0;
                    winStreak++;

                    // Lógica da Estratégia na VITÓRIA
                    switch (config.strategy.id) {
                        case 'anti_martingale':
                            if (winStreak < config.strategy.config.winStreakLimit) {
                                currentBet *= config.strategy.config.multiplier;
                            } else {
                                currentBet = config.baseBet;
                                winStreak = 0;
                            }
                            break;
                        case 'dalembert':
                            if (currentBet > config.baseBet) currentBet -= config.baseBet;
                            break;
                        default: // Martingale, Flat
                            currentBet = config.baseBet;
                            break;
                    }
                } else { // Perdeu
                    balance -= currentBet;
                    currentLosingStreak++;
                    if (currentLosingStreak > longestLosingStreak) longestLosingStreak = currentLosingStreak;
                    winStreak = 0;

                    // Lógica da Estratégia na DERROTA
                    switch (config.strategy.id) {
                        case 'martingale_classic':
                        case 'martingale_aggressive':
                            currentBet *= config.strategy.config.multiplier;
                            break;
                        case 'dalembert':
                            currentBet += config.baseBet;
                            break;
                        default: // Anti-Martingale, Flat
                            currentBet = config.baseBet;
                            break;
                    }
                }
                balanceHistory.push(balance);
            }

            setResults({
                finalBalance: balance,
                profitLoss: balance - config.initialBalance,
                longestLosingStreak,
                timesBusted,
                history: balanceHistory,
            });
            setIsRunning(false);
        }, 100);
    };

    const chartData = {
        labels: results?.history.map((_, i) => i) || [],
        datasets: [{
            label: t('chart_title'),
            data: results?.history || [],
            borderColor: 'rgb(250, 204, 21)',
            backgroundColor: 'rgba(250, 204, 21, 0.5)',
            pointRadius: 0,
            borderWidth: 1.5,
        }],
    };

    return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl">
            <h1 className="text-4xl font-bold text-center text-purple-400 mb-2">{t('strategy_lab_title')}</h1>
            <p className="text-gray-400 text-center mb-8">{t('strategy_lab_desc')}</p>

            {/* Configurações */}
            <div className="bg-gray-900 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-semibold text-purple-400 mb-4">{t('config_title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">{t('strategy_label')}</label>
                        <select name="strategy" value={config.strategy.id} onChange={handleConfigChange} className="w-full bg-gray-700 p-2 rounded-lg">
                            {strategyPresets.map(p => <option key={p.id} value={p.id}>{t(p.nameKey)}</option>)}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">{t(config.strategy.descKey)}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">{t('initial_balance_sim_label')}</label>
                        <input type="number" name="initialBalance" value={config.initialBalance} onChange={handleConfigChange} className="w-full bg-gray-700 p-2 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">{t('base_bet_label')}</label>
                        <input type="number" name="baseBet" value={config.baseBet} onChange={handleConfigChange} className="w-full bg-gray-700 p-2 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">{t('number_of_bets_label')}</label>
                        <input type="number" name="numberOfBets" value={config.numberOfBets} onChange={handleConfigChange} className="w-full bg-gray-700 p-2 rounded-lg" />
                    </div>
                </div>
                <button onClick={runSimulation} disabled={isRunning} className="w-full mt-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold disabled:bg-gray-600">
                    {isRunning ? t('running_sim_button') : t('run_sim_button')}
                </button>
            </div>

            {/* Resultados */}
            {results && (
                <div className="bg-gray-900 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold text-purple-400 mb-4">{t('results_title')}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
                        <div>
                            <p className="text-sm text-gray-400">{t('final_balance')}</p>
                            <p className="text-xl font-bold">{results.finalBalance.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">{t('profit_loss')}</p>
                            <p className={`text-xl font-bold ${results.profitLoss > 0 ? 'text-green-500' : 'text-red-500'}`}>{results.profitLoss.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">{t('longest_losing_streak')}</p>
                            <p className="text-xl font-bold">{results.longestLosingStreak}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">{t('times_busted')}</p>
                            <p className="text-xl font-bold">{results.timesBusted}</p>
                        </div>
                    </div>
                    <Line options={{ responsive: true }} data={chartData} />
                </div>
            )}
        </div>
    );
}

export default StrategyLab;