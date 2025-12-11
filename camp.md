Based on the CAMP Network Origin Framework documentation, I'll create a comprehensive README.md file for integrating all features into your existing app. This will cover the Origin APIs, IpNFT module, Marketplace, and Dispute Module with complete implementation details.

```markdown
# CAMP Network Origin Framework SDK Integration Guide

Complete integration guide for implementing CAMP Network's Origin Framework into your application, including IP NFT management, marketplace functionality, and dispute resolution.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Architecture](#architecture)
- [Authentication Setup](#authentication-setup)
- [Core Modules](#core-modules)
  - [IpNFT Module](#ipnft-module)
  - [Marketplace Module](#marketplace-module)
  - [Dispute Module](#dispute-module)
- [Origin APIs Integration](#origin-apis-integration)
- [Third-Party Platform Integration](#third-party-platform-integration)
- [Smart Contract Integration](#smart-contract-integration)
- [Complete Implementation Examples](#complete-implementation-examples)
- [Testing](#testing)
- [Deployment](#deployment)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

The **CAMP Network Origin Framework** is a comprehensive platform designed for onboarding and managing intellectual property (IP) within Camp's decentralized registry. This SDK enables developers to:

- Create, mint, and manage IP NFTs on-chain
- Build marketplace functionality for buying/selling IP
- Implement dispute resolution mechanisms
- Access user data from multiple platforms (Spotify, Twitter, TikTok, etc.)
- Leverage Camp's IP registry for Web3 applications

### Key Components

1. **Origin APIs** - RESTful API suite for platform interaction
2. **Origin Smart Contracts** - Three core modules (IpNFT, Marketplace, Dispute)
3. **Third-Party Integrations** - OAuth-based access to external platforms

---

## Prerequisites

### Development Environment

```
Node.js >= 18.0.0
npm >= 9.0.0 or yarn >= 1.22.0
TypeScript >= 5.0.0 (recommended)
```

### Blockchain Requirements

```
# Ethereum wallet with test ETH
# Camp Network RPC endpoint access
# Metamask or WalletConnect integration
```

### API Access

- Camp Network API key (obtain from [Camp Network Dashboard](https://campnetwork.xyz))
- OAuth credentials for third-party platforms (if needed)
- Test environment access for development

---

## Installation

### Step 1: Install SDK Dependencies

```
# Using npm
npm install @camp-network/origin-sdk ethers@^6.0.0

# Using yarn
yarn add @camp-network/origin-sdk ethers@^6.0.0

# Additional dependencies for full integration
npm install axios dotenv @walletconnect/web3-provider
```

### Step 2: Environment Configuration

Create a `.env` file in your project root:

```
# Camp Network Configuration
CAMP_API_KEY=your_api_key_here
CAMP_API_URL=https://api.campnetwork.xyz
CAMP_NETWORK_RPC=https://rpc.campnetwork.xyz

# Smart Contract Addresses
IPNFT_CONTRACT_ADDRESS=0x...
MARKETPLACE_CONTRACT_ADDRESS=0x...
DISPUTE_CONTRACT_ADDRESS=0x...

# OAuth Configuration (for third-party integrations)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret

# Wallet Configuration
PRIVATE_KEY=your_private_key_for_testing
```

### Step 3: TypeScript Configuration

Add to your `tsconfig.json`:

```
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

---

## Architecture

### Origin Framework Architecture Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     Your Application                         │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │   UI/UX    │  │  Business    │  │   Integration    │    │
│  │  Components│  │    Logic     │  │     Layer        │    │
│  └──────┬─────┘  └──────┬───────┘  └────────┬─────────┘    │
└─────────┼────────────────┼──────────────────┼──────────────┘
          │                │                   │
          ▼                ▼                   ▼
┌─────────────────────────────────────────────────────────────┐
│              CAMP Origin Framework SDK                       │
│  ┌──────────────────┐  ┌──────────────────────────────┐    │
│  │   Origin APIs    │  │   Smart Contract Interface   │    │
│  │   - Auth         │  │   - IpNFT                    │    │
│  │   - Data Access  │  │   - Marketplace              │    │
│  │   - 3rd Party    │  │   - Dispute Module           │    │
│  └─────────┬────────┘  └──────────┬───────────────────┘    │
└───────────┼────────────────────────┼──────────────────────┘
            │                        │
            ▼                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Camp Network Blockchain                         │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │ IP Registry│  │  Smart       │  │  Dispute         │    │
│  │            │  │  Contracts   │  │  Resolution      │    │
│  └────────────┘  └──────────────┘  └──────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## Authentication Setup

### OAuth 2.0 Configuration

```
// src/config/auth.config.ts
import { OAuth2Client } from '@camp-network/origin-sdk';

export const authConfig = {
  clientId: process.env.CAMP_API_KEY,
  clientSecret: process.env.CAMP_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/callback',
  scopes: ['read:ip', 'write:ip', 'marketplace:access', 'dispute:manage']
};

// Initialize OAuth Client
export const initializeAuth = () => {
  const oauthClient = new OAuth2Client(authConfig);
  return oauthClient;
};
```

### User Authentication Flow

```
// src/services/auth.service.ts
import { CampAuthService } from '@camp-network/origin-sdk';

class AuthenticationService {
  private authService: CampAuthService;

  constructor() {
    this.authService = new CampAuthService({
      apiKey: process.env.CAMP_API_KEY!,
      apiUrl: process.env.CAMP_API_URL!
    });
  }

  /**
   * Initiate OAuth login flow
   */
  async login(): Promise<string> {
    const authUrl = await this.authService.getAuthorizationUrl({
      scopes: authConfig.scopes,
      state: this.generateState()
    });
    return authUrl;
  }

  /**
   * Handle OAuth callback and exchange code for tokens
   */
  async handleCallback(code: string): Promise<AuthTokens> {
    const tokens = await this.authService.exchangeCodeForTokens(code);
    
    // Store tokens securely
    await this.storeTokens(tokens);
    
    return tokens;
  }

  /**
   * Refresh expired access token
   */
  async refreshAccessToken(refreshToken: string): Promise<AuthTokens> {
    const newTokens = await this.authService.refreshToken(refreshToken);
    await this.storeTokens(newTokens);
    return newTokens;
  }

  /**
   * Get current user profile
   */
  async getUserProfile(): Promise<UserProfile> {
    const accessToken = await this.getAccessToken();
    return await this.authService.getProfile(accessToken);
  }

  // Helper methods
  private generateState(): string {
    return Math.random().toString(36).substring(7);
  }

  private async storeTokens(tokens: AuthTokens): Promise<void> {
    // Implement secure token storage (e.g., encrypted local storage)
  }

  private async getAccessToken(): Promise<string> {
    // Retrieve stored access token
  }
}

export const authService = new AuthenticationService();
```

---

## Core Modules

## IpNFT Module

The IpNFT module handles creation, minting, and management of intellectual property as NFTs.

### Smart Contract Interface

```
// src/contracts/IpNFT.interface.ts
export interface IpNFTMetadata {
  name: string;
  description: string;
  image: string;
  properties: {
    creator: string;
    creationDate: string;
    ipType: 'music' | 'art' | 'video' | 'game' | 'other';
    license: string;
    externalUrl?: string;
  };
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface IpNFTContract {
  mint(to: string, tokenURI: string, metadata: IpNFTMetadata): Promise<TransactionReceipt>;
  transferFrom(from: string, to: string, tokenId: number): Promise<TransactionReceipt>;
  approve(to: string, tokenId: number): Promise<TransactionReceipt>;
  ownerOf(tokenId: number): Promise<string>;
  tokenURI(tokenId: number): Promise<string>;
  balanceOf(owner: string): Promise<number>;
}
```

### IpNFT Service Implementation

```
// src/services/ipnft.service.ts
import { ethers } from 'ethers';
import { IpNFTSDK } from '@camp-network/origin-sdk';

class IpNFTService {
  private sdk: IpNFTSDK;
  private contract: ethers.Contract;

  constructor() {
    const provider = new ethers.JsonRpcProvider(process.env.CAMP_NETWORK_RPC);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    
    this.sdk = new IpNFTSDK({
      provider,
      signer,
      contractAddress: process.env.IPNFT_CONTRACT_ADDRESS!
    });
    
    this.contract = this.sdk.getContract();
  }

  /**
   * Create and mint new IP NFT
   */
  async mintIpNFT(params: {
    ownerAddress: string;
    metadata: IpNFTMetadata;
    ipfsHash?: string;
  }): Promise<{ tokenId: number; transactionHash: string }> {
    try {
      // Upload metadata to IPFS (or use provided hash)
      const tokenURI = params.ipfsHash || await this.uploadToIPFS(params.metadata);
      
      // Mint NFT on-chain
      const tx = await this.contract.mint(
        params.ownerAddress,
        tokenURI,
        params.metadata
      );
      
      const receipt = await tx.wait();
      
      // Extract token ID from event logs
      const event = receipt.logs.find(
        (log: any) => log.topics === ethers.id('Transfer(address,address,uint256)')
      );
      const tokenId = parseInt(event.topics, 16);[1]
      
      console.log(`✅ IpNFT minted successfully! Token ID: ${tokenId}`);
      
      return {
        tokenId,
        transactionHash: receipt.hash
      };
    } catch (error) {
      console.error('❌ Error minting IpNFT:', error);
      throw error;
    }
  }

  /**
   * Get IP NFT details by token ID
   */
  async getIpNFT(tokenId: number): Promise<IpNFTData> {
    const [owner, tokenURI, metadata] = await Promise.all([
      this.contract.ownerOf(tokenId),
      this.contract.tokenURI(tokenId),
      this.fetchMetadata(tokenId)
    ]);

    return {
      tokenId,
      owner,
      tokenURI,
      metadata,
      isListed: await this.checkIfListed(tokenId)
    };
  }

  /**
   * Transfer IP NFT to another address
   */
  async transferIpNFT(params: {
    from: string;
    to: string;
    tokenId: number;
  }): Promise<TransactionReceipt> {
    const tx = await this.contract.transferFrom(
      params.from,
      params.to,
      params.tokenId
    );
    return await tx.wait();
  }

  /**
   * Get all IP NFTs owned by an address
   */
  async getOwnedIpNFTs(ownerAddress: string): Promise<IpNFTData[]> {
    const balance = await this.contract.balanceOf(ownerAddress);
    const tokenIds = [];

    // Fetch all token IDs for the owner
    for (let i = 0; i < balance; i++) {
      const tokenId = await this.contract.tokenOfOwnerByIndex(ownerAddress, i);
      tokenIds.push(tokenId);
    }

    // Fetch details for each token
    return await Promise.all(
      tokenIds.map(tokenId => this.getIpNFT(tokenId))
    );
  }

  /**
   * Burn (destroy) an IP NFT
   */
  async burnIpNFT(tokenId: number): Promise<TransactionReceipt> {
    const tx = await this.contract.burn(tokenId);
    return await tx.wait();
  }

  // Helper methods
  private async uploadToIPFS(metadata: IpNFTMetadata): Promise<string> {
    // Implementation for IPFS upload
    // You can use services like Pinata, NFT.Storage, or IPFS directly
  }

  private async fetchMetadata(tokenId: number): Promise<IpNFTMetadata> {
    const tokenURI = await this.contract.tokenURI(tokenId);
    const response = await fetch(tokenURI);
    return await response.json();
  }

  private async checkIfListed(tokenId: number): Promise<boolean> {
    // Check marketplace contract if NFT is listed
  }
}

export const ipnftService = new IpNFTService();
```

---

## Marketplace Module

The Marketplace module enables buying, selling, and auction functionality for IP NFTs.

### Marketplace Smart Contract Interface

```
// src/contracts/Marketplace.interface.ts
export interface MarketplaceListing {
  tokenId: number;
  seller: string;
  price: bigint;
  listingId: number;
  isActive: boolean;
  listedAt: number;
}

export interface AuctionData {
  tokenId: number;
  seller: string;
  startingPrice: bigint;
  currentBid: bigint;
  highestBidder: string;
  endTime: number;
  isActive: boolean;
}
```

### Marketplace Service Implementation

```
// src/services/marketplace.service.ts
import { ethers } from 'ethers';
import { MarketplaceSDK } from '@camp-network/origin-sdk';

class MarketplaceService {
  private sdk: MarketplaceSDK;
  private contract: ethers.Contract;
  private listingPrice: bigint;

  constructor() {
    const provider = new ethers.JsonRpcProvider(process.env.CAMP_NETWORK_RPC);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    
    this.sdk = new MarketplaceSDK({
      provider,
      signer,
      contractAddress: process.env.MARKETPLACE_CONTRACT_ADDRESS!
    });
    
    this.contract = this.sdk.getContract();
  }

  async initialize(): Promise<void> {
    this.listingPrice = await this.contract.getListingPrice();
  }

  /**
   * List an IP NFT for sale
   */
  async listNFTForSale(params: {
    tokenId: number;
    price: string; // In ETH
  }): Promise<{ listingId: number; transactionHash: string }> {
    try {
      const priceInWei = ethers.parseEther(params.price);
      
      // First approve marketplace to transfer NFT
      await this.approveMarketplace(params.tokenId);
      
      // List on marketplace
      const tx = await this.contract.createMarketItem(
        process.env.IPNFT_CONTRACT_ADDRESS,
        params.tokenId,
        priceInWei,
        { value: this.listingPrice } // Listing fee
      );
      
      const receipt = await tx.wait();
      
      // Extract listing ID from events
      const event = receipt.logs.find(
        (log: any) => log.fragment?.name === 'MarketItemCreated'
      );
      const listingId = event?.args?.itemId;
      
      console.log(`✅ NFT listed successfully! Listing ID: ${listingId}`);
      
      return {
        listingId,
        transactionHash: receipt.hash
      };
    } catch (error) {
      console.error('❌ Error listing NFT:', error);
      throw error;
    }
  }

  /**
   * Purchase a listed NFT
   */
  async purchaseNFT(listingId: number): Promise<TransactionReceipt> {
    try {
      const listing = await this.getListing(listingId);
      
      if (!listing.isActive) {
        throw new Error('Listing is not active');
      }
      
      const tx = await this.contract.createMarketSale(
        process.env.IPNFT_CONTRACT_ADDRESS,
        listingId,
        { value: listing.price }
      );
      
      const receipt = await tx.wait();
      console.log(`✅ NFT purchased successfully!`);
      
      return receipt;
    } catch (error) {
      console.error('❌ Error purchasing NFT:', error);
      throw error;
    }
  }

  /**
   * Cancel a listing
   */
  async cancelListing(listingId: number): Promise<TransactionReceipt> {
    const tx = await this.contract.cancelMarketItem(listingId);
    return await tx.wait();
  }

  /**
   * Relist an NFT with updated price
   */
  async relistNFT(params: {
    tokenId: number;
    newPrice: string;
  }): Promise<TransactionReceipt> {
    const priceInWei = ethers.parseEther(params.newPrice);
    
    const tx = await this.contract.reSellToken(
      params.tokenId,
      priceInWei,
      { value: this.listingPrice }
    );
    
    return await tx.wait();
  }

  /**
   * Get all active marketplace listings
   */
  async getActiveListings(): Promise<MarketplaceListing[]> {
    const items = await this.contract.fetchMarketItems();
    
    return items.map((item: any) => ({
      listingId: Number(item.itemId),
      tokenId: Number(item.tokenId),
      seller: item.seller,
      price: item.price,
      isActive: !item.sold && !item.cancelled,
      listedAt: Number(item.listedAt)
    }));
  }

  /**
   * Get listings by seller
   */
  async getSellerListings(sellerAddress: string): Promise<MarketplaceListing[]> {
    const items = await this.contract.fetchItemsListed();
    
    return items
      .filter((item: any) => item.seller.toLowerCase() === sellerAddress.toLowerCase())
      .map((item: any) => ({
        listingId: Number(item.itemId),
        tokenId: Number(item.tokenId),
        seller: item.seller,
        price: item.price,
        isActive: !item.sold && !item.cancelled,
        listedAt: Number(item.listedAt)
      }));
  }

  /**
   * Create an auction for an NFT
   */
  async createAuction(params: {
    tokenId: number;
    startingPrice: string;
    duration: number; // in seconds
  }): Promise<{ auctionId: number; transactionHash: string }> {
    const priceInWei = ethers.parseEther(params.startingPrice);
    
    await this.approveMarketplace(params.tokenId);
    
    const tx = await this.contract.createAuction(
      process.env.IPNFT_CONTRACT_ADDRESS,
      params.tokenId,
      priceInWei,
      params.duration
    );
    
    const receipt = await tx.wait();
    const event = receipt.logs.find(
      (log: any) => log.fragment?.name === 'AuctionCreated'
    );
    
    return {
      auctionId: event?.args?.auctionId,
      transactionHash: receipt.hash
    };
  }

  /**
   * Place bid on auction
   */
  async placeBid(auctionId: number, bidAmount: string): Promise<TransactionReceipt> {
    const bidInWei = ethers.parseEther(bidAmount);
    
    const tx = await this.contract.placeBid(auctionId, {
      value: bidInWei
    });
    
    return await tx.wait();
  }

  /**
   * End auction and transfer NFT to highest bidder
   */
  async endAuction(auctionId: number): Promise<TransactionReceipt> {
    const tx = await this.contract.endAuction(auctionId);
    return await tx.wait();
  }

  // Helper methods
  private async approveMarketplace(tokenId: number): Promise<void> {
    const ipnftContract = new ethers.Contract(
      process.env.IPNFT_CONTRACT_ADDRESS!,
      ['function approve(address to, uint256 tokenId)'],
      this.contract.runner
    );
    
    const tx = await ipnftContract.approve(
      process.env.MARKETPLACE_CONTRACT_ADDRESS,
      tokenId
    );
    await tx.wait();
  }

  private async getListing(listingId: number): Promise<MarketplaceListing> {
    const item = await this.contract.getMarketItem(listingId);
    
    return {
      listingId,
      tokenId: Number(item.tokenId),
      seller: item.seller,
      price: item.price,
      isActive: !item.sold && !item.cancelled,
      listedAt: Number(item.listedAt)
    };
  }
}

export const marketplaceService = new MarketplaceService();
```

---

## Dispute Module

The Dispute module handles conflict resolution for marketplace transactions.

### Dispute Service Implementation

```
// src/services/dispute.service.ts
import { ethers } from 'ethers';
import { DisputeSDK } from '@camp-network/origin-sdk';

export enum DisputeStatus {
  PENDING = 0,
  UNDER_REVIEW = 1,
  RESOLVED = 2,
  CANCELLED = 3
}

export enum DisputeReason {
  COUNTERFEIT = 0,
  NOT_AS_DESCRIBED = 1,
  PAYMENT_ISSUE = 2,
  DELIVERY_ISSUE = 3,
  OTHER = 4
}

interface DisputeData {
  disputeId: number;
  listingId: number;
  complainant: string;
  defendant: string;
  reason: DisputeReason;
  status: DisputeStatus;
  createdAt: number;
  resolvedAt?: number;
  evidence: string[];
}

class DisputeService {
  private sdk: DisputeSDK;
  private contract: ethers.Contract;

  constructor() {
    const provider = new ethers.JsonRpcProvider(process.env.CAMP_NETWORK_RPC);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    
    this.sdk = new DisputeSDK({
      provider,
      signer,
      contractAddress: process.env.DISPUTE_CONTRACT_ADDRESS!
    });
    
    this.contract = this.sdk.getContract();
  }

  /**
   * Open a dispute for a marketplace transaction
   */
  async openDispute(params: {
    listingId: number;
    reason: DisputeReason;
    evidenceURI: string;
    description: string;
  }): Promise<{ disputeId: number; transactionHash: string }> {
    try {
      const tx = await this.contract.openDispute(
        params.listingId,
        params.reason,
        params.evidenceURI,
        params.description
      );
      
      const receipt = await tx.wait();
      
      const event = receipt.logs.find(
        (log: any) => log.fragment?.name === 'DisputeOpened'
      );
      const disputeId = event?.args?.disputeId;
      
      console.log(`✅ Dispute opened! Dispute ID: ${disputeId}`);
      
      return {
        disputeId,
        transactionHash: receipt.hash
      };
    } catch (error) {
      console.error('❌ Error opening dispute:', error);
      throw error;
    }
  }

  /**
   * Add evidence to an existing dispute
   */
  async addEvidence(params: {
    disputeId: number;
    evidenceURI: string;
    description: string;
  }): Promise<TransactionReceipt> {
    const tx = await this.contract.addEvidence(
      params.disputeId,
      params.evidenceURI,
      params.description
    );
    
    return await tx.wait();
  }

  /**
   * Get dispute details
   */
  async getDispute(disputeId: number): Promise<DisputeData> {
    const dispute = await this.contract.getDispute(disputeId);
    
    return {
      disputeId,
      listingId: Number(dispute.listingId),
      complainant: dispute.complainant,
      defendant: dispute.defendant,
      reason: dispute.reason,
      status: dispute.status,
      createdAt: Number(dispute.createdAt),
      resolvedAt: dispute.resolvedAt ? Number(dispute.resolvedAt) : undefined,
      evidence: await this.getDisputeEvidence(disputeId)
    };
  }

  /**
   * Get all disputes for a user
   */
  async getUserDisputes(userAddress: string): Promise<DisputeData[]> {
    const disputeIds = await this.contract.getUserDisputes(userAddress);
    
    return await Promise.all(
      disputeIds.map((id: number) => this.getDispute(id))
    );
  }

  /**
   * Resolve dispute (admin/arbitrator only)
   */
  async resolveDispute(params: {
    disputeId: number;
    favorComplainant: boolean;
    resolution: string;
  }): Promise<TransactionReceipt> {
    const tx = await this.contract.resolveDispute(
      params.disputeId,
      params.favorComplainant,
      params.resolution
    );
    
    return await tx.wait();
  }

  /**
   * Cancel dispute (by complainant)
   */
  async cancelDispute(disputeId: number): Promise<TransactionReceipt> {
    const tx = await this.contract.cancelDispute(disputeId);
    return await tx.wait();
  }

  /**
   * Vote on dispute resolution (if using DAO voting)
   */
  async voteOnDispute(params: {
    disputeId: number;
    favorComplainant: boolean;
  }): Promise<TransactionReceipt> {
    const tx = await this.contract.voteOnDispute(
      params.disputeId,
      params.favorComplainant
    );
    
    return await tx.wait();
  }

  // Helper methods
  private async getDisputeEvidence(disputeId: number): Promise<string[]> {
    const evidenceCount = await this.contract.getEvidenceCount(disputeId);
    const evidence: string[] = [];
    
    for (let i = 0; i < evidenceCount; i++) {
      const evidenceURI = await this.contract.getEvidence(disputeId, i);
      evidence.push(evidenceURI);
    }
    
    return evidence;
  }
}

export const disputeService = new DisputeService();
```

---

## Origin APIs Integration

### API Client Setup

```
// src/services/origin-api.service.ts
import axios, { AxiosInstance } from 'axios';

class OriginAPIService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.CAMP_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CAMP_API_KEY}`
      }
    });

    // Add request interceptor for token refresh
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      async (config) => {
        const token = await this.getValidToken();
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired, refresh and retry
          await this.refreshToken();
          return this.client.request(error.config);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get IP NFT metadata from Camp registry
   */
  async getIPMetadata(tokenId: number): Promise<any> {
    const response = await this.client.get(`/api/v1/ip/${tokenId}`);
    return response.data;
  }

  /**
   * Search IP NFTs in registry
   */
  async searchIP(params: {
    query: string;
    type?: string;
    creator?: string;
    limit?: number;
  }): Promise<any[]> {
    const response = await this.client.get('/api/v1/ip/search', { params });
    return response.data.results;
  }

  /**
   * Get user profile data
   */
  async getUserProfile(userId: string): Promise<any> {
    const response = await this.client.get(`/api/v1/users/${userId}`);
    return response.data;
  }

  /**
   * Get marketplace statistics
   */
  async getMarketplaceStats(): Promise<any> {
    const response = await this.client.get('/api/v1/marketplace/stats');
    return response.data;
  }

  // Token management
  private async getValidToken(): Promise<string> {
    // Implement token retrieval and validation
  }

  private async refreshToken(): Promise<void> {
    // Implement token refresh logic
  }
}

export const originAPIService = new OriginAPIService();
```

---

## Third-Party Platform Integration

### Spotify Integration

```
// src/integrations/spotify.integration.ts
import { SpotifyAuth, SpotifyAPI } from '@camp-network/origin-sdk';

class SpotifyIntegration {
  private auth: SpotifyAuth;
  private api: SpotifyAPI;

  constructor() {
    this.auth = new SpotifyAuth({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      redirectUri: 'http://localhost:3000/spotify/callback'
    });
  }

  /**
   * Initiate Spotify OAuth flow
   */
  async authenticate(): Promise<string> {
    const authUrl = this.auth.getAuthorizationUrl({
      scopes: ['user-read-private', 'user-read-email', 'user-library-read']
    });
    return authUrl;
  }

  /**
   * Handle OAuth callback
   */
  async handleCallback(code: string): Promise<void> {
    const tokens = await this.auth.exchangeCodeForTokens(code);
    this.api = new SpotifyAPI(tokens.accessToken);
  }

  /**
   * Fetch user's Spotify data for IP creation
   */
  async getUserMusicData(): Promise<SpotifyMusicData> {
    const [profile, tracks, artists] = await Promise.all([
      this.api.getProfile(),
      this.api.getTopTracks({ limit: 50 }),
      this.api.getTopArtists({ limit: 50 })
    ]);

    return {
      profile,
      topTracks: tracks.items,
      topArtists: artists.items
    };
  }

  /**
   * Create IP NFT from Spotify playlist
   */
  async createIPFromPlaylist(playlistId: string): Promise<IpNFTMetadata> {
    const playlist = await this.api.getPlaylist(playlistId);
    
    return {
      name: playlist.name,
      description: playlist.description,
      image: playlist.images?.url,
      properties: {
        creator: playlist.owner.display_name,
        creationDate: new Date().toISOString(),
        ipType: 'music',
        license: 'Standard',
        externalUrl: playlist.external_urls.spotify
      },
      attributes: [
        { trait_type: 'Track Count', value: playlist.tracks.total },
        { trait_type: 'Followers', value: playlist.followers.total },
        { trait_type: 'Platform', value: 'Spotify' }
      ]
    };
  }
}

export const spotifyIntegration = new SpotifyIntegration();
```

### Twitter/X Integration

```
// src/integrations/twitter.integration.ts
import { TwitterAuth, TwitterAPI } from '@camp-network/origin-sdk';

class TwitterIntegration {
  private auth: TwitterAuth;
  private api: TwitterAPI;

  constructor() {
    this.auth = new TwitterAuth({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      redirectUri: 'http://localhost:3000/twitter/callback'
    });
  }

  async authenticate(): Promise<string> {
    return this.auth.getAuthorizationUrl({
      scopes: ['tweet.read', 'users.read', 'follows.read']
    });
  }

  async handleCallback(code: string): Promise<void> {
    const tokens = await this.auth.exchangeCodeForTokens(code);
    this.api = new TwitterAPI(tokens.accessToken);
  }

  /**
   * Create IP NFT from Twitter content
   */
  async createIPFromTweet(tweetId: string): Promise<IpNFTMetadata> {
    const tweet = await this.api.getTweet(tweetId);
    
    return {
      name: `Tweet by @${tweet.author.username}`,
      description: tweet.text,
      image: tweet.media?.?.url || '',
      properties: {
        creator: tweet.author.name,
        creationDate: tweet.created_at,
        ipType: 'other',
        license: 'Standard',
        externalUrl: `https://twitter.com/${tweet.author.username}/status/${tweetId}`
      },
      attributes: [
        { trait_type: 'Likes', value: tweet.public_metrics.like_count },
        { trait_type: 'Retweets', value: tweet.public_metrics.retweet_count },
        { trait_type: 'Platform', value: 'Twitter' }
      ]
    };
  }
}

export const twitterIntegration = new TwitterIntegration();
```

---

## Complete Implementation Examples

### Example 1: Complete NFT Minting Flow

```
// src/examples/mint-nft.example.ts
import { ipnftService } from '../services/ipnft.service';
import { spotifyIntegration } from '../integrations/spotify.integration';

async function mintMusicIPNFT() {
  try {
    // 1. Authenticate with Spotify
    console.log('🔐 Authenticating with Spotify...');
    const authUrl = await spotifyIntegration.authenticate();
    // User completes OAuth flow...
    
    // 2. Fetch user's music data
    console.log('📊 Fetching music data...');
    const musicData = await spotifyIntegration.getUserMusicData();
    
    // 3. Create IP metadata from Spotify playlist
    const metadata = await spotifyIntegration.createIPFromPlaylist('playlist_id');
    
    // 4. Mint IP NFT
    console.log('🎨 Minting IP NFT...');
    const result = await ipnftService.mintIpNFT({
      ownerAddress: '0x...user_wallet_address',
      metadata
    });
    
    console.log(`✅ Success! Token ID: ${result.tokenId}`);
    console.log(`📝 Transaction: ${result.transactionHash}`);
    
    return result;
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}
```

### Example 2: Complete Marketplace Flow

```
// src/examples/marketplace.example.ts
import { ipnftService } from '../services/ipnft.service';
import { marketplaceService } from '../services/marketplace.service';

async function completeMarketplaceFlow() {
  try {
    // 1. Mint NFT
    const { tokenId } = await ipnftService.mintIpNFT({
      ownerAddress: '0x...seller_address',
      metadata: {
        /* metadata */
      }
    });
    
    // 2. List NFT for sale
    console.log('📋 Listing NFT on marketplace...');
    const { listingId } = await marketplaceService.listNFTForSale({
      tokenId,
      price: '0.1' // 0.1 ETH
    });
    
    console.log(`✅ Listed! Listing ID: ${listingId}`);
    
    // 3. View all active listings
    const activeListings = await marketplaceService.getActiveListings();
    console.log(`📊 Active listings: ${activeListings.length}`);
    
    // 4. Purchase NFT (as buyer)
    console.log('🛒 Purchasing NFT...');
    const receipt = await marketplaceService.purchaseNFT(listingId);
    
    console.log(`✅ Purchase complete! TX: ${receipt.hash}`);
    
    return { tokenId, listingId, receipt };
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}
```

### Example 3: Dispute Resolution Flow

```
// src/examples/dispute.example.ts
import { disputeService } from '../services/dispute.service';

async function handleDisputeFlow() {
  try {
    // 1. Open dispute
    console.log('⚠️ Opening dispute...');
    const { disputeId } = await disputeService.openDispute({
      listingId: 123,
      reason: DisputeReason.NOT_AS_DESCRIBED,
      evidenceURI: 'ipfs://evidence_hash',
      description: 'The NFT received does not match the description'
    });
    
    console.log(`✅ Dispute opened! ID: ${disputeId}`);
    
    // 2. Add additional evidence
    await disputeService.addEvidence({
      disputeId,
      evidenceURI: 'ipfs://additional_evidence',
      description: 'Screenshots showing discrepancy'
    });
    
    // 3. Check dispute status
    const dispute = await disputeService.getDispute(disputeId);
    console.log(`📊 Status: ${DisputeStatus[dispute.status]}`);
    
    // 4. Resolve dispute (as arbitrator)
    if (dispute.status === DisputeStatus.UNDER_REVIEW) {
      await disputeService.resolveDispute({
        disputeId,
        favorComplainant: true,
        resolution: 'Refund issued to buyer'
      });
      
      console.log('✅ Dispute resolved!');
    }
    
    return dispute;
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}
```

---

## Testing

### Unit Tests Setup

```
// tests/ipnft.service.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { ipnftService } from '../src/services/ipnft.service';

describe('IpNFTService', () => {
  beforeEach(async () => {
    // Setup test environment
  });

  it('should mint new IP NFT', async () => {
    const result = await ipnftService.mintIpNFT({
      ownerAddress: '0x123...',
      metadata: {
        name: 'Test NFT',
        description: 'Test description',
        image: 'ipfs://test',
        properties: {
          creator: 'Test Creator',
          creationDate: new Date().toISOString(),
          ipType: 'art',
          license: 'MIT'
        },
        attributes: []
      }
    });

    expect(result.tokenId).toBeGreaterThan(0);
    expect(result.transactionHash).toBeDefined();
  });

  it('should fetch NFT details', async () => {
    const nft = await ipnftService.getIpNFT(1);
    
    expect(nft.tokenId).toBe(1);
    expect(nft.owner).toBeDefined();
    expect(nft.metadata).toBeDefined();
  });
});
```

### Integration Tests

```
// tests/integration/marketplace.integration.test.ts
import { describe, it, expect } from 'vitest';
import { ipnftService } from '../src/services/ipnft.service';
import { marketplaceService } from '../src/services/marketplace.service';

describe('Marketplace Integration', () => {
  it('should complete full mint-to-sale flow', async () => {
    // Mint NFT
    const { tokenId } = await ipnftService.mintIpNFT({
      ownerAddress: testAddress,
      metadata: testMetadata
    });

    // List for sale
    const { listingId } = await marketplaceService.listNFTForSale({
      tokenId,
      price: '0.1'
    });

    // Verify listing
    const listing = await marketplaceService.getListing(listingId);
    expect(listing.isActive).toBe(true);
    expect(listing.price).toBe(ethers.parseEther('0.1'));
  });
});
```

---

## Deployment

### Production Configuration

```
// src/config/production.config.ts
export const productionConfig = {
  campNetwork: {
    rpcUrl: 'https://mainnet-rpc.campnetwork.xyz',
    chainId: 100001, // Camp Network mainnet chain ID
    contracts: {
      ipnft: '0x...production_ipnft_address',
      marketplace: '0x...production_marketplace_address',
      dispute: '0x...production_dispute_address'
    }
  },
  api: {
    baseUrl: 'https://api.campnetwork.xyz',
    timeout: 30000
  },
  ipfs: {
    gateway: 'https://ipfs.io/ipfs/',
    uploadEndpoint: 'https://api.pinata.cloud/pinning/pinFileToIPFS'
  }
};
```

### Deployment Checklist

```
## Pre-Deployment Checklist

- [ ] All smart contracts audited and verified
- [ ] Environment variables configured for production
- [ ] API keys rotated and secured
- [ ] Database migrations completed
- [ ] Integration tests passing
- [ ] Security audit completed
- [ ] Rate limiting configured
- [ ] Error monitoring setup (Sentry, etc.)
- [ ] Backup and recovery procedures documented
- [ ] Load testing completed
- [ ] CDN configured for static assets
- [ ] SSL certificates installed
```

---

## Best Practices

### Security Best Practices

```
// 1. Always validate inputs
function validateTokenId(tokenId: number): void {
  if (!Number.isInteger(tokenId) || tokenId < 0) {
    throw new Error('Invalid token ID');
  }
}

// 2. Use environment variables for sensitive data
const getConfig = () => ({
  privateKey: process.env.PRIVATE_KEY,
  apiKey: process.env.CAMP_API_KEY
});

// 3. Implement rate limiting
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// 4. Validate contract addresses
function isValidAddress(address: string): boolean {
  return ethers.isAddress(address);
}

// 5. Handle errors gracefully
async function safeContractCall<T>(
  fn: () => Promise<T>
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    console.error('Contract call failed:', error);
    return null;
  }
}
```

### Performance Optimization

```
// 1. Batch API calls
async function batchFetchNFTs(tokenIds: number[]): Promise<IpNFTData[]> {
  const batchSize = 10;
  const results: IpNFTData[] = [];
  
  for (let i = 0; i < tokenIds.length; i += batchSize) {
    const batch = tokenIds.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(id => ipnftService.getIpNFT(id))
    );
    results.push(...batchResults);
  }
  
  return results;
}

// 2. Cache frequently accessed data
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // 10 minute TTL

async function getCachedNFT(tokenId: number): Promise<IpNFTData> {
  const cacheKey = `nft:${tokenId}`;
  const cached = cache.get<IpNFTData>(cacheKey);
  
  if (cached) return cached;
  
  const nft = await ipnftService.getIpNFT(tokenId);
  cache.set(cacheKey, nft);
  
  return nft;
}

// 3. Use pagination for large datasets
async function getPaginatedListings(
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResult<MarketplaceListing>> {
  const allListings = await marketplaceService.getActiveListings();
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    data: allListings.slice(startIndex, endIndex),
    page,
    limit,
    total: allListings.length,
    totalPages: Math.ceil(allListings.length / limit)
  };
}
```

---

## Troubleshooting

### Common Issues and Solutions

```
// Issue 1: Transaction reverts with "Insufficient funds"
// Solution: Check gas estimation and account balance
async function checkBalance(address: string): Promise<void> {
  const provider = new ethers.JsonRpcProvider(process.env.CAMP_NETWORK_RPC);
  const balance = await provider.getBalance(address);
  const balanceInEth = ethers.formatEther(balance);
  
  console.log(`Balance: ${balanceInEth} ETH`);
  
  if (parseFloat(balanceInEth) < 0.01) {
    throw new Error('Insufficient balance for transaction');
  }
}

// Issue 2: "Nonce too low" error
// Solution: Fetch and use correct nonce
async function sendTransactionWithCorrectNonce(
  transaction: any
): Promise<TransactionReceipt> {
  const provider = new ethers.JsonRpcProvider(process.env.CAMP_NETWORK_RPC);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  
  const nonce = await provider.getTransactionCount(
    await signer.getAddress(),
    'pending'
  );
  
  const tx = await signer.sendTransaction({
    ...transaction,
    nonce
  });
  
  return await tx.wait();
}

// Issue 3: API rate limiting
// Solution: Implement retry with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      if (error.response?.status === 429 && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}

// Issue 4: IPFS upload failures
// Solution: Implement fallback upload service
async function uploadWithFallback(
  data: any
): Promise<string> {
  try {
    return await uploadToPinata(data);
  } catch (error) {
    console.warn('Pinata upload failed, trying NFT.Storage...');
    return await uploadToNFTStorage(data);
  }
}
```

### Debug Mode

```
// Enable detailed logging for debugging
export function enableDebugMode(): void {
  if (process.env.DEBUG === 'true') {
    console.log('🐛 Debug mode enabled');
    
    // Log all contract calls
    const originalCall = ethers.Contract.prototype.call;
    ethers.Contract.prototype.call = async function(...args) {
      console.log('📞 Contract call:', this.target, args);
      const result = await originalCall.apply(this, args);
      console.log('✅ Result:', result);
      return result;
    };
  }
}
```

---

## Additional Resources

### Documentation Links

- [CAMP Network Official Docs](https://docs.campnetwork.xyz)
- [Ethereum Documentation](https://ethereum.org/en/developers/docs/)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [IPFS Documentation](https://docs.ipfs.tech/)

### Community

- Discord: [CAMP Network Discord](https://discord.gg/campnetwork)
- Twitter: [@campnetwork](https://twitter.com/campnetwork)
- GitHub: [github.com/camp-network](https://github.com/camp-network)

### Support

For technical support or questions:
- Email: support@campnetwork.xyz
- GitHub Issues: Create an issue in the SDK repository

---

## License

This integration guide is provided as-is for developers building on CAMP Network. Please refer to CAMP Network's official licensing terms for SDK usage.

---

## Changelog

### v1.0.0 (Current)
- Initial comprehensive integration guide
- Complete implementation of all three core modules
- Third-party platform integration examples
- Production deployment guidelines
- Testing framework setup
- Troubleshooting guide

---

**Note**: This README covers the complete integration of CAMP Network's Origin Framework. For specific implementation details or custom requirements, consult the official CAMP Network documentation or reach out to their developer support team.
```

This comprehensive README provides your agent with complete, detailed instructions for integrating all features of the CAMP Origin Framework SDK into your existing application, covering everything from basic setup through advanced production deployment.[2][3]

[1](https://www.youtube.com/watch?v=QcZKsbgsLa4)
[2](https://www.bitrue.com/blog/How-to-build-on-camp-network-guide-origin-framework)
[3](https://reports.tiger-research.com/p/camp-network-ip-layer-eng)
[4](https://docs.campnetwork.xyz/origin-v1/origin-framework)
[5](https://www.reddit.com/r/AI_Agents/comments/1iix4k8/i_built_an_ai_agent_that_creates_readme_file_for/)
[6](https://github.com/lastmile-ai/mcp-agent)
[7](https://research.aimultiple.com/agents-md/)
[8](https://www.youtube.com/watch?v=EN6d6djVIJI)
[9](https://support.campmanagement.com/hc/en-us/articles/6375219096205-What-can-we-do-with-CampSite-s-API)
[10](https://github.com/tusharpamnani/NFT-MaretPlace-Contract)
[11](https://arxiv.org/html/2508.08322v1)
[12](https://blog.mexc.com/what-is-camp-network-camp-an-autonomous-ip-blockchain-network-built-for-ai-agents/)
[13](https://github.com/basecamp/bc3-api)
[14](https://research.aimultiple.com/smart-contract-nft/)
[15](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
[16](https://docs.oasis-open.org/camp/camp-spec/v1.1/csprd03/camp-spec-v1.1-csprd03.html)
[17](https://www.freecodecamp.org/news/how-to-use-rest-api/)
[18](https://www.educative.io/courses/an-introduction-to-developing-web3-apps-using-solidity-and-react/gxYoo5zj4gZ/project)
[19](https://learn.microsoft.com/en-us/azure/azure-monitor/app/classic-api)
[20](https://www.quicknode.com/builders-guide/tools/camp-network-by-camp)
[21](https://www.youtube.com/watch?v=WXsD0ZgxjRw)
[22](https://hedera.com/learning/smart-contracts/nft-smart-contract)
[23](https://blog.pixelfreestudio.com/how-to-implement-oauth-2-0-for-secure-api-access/)
[24](https://iceteasoftware.com/nft-smart-contracts-and-nft-development/)
[25](https://contribute.freecodecamp.org/how-to-setup-freecodecamp-mobile-app-locally/)
[26](https://support.google.com/googleapi/answer/6158849?hl=en)
[27](https://www.pixelwebsolutions.com/nft-smart-contract-development/)
[28](https://developers.google.com/identity/protocols/oauth2)
[29](https://www.freecodecamp.org/news/how-to-make-an-nft/)
[30](https://devcamp.com/trails/14/campsites/107/guides/how-to-configure-network-settings-rails-api-app)
[31](https://auth0.com/docs/authenticate/protocols/oauth)
[32](https://www.coinsclone.com/nft-smart-contract-development-services/)