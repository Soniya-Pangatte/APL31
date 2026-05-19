import { useState } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { Button } from './Button';
import { CONTRACT_ADDRESSES } from '../lib/contracts';
import DonationABI from '../lib/abi/Donation.json';
import { encodeDonationTransaction, getUGFQuote, sponsorAndExecuteTransaction, handleUGFError } from '../lib/ugf';

export function UGFDonationTest() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [campaignId, setCampaignId] = useState('1');
  const [amount, setAmount] = useState('10');
  const [message, setMessage] = useState('Test donation');
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);

  const handleDonateWithUGF = async () => {
    if (!address) {
      setError('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTxHash(null);

    try {
      console.log('=== UGF Donation Flow ===');

      // 1. Prepare transaction data
      const donationAmount = BigInt(amount) * BigInt(10 ** 18); // TYI_MOCK_USD has 18 decimals
      const encodedData = encodeDonationTransaction(
        BigInt(campaignId),
        donationAmount,
        message
      );

      console.log('1. Transaction data prepared');

      // 2. Get UGF quote
      const quote = await getUGFQuote({
        to: CONTRACT_ADDRESSES.baseSepolia.donation,
        value: '0',
        data: encodedData,
        tokenAmount: amount,
      });

      console.log('2. UGF Quote received:', quote);

      // 3. Execute sponsored transaction
      const tx = await sponsorAndExecuteTransaction({
        to: CONTRACT_ADDRESSES.baseSepolia.donation,
        value: '0',
        data: encodedData,
        tokenAmount: amount,
        gasLimit: quote.gasLimit || '300000', // Use quote's gas limit or fallback
      });

      console.log('3. Transaction executed:', tx);
      setTxHash(tx.hash);

      // 4. Wait for transaction receipt
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: tx.hash,
      });

      console.log('4. Transaction confirmed:', receipt);

    } catch (err) {
      console.error('UGF donation failed:', err);
      setError(handleUGFError(err).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-xl">
      <h2 className="text-xl font-bold text-white mb-4">Test UGF Donation</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-1">Campaign ID</label>
          <input
            type="text"
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Amount (MockUSD)</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Message</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded"
          />
        </div>
        <Button
          onClick={handleDonateWithUGF}
          disabled={isLoading || !address}
          className="w-full"
        >
          {isLoading ? 'Processing...' : 'Test UGF Donation'}
        </Button>
        {!address && (
          <p className="text-yellow-400 text-sm">Connect wallet first</p>
        )}
        {error && (
          <div className="p-3 bg-red-900 text-red-100 rounded">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}
        {txHash && (
          <div className="p-3 bg-green-900 text-green-100 rounded">
            <p className="font-semibold">Success!</p>
            <p>Transaction Hash: {txHash}</p>
            <a
              href={`https://sepolia.basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              View on Base Scan
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
