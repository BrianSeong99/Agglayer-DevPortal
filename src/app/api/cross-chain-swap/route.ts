import { NextRequest, NextResponse } from 'next/server';
import handler from '../../dashboard/examples/aggswap-app/api/cross-chain-swap';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Create a mock NextApiRequest and NextApiResponse for compatibility
    const req = {
      method: 'POST',
      body,
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
    console.error('Cross-chain swap API error:', error);
    return NextResponse.json(
      { error: 'Failed to execute cross-chain swap', message: error.message },
      { status: 500 }
    );
  }
} 