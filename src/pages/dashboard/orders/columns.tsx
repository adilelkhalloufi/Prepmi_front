import { Order } from "@/interfaces/admin"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { webRoutes } from "@/routes/web"

const statusVariant = {
    pending: "bg-yellow-500",
    preparing: "bg-blue-500",
    shipped: "bg-indigo-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
};

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "num_order",
        header: "Numéro de commande",
    },
    {
        accessorKey: "first_name",
        header: "Client",
        cell: ({ row }) => {
            return `${row.original.first_name} ${row.original.last_name}`
        }
    },
    {
        accessorKey: "phone",
        header: "Téléphone",
    },
    {
        accessorKey: "adresse_livrsion",
        header: "Adresse de livraison",
    },
    {
        accessorKey: "method_payement",
        header: "Méthode de paiement",
    },
    {
        accessorKey: "reward_point",
        header: "Points de fidélité",
    },
    {
        accessorKey: "statue",
        header: "Statut",
        cell: ({ row }) => {
            const status = row.getValue("statue") as string;
            return (
                <Badge className={`capitalize ${statusVariant[status] || "bg-gray-500"}`}>
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "date_order",
        header: "Date de commande",
        cell: ({ row }) => {
            const date = row.getValue("date_order") as string;
            return new Date(date).toLocaleDateString('fr-FR');
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const order = row.original
            const navigate = useNavigate()

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigate(webRoutes.dashboard_orders_view.replace(":id", order.id?.toString() ?? ""))}>
                            Voir les détails
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(webRoutes.dashboard_orders_edit.replace(":id", order.id?.toString() ?? ""))}>
                            Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
