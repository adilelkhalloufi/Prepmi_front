import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { handleErrorResponse } from "@/utils";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { webRoutes } from "@/routes/web";
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
    const [order, setOrder] = useState<any | null>(null); // Use 'any' for flexibility
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
                <h1 className="text-3xl font-bold">Détails de la commande #{order.num_order}</h1>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Informations générales</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold">Nom du client</p>
                            <p>{order.first_name} {order.last_name}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Téléphone</p>
                            <p>{order.phone}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Adresse de livraison</p>
                            <p>{order.adresse_livrsion}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Méthode de paiement</p>
                            <p>{order.method_payement}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Points de fidélité</p>
                            <p>{order.reward_point}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Date de commande</p>
                            <p>{order.date_order ? new Date(order.date_order).toLocaleDateString('fr-FR') : '-'}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Statut</p>
                            <Badge className={`capitalize ${statusVariant[order.statue] || "bg-gray-500"}`}>
                                {order.statue}
                            </Badge>
                        </div>
                        <div>
                            <p className="font-semibold">Prix Total</p>
                            <p className="font-bold text-lg">{order.total_amount} MAD</p>
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
                                {order.order_meals && order.order_meals.map((item: any) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.meal?.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>
                                            {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "MAD" })
                                                .format(Number(item.meal?.price))}
                                        </TableCell>

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
