import { MembershipPlan } from "@/interfaces/admin"
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

export const columns: ColumnDef<MembershipPlan>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Nom
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "monthly_fee",
        header: "Frais mensuels",
        cell: ({ row }) => {
            const fee = parseFloat(row.getValue("monthly_fee") as string)
            return new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "MAD"
            }).format(fee)
        }
    },
    {
        accessorKey: "discount_percentage",
        header: "Réduction",
        cell: ({ row }) => {
            const discount = row.getValue("discount_percentage") as number
            return discount ? `${discount}%` : "-"
        }
    },
    {
        accessorKey: "delivery_slots",
        header: "Créneaux livraison",
        cell: ({ row }) => {
            const slots = row.getValue("delivery_slots") as number
            return slots || "-"
        }
    },
    {
        accessorKey: "includes_free_desserts",
        header: "Desserts gratuits",
        cell: ({ row }) => {
            const hasDesserts = row.getValue("includes_free_desserts")
            const plan = row.original
            if (hasDesserts) {
                return <Badge variant="secondary" className="text-white">{plan.free_desserts_quantity || 0} gratuit(s)</Badge>
            }
            return "-"
        }
    },
    {
        accessorKey: "is_active",
        header: "Statut",
        cell: ({ row }) => {
            const isActive = row.getValue("is_active")
            return (
                <Badge className={isActive ? "bg-primary" : "bg-secondary"}>
                    {isActive ? "Actif" : "Inactif"}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const plan = row.original
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
                        {/* <DropdownMenuItem onClick={() => navigate(webRoutes.dashboard_membership_plans_view.replace(':id', String(plan.id)))}>
                            Voir les détails
                        </DropdownMenuItem> */}
                        <DropdownMenuItem onClick={() => navigate(webRoutes.dashboard_membership_plans_edit.replace(':id', String(plan.id)))}>
                            Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => alert(`Supprimer le plan ${plan.id}`)}>
                            Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
