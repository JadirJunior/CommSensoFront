// API client for the CoMMSenso REST API

// Types
export interface Sensor {
  id: number
  name: string
  unit: string
}

export interface Container {
  id: number
  name: string
  weigth: number
  valid: boolean
}

export interface Measurement {
  id: number
  value: number
  dtMeasure: string
  sensorId: number
  container: string
}

// Base API URL - would be set from environment variables in production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

// Fetch sensors
export async function fetchSensors(): Promise<Sensor[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/sensores`)
    if (!response.ok) {
      throw new Error(`Error fetching sensors: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch sensors:", error)
    throw error
  }
}

// Fetch containers
export async function fetchContainers(): Promise<Container[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/container`)
    if (!response.ok) {
      throw new Error(`Error fetching containers: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch containers:", error)
    throw error
  }
}

// Fetch measurements with optional filters
export async function fetchMeasurements(
  filters: {
    sensor?: number
    container?: string
    limit?: number
    page?: number
    startDate?: string
    endDate?: string
  } = {},
): Promise<Measurement[]> {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams()

    if (filters.sensor) queryParams.append("sensor", filters.sensor.toString())
    if (filters.container) queryParams.append("container", filters.container)
    if (filters.limit) queryParams.append("limit", filters.limit.toString())
    if (filters.page) queryParams.append("page", filters.page.toString())
    if (filters.startDate) queryParams.append("startDate", filters.startDate)
    if (filters.endDate) queryParams.append("endDate", filters.endDate)

    const queryString = queryParams.toString()
    const url = `${API_BASE_URL}/measure${queryString ? `?${queryString}` : ""}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error fetching measurements: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch measurements:", error)
    throw error
  }
}
