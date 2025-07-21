import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import { type DateRange } from "react-day-picker";

// Importa os tipos da página principal
import type { Container, SensorFilter } from "../page";
import { DateRangePicker } from "./date-range-picker";

// Define as propriedades que o componente recebe
interface FilterControlsProps {
	containers: Container[];
	selectedContainer: string;
	sensorFilters: SensorFilter;
	itemsPerPage: number;
	dateRange: DateRange | undefined;
	onSelectedContainerChange: (value: string) => void;
	onSensorFiltersChange: (filters: SensorFilter) => void;
	onItemsPerPageChange: (value: number) => void;
	onDateRangeChange: (date: DateRange | undefined) => void;
	onRefresh: () => void;
	onExport: () => void;
}

export function FilterControls({
	containers,
	selectedContainer,
	sensorFilters,
	itemsPerPage,
	dateRange,
	onSelectedContainerChange,
	onSensorFiltersChange,
	onItemsPerPageChange,
	onDateRangeChange,
	onRefresh,
	onExport,
}: FilterControlsProps) {
	return (
		<Card className="mb-8">
			<CardHeader>
				<CardTitle>Filtros e Ações</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{/* Seletor de Container */}
					<div>
						<label className="text-sm font-medium mb-2 block">Container</label>
						<Select
							value={selectedContainer}
							onValueChange={onSelectedContainerChange}
						>
							<SelectTrigger>
								<SelectValue placeholder="Selecione o container" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todos os containers</SelectItem>
								{containers.map((container) => (
									<SelectItem key={container.id} value={container.name}>
										{container.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Seletor de Período com Datas */}
					<div>
						<label className="text-sm font-medium mb-2 block">Período</label>
						<DateRangePicker
							date={dateRange}
							onDateChange={onDateRangeChange}
							className="w-full"
						/>
					</div>

					{/* Checkboxes de Sensores */}
					<div className="md:col-span-2">
						<label className="text-sm font-medium mb-2 block">Sensores</label>
						<div className="flex flex-wrap gap-4">
							{Object.entries(sensorFilters).map(([key, value]) => {
								const displayName =
									{
										temperatura: "Temperatura",
										umidade: "Umidade",
										ph: "pH",
										nitrogenio: "Nitrogênio",
										fosforo: "Fósforo",
										potassio: "Potássio",
										condutividade: "Condutividade",
									}[key] || key;
								return (
									<div key={key} className="flex items-center space-x-2">
										<Checkbox
											id={key}
											checked={value}
											onCheckedChange={(checked) => {
												console.log("Checkbox changed:", key, checked);
												onSensorFiltersChange({
													...sensorFilters,
													[key]: checked == true,
												});
											}}
										/>
										<label htmlFor={key} className="text-sm">
											{displayName}
										</label>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Botões de Ação e Paginação */}
				<div className="flex flex-wrap gap-2 mt-4">
					<Button onClick={onRefresh} variant="outline" size="sm">
						<RefreshCw className="h-4 w-4 mr-2" /> Atualizar
					</Button>
					<Button onClick={onExport} variant="outline" size="sm">
						<Download className="h-4 w-4 mr-2" /> Exportar CSV
					</Button>
					<div className="flex items-center gap-2 ml-auto">
						<span className="text-sm text-gray-600">Itens por página:</span>
						<Select
							value={itemsPerPage.toString()}
							onValueChange={(value) => onItemsPerPageChange(parseInt(value))}
						>
							<SelectTrigger className="w-20">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="10">10</SelectItem>
								<SelectItem value="25">25</SelectItem>
								<SelectItem value="50">50</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
