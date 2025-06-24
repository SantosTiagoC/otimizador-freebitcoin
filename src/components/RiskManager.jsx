// src/components/RiskManager.jsx

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function RiskManager() {
    const { t } = useTranslation();

    const [initialBet, setInitialBet] = useState(1);
    const [balance, setBalance] = useState(() => {
        const saved = localStorage.getItem('risk_balance');
        return saved ? JSON.parse(saved) : 0.00010000;
    });
    const [stopLossPercent, setStopLossPercent] = useState(() => {
        const saved = localStorage.getItem('risk_stopLoss');
        return saved ? JSON.parse(saved) : 10;
    });
    const [stopGainPercent, setStopGainPercent] = useState(() => {
        const saved = localStorage.getItem('risk_stopGain');
        return saved ? JSON.parse(saved) : 20;
    });

    useEffect(() => { localStorage.setItem('risk_balance', JSON.stringify(balance)); }, [balance]);
    useEffect(() => { localStorage.setItem('risk_stopLoss', JSON.stringify(stopLossPercent)); }, [stopLossPercent]);
    useEffect(() => { localStorage.setItem('risk_stopGain', JSON.stringify(stopGainPercent)); }, [stopGainPercent]);

    const martingaleSequence = [];
    let currentBet = initialBet;
    let totalLost = 0;
    for (let i = 1; i <= 15; i++) {
        totalLost += currentBet;
        martingaleSequence.push({ lossNumber: i, bet: currentBet, totalLost: totalLost });
        currentBet *= 2;
    }

    const stopLossValue = balance * (1 - stopLossPercent / 100);
    const stopGainValue = balance * (1 + stopGainPercent / 100);

    return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl">
            <h1 className="text-4xl font-bold text-center text-red-400 mb-2">{t('risk_manager_title')}</h1>
            <p className="text-gray-400 text-center mb-8">{t('risk_manager_desc')}</p>

            <div className="mb-10">
                <h2 className="text-2xl font-semibold text-red-400 mb-4">{t('martingale_danger_title')}</h2>
                <p className="text-gray-400 mb-4">{t('martingale_desc')}</p>
                <div className="bg-gray-900 p-4 rounded-lg max-h-60 overflow-y-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="p-2">{t('loss_header')}</th>
                                <th className="p-2">{t('bet_needed_header')}</th>
                                <th className="p-2">{t('total_loss_header')}</th>
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

            <div>
                <h2 className="text-2xl font-semibold text-green-400 mb-4">{t('limits_title')}</h2>
                <p className="text-gray-400 mb-6">{t('limits_desc')}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label htmlFor="balance" className="block text-sm font-medium text-gray-300 mb-1">{t('your_balance_label')}</label>
                        <input type="number" step="0.00000001" id="balance" value={balance} onChange={e => setBalance(parseFloat(e.target.value) || 0)} className="w-full bg-gray-700 p-2 rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="stopLoss" className="block text-sm font-medium text-gray-300 mb-1">{t('stop_loss_label')}</label>
                        <input type="number" id="stopLoss" value={stopLossPercent} onChange={e => setStopLossPercent(Number(e.target.value) || 0)} className="w-full bg-gray-700 p-2 rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="stopGain" className="block text-sm font-medium text-gray-300 mb-1">{t('stop_gain_label')}</label>
                        <input type="number" id="stopGain" value={stopGainPercent} onChange={e => setStopGainPercent(Number(e.target.value) || 0)} className="w-full bg-gray-700 p-2 rounded-lg" />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 text-center">
                    <div className="bg-red-900 bg-opacity-50 p-4 rounded-lg w-full">
                        <h3 className="font-bold text-red-400">{t('stop_playing_if')}</h3>
                        <p className="text-lg">{t('balance_reaches')} {stopLossValue.toFixed(8)} BTC</p>
                    </div>
                    <div className="bg-green-900 bg-opacity-50 p-4 rounded-lg w-full">
                        <h3 className="font-bold text-green-400">{t('take_profit_if')}</h3>
                        <p className="text-lg">{t('balance_reaches')} {stopGainValue.toFixed(8)} BTC</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RiskManager;