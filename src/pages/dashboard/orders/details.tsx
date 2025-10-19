import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { handleErrorResponse } from "@/utils";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { webRoutes } from "@/routes/web";
import { Order } from "@/interfaces/admin";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const statusVariant = {
    pending: "bg-yellow-500",
    preparing: "bg-blue-500",
    shipped: "bg-indigo-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
};

export default function OrderDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            http.get(`${apiRoutes.orders}/${id}`)
                .then((res) => {
                    setOrder(res.data.data);
                })
                .catch(handleErrorResponse)
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) {
        return <div>Chargement des détails de la commande...</div>;
    }

    if (!order) {
        return <div>Commande non trouvée.</div>;
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="sm" onClick={() => navigate(webRoutes.dashboard_orders)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                </Button>
                <h1 className="text-3xl font-bold">Détails de la commande #{order.id}</h1>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Informations générales</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold">Client</p>
                            <p>{order.user.name}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Email du client</p>
                            <p>{order.user.email}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Date de commande</p>
                            <p>{new Date(order.order_date).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Date de livraison</p>
                            <p>{order.delivery_date ? new Date(order.delivery_date).toLocaleDateString('fr-FR') : '-'}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Statut</p>
                            <Badge className={`capitalize ${statusVariant[order.status] || "bg-gray-500"}`}>
                                {order.status}
                            </Badge>
                        </div>
                        <div>
                            <p className="font-semibold">Prix Total</p>
                            <p className="font-bold text-lg">{new Intl.NumberFormat("fr-FR", { style: "currency", currency: "MAD" }).format(order.total_price)}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Repas commandés</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Repas</TableHead>
                                    <TableHead>Quantité</TableHead>
                                    <TableHead>Prix unitaire</TableHead>
                                    <TableHead className="text-right">Sous-total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.order_meals.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.meal.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{new Intl.NumberFormat("fr-FR", { style: "currency", currency: "MAD" }).format(item.price)}</TableCell>
                                        <TableCell className="text-right">{new Intl.NumberFormat("fr-FR", { style: "currency", currency: "MAD" }).format(item.quantity * item.price)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
