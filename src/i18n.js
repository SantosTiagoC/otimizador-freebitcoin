// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            // --- Traduções em Inglês ---
            en: {
                translation: {
                    // Abas
                    rp_optimizer_tab: "RP Optimizer",
                    interest_calculator_tab: "Interest Calculator",
                    risk_manager_tab: "Risk Manager",
                    // Cotação
                    loading_price: "Loading price...",
                    price_error: "Failed to fetch price",
                    btc_price_label: "BTC Price",
                    // CTA e Footer
                    cta_button: "Start Earning on FreeBitco.in",
                    donation_text: "Did you like this tool? Consider donating to support development.",
                    // Otimizador de RP
                    rp_optimizer_title: "Reward Points Optimizer",
                    rp_optimizer_desc: "Calculate how many rolls are left to activate bonuses and maximize your earnings.",
                    your_rp_label: "Your Current Reward Points:",
                    rp_per_roll_label: "RP earned per Free Roll:",
                    bonus_goal_label: "Goal for \"Free BTC\" Bonus",
                    rolls_left: "{{count}} rolls left",
                    can_activate: "✅ You can activate now!",
                    // Calculadora de Juros
                    interest_calculator_title: "Compound Interest Calculator",
                    interest_calculator_desc: "See your balance's growth potential with the 4.08% APY interest.",
                    initial_balance_label: "Initial Balance (BTC)",
                    daily_earnings_label: "Daily Earnings (BTC)",
                    period_label: "Period (Years)",
                    projection_label: "Earnings Projection",
                    balance_needed_alert: "Your initial balance must be at least 0.0003 BTC to earn interest.",
                    after_years_text: "After {{count}} year(s), your balance will be:",
                    total_interest_label: "Total earned from interest only:",
                    copy_button: "Copy Final Balance",
                    copied_button: "Copied!",
                    // Gerenciador de Risco
                    risk_manager_title: "Risk Manager",
                    risk_manager_desc: "Understand the risks of the \"Multiply BTC\" game and play responsibly.",
                    martingale_danger_title: "The Danger of the Martingale Strategy",
                    martingale_desc: "Martingale (doubling the bet on each loss) seems safe, but it grows exponentially. See what happens in a losing streak:",
                    loss_header: "Loss #",
                    bet_needed_header: "Bet Needed",
                    total_loss_header: "Cumulative Loss",
                    limits_title: "Set Your Limits",
                    limits_desc: "The only way not to go broke is to have discipline. Set your goals and limits **before** you start playing.",
                    your_balance_label: "Your Balance (BTC)",
                    stop_loss_label: "Stop-Loss (%)",
                    stop_gain_label: "Stop-Gain (%)",
                    stop_playing_if: "STOP PLAYING IF",
                    balance_reaches: "Your balance reaches",
                    take_profit_if: "TAKE PROFIT IF",
                    // --- NOVO: Strategy Lab ---
                    strategy_lab_tab: "Strategy Lab",
                    strategy_lab_title: "Strategy Laboratory",
                    strategy_lab_desc: "Test betting strategies in a safe environment with thousands of simulated rolls. No real money involved.",
                    config_title: "Simulation Settings",
                    strategy_label: "Choose a Preset Strategy:",
                    initial_balance_sim_label: "Initial Balance (sats)",
                    base_bet_label: "Base Bet (sats)",
                    number_of_bets_label: "Number of Bets to Simulate",
                    run_sim_button: "Run Simulation",
                    running_sim_button: "Simulating...",
                    results_title: "Simulation Results",
                    final_balance: "Final Balance",
                    profit_loss: "Profit/Loss",
                    longest_losing_streak: "Longest Losing Streak",
                    times_busted: "Times Busted (Balance <= 0)",
                    chart_title: "Balance Evolution",
                    // Presets
                    "preset_martingale_classic": "Classic Martingale",
                    "preset_martingale_classic_desc": "Doubles the bet on each loss. Recovers loss + 1x base bet on win.",
                    "preset_martingale_aggressive": "Aggressive Martingale",
                    "preset_martingale_aggressive_desc": "Multiplies bet by 2.2 on loss for a faster, but riskier, recovery.",
                    "preset_anti_martingale": "Anti-Martingale (Paroli)",
                    "preset_anti_martingale_desc": "Doubles the bet on each win for 3 consecutive times. Resets on loss.",
                    "preset_dalembert": "D'Alembert",
                    "preset_dalembert_desc": "Increases bet by 1 unit on loss, decreases by 1 unit on win. Less volatile.",
                    "preset_flat_betting": "Flat Betting",
                    "preset_flat_betting_desc": "Bets the same amount every time. Used as a baseline for comparison.",

                }
            },
            // --- Traduções em Português ---
            pt: {
                translation: {
                    // Abas
                    rp_optimizer_tab: "Otimizador de RP",
                    interest_calculator_tab: "Calculadora de Juros",
                    risk_manager_tab: "Gerenciador de Risco",
                    // Cotação
                    loading_price: "Carregando cotação...",
                    price_error: "Falha ao buscar cotação",
                    btc_price_label: "Cotação BTC",
                    // CTA e Footer
                    cta_button: "Comece a Ganhar no FreeBitco.in",
                    donation_text: "Gostou desta ferramenta? Considere fazer uma doação para apoiar o desenvolvimento.",
                    // Otimizador de RP
                    rp_optimizer_title: "Otimizador de Reward Points",
                    rp_optimizer_desc: "Calcule quantos rolos faltam para ativar os bônus e maximizar seus ganhos.",
                    your_rp_label: "Seus Reward Points Atuais:",
                    rp_per_roll_label: "RP ganhos por Rolo Gratuito:",
                    bonus_goal_label: "Meta de Bônus \"Free BTC\"",
                    rolls_left: "{{count}} rolos restantes",
                    can_activate: "✅ Você já pode ativar!",
                    // Calculadora de Juros
                    interest_calculator_title: "Calculadora de Juros Compostos",
                    interest_calculator_desc: "Veja o potencial de crescimento do seu saldo com os juros de 4.08% a.a.",
                    initial_balance_label: "Saldo Inicial (BTC)",
                    daily_earnings_label: "Ganhos Diários (BTC)",
                    period_label: "Período (Anos)",
                    projection_label: "Projeção de Ganhos",
                    balance_needed_alert: "Seu saldo inicial precisa ser de no mínimo 0.0003 BTC para render juros.",
                    after_years_text: "Após {{count}} ano(s), seu saldo será de:",
                    total_interest_label: "Total ganho apenas com juros:",
                    copy_button: "Copiar Saldo Final",
                    copied_button: "Copiado!",
                    // Gerenciador de Risco
                    risk_manager_title: "Gerenciador de Risco",
                    risk_manager_desc: "Entenda os riscos do jogo \"Multiply BTC\" e jogue de forma responsável.",
                    martingale_danger_title: "O Perigo da Estratégia Martingale",
                    martingale_desc: "Martingale (dobrar a aposta a cada perda) parece seguro, mas cresce exponencialmente. Veja o que acontece em uma sequência de derrotas:",
                    loss_header: "Derrota #",
                    bet_needed_header: "Aposta Necessária",
                    total_loss_header: "Perda Acumulada",
                    limits_title: "Defina Seus Limites",
                    limits_desc: "A única forma de não quebrar é ter disciplina. Defina suas metas e limites **antes** de começar a jogar.",
                    your_balance_label: "Seu Saldo (BTC)",
                    stop_loss_label: "Stop-Loss (%)",
                    stop_gain_label: "Stop-Gain (%)",
                    stop_playing_if: "PARE DE JOGAR SE",
                    balance_reaches: "Seu saldo atingir",
                    take_profit_if: "SAIA COM LUCRO SE",
                    // --- NOVO: Laboratório de Estratégias ---
                    strategy_lab_tab: "Lab. de Estratégias",
                    strategy_lab_title: "Laboratório de Estratégias",
                    strategy_lab_desc: "Teste estratégias de aposta em um ambiente seguro com milhares de rolos simulados. Sem dinheiro real envolvido.",
                    config_title: "Configurações da Simulação",
                    strategy_label: "Escolha uma Estratégia Predefinida:",
                    initial_balance_sim_label: "Saldo Inicial (sats)",
                    base_bet_label: "Aposta Base (sats)",
                    number_of_bets_label: "Nº de Apostas para Simular",
                    run_sim_button: "Rodar Simulação",
                    running_sim_button: "Simulando...",
                    results_title: "Resultados da Simulação",
                    final_balance: "Saldo Final",
                    profit_loss: "Lucro/Prejuízo",
                    longest_losing_streak: "Maior Sequência de Derrotas",
                    times_busted: "Nº de Vezes que Quebrou (Saldo <= 0)",
                    chart_title: "Evolução do Saldo",
                    // Presets
                    "preset_martingale_classic": "Martingale Clássico",
                    "preset_martingale_classic_desc": "Dobra a aposta a cada derrota. Recupera a perda + 1x aposta base na vitória.",
                    "preset_martingale_aggressive": "Martingale Agressivo",
                    "preset_martingale_aggressive_desc": "Multiplica a aposta por 2.2 na derrota para uma recuperação mais rápida, porém mais arriscada.",
                    "preset_anti_martingale": "Anti-Martingale (Paroli)",
                    "preset_anti_martingale_desc": "Dobra a aposta a cada vitória por 3 vezes consecutivas. Reseta na derrota.",
                    "preset_dalembert": "D'Alembert",
                    "preset_dalembert_desc": "Aumenta a aposta em 1 unidade na derrota, diminui em 1 unidade na vitória. Menos volátil.",
                    "preset_flat_betting": "Aposta Fixa",
                    "preset_flat_betting_desc": "Aposta o mesmo valor sempre. Usado como base de comparação.",

                }
            }
        }
    });

export default i18n;