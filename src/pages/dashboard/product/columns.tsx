import { Product } from "@/interfaces/admin"
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

export const columns: ColumnDef<Product>[] = [
  //  {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
    {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const product = row.original

      return (
        <img
          src={product.image}
          alt={product.name}
          className="w-10 h-10 rounded-md"
        />
      )
    }
    },
    {
        accessorKey: "id",
        header: "ID",
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
        accessorKey: "price",
        header: "Prix",
    },
    {
        accessorKey: "quantity",
        header: "Quantité",
    },
   
    {
        accessorKey: "description",
        header: "Description",
    },
    {
      accessorKey: "categorie.name.fr",
      header: "Catégorie",
    },
    {
      accessorKey: "unite.name.fr",
      header: "Unité",
    },
    {
        id: "availability_status",
        header: "Situation",
        cell: ({ row }) => {
          const product = row.original
     
          return (
            <Badge
               className="capitalize"
            >
              {product.availability_status}
            </Badge>
          )
        },
      },
      {
        id: "status",
        header: "Statut",
        cell: ({ row }) => {
          const product = row.original
     
          return (
            <Badge
               className="capitalize"
            >
              {product.status.name.fr}
            </Badge>
          )
        },
      },
   
    {
        id: "actions",
        cell: ({ row }) => {
          const payment = row.original
     
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
                {/* <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },



]
