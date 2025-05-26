import { NextRequest, NextResponse } from 'next/server';
import handler from '../../dashboard/examples/aggswap-app/api/token-options';

export async function GET(request: NextRequest) {
  try {
    // Create a mock NextApiRequest and NextApiResponse for compatibility
    const req = {
      method: 'GET',
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
    console.error('Token options API error:', error);
    return NextResponse.json(
      { error: 'Failed to get token options', message: error.message },
      { status: 500 }
    );
  }
} 