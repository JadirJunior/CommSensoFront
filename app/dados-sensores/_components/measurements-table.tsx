import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

// Funções e tipos importados
import getSensorIcon from "@/lib/utils/get-sensorIcon";
import type { Measurement } from "../page";

// Configura o locale do dayjs para português
dayjs.locale("pt-br");

// Define as propriedades que o componente recebe
interface MeasurementsTableProps {
	measurements: Measurement[];
	totalRecords: number;
	itemsPerPage: number;
	currentPage: number;
	loading: boolean;
	onPageChange: (page: number) => void;
}

export function MeasurementsTable({
	measurements,
	totalRecords,
	itemsPerPage,
	currentPage,
	loading,
	onPageChange,
}: MeasurementsTableProps) {
	const totalPages = Math.ceil(totalRecords / itemsPerPage);

	// Função para renderizar os números da paginação de forma inteligente
	const renderPageNumbers = () => {
		if (totalPages <= 5) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}
		if (currentPage <= 3) {
			return [1, 2, 3, 4, 5];
		}
		if (currentPage >= totalPages - 2) {
			return [
				totalPages - 4,
				totalPages - 3,
				totalPages - 2,
				totalPages - 1,
				totalPages,
			];
		}
		return [
			currentPage - 2,
			currentPage - 1,
			currentPage,
			currentPage + 1,
			currentPage + 2,
		];
	};

	return (
		<Card data-table-container>
			<CardHeader>
				<CardTitle>
					Dados Detalhados
					{totalRecords > 0 && (
						<span className="text-sm font-normal text-gray-500 ml-2">
							({totalRecords} registros totais)
						</span>
					)}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[180px]">Data/Hora</TableHead>
								<TableHead>Container</TableHead>
								<TableHead>Sensor</TableHead>
								<TableHead>Valor</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{measurements.length > 0 ? (
								measurements.map((measurement) => (
									<TableRow key={measurement.id}>
										<TableCell>
											{dayjs(measurement.dtMeasure).format("DD/MM/YYYY HH:mm")}
										</TableCell>
										<TableCell>{measurement.container.name}</TableCell>
										<TableCell className="flex items-center gap-2">
											{getSensorIcon(measurement.sensor.name)}
											{measurement.sensor.name}
										</TableCell>
										<TableCell className="font-mono">
											{measurement.value} {measurement.sensor.unit}
										</TableCell>
									</TableRow>
								))
							) : (
								// Mensagem exibida quando não há dados na página atual
								<TableRow>
									<TableCell
										colSpan={4} // Abrange todas as 4 colunas
										className="h-24 text-center text-muted-foreground"
									>
										Nenhum registro encontrado para os filtros aplicados.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>

				{/* Paginação só aparece se houver mais de uma página de resultados */}
				{totalRecords > itemsPerPage && (
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
						<div className="text-sm text-gray-500">
							Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
							{Math.min(currentPage * itemsPerPage, totalRecords)} de{" "}
							{totalRecords} registros
						</div>

						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => onPageChange(currentPage - 1)}
								disabled={currentPage <= 1 || loading}
							>
								Anterior
							</Button>
							<div className="flex items-center gap-1">
								{renderPageNumbers().map((pageNumber) => (
									<Button
										key={pageNumber}
										variant={currentPage === pageNumber ? "default" : "outline"}
										size="sm"
										onClick={() => onPageChange(pageNumber)}
										disabled={loading}
										className="w-8 h-8"
									>
										{pageNumber}
									</Button>
								))}
							</div>
							<Button
								variant="outline"
								size="sm"
								onClick={() => onPageChange(currentPage + 1)}
								disabled={currentPage >= totalPages || loading}
							>
								Próxima
							</Button>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
