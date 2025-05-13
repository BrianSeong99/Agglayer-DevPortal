import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Transaction API endpoint
const TRANSACTION_API = "https://api-gateway.polygon.technology/api/v3/transactions/testnet";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { txHash, address } = req.query;

    if (!txHash || !address) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Get API key from environment variables
    const apiKey = process.env.POLYGON_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Call the Polygon Transaction API
    const response = await axios.get(`${TRANSACTION_API}?userAddress=${address}`, {
      headers: {
        'x-api-key': apiKey
      }
    });

    // Find the transaction in the response
    const transactions = response.data?.result?.transactions || [];
    const transaction = transactions.find((tx: any) => tx.transactionHash === txHash);

    if (!transaction) {
      return res.json({ 
        found: false, 
        state: 'PENDING',
        message: 'Transaction not found yet, it may still be processing' 
      });
    }

    // Return the transaction state
    return res.json({
      found: true,
      state: transaction.state,
      depositCount: transaction.depositCount,
      sourceNetworkId: transaction.sourceNetworkId,
      destinationNetworkId: transaction.destinationNetworkId,
      tokenAddress: transaction.tokenAddress,
      amount: transaction.amount
    });
  } catch (error: any) {
    console.error('Error checking transaction status:', error);
    return res.status(500).json({ 
      error: 'Failed to check transaction status',
      message: error.message || 'Unknown error'
    });
  }
} 