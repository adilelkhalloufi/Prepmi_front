import { Category } from "@/interfaces/admin"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const category = row.original

      return (
        <img
          src={category.image_url || "/placeholder.png"}
          alt={category.name}
          className="w-10 h-10 rounded-md object-cover"
        />
      )
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => {
      const slug = row.getValue("slug") as string
      return (
        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          {slug}
        </code>
      )
    }
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      return (
        <div className="max-w-[300px] truncate" title={description}>
          {description || "-"}
        </div>
      )
    }
  },
  {
    id: "status",
    header: "Statut",
    cell: ({ row }) => {
      const category = row.original

      return (
        <Badge className={category.is_active ? "bg-green-500" : "bg-red-500"}>
          {category.is_active ? "Actif" : "Inactif"}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original
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
            <DropdownMenuItem onClick={() => navigate(`/dashboard/categories/details/${category.id}`)}>
              Voir les détails
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/dashboard/categories/edit/${category.id}`)}>
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
