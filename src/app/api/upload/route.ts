import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

/**
 * Handles POST requests to upload a file to storage
 * @param {Request} request - The incoming HTTP request object
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the uploaded blob information
 */
export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');



  // ⚠️ The below code is for App Router Route Handlers only

  //@ts-ignore
  const blob = await put(filename, request.body, {
    access: 'public',
  });

  // Here's the code for Pages API Routes:
  // const blob = await put(filename, request, {
  //   access: 'public',
  // });

  return NextResponse.json(blob);
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
