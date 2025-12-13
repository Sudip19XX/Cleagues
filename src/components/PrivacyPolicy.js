
import { createFooter } from "./Footer.js";
import { createBackgroundLines } from "./BackgroundLines.js";

export function createPrivacyPolicy() {
    const page = document.createElement('div');
    page.className = 'privacy-page';

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
        <h1 style="text-align: center; margin-bottom: var(--spacing-xl); font-size: 2.5rem; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Privacy Policy</h1>
        <p style="text-align: center; color: var(--color-text-secondary); margin-bottom: var(--spacing-2xl);">Last Updated: December 13, 2025</p>

        <div class="legal-text" style="line-height: 1.8; font-size: 1rem;">
            <p style="margin-bottom: var(--spacing-md);">
                At Crypto Leagues ("we," "our," or "us"), we operate a decentralized skill-based fantasy platform. We are committed to protecting your privacy and ensuring the security of your data. This Privacy Policy outlines our practices regarding data collection, usage, and protection.
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">1. Information We Collect</h3>
            <p style="margin-bottom: var(--spacing-md);">
                <strong>Web3 Data:</strong> When you connect your wallet (e.g., MetaMask, Phantom), we collect your public wallet address. This is typically the only unique identifier we associate with your account. We do not have access to your private keys or funds.<br>
                <strong>Usage & Analytics:</strong> We may collect pseudonymized data about your interactions with the platform, such as game modes played, time spent, and transaction history on the blockchain.
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">2. How We Use Your Information</h3>
            <p style="margin-bottom: var(--spacing-md);">
                We use the collected information for the following purposes:
                <ul style="list-style-type: disc; margin-left: var(--spacing-xl); margin-top: var(--spacing-sm);">
                    <li><strong>Service Delivery:</strong> To provide, operate, and maintain our platform services and leaderboards.</li>
                    <li><strong>Improvement:</strong> To understand and analyze how you use our platform to develop new features and improve user experience.</li>
                    <li><strong>Communication:</strong> To provide customer support and respond to your inquiries.</li>
                    <li><strong>Security:</strong> To detect, prevent, and address fraud, security breaches, or technical issues.</li>
                </ul>
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">3. Data Retention</h3>
            <p style="margin-bottom: var(--spacing-md);">
                We retain your wallet address and gameplay history as long as necessary to provide our services and comply with legal obligations. Blockchain data is immutable and public; therefore, transaction history recorded on-chain cannot be deleted by us.
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">4. Data Sharing and Disclosure</h3>
            <p style="margin-bottom: var(--spacing-md);">
                We do not sell your personal data. We may share information in the following limited circumstances:
                <ul style="list-style-type: disc; margin-left: var(--spacing-xl); margin-top: var(--spacing-sm);">
                    <li><strong>Legal Compliance:</strong> If required by law, subpoena, or other legal process.</li>
                    <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf (e.g., hosting, analytics), subject to confidentiality obligations.</li>
                </ul>
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">5. International Data Transfers</h3>
            <p style="margin-bottom: var(--spacing-md);">
                Your information, including wallet addresses, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">6. Your Data Protection Rights</h3>
            <p style="margin-bottom: var(--spacing-md);">
                Depending on your location (e.g., EEA, California), you may have certain rights regarding your personal data, including:
                <ul style="list-style-type: disc; margin-left: var(--spacing-xl); margin-top: var(--spacing-sm);">
                    <li>The right to access, update, or delete the information we have on you.</li>
                    <li>The right to rectification of inaccurate information.</li>
                    <li>The right to object to our processing of your personal data.</li>
                </ul>
                To exercise these rights, please contact us. Note that we cannot modify or delete data written to the blockchain.
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">7. Third-Party Links and Services</h3>
            <p style="margin-bottom: var(--spacing-md);">
                Our Service may contain links to other websites that are not operated by us. We strictly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">8. Children's Privacy</h3>
            <p style="margin-bottom: var(--spacing-md);">
                Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us.
            </p>

            <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-md); color: var(--color-primary);">9. Changes to This Privacy Policy</h3>
            <p style="margin-bottom: var(--spacing-md);">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <hr style="margin: var(--spacing-xl) 0; border: 0; border-top: 1px solid var(--glass-border);">
            
            <p style="font-size: 0.9rem; color: var(--color-text-secondary); text-align: center;">
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@cryptoleagues.io" style="color: var(--color-primary);">privacy@cryptoleagues.io</a>.
            </p>
        </div>
    `;

    container.appendChild(content);

    // Add Footer
    container.appendChild(createFooter());

    page.appendChild(container);
    return page;
}
