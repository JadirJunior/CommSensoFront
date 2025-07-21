import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import getSensorIcon from "@/lib/utils/get-sensorIcon";
import type { Measurement } from "../page";

dayjs.locale("pt-br");

interface StatusCardsGridProps {
	latestReadings: Measurement[];
}

// Unificamos os dois arrays de sensores em um só para simplificar
const SENSOR_TYPES = [
	"Temperatura",
	"Umidade",
	"Ph",
	"Nitrogenio",
	"Fosforo",
	"Potássio",
	"Condutividade",
];

export function StatusCardsGrid({ latestReadings }: StatusCardsGridProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
			{SENSOR_TYPES.map((sensorType) => {
				// Lógica para encontrar a leitura correta para o sensor
				const reading = latestReadings.find((r) =>
					r.sensor.name
						.toLowerCase()
						.includes(sensorType.toLowerCase().replace("ó", "o"))
				);
				// Lógica para corrigir o nome de exibição
				const displayName = sensorType.replace("Fosforo", "Fósforo");

				return (
					<Card key={sensorType} className="border-green-100">
						<CardHeader className="pb-2">
							<CardTitle className="text-lg flex items-center gap-2">
								{getSensorIcon(sensorType)}
								{displayName}
							</CardTitle>
						</CardHeader>
						<CardContent>
							{reading ? (
								<div className="flex justify-between items-end">
									<div className="text-3xl font-bold">
										{reading.value}
										<span className="text-sm font-normal">
											{reading.sensor.unit}
										</span>
									</div>
									<div className="text-xs text-gray-500 text-right">
										<div>{reading.container.name}</div>
										<div>{dayjs(reading.dtMeasure).format("DD/MM HH:mm")}</div>
									</div>
								</div>
							) : (
								<div className="text-center text-gray-500 pt-4">
									<p>Sem dados</p>
								</div>
							)}
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
