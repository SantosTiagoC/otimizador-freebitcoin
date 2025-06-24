// src/components/InterestCalculator.jsx

import { useState, useEffect } from 'react'; // 1. Importamos o useEffect

function InterestCalculator() {
    // 2. Modificamos o useState para ler o valor salvo na inicialização.
    // A função dentro do useState só executa uma vez, na primeira vez que o componente carrega.
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

    // 3. Usamos o useEffect para salvar o novo valor no localStorage sempre que ele mudar.
    // Este useEffect roda toda vez que 'initialBalance' é alterado.
    useEffect(() => {
        localStorage.setItem('interest_initialBalance', JSON.stringify(initialBalance));
    }, [initialBalance]);

    // Fazemos o mesmo para os outros estados.
    useEffect(() => {
        localStorage.setItem('interest_dailyEarnings', JSON.stringify(dailyEarnings));
    }, [dailyEarnings]);

    useEffect(() => {
        localStorage.setItem('interest_years', JSON.stringify(years));
    }, [years]);


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
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    // O restante do código (JSX) continua exatamente o mesmo
    return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl">
            <h1 className="text-4xl font-bold text-center text-cyan-400 mb-2">Calculadora de Juros Compostos</h1>
            <p className="text-gray-400 text-center mb-8">
                Veja o potencial de crescimento do seu saldo com os juros de 4.08% a.a.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                    <label htmlFor="initialBalance" className="block text-sm font-medium text-gray-300 mb-2">Saldo Inicial (BTC)</label>
                    <input type="number" step="0.00000001" id="initialBalance" value={initialBalance} onChange={(e) => setInitialBalance(parseFloat(e.target.value) || 0)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
                </div>
                <div>
                    <label htmlFor="dailyEarnings" className="block text-sm font-medium text-gray-300 mb-2">Ganhos Diários (BTC)</label>
                    <input type="number" step="0.00000001" id="dailyEarnings" value={dailyEarnings} onChange={(e) => setDailyEarnings(parseFloat(e.target.value) || 0)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
                </div>
                <div>
                    <label htmlFor="years" className="block text-sm font-medium text-gray-300 mb-2">Período (Anos)</label>
                    <input type="number" id="years" value={years} onChange={(e) => setYears(Number(e.target.value) || 0)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-center mb-4">Projeção de Ganhos</h2>
                <div className="bg-gray-700 p-6 rounded-lg text-center">
                    {initialBalance < 0.0003 ? (
                        <p className="text-xl text-red-400">Seu saldo inicial precisa ser de no mínimo 0.0003 BTC para render juros.</p>
                    ) : (
                        <>
                            <p className="text-lg text-gray-300">Após {years} ano(s), seu saldo será de:</p>
                            <p className="text-4xl font-bold text-cyan-400 my-2">{projectedBalance.toFixed(8)} BTC</p>
                            <p className="text-md text-gray-400 mb-4">Total ganho apenas com juros: {totalInterest.toFixed(8)} BTC</p>
                            <button onClick={handleCopy} className={`px-4 py-2 text-sm rounded-md transition-colors duration-300 ${copied ? 'bg-green-500 text-white' : 'bg-cyan-600 hover:bg-cyan-500 text-white'}`}>
                                {copied ? 'Copiado!' : 'Copiar Saldo Final'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InterestCalculator;