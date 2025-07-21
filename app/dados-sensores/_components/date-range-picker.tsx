"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

// Configura o locale do dayjs para português
dayjs.locale("pt-br");

// Define as propriedades que o componente recebe
interface DateRangePickerProps extends React.ComponentProps<"div"> {
	date: DateRange | undefined;
	onDateChange: (date: DateRange | undefined) => void;
}

export function DateRangePicker({
	className,
	date,
	onDateChange,
}: DateRangePickerProps) {
	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					{/* Botão que exibe a data selecionada e abre o popover */}
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-full justify-start text-left font-normal",
							!date && "text-muted-foreground"
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date?.from ? (
							date.to ? (
								<>
									{dayjs(date.from).format("DD/MM/YYYY")} -{" "}
									{dayjs(date.to).format("DD/MM/YYYY")}
								</>
							) : (
								dayjs(date.from).format("DD/MM/YYYY")
							)
						) : (
							<span>Selecione um período</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0 flex" align="start">
					{/* Container para os botões de atalho */}
					<div className="flex flex-col space-y-2 border-r p-4">
						<h3 className="text-sm font-medium">Atalhos</h3>
						<Button
							variant="ghost"
							className="justify-start"
							onClick={() => onDateChange({ from: new Date(), to: new Date() })}
						>
							Hoje
						</Button>
						<Button
							variant="ghost"
							className="justify-start"
							onClick={() =>
								onDateChange({
									from: dayjs().subtract(7, "day").toDate(),
									to: new Date(),
								})
							}
						>
							Últimos 7 dias
						</Button>
						<Button
							variant="ghost"
							className="justify-start"
							onClick={() =>
								onDateChange({
									from: dayjs().subtract(30, "day").toDate(),
									to: new Date(),
								})
							}
						>
							Últimos 30 dias
						</Button>
						<Button
							variant="ghost"
							className="justify-start"
							onClick={() =>
								onDateChange({
									from: dayjs().startOf("month").toDate(),
									to: dayjs().endOf("month").toDate(),
								})
							}
						>
							Este Mês
						</Button>
						<Button
							variant="ghost"
							className="justify-start"
							onClick={() =>
								onDateChange({
									from: dayjs().subtract(1, "month").startOf("month").toDate(),
									to: dayjs().subtract(1, "month").endOf("month").toDate(),
								})
							}
						>
							Mês Passado
						</Button>
					</div>

					<Separator orientation="vertical" className="h-auto" />

					{/* O componente de calendário real */}
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={onDateChange}
						numberOfMonths={1}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
