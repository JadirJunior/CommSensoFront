"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  RefreshCw,
  Thermometer,
  Droplets,
  FlaskRoundIcon as Flask,
  Leaf,
  Wifi,
  WifiOff,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
} from "lucide-react"
import { format, subDays } from "date-fns"
import { ptBR } from "date-fns/locale"

// Types based on API specification
interface Sensor {
  id: number
  name: string
  unit: string
}

interface Container {
  id: number
  name: string
  weigth: number
  valid: boolean
}

interface Measurement {
  id: number
  value: string
  dtMeasure: string
  container: Container
  sensor: Sensor
}

interface ApiResponse<T> {
  message: string
  data: T[]
}

interface ConnectionStatus {
  isConnected: boolean
  lastUpdate: Date | null
  nextRetry: Date | null
  error: string | null
}

interface SensorFilter {
  temperatura: boolean
  umidade: boolean
  ph: boolean
  nitrogenio: boolean
}

export default function SensorData() {
  // State management
  const [measurements, setMeasurements] = useState<Measurement[]>([])
  const [sensors, setSensors] = useState<Sensor[]>([])
  const [containers, setContainers] = useState<Container[]>([])
  const [loading, setLoading] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: false,
    lastUpdate: null,
    nextRetry: null,
    error: null,
  })

  // Filters
  const [selectedContainer, setSelectedContainer] = useState<string>("all")
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("24h")
  const [sensorFilters, setSensorFilters] = useState<SensorFilter>({
    temperatura: true,
    umidade: true,
    ph: true,
    nitrogenio: true,
  })

  // API Configuration
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

  // Mock data for development/offline mode
  const mockSensors: Sensor[] = [
    { id: 1, name: "Temperatura Ambiente", unit: "°C" },
    { id: 2, name: "Umidade", unit: "%" },
    { id: 3, name: "pH", unit: "pH" },
    { id: 4, name: "Nitrogênio", unit: "mg/kg" },
    { id: 5, name: "Potássio", unit: "mg/kg" },
    { id: 6, name: "Fósforo", unit: "mg/kg" },
    { id: 7, name: "Condutividade", unit: "µS/cm" },
  ]

  const mockContainers: Container[] = [
    { id: 1, name: "Container A", weigth: 50.5, valid: true },
    { id: 2, name: "Container B", weigth: 45.2, valid: true },
    { id: 3, name: "Container C", weigth: 38.7, valid: false },
  ]

  // Generate mock measurements for offline mode
  const generateMockMeasurements = useCallback((): Measurement[] => {
    const measurements: Measurement[] = []
    const now = new Date()

    for (let i = 0; i < 50; i++) {
      const date = new Date(now.getTime() - i * 30 * 60 * 1000) // Every 30 minutes

      mockSensors.forEach((sensor) => {
        mockContainers.forEach((container) => {
          if (!container.valid && Math.random() > 0.3) return // Skip some data for invalid containers

          let baseValue = 0
          switch (sensor.id) {
            case 1: // Temperature
              baseValue = 25 + Math.random() * 10
              break
            case 2: // Humidity
              baseValue = 60 + Math.random() * 20
              break
            case 3: // pH
              baseValue = 6 + Math.random() * 2
              break
            case 4: // Nitrogen
              baseValue = 150 + Math.random() * 50
              break
            case 5: // Potassium
              baseValue = 200 + Math.random() * 70
              break
            case 6: // Phosphorus
              baseValue = 100 + Math.random() * 40
              break
            case 7: // Conductivity
              baseValue = 500 + Math.random() * 200
              break
          }

          measurements.push({
            id: measurements.length + 1,
            value: baseValue.toFixed(2),
            dtMeasure: date.toISOString(),
            container,
            sensor,
          })
        })
      })
    }

    return measurements.sort((a, b) => new Date(b.dtMeasure).getTime() - new Date(a.dtMeasure).getTime())
  }, [])

  // API Functions
  const fetchMeasurements = async (filters: { container?: string; limit?: number } = {}): Promise<Measurement[]> => {
    const params = new URLSearchParams()
    if (filters.container && filters.container !== "all") params.append("container", filters.container)
    if (filters.limit) params.append("limit", filters.limit.toString())

    const url = `${API_BASE_URL}/measure?${params}`
    console.log("📊 Fetching measurements from:", url)
    
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const result: ApiResponse<Measurement> = await response.json()
    console.log("📊 Measurements response:", result)
    return result.data || []
  }

  const fetchSensors = async (): Promise<Sensor[]> => {
    const url = `${API_BASE_URL}/sensores`
    console.log("🔧 Fetching sensors from:", url)
    
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const result: ApiResponse<Sensor> = await response.json()
    console.log("🔧 Sensors response:", result)
    return result.data || []
  }

  const fetchContainers = async (): Promise<Container[]> => {
    const url = `${API_BASE_URL}/container`
    console.log("📦 Fetching containers from:", url)
    
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const result: ApiResponse<Container> = await response.json()
    console.log("📦 Containers response:", result)
    return result.data || []
  }

  // Main data fetching function
  const fetchData = useCallback(
    async (showLoading = false) => {
      if (showLoading) setLoading(true)

      try {
        console.log("🔄 Iniciando fetch dos dados da API...")
        console.log("🌐 API_BASE_URL:", API_BASE_URL)
        
        // Try to fetch real data
        const [measurementsData, sensorsData, containersData] = await Promise.all([
          fetchMeasurements({ limit: 100 }),
          fetchSensors(),
          fetchContainers(),
        ])

        console.log("✅ Dados recebidos da API:")
        console.log("📊 Measurements:", measurementsData)
        console.log("🔧 Sensors:", sensorsData)
        console.log("📦 Containers:", containersData)

        setMeasurements(measurementsData)
        setSensors(sensorsData)
        setContainers(containersData)

        setConnectionStatus({
          isConnected: true,
          lastUpdate: new Date(),
          nextRetry: null,
          error: null,
        })
        
        console.log("🎉 Dados da API carregados com sucesso!")
      } catch (error) {
        console.warn("⚠️ API not available, using mock data:", error)

        // Fallback to mock data
        const mockMeasurements = generateMockMeasurements()
        setMeasurements(mockMeasurements)
        setSensors(mockSensors)
        setContainers(mockContainers)

        setConnectionStatus({
          isConnected: false,
          lastUpdate: new Date(),
          nextRetry: new Date(Date.now() + 30000), // Retry in 30 seconds
          error: error instanceof Error ? error.message : "Conexão não disponível",
        })
        
        console.log("🔄 Usando dados mock como fallback")
      } finally {
        setLoading(false)
      }
    },
    [generateMockMeasurements],
  )

  // Auto-refresh effect
  useEffect(() => {
    fetchData(true)

    const interval = setInterval(() => {
      fetchData(false)
    }, 10000) // Refresh every 10 seconds

    return () => clearInterval(interval)
  }, [fetchData])

  // Get sensor icon
  const getSensorIcon = (sensorName: string) => {
    const name = sensorName.toLowerCase()
    if (name.includes("temperatura")) return <Thermometer className="h-6 w-6 text-orange-500" />
    if (name.includes("umidade")) return <Droplets className="h-6 w-6 text-blue-500" />
    if (name.includes("ph")) return <Flask className="h-6 w-6 text-purple-500" />
    if (name.includes("nitrogênio") || name.includes("nitrogenio")) return <Leaf className="h-6 w-6 text-green-500" />
    if (name.includes("potássio") || name.includes("potassio")) return <Leaf className="h-6 w-6 text-green-600" />
    if (name.includes("fósforo") || name.includes("fosforo")) return <Leaf className="h-6 w-6 text-green-700" />
    return <Database className="h-6 w-6 text-gray-500" />
  }

  // Get sensor status based on value
  const getSensorStatus = (sensorName: string, value: number) => {
    const name = sensorName.toLowerCase()

    if (name.includes("temperatura")) {
      if (value < 20 || value > 35) return "warning"
      if (value < 15 || value > 40) return "critical"
      return "normal"
    }

    if (name.includes("umidade")) {
      if (value < 40 || value > 80) return "warning"
      if (value < 30 || value > 90) return "critical"
      return "normal"
    }

    if (name.includes("ph")) {
      if (value < 5.5 || value > 8.5) return "warning"
      if (value < 4.5 || value > 9.5) return "critical"
      return "normal"
    }

    return "normal"
  }

  // Get status color and icon
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "normal":
        return { color: "text-green-600", bg: "bg-green-50", icon: <CheckCircle className="h-4 w-4" /> }
      case "warning":
        return { color: "text-yellow-600", bg: "bg-yellow-50", icon: <AlertTriangle className="h-4 w-4" /> }
      case "critical":
        return { color: "text-red-600", bg: "bg-red-50", icon: <AlertTriangle className="h-4 w-4" /> }
      default:
        return { color: "text-gray-600", bg: "bg-gray-50", icon: <Clock className="h-4 w-4" /> }
    }
  }

  // Filter measurements based on current filters
  const filteredMeasurements = measurements.filter((measurement) => {
    // Container filter
    if (selectedContainer !== "all" && measurement.container.name !== selectedContainer) {
      return false
    }

    // Sensor filter
    const sensorName = measurement.sensor.name.toLowerCase()
    if (sensorName.includes("temperatura") && !sensorFilters.temperatura) return false
    if (sensorName.includes("umidade") && !sensorFilters.umidade) return false
    if (sensorName.includes("ph") && !sensorFilters.ph) return false
    if ((sensorName.includes("nitrogênio") || sensorName.includes("nitrogenio")) && !sensorFilters.nitrogenio)
      return false

    // Time range filter
    const measureDate = new Date(measurement.dtMeasure)
    const now = new Date()
    let startDate: Date

    switch (selectedTimeRange) {
      case "1h":
        startDate = new Date(now.getTime() - 60 * 60 * 1000)
        break
      case "24h":
        startDate = subDays(now, 1)
        break
      case "7d":
        startDate = subDays(now, 7)
        break
      case "30d":
        startDate = subDays(now, 30)
        break
      default:
        startDate = subDays(now, 1)
    }

    return measureDate >= startDate
  })

  // Get latest reading for each sensor type
  const getLatestReadings = () => {
    const latest: { [key: string]: Measurement } = {}

    filteredMeasurements.forEach((measurement) => {
      const key = `${measurement.sensor.name}-${measurement.container.id}`
      if (!latest[key] || new Date(measurement.dtMeasure) > new Date(latest[key].dtMeasure)) {
        latest[key] = measurement
      }
    })

    return Object.values(latest)
  }

  // Export data function
  const exportData = () => {
    const csvContent = [
      ["Data/Hora", "Container", "Sensor", "Valor", "Unidade", "Status"].join(","),
      ...filteredMeasurements.map((m) =>
        [
          format(new Date(m.dtMeasure), "dd/MM/yyyy HH:mm", { locale: ptBR }),
          m.container.name,
          m.sensor.name,
          m.value,
          m.sensor.unit,
          getSensorStatus(m.sensor.name, Number.parseFloat(m.value)),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `dados-compostagem-${format(new Date(), "yyyy-MM-dd")}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Loading state
  if (loading && measurements.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <RefreshCw className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Carregando dados dos sensores...</h2>
            <p className="text-gray-600">Conectando com o sistema de monitoramento</p>
          </div>
        </div>
      </div>
    )
  }

  // No data state
  if (filteredMeasurements.length === 0 && !loading) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Database className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">🔍 Nenhum dado disponível no momento</h2>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-3">Possíveis causas:</h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li>• Sensores desconectados</li>
              <li>• Problemas na conexão MQTT</li>
              <li>• Containers inativos</li>
              <li>• Filtros muito restritivos</li>
            </ul>
          </div>
          {connectionStatus.lastUpdate && (
            <p className="text-sm text-gray-500 mb-4">
              Última tentativa de conexão: {format(connectionStatus.lastUpdate, "dd/MM/yyyy HH:mm", { locale: ptBR })}
            </p>
          )}
          <Button onClick={() => fetchData(true)} className="bg-green-600 hover:bg-green-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar novamente
          </Button>
        </div>
      </div>
    )
  }

  const latestReadings = getLatestReadings()

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
              {/* Cabeçalho */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Monitoramento de Compostagem</h1>
          <p className="text-gray-600">Dados em Tempo Real</p>
        </div>

        {/* Status da Conexão */}
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${connectionStatus.isConnected ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
          >
            {connectionStatus.isConnected ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            <span className="text-sm font-medium">{connectionStatus.isConnected ? "Conectado" : "Offline"}</span>
          </div>

          {connectionStatus.lastUpdate && (
            <div className="text-sm text-gray-500">
              Última atualização: {format(connectionStatus.lastUpdate, "HH:mm:ss", { locale: ptBR })}
            </div>
          )}
        </div>
      </div>

      {/* Filtros */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtro de Container */}
            <div>
              <label className="text-sm font-medium mb-2 block">Container</label>
              <Select value={selectedContainer} onValueChange={setSelectedContainer}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o container" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os containers</SelectItem>
                  {containers.map((container) => (
                    <SelectItem key={container.id} value={container.name}>
                      {container.name} {!container.valid && "(Inativo)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filtro de Período */}
            <div>
              <label className="text-sm font-medium mb-2 block">Período</label>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Última hora</SelectItem>
                  <SelectItem value="24h">Últimas 24 horas</SelectItem>
                  <SelectItem value="7d">Últimos 7 dias</SelectItem>
                  <SelectItem value="30d">Últimos 30 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtros de Sensores */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">Sensores</label>
              <div className="flex flex-wrap gap-4">
                {Object.entries(sensorFilters).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) =>
                        setSensorFilters((prev) => ({ ...prev, [key]: checked as boolean }))
                      }
                    />
                    <label htmlFor={key} className="text-sm capitalize">
                      {key === "nitrogenio" ? "Nitrogênio" : key}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={() => fetchData(true)} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Button onClick={exportData} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cartões de Leituras Recentes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {["Temperatura Ambiente", "Umidade", "pH", "Nitrogênio"].map((sensorType) => {
          const reading = latestReadings.find((r) => r.sensor.name.toLowerCase().includes(sensorType.toLowerCase()))

          if (!reading) {
            return (
              <Card key={sensorType} className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getSensorIcon(sensorType)}
                    {sensorType}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500">
                    <p>Sem dados</p>
                  </div>
                </CardContent>
              </Card>
            )
          }

          const value = Number.parseFloat(reading.value)
          const status = getSensorStatus(reading.sensor.name, value)
          const statusDisplay = getStatusDisplay(status)

          return (
            <Card key={sensorType} className="border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  {getSensorIcon(reading.sensor.name)}
                  {sensorType}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-3xl font-bold">
                      {reading.value} <span className="text-sm font-normal">{reading.sensor.unit}</span>
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${statusDisplay.color}`}>
                      {statusDisplay.icon}
                      {status === "normal" ? "Normal" : status === "warning" ? "Atenção" : "Crítico"}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 text-right">
                    <div>{reading.container.name}</div>
                    <div>{format(new Date(reading.dtMeasure), "dd/MM HH:mm", { locale: ptBR })}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Tabela de Dados */}
      <Card>
        <CardHeader>
          <CardTitle>Dados Detalhados ({filteredMeasurements.length} registros)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Data/Hora</th>
                  <th className="text-left p-2">Container</th>
                  <th className="text-left p-2">Sensor</th>
                  <th className="text-left p-2">Valor</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredMeasurements.slice(0, 50).map((measurement) => {
                  const value = Number.parseFloat(measurement.value)
                  const status = getSensorStatus(measurement.sensor.name, value)
                  const statusDisplay = getStatusDisplay(status)

                  return (
                    <tr key={measurement.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        {format(new Date(measurement.dtMeasure), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          {measurement.container.name}
                          {!measurement.container.valid && (
                            <Badge variant="secondary" className="text-xs">
                              Inativo
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          {getSensorIcon(measurement.sensor.name)}
                          {measurement.sensor.name}
                        </div>
                      </td>
                      <td className="p-2 font-mono">
                        {measurement.value} {measurement.sensor.unit}
                      </td>
                      <td className="p-2">
                        <div className={`flex items-center gap-1 ${statusDisplay.color}`}>
                          {statusDisplay.icon}
                          <span className="text-sm">
                            {status === "normal" ? "Normal" : status === "warning" ? "Atenção" : "Crítico"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredMeasurements.length > 50 && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Mostrando 50 de {filteredMeasurements.length} registros
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
