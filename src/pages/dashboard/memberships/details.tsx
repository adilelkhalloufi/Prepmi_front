import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import http from "@/utils/http"
import { apiRoutes } from "@/routes/api"
import { handleErrorResponse } from "@/utils"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Check } from "lucide-react"
import { webRoutes } from "@/routes/web"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const statusVariant: Record<string, string> = {
    active: "bg-green-500",
    pending: "bg-yellow-500",
    frozen: "bg-blue-500",
    cancelled: "bg-red-500",
}

const transactionStatusVariant: Record<string, string> = {
    completed: "bg-green-500",
    pending: "bg-yellow-500",
    failed: "bg-red-500",
    refunded: "bg-purple-500",
}

export default function MembershipDetails() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [membership, setMembership] = useState<any | null>(null)
    const [transactions, setTransactions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchMembershipDetails = () => {
        if (id) {
            Promise.all([
                http.get(`${apiRoutes.memberships}/${id}`),
                http.get(`${apiRoutes.membershipTransactions}?membership_id=${id}`)
            ])
                .then(([membershipRes, transactionsRes]) => {
                    const membershipData = membershipRes.data.data ?? membershipRes.data
                    const transactionsData = transactionsRes.data.data ?? transactionsRes.data
                    
                    setMembership(membershipData)
                    setTransactions(Array.isArray(transactionsData) ? transactionsData : [])
                })
                .catch(handleErrorResponse)
                .finally(() => setLoading(false))
        }
    }

    useEffect(() => {
        fetchMembershipDetails()
    }, [id])

    const handleActivate = async () => {
        try {
            await http.post(`${apiRoutes.memberships}/${id}/activate`)
            toast.success("Adhésion activée avec succès")
            fetchMembershipDetails()
        } catch (error) {
            toast.error("Erreur lors de l'activation")
        }
    }

    const handleFreeze = async () => {
        try {
            await http.post(`${apiRoutes.memberships}/${id}/freeze`)
            toast.success("Adhésion gelée avec succès")
            fetchMembershipDetails()
        } catch (error) {
            toast.error("Erreur lors du gel")
        }
    }

    const handleUnfreeze = async () => {
        try {
            await http.post(`${apiRoutes.memberships}/${id}/unfreeze`)
            toast.success("Adhésion réactivée avec succès")
            fetchMembershipDetails()
        } catch (error) {
            toast.error("Erreur lors de la réactivation")
        }
    }

    const handleCancel = async () => {
        if (window.confirm("Êtes-vous sûr de vouloir annuler cette adhésion ?")) {
            try {
                await http.post(`${apiRoutes.memberships}/${id}/cancel`)
                toast.success("Adhésion annulée avec succès")
                fetchMembershipDetails()
            } catch (error) {
                toast.error("Erreur lors de l'annulation")
            }
        }
    }

    if (loading) {
        return <div className="flex items-center justify-center h-96">Chargement des détails de l'adhésion...</div>
    }

    if (!membership) {
        return <div>Adhésion non trouvée.</div>
    }

    const plan = membership.membership_plan || {}
    const user = membership.user || {}
    const status = membership.status

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => navigate(webRoutes.dashboard_memberships)}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour
                    </Button>
                    <h1 className="text-3xl font-bold">Détails de l'adhésion #{membership.id}</h1>
                </div>
                <div className="flex gap-2">
                    {status === "pending" && (
                        <Button onClick={handleActivate} variant="default">
                            Activer
                        </Button>
                    )}
                    {status === "active" && (
                        <Button onClick={handleFreeze} variant="secondary">
                            Geler
                        </Button>
                    )}
                    {status === "frozen" && (
                        <Button onClick={handleUnfreeze} variant="default">
                            Réactiver
                        </Button>
                    )}
                    {(status === "active" || status === "frozen") && (
                        <Button onClick={handleCancel} variant="destructive">
                            Annuler l'adhésion
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Member Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informations du membre</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <p className="font-semibold text-sm text-gray-600">Nom</p>
                            <p className="text-lg">{user.name || "-"}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-gray-600">Email</p>
                            <p className="text-lg">{user.email || "-"}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-gray-600">Téléphone</p>
                            <p className="text-lg">{user.phone || "-"}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-gray-600">Statut</p>
                            <Badge className={`capitalize ${statusVariant[status] || "bg-gray-500"}`}>
                                {status === "active" ? "Active" :
                                 status === "pending" ? "En attente" :
                                 status === "frozen" ? "Gelée" :
                                 status === "cancelled" ? "Annulée" : status}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Membership Plan */}
                <Card>
                    <CardHeader>
                        <CardTitle>Plan d'adhésion</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <p className="font-semibold text-lg">{plan.name}</p>
                            <p className="text-sm text-gray-600">{plan.description}</p>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Frais mensuels</span>
                            <span className="font-bold">{plan.monthly_fee} MAD</span>
                        </div>
                        {parseFloat(plan.discount_percentage || 0) > 0 && (
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Réduction</span>
                                <span className="font-semibold text-green-600">{plan.discount_percentage}%</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Créneaux de livraison</span>
                            <span className="font-semibold">{plan.delivery_slots} par semaine</span>
                        </div>
                        {plan.includes_free_desserts && (
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Desserts gratuits</span>
                                <span className="font-semibold">{plan.free_desserts_quantity} par semaine</span>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Membership Details */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Détails de l'adhésion</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-4">
                        <div>
                            <p className="font-semibold text-sm text-gray-600">Date de début</p>
                            <p className="text-lg">
                                {membership.started_at ? new Date(membership.started_at).toLocaleDateString("fr-FR") : "-"}
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-gray-600">Prochaine facturation</p>
                            <p className="text-lg">
                                {membership.next_billing_date ? new Date(membership.next_billing_date).toLocaleDateString("fr-FR") : "-"}
                            </p>
                        </div>
                        {membership.cancelled_at && (
                            <div>
                                <p className="font-semibold text-sm text-gray-600">Date d'annulation</p>
                                <p className="text-lg">
                                    {new Date(membership.cancelled_at).toLocaleDateString("fr-FR")}
                                </p>
                            </div>
                        )}
                        <div>
                            <p className="font-semibold text-sm text-gray-600">Renouvellement automatique</p>
                            <p className="text-lg">
                                {status === "cancelled" ? "Non" : "Oui"}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Perks */}
                {plan.perks && plan.perks.length > 0 && (
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Avantages inclus</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid md:grid-cols-2 gap-2">
                                {plan.perks.map((perk: string, index: number) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>{perk}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}

                {/* Transactions History */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Historique des transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {transactions.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Montant</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Méthode</TableHead>
                                        <TableHead>Référence</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((transaction: any) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>
                                                {new Date(transaction.created_at).toLocaleDateString("fr-FR")}
                                            </TableCell>
                                            <TableCell className="capitalize">
                                                {transaction.transaction_type?.replace("_", " ")}
                                            </TableCell>
                                            <TableCell className="font-semibold">
                                                {transaction.amount} MAD
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={`capitalize ${transactionStatusVariant[transaction.payment_status] || "bg-gray-500"}`}>
                                                    {transaction.payment_status === "completed" ? "Complété" :
                                                     transaction.payment_status === "pending" ? "En attente" :
                                                     transaction.payment_status === "failed" ? "Échoué" :
                                                     transaction.payment_status === "refunded" ? "Remboursé" :
                                                     transaction.payment_status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="capitalize">
                                                {transaction.payment_method || "-"}
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {transaction.payment_reference || "-"}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="text-center text-gray-500 py-8">Aucune transaction trouvée</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
