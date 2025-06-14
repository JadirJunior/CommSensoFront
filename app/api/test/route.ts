import { NextResponse } from 'next/server'

export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    variables: {
      COMMSENSO_API_URL: process.env.COMMSENSO_API_URL || 'NOT_SET',
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'NOT_SET',
      NEXT_PUBLIC_USE_PROXY: process.env.NEXT_PUBLIC_USE_PROXY || 'NOT_SET',
    },
    system: {
      platform: process.platform,
      nodeVersion: process.version,
      vercelRegion: process.env.VERCEL_REGION || 'NOT_SET',
    }
  }

  console.log('🔍 Diagnostics:', diagnostics)

  return NextResponse.json(diagnostics, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  })
} 