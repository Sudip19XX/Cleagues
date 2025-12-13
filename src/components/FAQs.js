
import { createFooter } from "./Footer.js";
import { createBackgroundLines } from "./BackgroundLines.js";

export function createFAQs() {
    const page = document.createElement('div');
    page.className = 'faqs-page';

    // Add background
    const bg = createBackgroundLines();
    page.appendChild(bg);

    const container = document.createElement('div');
    container.className = 'container';
    container.style.cssText = `
        padding-top: 100px;
        min-height: 100vh;
        max-width: 900px;
        color: var(--color-text-primary);
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        background: color-mix(in srgb, var(--glass-bg), transparent 40%);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-xl);
        padding: var(--spacing-2xl);
        backdrop-filter: blur(20px);
    `;

    content.innerHTML = `
        <h1 style="text-align: center; margin-bottom: var(--spacing-xl); font-size: 2.5rem; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Frequently Asked Questions</h1>
        <p style="text-align: center; color: var(--color-text-secondary); margin-bottom: var(--spacing-2xl);">Everything you need to know about Crypto Leagues.</p>

        <div class="faq-list">
            ${createFaqItem(
        "What is Crypto Leagues?",
        "Crypto Leagues is a premier skill-based fantasy platform where you can compete in shorter-term prediction markets and battles using platform Points. Test your market skills without the risk of holding actual assets."
    )}
            
            ${createFaqItem(
        "How do Points work?",
        "Points are primarily used for the Crypto Duel game mode. New users receive 100 Points upon connecting their wallet. You can spend points to enter Crypto Duels (20 Pts entry), and you can also earn Points as rewards for winning in other game modes across the platform."
    )}

            ${createFaqItem(
        "Is this a gambling site?",
        "No. Crypto Leagues is a skill-based fantasy platform. You are predicting the crypto market macro movements and competing against other players."
    )}

            ${createFaqItem(
        "How do I start participation?",
        "Simply connect your Web3 wallet (like MetaMask or Phantom) using the button in the top right. You will be able to participate in game modes (except Crypto Duel) using USDC."
    )}

            ${createFaqItem(
        "What are the Game Modes?",
        `<strong>Crypto Duel:</strong> A head-to-head battle between two tokens. Pick the one you think will perform better over 30 seconds.<br>
                 <strong>Predict the Candle:</strong> Predict if the next 1-minute candle for a token will be Green (Up) or Red (Down).<br>
                 <strong>60 Sec Sprint:</strong> Predict if the price of a token will go UP or DOWN in exactly 1 minute.<br>
                 <strong>PvP Battle:</strong> Challenge other players directly in 1v1 price prediction duels. Winner takes all!<br>
                 <strong>Dream Team:</strong> Build a portfolio of tokens and compete for the highest ROI over a 24-hour period.`
    )}

            ${createFaqItem(
        "Can I withdraw my Points?",
        "Currently, Points are for platform use only to climb the leaderboards and compete against others. Future updates may include rewards or prizes for top-ranking players."
    )}

            ${createFaqItem(
        "Is my wallet safe?",
        "Yes. We only use your wallet for authentication (signing a message) to create your account. We never ask for your private keys or seed phrase, and we do not have access to your funds."
    )}
        </div>
    `;

    container.appendChild(content);
    container.appendChild(createFooter());
    page.appendChild(container);

    return page;
}

function createFaqItem(question, answer) {
    // Generate a unique ID for accordion toggle if we wanted one, 
    // but for now we'll just do a clean vertical list.
    return `
        <div style="margin-bottom: var(--spacing-xl); border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: var(--spacing-lg);">
            <h3 style="margin-bottom: var(--spacing-sm); color: var(--color-primary); font-size: 1.25rem;">${question}</h3>
            <div style="color: var(--color-text-secondary); line-height: 1.6; font-size: 1rem;">${answer}</div>
        </div>
    `;
}
