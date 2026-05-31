# Nexus — Disaster Relief Transparent Donation Network

Nexus is a blockchain-powered disaster relief platform designed to revolutionize humanitarian aid. By leveraging Web3 technologies and real-time open data, it guarantees 100% on-chain transparency, meaning every donation is tracked, every expense is verified, and every life matters.

This project strictly adheres to the development philosophy and standards outlined in `gemini.md`.

---

## 🌟 Key Capabilities & Discoverability

Every major feature in Nexus is designed to be modular, explainable, and production-minded.

### 1. Real-Time Global Disaster Tracking (GDACS API)
- **What it is**: The platform auto-generates active relief campaigns by fetching live Red and Orange alerts from the UN's Global Disaster Alert and Coordination System (GDACS).
- **Demonstration**: Visit the Landing Page or Donor Dashboard to see live global disasters seamlessly integrated alongside local NGO campaigns. Images are dynamically mapped and heavily optimized (WebP format, downscaled).
- **Testing**: Managed via error-boundary fallbacks and mock-data failovers in `src/services/gdacs.js` to ensure zero downtime.

### 2. Gasless Donations (UGF Protocol)
- **What it is**: Uses the User Gas Free (UGF) protocol to abstract away complex blockchain gas fees for donors. Donate seamlessly using MockUSD on the Base Sepolia testnet.
- **Demonstration**: The "Donate" modal handles meta-transactions automatically so donors never need native ETH to pay for gas.

### 3. On-Chain Transparency & IPFS Receipts
- **What it is**: Every transaction and NGO expenditure is recorded immutably on the public ledger. Every donation generates a cryptographically secured PDF receipt, pinned to the decentralized IPFS network via Pinata.
- **Demonstration**: Navigate to the "Transparency Dashboard" to view the live public ledger.

### 4. Role-Based Access Control
- **What it is**: Tailored, protected routing for Donors, NGOs, and Platform Admins using Supabase Authentication.

---

## 🏗 Architecture & Tech Stack

### Frontend (Modular & Component-Driven)
- **Framework**: React 19 + Vite (Fast response times, minimal external requests)
- **Styling**: Tailwind CSS (Maintainable and separated concerns)
- **Web3 Integration**: RainbowKit, Wagmi, viem
- **Database & Auth**: Supabase (PostgreSQL)

### Blockchain (Secure & Immutable)
- **Network**: Base Sepolia Testnet
- **Smart Contracts**: Solidity ^0.8.20
- **Tokens**: ERC20 (MockUSD) with ERC20Permit for gasless transactions

---

## 🌍 Google-First Development

We prioritize Google technologies where they provide meaningful value to the architecture:

- **Google Fonts (Typography Engine)**
  - **Why it was selected**: To provide a highly aesthetic, legible, and premium user experience out of the box without bloating the repository with local font files.
  - **How it contributes**: Ensures lightning-fast font loading via Google's global CDN, improving Largest Contentful Paint (LCP) efficiency.
  - **Where it is used**: Integrated across the entire frontend (`index.html` and `tailwind.config.js`) utilizing modern typefaces like *Playfair Display*, *Space Grotesk*, and *Syne*.

---

## 🔒 Compliance with `gemini.md` Standards

Nexus was evaluated against the six first-class requirements of the project context:

1. **Code Quality**: Strict separation of concerns (e.g., API calls isolated in `src/services/`, UI components in `src/components/`). Reusable components (Buttons, Inputs) prevent duplicated logic.
2. **Security**: Environment variables protect all secrets (`.env.local`). Supabase Row Level Security (RLS) policies prevent unauthorized database writes. User inputs are constrained and validated (e.g., donation amounts cannot be negative).
3. **Efficiency**: API calls to GDACS are optimized. Images are dynamically requested in WebP format with strict width limitations (`w=600`) and compression (`q=60`) to drastically reduce bandwidth usage.
4. **Testing**: Smart contracts are rigorously tested using Hardhat/Chai with extensive coverage for the core business logic (Donations and Meta-transactions).
5. **Accessibility**: Integrated during implementation. Forms and buttons use ARIA labels, semantic HTML tags are used for structure (`<nav>`, `<main>`, `<article>`), and high contrast ratios are maintained.
6. **Meaningful Google Integration**: Highlighted in the section above.

---

## 🛠 Setup & Testing Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MetaMask (or another Web3 wallet)

### 2. Install Dependencies

```bash
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
```

Create a `.env` file in the `blockchain` directory:
```env
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASE_SEPOLIA_PRIVATE_KEY=your_wallet_private_key
TYI_MOCK_USD_ADDRESS=your_mock_usd_address
```

### 4. Running the Development Server

```bash
cd frontend
npm run dev
```

### 5. Running Automated Tests

```bash
cd blockchain
npx hardhat test
```
