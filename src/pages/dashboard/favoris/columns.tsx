import { Product } from "@/interfaces/admin"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
 
export const columns: ColumnDef<Product>[] = [
  
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
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Produit  
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
    }
]
