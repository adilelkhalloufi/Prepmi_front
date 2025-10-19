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

const statusVariant = {
    pending: "bg-yellow-500",
    preparing: "bg-blue-500",
    shipped: "bg-indigo-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
};

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "user.name",
        header: "Client",
    },
    {
        accessorKey: "total_price",
        header: "Prix Total",
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("total_price") as string)
            return new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "MAD"
            }).format(price)
        }
    },
    {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <Badge className={`capitalize ${statusVariant[status] || "bg-gray-500"}`}>
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "order_date",
        header: "Date de commande",
        cell: ({ row }) => {
            const date = row.getValue("order_date") as string;
            return new Date(date).toLocaleDateString('fr-FR');
        }
    },
    {
        accessorKey: "delivery_date",
        header: "Date de livraison",
        cell: ({ row }) => {
            const date = row.getValue("delivery_date") as string;
            return date ? new Date(date).toLocaleDateString('fr-FR') : "-";
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
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/orders/details/${order.id}`)}>
                            Voir les détails
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/orders/edit/${order.id}`)}>
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
