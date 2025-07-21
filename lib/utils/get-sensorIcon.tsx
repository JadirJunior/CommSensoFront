import {
	Thermometer,
	Droplets,
	FlaskRound as Flask, // Renomeado para evitar conflito de nome se houver
	Leaf,
	Wifi,
	Database,
} from "lucide-react";

// Corrigido para uma declaração de função com export default
export default function getSensorIcon(sensorName: string) {
	const name = sensorName.toLowerCase();

	if (name.includes("temperatura"))
		return <Thermometer className="h-6 w-6 text-orange-500" />;
	if (name.includes("umidade"))
		return <Droplets className="h-6 w-6 text-blue-500" />;
	if (name.includes("ph")) return <Flask className="h-6 w-6 text-purple-500" />;
	if (name.includes("nitrogenio"))
		return <Leaf className="h-6 w-6 text-green-500" />;
	if (name.includes("potássio") || name.includes("potassio"))
		return <Leaf className="h-6 w-6 text-green-600" />;
	if (name.includes("fosforo") || name.includes("fósforo"))
		return <Leaf className="h-6 w-6 text-green-700" />;
	if (name.includes("condutividade"))
		return <Wifi className="h-6 w-6 text-cyan-500" />;

	return <Database className="h-6 w-6 text-gray-500" />;
}
