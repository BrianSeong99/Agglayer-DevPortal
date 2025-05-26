import { NextRequest, NextResponse } from 'next/server';
import handler from '../../dashboard/examples/aggswap-app/api/check-transaction-status';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const txHash = searchParams.get('txHash');
    const address = searchParams.get('address');
    
    // Create a mock NextApiRequest and NextApiResponse for compatibility
    const req = {
      method: 'GET',
      query: { txHash, address }
    } as any;
    
    let responseData: any;
    let statusCode = 200;
    
    const res = {
      status: (code: number) => {
        statusCode = code;
        return {
          json: (data: any) => {
            responseData = data;
            return data;
          }
        };
      },
      json: (data: any) => {
        responseData = data;
        return data;
      }
    } as any;
    
    await handler(req, res);
    
    return NextResponse.json(responseData, { status: statusCode });
  } catch (error: any) {
    console.error('Check transaction status API error:', error);
    return NextResponse.json(
      { error: 'Failed to check transaction status', message: error.message },
      { status: 500 }
    );
  }
} 