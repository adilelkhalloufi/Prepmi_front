import { meal } from "@/interfaces/admin"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import i18next from "i18next"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"

export const columns: ColumnDef<meal>[] = [
  {
    accessorKey: "image_path",
    header: "Image",
    cell: ({ row }) => {
      const meal = row.original

      return (
        <img
          src={meal.image_url}
          alt={meal.name}
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
    accessorKey: "category_id",
    header: "Catégorie",
    cell: ({ row }) => {
      const meal = row.original
      return meal.category_id ? (
        <Badge variant="outline">
          {meal.category_id }
        </Badge>
      ) : (
        <span className="text-gray-400">-</span>
      )
    }
  },
  {
    accessorKey: "short_description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("short_description") as string
      return (
        <div className="max-w-[200px] truncate" title={description}>
          {description}
        </div>
      )
    }
  },
  {
    accessorKey: "price",
    header: "Prix",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price") as string)
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "MAD"
      }).format(price)
    }
  },
  {
    accessorKey: "nutrition.calories",
    header: "Calories",
    cell: ({ row }) => {
      const meal = row.original
      return meal.nutrition?.calories || "-"
    }
  },
  {
    accessorKey: "preparation.prep_time_minutes",
    header: "Temps préparation",
    cell: ({ row }) => {
      const meal = row.original
      const time = meal.preparation?.prep_time_minutes
      return time ? `${time} min` : "-"
    }
  },
  {
    id: "dietary_info",
    header: "Régime",
    cell: ({ row }) => {
      const meal = row.original
      const badges = []

      if (meal.dietary_info?.is_vegetarian) badges.push("Végétarien")
      if (meal.dietary_info?.is_vegan) badges.push("Vegan")
      if (meal.dietary_info?.is_gluten_free) badges.push("Sans gluten")
      if (meal.dietary_info?.is_keto) badges.push("Keto")

      return (
        <div className="flex gap-1 flex-wrap">
          {badges.slice(0, 2).map((badge, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {badge}
            </Badge>
          ))}
          {badges.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{badges.length - 2}
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    id: "availability",
    header: "Disponibilité",
    cell: ({ row }) => {
      const meal = row.original
      
      if (!meal.available_from || !meal.available_to) {
        return (
          <Badge variant="outline">
            Non défini
          </Badge>
        )
      }

      const now = new Date()
      const availableFrom = new Date(meal.available_from)
      const availableTo = new Date(meal.available_to)

      const isAvailable = now >= availableFrom && now <= availableTo && meal.is_active

      return (
        <Badge className={isAvailable ? "bg-green-500" : "bg-red-500"}>
          {isAvailable ? "Disponible" : "Indisponible"}
        </Badge>
      )
    },
  },
  {
    id: "status",
    header: "Statut",
    cell: ({ row }) => {
      const meal = row.original

      return (
        <Badge className="capitalize">
          {meal.is_active ? "Actif" : "Inactif"}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const meal = row.original
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
            <DropdownMenuItem onClick={() => navigate(`/dashboard/meals/edit/${meal.id}`)}>
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
