import { Order } from "@/interfaces/admin"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react";
import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { toast } from "sonner";

export default function OrderIndex() {
    const navigate = useNavigate();
    const [data, setData] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchOrders = () => {
        http.get(apiRoutes.orders).then((res) => {
            console.log(res.data.data);
            setData(res.data.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleAnnuleCommande = async (orderId: number) => {

            await http.put(apiRoutes.updateMealPreparationStatus(orderId), { statue: "Cancelled" }).then(() => {
                toast.success("Commande annulée avec succès");
                fetchOrders();
            }).catch(() => {
                toast.error("Erreur lors de l'annulation de la commande");
            });
     
        
    };

    return (
        <>
            <div className="flex justify-between items-center w-full mb-4">
                <h1 className="text-3xl font-bold m-2">Commandes</h1>
                {/* <Button
                    onClick={() => {
                        navigate(webRoutes.dashboard_orders_add);
                    }}
                >
                    Nouvelle commande
                </Button> */}
            </div>

            <DataTable columns={columns(handleAnnuleCommande)} data={data} loading={loading} />
        </>

    )
}
