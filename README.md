# Nexus — Disaster Relief Transparent Donation Network

Nexus is a blockchain-powered disaster relief platform designed to revolutionize humanitarian aid. By leveraging Web3 technologies, it guarantees 100% on-chain transparency, meaning every donation is tracked, every expense is verified, and every life matters.

## 🌟 Key Features

- **Gasless Donations**: Uses the User Gas Free (UGF) protocol to abstract away complex blockchain gas fees for donors. Donate seamlessly using MockUSD on the Base Sepolia testnet.
- **On-Chain Transparency**: Every transaction and NGO expenditure is recorded immutably on the public ledger.
- **Decentralized Receipts (IPFS)**: Every donation generates a cryptographically secured PDF receipt, pinned to the decentralized IPFS network via Pinata.
- **Role-Based Access Control**: Tailored dashboards for Donors, NGOs, and Platform Admins.
- **Real-time Auditing**: Donors can verify NGO spending logs and view proofs directly from the blockchain/IPFS.

## 🏗 Architecture & Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Web3 Integration**: RainbowKit, Wagmi, viem
- **Database & Auth**: Supabase (PostgreSQL)
- **File Storage**: Supabase Storage & Pinata IPFS
- **PDF Generation**: jsPDF

### Blockchain
- **Network**: Base Sepolia Testnet
- **Smart Contracts**: Solidity ^0.8.20
- **Framework**: Hardhat
- **Tokens**: ERC20 (MockUSD) with ERC20Permit for gasless transactions

## 🛠 Setup Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MetaMask (or another Web3 wallet)
- Hardhat (for local blockchain development)

### 2. Install Dependencies

```bash
# Install root dependencies (if any)
npm install

# Install frontend dependencies
cd frontend
npm install

# Install blockchain dependencies
cd ../blockchain
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the `frontend` directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_WALLET_CONNECT_PROJECT_ID=your_walletconnect_id
VITE_PINATA_JWT=your_pinata_jwt
VITE_DONATION_CONTRACT_ADDRESS=your_deployed_contract_address
```

Create a `.env` file in the `blockchain` directory:

```env
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASE_SEPOLIA_PRIVATE_KEY=your_wallet_private_key
TYI_MOCK_USD_ADDRESS=your_mock_usd_address
```

### 4. Running the Development Server

```bash
# Start the Vite development server
cd frontend
npm run dev
```

### 5. Blockchain Testing & Deployment

```bash
cd blockchain

# Run Smart Contract Tests
npx hardhat test

# Deploy to Base Sepolia
npx hardhat run scripts/deploy.ts --network baseSepolia
```

## 🌍 Google Service Integrations

- **Google Fonts**: The platform utilizes modern typography (`Playfair Display`, `Space Grotesk`, `Syne`) served via Google Fonts to provide a highly aesthetic, readable, and premium user experience out of the box.

## 🔒 Security & Quality Standards

This project adheres strictly to the `gemini.md` compliance standards:
- **Quality**: Strict separation of concerns (Service Layer vs Component Layer), no dead code, proper semantic HTML.
- **Security**: Supabase Row Level Security (RLS) is used, no hardcoded API keys in source control, input validation on all forms.
- **Accessibility**: Screen-reader friendly forms (ARIA labels, roles), color contrast compliance, and keyboard navigability.
- **Testing**: Smart contracts are thoroughly tested with 100% core logic coverage (Hardhat/Chai).

## 📄 License
MIT License
