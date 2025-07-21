import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br"; // Importa o locale para português

// Configura o dayjs para usar o locale português globalmente neste arquivo
dayjs.locale("pt-br");

interface ConnectionStatus {
	isConnected: boolean;
	lastUpdate: Date | null;
}

interface DashboardHeaderProps {
	connectionStatus: ConnectionStatus;
}

export function DashboardHeader({ connectionStatus }: DashboardHeaderProps) {
	return (
		<header className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
			<div>
				<h1 className="text-4xl font-bold">Monitoramento de Compostagem</h1>
				<p className="text-gray-600">Dados em Tempo Real</p>
			</div>
			<div className="flex items-center gap-2">
				<Badge
					className={
						connectionStatus.isConnected
							? "bg-green-500 text-white"
							: "bg-red-500 text-white"
					}
				>
					{connectionStatus.isConnected ? (
						<Wifi className="h-4 w-4 mr-2" />
					) : (
						<WifiOff className="h-4 w-4 mr-2" />
					)}
					{connectionStatus.isConnected ? "Conectado" : "Offline"}
				</Badge>
				{connectionStatus.lastUpdate && (
					<span className="text-sm text-gray-500">
						Última atualização:{" "}
						{/* ANTES: format(connectionStatus.lastUpdate, "HH:mm:ss", { locale: ptBR }) */}
						{dayjs(connectionStatus.lastUpdate).format("HH:mm:ss")}
					</span>
				)}
			</div>
		</header>
	);
}
