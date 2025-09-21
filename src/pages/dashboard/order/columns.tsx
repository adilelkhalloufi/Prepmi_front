import { Order } from "@/interfaces/admin"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Mail, Phone, User } from "lucide-react"
 
export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "user.name",
        header: "Client",
        cell: ({ row }) => {
            const user = row.original.product.user;
            return (
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{user?.name || "N/A"}</span>
                </div>
            );
        }
    },
    {
        accessorKey: "user.email",
        header: "Contact Email",
        cell: ({ row }) => {
            const user = row.original.product.user;
            return user?.email ? (
                <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a 
                        href={`mailto:${user.email}`}
                        className="text-blue-600 hover:text-blue-800 underline"
                        title={`Contacter ${user.name} par email`}
                    >
                        {user.email}
                    </a>
                </div>
            ) : "N/A";
        }
    },
     {
        accessorKey: "user.phone",
        header: "Téléphone",
        cell: ({ row }) => {
            const user = row.original.product.user;
            return user?.phone ? (
                <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{user.phone}</span>
                </div>
            ) : "N/A";
        }
    },
    {
        accessorKey: "product.name",
        header: "Produit",
    },  
    {
        accessorKey: "product.price",
        header: "Prix",
        cell: ({ row }) => {
            const price = row.original.product?.price;
            return price ? `${price}  ` : "N/A";
        }
    },
    {
        accessorKey: "quantity",
        header: "Quantité",
    },
    {
        accessorKey: "product.description",
        header: "Description",
        cell: ({ row }) => {
            const description = row.original.product?.description;
            return description ? (
                <div className="max-w-xs truncate" title={description}>
                    {description}
                </div>
            ) : "N/A";
        }
    },
    {
        accessorKey: "product.categorie.name.fr",
        header: "Catégorie",
    },
    {
        accessorKey: "product.unite.name.fr",
        header: "Unité",
    },
    {
        accessorKey: "note",
        header: "Note",
        cell: ({ row }) => {
            const note = row.original.note;
            return note ? (
                <div className="max-w-xs truncate" title={note}>
                    {note}
                </div>
            ) : "N/A";
        }
    },
    {
        accessorKey: "address",
        header: "Adresse",
        cell: ({ row }) => {
            const address = row.original.address;
            return address ? (
                <div className="max-w-xs truncate" title={address}>
                    {address}
                </div>
            ) : "N/A";
        }
    },
    {
        accessorKey: "payment",
        header: "Paiement",
    },
      
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const order = row.original;
            const user = order.product.user;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Ouvrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => {
                                if (user?.email) {
                                    window.open(`mailto:${user.email}?subject=Concernant votre commande #${order.id}&body=Bonjour ${user.name},`, '_blank');
                                }
                            }}
                            disabled={!user?.email}
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            Envoyer un email
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => {
                                if (user?.email) {
                                    navigator.clipboard.writeText(user.email);
                                }
                            }}
                            disabled={!user?.email}
                        >
                            Copier l'email
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => {
                                if (user?.phone) {
                                    navigator.clipboard.writeText(user.phone);
                                }
                            }}
                            disabled={!user?.phone}
                        >
                            <Phone className="mr-2 h-4 w-4" />
                            Copier le téléphone
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => {
                                const contactInfo = `
Client: ${user?.name || 'N/A'}
Email: ${user?.email || 'N/A'}
Téléphone: ${user?.phone || 'N/A'}
Commande: #${order.id}
Produit: ${order.product?.name || 'N/A'}
Quantité: ${order.quantity}
Prix: ${order.product?.price || 'N/A'} €
Adresse: ${order.address || 'N/A'}
                                `.trim();
                                navigator.clipboard.writeText(contactInfo);
                            }}
                        >
                            Copier les infos client
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    },

]


  