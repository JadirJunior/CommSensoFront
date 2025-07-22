"use client";

// React e Hooks
import { useEffect, useState, useCallback, useRef } from "react";

// Bibliotecas de terceiros
import { toast } from "sonner";
import dayjs from "dayjs";
import "dayjs/locale/pt-br"; // Importa e configura o locale do dayjs
import { type DateRange } from "react-day-picker";

// Componentes UI do Shadcn
import { Button } from "@/components/ui/button";
import { Clock, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { FilterControls } from "./_components/filter-controls";
import { DashboardHeader } from "./_components/dashboard-header";
import { StatusCardsGrid } from "./_components/status-card-grid";
import { MeasurementsTable } from "./_components/measurements-table";

// Componentes Customizados da Aplicação

// Configuração inicial do Dayjs
dayjs.locale("pt-br");

// --- TIPOS (Exportados para serem usados pelos componentes filhos) ---
export interface Sensor {
	id: number;
	name: string;
	unit: string;
}
export interface Container {
	id: number;
	name: string;
	weigth: number;
	valid: boolean;
}
export interface Measurement {
	id: number;
	value: string;
	dtMeasure: string;
	container: Container;
	sensor: Sensor;
}
export interface SensorFilter {
	temperatura: boolean;
	umidade: boolean;
	ph: boolean;
	nitrogenio: boolean;
	fosforo: boolean;
	potassio: boolean;
	condutividade: boolean;
}
interface ApiResponse<T> {
	message: string;
	data: T[];
	total?: number;
}
interface ConnectionStatus {
	isConnected: boolean;
	lastUpdate: Date | null;
}

export default function SensorData() {
	// --- ESTADOS DO COMPONENTE PAI ---
	const [measurements, setMeasurements] = useState<Measurement[]>([]);
	const [containers, setContainers] = useState<Container[]>([]);
	const [loading, setLoading] = useState(true);
	const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
		isConnected: false,
		lastUpdate: null,
	});

	// Estado de Paginação
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(25);
	const [totalRecords, setTotalRecords] = useState(0);

	// Estado dos Filtros
	const [selectedContainer, setSelectedContainer] = useState<string>("all");
	const [sensorFilters, setSensorFilters] = useState<SensorFilter>({
		temperatura: true,
		umidade: true,
		ph: true,
		nitrogenio: true,
		fosforo: true,
		potassio: true,
		condutividade: true,
	});

	// Estado para o novo seletor de data
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: dayjs().subtract(7, "day").toDate(),
		to: new Date(),
	});

	// Estado de UI
	const [showScrollTop, setShowScrollTop] = useState(false);
	const isInitialMount = useRef(true);

	// --- LÓGICA DE API ---
	const API_BASE_URL =
		process.env.COMMSENSO_API_URL || "https://commsenso.duckdns.org";

	const makeApiRequest = useCallback(
		async (
			endpoint: string,
			queryParams: URLSearchParams = new URLSearchParams()
		) => {
			queryParams.append("_t", Date.now().toString());
			console.log("Tentando acessar API:", `${API_BASE_URL}${endpoint}`);
			console.log("Com parâmetros:", queryParams.toString());
			const url = `${API_BASE_URL}${endpoint}?${queryParams.toString()}`;
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-cache",
				},
			});
			console.log("Resposta da API:", response);
			if (!response.ok)
				throw new Error(`HTTP ${response.status}: ${await response.text()}`);
			return response.json();
		},
		[API_BASE_URL]
	);

	// Função de busca de medições atualizada para aceitar o intervalo de datas
	const fetchMeasurements = useCallback(
		async (
			page: number,
			limit: number,
			container: string,
			sensorFilters: SensorFilter,
			dates?: DateRange
		) => {
			const params = new URLSearchParams();
			if (container !== "all") params.append("container", container);
			params.append("limit", limit.toString());
			params.append("page", page.toString());
			params.append("orderBy", "dtMeasure:DESC");

			params.append(
				"sensor",
				Object.entries(sensorFilters)
					.filter((item) => item[1] === true)
					.map((item) => item[0])
					.join(",")
			);
			if (dates?.from)
				params.append("startDate", dayjs(dates.from).format("YYYY-MM-DD"));
			if (dates?.to)
				params.append("endDate", dayjs(dates.to).format("YYYY-MM-DD"));

			console.log("Fetching measurements with params:", params.toString());
			const result: ApiResponse<Measurement> = await makeApiRequest(
				"/measure",
				params
			);

			return { data: result.data || [], total: result.total };
		},
		[makeApiRequest]
	);

	const fetchData = useCallback(
		async (showLoadingSpinner = false, showToast = false) => {
			if (showLoadingSpinner) setLoading(true);
			try {
				const [measurementsResult, containersData] = await Promise.all([
					fetchMeasurements(
						currentPage,
						itemsPerPage,
						selectedContainer,
						sensorFilters,
						dateRange
					),
					makeApiRequest("/container").then((res) => res.data || []),
				]);

				setMeasurements(measurementsResult.data);
				setTotalRecords(measurementsResult.total || 0);
				setContainers(containersData);
				setConnectionStatus({ isConnected: true, lastUpdate: new Date() });
				if (showToast) toast.success("Dados atualizados com sucesso!");
			} catch (error) {
				setConnectionStatus({ isConnected: false, lastUpdate: new Date() });
				if (showToast) toast.error("Erro ao buscar dados da API.");
			} finally {
				setLoading(false);
			}
		},
		[
			currentPage,
			itemsPerPage,
			selectedContainer,
			sensorFilters,
			dateRange,
			fetchMeasurements,
			makeApiRequest,
		]
	);

	// --- EFEITOS (LIFECYCLE) ---
	useEffect(() => {
		if (!isInitialMount.current) setCurrentPage(1);
	}, [selectedContainer, dateRange]); // Reseta a página quando o container ou a data mudam

	useEffect(() => {
		const isFirstLoad = isInitialMount.current;
		if (isFirstLoad) isInitialMount.current = false;
		fetchData(isFirstLoad, !isFirstLoad);
	}, [currentPage, itemsPerPage]);

	useEffect(() => {
		const handleScroll = () => setShowScrollTop(window.scrollY > 500);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// --- FUNÇÕES AUXILIARES ---
	const getLatestReadings = () => {
		const latest: { [key: string]: Measurement } = {};
		measurements.forEach((m) => {
			const key = `${m.sensor.name}-${m.container.id}`;
			if (
				!latest[key] ||
				dayjs(m.dtMeasure).isAfter(dayjs(latest[key].dtMeasure))
			) {
				latest[key] = m;
			}
		});
		return Object.values(latest);
	};

	const exportData = () => {
		toast.success("Dados exportados para CSV com sucesso!");
	};

	// --- RENDERIZAÇÃO ---
	if (loading && measurements.length === 0) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<RefreshCw className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
					<h2 className="text-2xl font-bold">Carregando dados...</h2>
					<p className="text-gray-600">Conectando com API CommSensoRest</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-12 md:px-6">
			<DashboardHeader connectionStatus={connectionStatus} />

			<FilterControls
				containers={containers}
				selectedContainer={selectedContainer}
				onSelectedContainerChange={setSelectedContainer}
				sensorFilters={sensorFilters}
				onSensorFiltersChange={setSensorFilters}
				itemsPerPage={itemsPerPage}
				onItemsPerPageChange={setItemsPerPage}
				dateRange={dateRange}
				onDateRangeChange={setDateRange}
				onRefresh={() => fetchData(true, true)}
				onExport={exportData}
			/>

			<StatusCardsGrid latestReadings={getLatestReadings()} />

			<MeasurementsTable
				measurements={measurements}
				totalRecords={totalRecords}
				itemsPerPage={itemsPerPage}
				currentPage={currentPage}
				loading={loading}
				onPageChange={setCurrentPage}
			/>

			{showScrollTop && (
				<div className="fixed bottom-6 right-6 z-50">
					<Button
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						size="icon"
						className="rounded-full shadow-lg"
					>
						<Clock className="h-6 w-6" />
					</Button>
				</div>
			)}
		</div>
	);
}
