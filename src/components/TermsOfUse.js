
import { createFooter } from "./Footer.js";
import { createBackgroundLines } from "./BackgroundLines.js";

export function createTermsOfUse() {
    const page = document.createElement('div');
    page.className = 'terms-page';

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
        <h1 style="text-align: center; margin-bottom: var(--spacing-xl); font-size: 2.5rem; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Terms of Use</h1>
        <p style="text-align: center; color: var(--color-text-secondary); margin-bottom: var(--spacing-2xl);">Last Updated: December 13, 2025</p>

        <div class="legal-text" style="line-height: 1.8; font-size: 1rem;">
            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">1. Acceptance of Terms</h3>
            <p style="margin-bottom: var(--spacing-md);">
                By accessing and using Crypto Leagues ("the Platform"), you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">2. Platform Nature</h3>
            <p style="margin-bottom: var(--spacing-md);">
                Crypto Leagues is a fantasy crypto platform. <strong>We are not a cryptocurrency exchange, wallet provider, broker-dealer, or financial institution.</strong> Users do not buy, sell, transfer, or take custody of actual cryptocurrency assets on our platform.
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">3. Eligibility</h3>
            <p style="margin-bottom: var(--spacing-md);">
                You must be at least 18 years of age (or the legal age of majority in your jurisdiction) to participate. Access to the Platform is void where prohibited by law. It is your responsibility to ensure that your participation is lawful in your jurisdiction.
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">4. Account Registration</h3>
            <p style="margin-bottom: var(--spacing-md);">
                To access certain features, you may be required to connect a Web3 wallet. You are responsible for maintaining the confidentiality of your wallet credentials and for all activities that occur under your account.
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">5. Game Rules & Rewards</h3>
            <p style="margin-bottom: var(--spacing-md);">
                Participation in games requires the use of Platform Points. Rules for specific game modes (e.g., Crypto Duel, Predict the Candle) are posted on the Platform. We reserve the right to modify game rules, point costs, scoring systems, and reward structures at any time to ensure fair play and platform integrity. Rewards are distributed in Points in accordance with the specific terms of each game mode.
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">6. User Conduct & Fair Play</h3>
            <p style="margin-bottom: var(--spacing-md);">
                We are committed to ensuring a fair and competitive environment. By using the Platform, you agree NOT to:
                <ul style="list-style-type: disc; margin-left: var(--spacing-xl); margin-top: var(--spacing-sm);">
                    <li>Use bots, scripts, or automated software to place trades, manipulate markets, or gain an unfair advantage.</li>
                    <li>Exploit bugs, glitches, or software vulnerabilities. You must report any such issues to support immediately.</li>
                    <li>Engage in collusion with other players to manipulate rankings or rewards (e.g., "win-trading").</li>
                    <li>Create multiple accounts ("multi-accounting") to bypass entry limits or manipulate leaderboards.</li>
                </ul>
                Violation of these Fair Play rules will result in immediate permanent banning and forfeiture of all rewards.
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">7. Intellectual Property & Attribution</h3>
            <p style="margin-bottom: var(--spacing-md);">
                We believe in open innovation. You are free to share, copy, and redistribute the content from Crypto Leagues for community building and educational purposes, provided that you give appropriate credit to Crypto Leagues. However, our core brand assets (such as logos) should not be used in a way that suggests official endorsement or affiliation without our prior written consent.
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">8. Termination</h3>
            <p style="margin-bottom: var(--spacing-md);">
                We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">9. Limitation of Liability</h3>
            <p style="margin-bottom: var(--spacing-md);">
                In no event shall Crypto Leagues, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                <ul style="list-style-type: disc; margin-left: var(--spacing-xl); margin-top: var(--spacing-sm);">
                    <li>Your access to or use of or inability to access or use the Service;</li>
                    <li>Any conduct or content of any third party on the Service;</li>
                    <li>Any content obtained from the Service; and</li>
                    <li>Unauthorized access, use or alteration of your transmissions or content.</li>
                </ul>
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">10. Modifications</h3>
            <p style="margin-bottom: var(--spacing-md);">
                We reserve the right to update these Terms from time to time. We will notify you of any changes by posting the new Terms on this page. Continued use of the Platform after any modifications constitutes your acknowledgment and acceptance of the new Terms.
            </p>
            
        </div>
    `;

    container.appendChild(content);

    // Add Footer
    container.appendChild(createFooter());

    page.appendChild(container);
    return page;
}
