import { MealPreparation } from "@/interfaces/admin"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const statusConfig = {
    pending: {
        label: "En attente",
        variant: "bg-yellow-500 hover:bg-yellow-600",
    },
    preparing: {
        label: "En préparation",
        variant: "bg-blue-500 hover:bg-blue-600",
    },
    ready_for_delivery: {
        label: "Prêt pour livraison",
        variant: "bg-green-500 hover:bg-green-600",
    },
    delivered: {
        label: "Livré",
        variant: "bg-gray-500 hover:bg-gray-600",
    },
    cancelled: {
        label: "Annulé",
        variant: "bg-red-500 hover:bg-red-600",
    },
};

export const columns = (onStatusUpdate: (id: number, status: string) => void): ColumnDef<MealPreparation>[] => [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    #
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="font-medium">#{row.getValue("id")}</div>
        }
    },
    {
        accessorKey: "meal.name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Repas
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const meal = row.original.meal;
            return (
                <div className="flex items-center gap-3">
                    {meal?.image_path && (
                        <img 
                            src={meal.image_path} 
                            alt={meal.name}
                            className="w-12 h-12 rounded-md object-cover"
                        />
                    )}
                    <div>
                        <div className="font-medium">{meal?.name || "N/A"}</div>
                        {meal?.short_description && (
                            <div className="text-xs text-muted-foreground line-clamp-1">
                                {meal.short_description}
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Quantité
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="text-center font-bold text-lg">{row.getValue("quantity")}</div>
        }
    },
    {
        accessorKey: "customer_name",
        header: "Client",
        cell: ({ row }) => {
            return <div>{row.original.order?.user?.name || row.original.customer_name || "N/A"}</div>
        }
    },
    {
        accessorKey: "preparation_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date de préparation
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = row.getValue("preparation_date") as string;
            return new Date(date).toLocaleDateString('fr-FR', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    },
    {
        accessorKey: "delivery_date",
        header: "Date de livraison",
        cell: ({ row }) => {
            const date = row.getValue("delivery_date") as string;
            return date ? new Date(date).toLocaleDateString('fr-FR', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            }) : "-";
        }
    },
    {
        accessorKey: "preparation_status",
        header: "Statut",
        cell: ({ row }) => {
            const status = row.getValue("preparation_status") as string;
            const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
            const mealPrep = row.original;

            return (
                <Select
                    value={status}
                    onValueChange={(newStatus) => onStatusUpdate(mealPrep.id, newStatus)}
                >
                    <SelectTrigger className={`w-[160px] ${config.variant} text-white border-none`}>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(statusConfig).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${value.variant}`}></div>
                                    {value.label}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )
        },
    },
    {
        accessorKey: "notes",
        header: "Notes",
        cell: ({ row }) => {
            const notes = row.getValue("notes") as string;
            return notes ? (
                <div className="max-w-[200px] truncate text-sm text-muted-foreground" title={notes}>
                    {notes}
                </div>
            ) : "-";
        }
    },
];
