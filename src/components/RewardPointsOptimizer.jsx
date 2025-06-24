// src/components/RewardPointsOptimizer.jsx

import { useState, useEffect } from 'react'; // useEffect será usado para o localStorage
import { useTranslation } from 'react-i18next'; // Importação está correta

function RewardPointsOptimizer() {
    // --- A LINHA QUE FALTAVA ESTÁ AQUI ---
    const { t } = useTranslation(); // Chamamos o hook para obter a função 't'

    // Lógica para carregar e salvar os dados no localStorage (Bônus que já vou deixar pronto para você)
    const [currentRP, setCurrentRP] = useState(() => {
        const saved = localStorage.getItem('optimizer_currentRP');
        return saved ? JSON.parse(saved) : 0;
    });

    const [rpPerRoll, setRpPerRoll] = useState(() => {
        const saved = localStorage.getItem('optimizer_rpPerRoll');
        return saved ? JSON.parse(saved) : 4;
    });

    useEffect(() => { localStorage.setItem('optimizer_currentRP', JSON.stringify(currentRP)) }, [currentRP]);
    useEffect(() => { localStorage.setItem('optimizer_rpPerRoll', JSON.stringify(rpPerRoll)) }, [rpPerRoll]);


    const bonusTiers = [
        { cost: 12, bonus: '10%' },
        { cost: 120, bonus: '50%' },
        { cost: 600, bonus: '100%' },
        { cost: 1200, bonus: '500%' },
        { cost: 2400, bonus: '1000%' },
    ];

    return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl">

            {/* Textos agora usam a função t() */}
            <h1 className="text-4xl font-bold text-center text-yellow-400 mb-2">{t('rp_optimizer_title')}</h1>
            <p className="text-gray-400 text-center mb-8">
                {t('rp_optimizer_desc')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label htmlFor="currentRP" className="block text-sm font-medium text-gray-300 mb-2">{t('your_rp_label')}</label>
                    <input
                        type="number"
                        id="currentRP"
                        value={currentRP}
                        onChange={(e) => setCurrentRP(Number(e.target.value) || 0)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                        placeholder="Ex: 1500"
                    />
                </div>
                <div>
                    <label htmlFor="rpPerRoll" className="block text-sm font-medium text-gray-300 mb-2">{t('rp_per_roll_label')}</label>
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
                <h2 className="text-2xl font-semibold text-center mb-4">{t('bonus_goal_label')}</h2>
                <div className="space-y-3">
                    {bonusTiers.map((tier) => {
                        const neededRP = tier.cost - currentRP;
                        const rollsNeeded = neededRP > 0 ? Math.ceil(neededRP / rpPerRoll) : 0;

                        return (
                            <div key={tier.cost} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center transition-all hover:bg-gray-600">
                                <div>
                                    <span className="text-xl font-bold text-yellow-500">{tier.bonus}</span>
                                    <span className="text-gray-400 text-sm"> ({t('Custo')}: {tier.cost} RP)</span> {/* Adaptação simples para a palavra "Custo", idealmente ela também estaria no JSON */}
                                </div>
                                <div className="text-right">
                                    {neededRP > 0 ? (
                                        <p className="text-lg">{t('rolls_left', { count: rollsNeeded })}</p>
                                    ) : (
                                        <p className="text-lg font-bold text-green-400">{t('can_activate')}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default RewardPointsOptimizer;