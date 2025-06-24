// src/components/InterestCalculator.jsx

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function InterestCalculator() {
    const { t } = useTranslation();

    const [initialBalance, setInitialBalance] = useState(() => {
        const saved = localStorage.getItem('interest_initialBalance');
        return saved !== null ? JSON.parse(saved) : 0.0003;
    });
    const [dailyEarnings, setDailyEarnings] = useState(() => {
        const saved = localStorage.getItem('interest_dailyEarnings');
        return saved !== null ? JSON.parse(saved) : 0.000005;
    });
    const [years, setYears] = useState(() => {
        const saved = localStorage.getItem('interest_years');
        return saved !== null ? JSON.parse(saved) : 1;
    });
    const [copied, setCopied] = useState(false);

    useEffect(() => { localStorage.setItem('interest_initialBalance', JSON.stringify(initialBalance)); }, [initialBalance]);
    useEffect(() => { localStorage.setItem('interest_dailyEarnings', JSON.stringify(dailyEarnings)); }, [dailyEarnings]);
    useEffect(() => { localStorage.setItem('interest_years', JSON.stringify(years)); }, [years]);

    const ANNUAL_INTEREST_RATE = 0.0408;
    const DAILY_INTEREST_RATE = ANNUAL_INTEREST_RATE / 365;

    let projectedBalance = initialBalance;
    if (initialBalance >= 0.0003) {
        for (let i = 0; i < years * 365; i++) {
            const dailyInterest = projectedBalance * DAILY_INTEREST_RATE;
            projectedBalance += dailyInterest + dailyEarnings;
        }
    }
    const totalInterest = projectedBalance - initialBalance - (dailyEarnings * years * 365);

    const handleCopy = () => {
        navigator.clipboard.writeText(projectedBalance.toFixed(8));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl">
            <h1 className="text-4xl font-bold text-center text-cyan-400 mb-2">{t('interest_calculator_title')}</h1>
            <p className="text-gray-400 text-center mb-8">{t('interest_calculator_desc')}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                    <label htmlFor="initialBalance" className="block text-sm font-medium text-gray-300 mb-2">{t('initial_balance_label')}</label>
                    <input type="number" step="0.00000001" id="initialBalance" value={initialBalance} onChange={(e) => setInitialBalance(parseFloat(e.target.value) || 0)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
                </div>
                <div>
                    <label htmlFor="dailyEarnings" className="block text-sm font-medium text-gray-300 mb-2">{t('daily_earnings_label')}</label>
                    <input type="number" step="0.00000001" id="dailyEarnings" value={dailyEarnings} onChange={(e) => setDailyEarnings(parseFloat(e.target.value) || 0)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
                </div>
                <div>
                    <label htmlFor="years" className="block text-sm font-medium text-gray-300 mb-2">{t('period_label')}</label>
                    <input type="number" id="years" value={years} onChange={(e) => setYears(Number(e.target.value) || 0)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-center mb-4">{t('projection_label')}</h2>
                <div className="bg-gray-700 p-6 rounded-lg text-center">
                    {initialBalance < 0.0003 ? (
                        <p className="text-xl text-red-400">{t('balance_needed_alert')}</p>
                    ) : (
                        <>
                            <p className="text-lg text-gray-300">{t('after_years_text', { count: years })}</p>
                            <p className="text-4xl font-bold text-cyan-400 my-2">{projectedBalance.toFixed(8)} BTC</p>
                            <p className="text-md text-gray-400 mb-4">{t('total_interest_label')} {totalInterest.toFixed(8)} BTC</p>
                            <button onClick={handleCopy} className={`px-4 py-2 text-sm rounded-md transition-colors duration-300 ${copied ? 'bg-green-500 text-white' : 'bg-cyan-600 hover:bg-cyan-500 text-white'}`}>
                                {copied ? t('copied_button') : t('copy_button')}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InterestCalculator;