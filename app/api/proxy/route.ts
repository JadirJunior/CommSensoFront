import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.COMMSENSO_API_URL || 'http://137.131.153.111:3000'

export async function GET(request: NextRequest) {
  // Log environment and configuration
  console.log('🌐 Proxy Environment Check:')
  console.log('- NODE_ENV:', process.env.NODE_ENV)
  console.log('- COMMSENSO_API_URL:', process.env.COMMSENSO_API_URL)
  console.log('- API_BASE_URL:', API_BASE_URL)
  
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint')
    
    console.log('📥 Proxy request received:')
    console.log('- endpoint:', endpoint)
    console.log('- searchParams:', Object.fromEntries(searchParams))
    
    if (!endpoint) {
      console.error('❌ No endpoint provided')
      return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 })
    }

    // Build query string from search params (excluding endpoint)
    const queryParams = new URLSearchParams()
    searchParams.forEach((value, key) => {
      if (key !== 'endpoint') {
        queryParams.append(key, value)
      }
    })

    const queryString = queryParams.toString()
    const apiUrl = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`
    
    console.log('🔄 Making request to API:', apiUrl)

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'CommSenso-Proxy/1.0',
      },
    })

    console.log('📡 API Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ API returned error:', response.status, errorText)
      throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    console.log('✅ API Response successful, data length:', JSON.stringify(data).length)
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    const errorDetails = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack
    } : { message: String(error) }
    
    console.error('❌ Proxy error details:', errorDetails)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch data from API',
        details: errorDetails.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
} 