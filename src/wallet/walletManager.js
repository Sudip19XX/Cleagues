// Simplified Wallet Integration (Vanilla JS approach)
// Note: This is a simplified version without React dependencies
// For production, consider using React with RainbowKit and Solana wallet adapter

import { formatAddress } from '../utils/formatters.js';
import { CHAINS, USDC_ADDRESSES } from '../utils/constants.js';
import { getWalletPreference, setWalletPreference } from '../services/storageService.js';

class WalletManager {
    constructor() {
        this.currentChain = null;
        this.address = null;
        this.provider = null;
        this.listeners = [];
    }

    // Subscribe to wallet state changes
    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    // Notify all listeners of state change
    notify() {
        const state = this.getState();
        this.listeners.forEach(callback => callback(state));
    }

    // Get current wallet state
    getState() {
        return {
            chain: this.currentChain,
            address: this.address,
            connected: !!this.address,
            provider: this.provider,
        };
    }

    // Connect to EVM wallet (MetaMask, etc.)
    async connectEVM() {
        try {
            if (!window.ethereum) {
                throw new Error('No Ethereum wallet found. Please install MetaMask.');
            }

            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });

            if (accounts.length === 0) {
                throw new Error('No accounts found');
            }

            this.currentChain = CHAINS.EVM;
            this.address = accounts[0];
            this.provider = window.ethereum;

            // Set up event listeners
            this.setupEVMListeners();

            // Save preference
            setWalletPreference({ chain: CHAINS.EVM, address: this.address });

            this.notify();

            return {
                success: true,
                address: this.address,
                chain: this.currentChain,
            };
        } catch (error) {
            console.error('Error connecting to EVM wallet:', error);
            throw error;
        }
    }

    // Connect to Solana wallet (Phantom, etc.)
    async connectSolana() {
        try {
            if (!window.solana || !window.solana.isPhantom) {
                throw new Error('No Solana wallet found. Please install Phantom.');
            }

            const response = await window.solana.connect();

            this.currentChain = CHAINS.SOLANA;
            this.address = response.publicKey.toString();
            this.provider = window.solana;

            // Set up event listeners
            this.setupSolanaListeners();

            // Save preference
            setWalletPreference({ chain: CHAINS.SOLANA, address: this.address });

            this.notify();

            return {
                success: true,
                address: this.address,
                chain: this.currentChain,
            };
        } catch (error) {
            console.error('Error connecting to Solana wallet:', error);
            throw error;
        }
    }

    // Disconnect wallet
    async disconnect() {
        if (this.currentChain === CHAINS.SOLANA && window.solana) {
            await window.solana.disconnect();
        }

        this.currentChain = null;
        this.address = null;
        this.provider = null;

        setWalletPreference(null);
        this.notify();
    }

    // Set up EVM event listeners
    setupEVMListeners() {
        if (!window.ethereum) return;

        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                this.disconnect();
            } else {
                this.address = accounts[0];
                this.notify();
            }
        });

        window.ethereum.on('chainChanged', () => {
            // Reload page on chain change (recommended by MetaMask)
            window.location.reload();
        });

        window.ethereum.on('disconnect', () => {
            this.disconnect();
        });
    }

    // Set up Solana event listeners
    setupSolanaListeners() {
        if (!window.solana) return;

        window.solana.on('accountChanged', (publicKey) => {
            if (publicKey) {
                this.address = publicKey.toString();
                this.notify();
            } else {
                this.disconnect();
            }
        });

        window.solana.on('disconnect', () => {
            this.disconnect();
        });
    }

    // Get balance (simplified - Native)
    async getBalance() {
        if (!this.address) return '0';

        try {
            if (this.currentChain === CHAINS.EVM && window.ethereum) {
                const balance = await window.ethereum.request({
                    method: 'eth_getBalance',
                    params: [this.address, 'latest'],
                });
                // Convert from wei to ETH
                return (parseInt(balance, 16) / 1e18).toFixed(4);
            } else if (this.currentChain === CHAINS.SOLANA && window.solana) {
                // Solana balance would require additional setup
                return '0';
            }
        } catch (error) {
            console.error('Error getting balance:', error);
            return '0';
        }
    }

    // Get USDC Balance
    async getUSDCBalance() {
        if (!this.address) return '0.00';

        try {
            if (this.currentChain === CHAINS.EVM && window.ethereum) {
                // Get Chain ID
                const chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
                const chainId = parseInt(chainIdHex, 16);
                const usdcAddress = USDC_ADDRESSES[chainId];

                if (!usdcAddress) {
                    console.warn(`USDC address not found for chain ID: ${chainId}`);
                    // Fallback or return 0
                    return '0.00';
                }

                // ERC20 balanceOf(address) selector: 0x70a08231
                // Pad address to 32 bytes (64 chars)
                const paddedAddress = this.address.substring(2).padStart(64, '0');
                const data = '0x70a08231' + paddedAddress;

                const balanceHex = await window.ethereum.request({
                    method: 'eth_call',
                    params: [{
                        to: usdcAddress,
                        data: data
                    }, 'latest']
                });

                if (balanceHex === '0x') return '0.00';

                // USDC usually has 6 decimals
                const balanceBigInt = BigInt(balanceHex);
                const balance = Number(balanceBigInt) / 1e6;
                return balance.toFixed(2);

            } else if (this.currentChain === CHAINS.SOLANA) {
                // Fetch from Solana RPC
                const response = await fetch('https://api.mainnet-beta.solana.com', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        id: 1,
                        method: 'getTokenAccountsByOwner',
                        params: [
                            this.address,
                            { mint: USDC_ADDRESSES.SOLANA },
                            { encoding: 'jsonParsed' }
                        ]
                    })
                });

                const json = await response.json();
                if (json.result && json.result.value && json.result.value.length > 0) {
                    const info = json.result.value[0].account.data.parsed.info;
                    return info.tokenAmount.uiAmountString || '0.00';
                }
                return '0.00';
            }
        } catch (error) {
            console.error('Error fetching USDC balance:', error);
            return '0.00';
        }
        return '0.00';
    }

    // Sign message
    async signMessage(message) {
        if (!this.address) {
            throw new Error('No wallet connected');
        }

        try {
            if (this.currentChain === CHAINS.EVM && window.ethereum) {
                const signature = await window.ethereum.request({
                    method: 'personal_sign',
                    params: [message, this.address],
                });
                return signature;
            } else if (this.currentChain === CHAINS.SOLANA && window.solana) {
                const encodedMessage = new TextEncoder().encode(message);
                const signedMessage = await window.solana.signMessage(encodedMessage, 'utf8');
                return signedMessage.signature;
            }
        } catch (error) {
            console.error('Error signing message:', error);
            throw error;
        }
    }

    // Auto-connect if previously connected
    async autoConnect() {
        const preference = getWalletPreference();
        if (!preference) return false;

        try {
            if (preference.chain === CHAINS.EVM) {
                await this.connectEVM();
                return true;
            } else if (preference.chain === CHAINS.SOLANA) {
                await this.connectSolana();
                return true;
            }
        } catch (error) {
            console.error('Auto-connect failed:', error);
            return false;
        }
    }
}

// Create singleton instance
export const walletManager = new WalletManager();

// Export for use in components
export default walletManager;
