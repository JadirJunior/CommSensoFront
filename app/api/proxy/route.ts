import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.COMMSENSO_API_URL || 'http://137.131.153.111:3000'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint')
    
    if (!endpoint) {
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
    
    console.log('🔄 Proxy request to:', apiUrl)

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('❌ Proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data from API' },
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