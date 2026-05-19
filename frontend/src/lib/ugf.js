import { CONTRACT_ADDRESSES } from './contracts';
import DonationABI from './abi/Donation.json';
import { ethers } from 'ethers';
import { encodeFunctionData } from 'viem';

// UGF SDK - will be installed via @tychilabs/ugf-testnet-js
let UGFClient;

export const UGF_CONFIG = {
  chainId: 84532, // Base Sepolia
  network: 'baseSepolia',
  // Add UGF API key if required
  // apiKey: process.env.NEXT_PUBLIC_UGF_API_KEY,
};

export function encodeDonationTransaction(campaignId, amount, message) {
  return encodeFunctionData({
    abi: DonationABI,
    functionName: 'donateToCampaign',
    args: [campaignId, amount, message],
  });
}

export function getContractAddresses(chainId) {
  return CONTRACT_ADDRESSES.baseSepolia;
}

// UGF Client Factory
export async function createUGFClient() {
  if (typeof window === 'undefined') {
    // Server-side
    const { UGFClient } = await import('@tychilabs/ugf-testnet-js');
    return new UGFClient({
      chainId: UGF_CONFIG.chainId,
      network: UGF_CONFIG.network,
    });
  }

  // Client-side - ensure it's only loaded once
  if (!UGFClient) {
    const { UGFClient } = await import('@tychilabs/ugf-testnet-js');
    return new UGFClient({
      chainId: UGF_CONFIG.chainId,
      network: UGF_CONFIG.network,
    });
  }

  return UGFClient;
}

// Get UGF Quote
export async function getUGFQuote(transactionData) {
  try {
    const ugf = await createUGFClient();

    const quote = await ugf.quote.get({
      chainId: UGF_CONFIG.chainId,
      to: transactionData.to,
      value: transactionData.value || '0',
      data: transactionData.data,
      token: CONTRACT_ADDRESSES.baseSepolia.tyiMockUSD,
      tokenAmount: transactionData.tokenAmount,
    });

    return quote;
  } catch (error) {
    console.error('UGF Quote Error:', error);
    throw error;
  }
}

// Execute sponsored transaction
export async function executeUGFTransaction(quote, signature) {
  try {
    const ugf = await createUGFClient();

    const tx = await ugf.payment.x402.execute({
      quote: quote,
      signature: signature,
    });

    return tx;
  } catch (error) {
    console.error('UGF Execution Error:', error);
    throw error;
  }
}

// Sponsor and execute directly
export async function sponsorAndExecuteTransaction(transactionData) {
  try {
    const ugf = await createUGFClient();

    const tx = await ugf.chains.evm.sponsorAndExecute({
      chainId: UGF_CONFIG.chainId,
      to: transactionData.to,
      value: transactionData.value || '0',
      data: transactionData.data,
      token: CONTRACT_ADDRESSES.baseSepolia.tyiMockUSD,
      tokenAmount: transactionData.tokenAmount,
      // Gas limit should be estimated or provided
      gasLimit: transactionData.gasLimit,
    });

    return tx;
  } catch (error) {
    console.error('UGF Sponsorship Error:', error);
    throw error;
  }
}

// Error handler
export function handleUGFError(error) {
  console.error('UGF Error:', error);

  if (error.response) {
    // UGF API responded with error status
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        return new Error(`Invalid request: ${data.message || 'Bad request'}`);
      case 401:
        return new Error('Authentication failed. Please check your API key.');
      case 403:
        return new Error('Forbidden. Insufficient permissions.');
      case 429:
        return new Error('Too many requests. Please wait and try again.');
      default:
        return new Error(`UGF API Error: ${data.message || 'Unknown error'}`);
    }
  } else if (error.message) {
    // Network error or other error
    return new Error(`Network Error: ${error.message}`);
  } else {
    return new Error('Unknown UGF error occurred');
  }
}

