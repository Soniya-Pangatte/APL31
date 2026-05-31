# Nexus Frontend

Nexus is a transparent disaster relief donation platform. This frontend provides the user interface for donors, NGOs, and administrators to interact with the Nexus ecosystem.

## Features

- **Transparent Donations:** Track every donation through blockchain and verified logs.
- **NGO Verification:** Rigorous verification process for NGOs to ensure trust.
- **Impact Tracking:** See how donations are being used in real-time.
- **Multi-role Dashboard:** Tailored experiences for Donors, NGOs, and Admins.
- **Web3 Integration:** Secure wallet connection and blockchain transactions.

## Technologies

- **React + Vite:** Modern, fast frontend development.
- **Tailwind CSS:** Responsive and clean styling.
- **Framer Motion:** Smooth animations and interactions.
- **Supabase:** Backend-as-a-Service for authentication and data storage.
- **Ethers.js / Wagmi:** Interaction with the Ethereum blockchain.
- **Gemini (Coming Soon):** AI-powered insights and impact reporting.

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Copy `.env.example` to `.env` and fill in the required values:
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_ANON_KEY`

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## Development Standards

This project follows the standards defined in `GEMINI.md`:
- **Google-First:** Preference for Google technologies (Gemini integration planned).
- **Security:** Strict handling of environment variables and user data.
- **Accessibility:** Designed for all users with semantic HTML and responsive layouts.
- **Testing:** Critical business logic is covered by unit tests.
