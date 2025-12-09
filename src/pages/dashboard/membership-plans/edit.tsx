import { useEffect, useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { handleErrorResponse } from "@/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { webRoutes } from "@/routes/web";

export default function EditMembershipPlan() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        // Keep fees as strings to preserve decimals/formatting from API
        monthly_fee: "",
        discount_percentage: "",
        delivery_slots: 0,
        includes_free_desserts: false,
        free_desserts_quantity: 0,
        is_active: true,
        billing_day_of_month: 1,
        perks: [] as string[],
    });

    const [planMeta, setPlanMeta] = useState({ created_at: "", updated_at: "" });

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingPlan, setLoadingPlan] = useState(true);

    useEffect(() => {
        if (id) {
            setLoadingPlan(true);
            http.get(`${apiRoutes.membershipPlans}/${id}`)
                .then((res) => {
                    const plan = res && res.data ? (res.data.data ?? res.data) : null;
                    if (!plan) {
                        // If API response doesn't contain expected data, mark error
                        setError(true);
                        return;
                    }

                    setFormData({
                        name: plan.name || "",
                        description: plan.description || "",
                        monthly_fee: plan.monthly_fee ?? "",
                        discount_percentage: plan.discount_percentage ?? "",
                        delivery_slots: plan.delivery_slots ? Number(plan.delivery_slots) : 0,
                        includes_free_desserts: plan.includes_free_desserts || false,
                        free_desserts_quantity: plan.free_desserts_quantity ? Number(plan.free_desserts_quantity) : 0,
                        is_active: plan.is_active !== undefined ? plan.is_active : true,
                        billing_day_of_month: plan.billing_day_of_month ? Number(plan.billing_day_of_month) : 1,
                        perks: Array.isArray(plan.perks) ? plan.perks : [],
                    });
                    setPlanMeta({
                        created_at: plan.created_at || "",
                        updated_at: plan.updated_at || "",
                    });
                })
                .catch((e) => {
                    handleErrorResponse(e);
                    setError(true);
                })
                .finally(() => {
                    setLoadingPlan(false);
                });
        }
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        // Special handling for perks textarea
        if (name === "perks") {
            const items = String(value).split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
            setFormData((prev) => ({ ...prev, perks: items }));
            return;
        }

        // Keep monetary fields as strings to preserve formatting
        if (type === "number" && (name !== "monthly_fee" && name !== "discount_percentage")) {
            const num = value === "" ? 0 : Number(value);
            setFormData((prev) => ({ ...prev, [name]: num }));
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (name: string, checked: boolean) => {
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = () => {
        setError(false);
        setSuccess(false);
        setLoading(true);
        if (formData.name && id) {
            const submitData = new FormData();

            Object.keys(formData).forEach((key) => {
                const value = formData[key as keyof typeof formData];
                if (typeof value === 'boolean') {
                    submitData.append(key, value ? '1' : '0');
                } else if (Array.isArray(value)) {
                    // serialize arrays as JSON string (adjust if API expects other format)
                    submitData.append(key, JSON.stringify(value));
                } else if (value !== null && value !== undefined) {
                    submitData.append(key, String(value));
                }
            });

            submitData.append('_method', 'PUT');

            http.post(`${apiRoutes.membershipPlans}/${id}`, submitData)
                .then(() => {
                    setSuccess(true);
                    setTimeout(() => {
                        navigate(webRoutes.dashboard_membership_plans);
                    }, 2000);
                })
                .catch((e) => {
                    handleErrorResponse(e);
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setError(true);
            setLoading(false);
        }
    };

    if (loadingPlan) {
        return (
            <div className="container mx-auto p-6 max-w-4xl flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Chargement du plan d'adhésion...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(webRoutes.dashboard_membership_plans)}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Retour
                        </Button>
                        <h1 className="text-3xl font-bold">Modifier le plan d'adhésion</h1>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button onClick={handleSubmit} loading={loading}>
                            Enregistrer les modifications
                        </Button>
                    </div>
                </div>
            </div>

            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>
                        Veuillez remplir tous les champs obligatoires.
                    </AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert className="mb-4 border-green-500 text-green-700">
                    <AlertTitle>Succès</AlertTitle>
                    <AlertDescription>
                        Le plan d'adhésion a été modifié avec succès. Redirection en cours...
                    </AlertDescription>
                </Alert>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Détails du plan d'adhésion</CardTitle>
                    <div className="text-sm text-muted-foreground mt-2">
                        <div>Créé: {planMeta.created_at ? new Date(planMeta.created_at).toLocaleString() : '-'}</div>
                        <div>Mise à jour: {planMeta.updated_at ? new Date(planMeta.updated_at).toLocaleString() : '-'}</div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <Label>Nom du plan *</Label>
                            <Input name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="col-span-2">
                            <Label>Description</Label>
                            <Textarea 
                                name="description" 
                                value={formData.description} 
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>
                        <div className="col-span-2">
                            <Label>Perks (un par ligne)</Label>
                            <Textarea
                                name="perks"
                                value={formData.perks.join('\n')}
                                onChange={handleChange}
                                rows={4}
                            />
                        </div>
                        <div>
                            <Label>Frais mensuels (MAD) *</Label>
                            <Input 
                                type="number" 
                                name="monthly_fee" 
                                value={formData.monthly_fee} 
                                onChange={handleChange} 
                                step="0.01" 
                            />
                        </div>
                        <div>
                            <Label>Pourcentage de réduction (%)</Label>
                            <Input 
                                type="number" 
                                name="discount_percentage" 
                                value={formData.discount_percentage} 
                                onChange={handleChange} 
                                min="0"
                                max="100"
                            />
                        </div>
                        <div>
                            <Label>Créneaux de livraison</Label>
                            <Input 
                                type="number" 
                                name="delivery_slots" 
                                value={formData.delivery_slots} 
                                onChange={handleChange} 
                                min="0"
                            />
                        </div>
                        <div>
                            <Label>Quantité de desserts gratuits</Label>
                            <Input 
                                type="number" 
                                name="free_desserts_quantity" 
                                value={formData.free_desserts_quantity} 
                                onChange={handleChange}
                                min="0"
                                disabled={!formData.includes_free_desserts}
                            />
                        </div>
                        <div>
                            <Label>Jour de facturation (1-28)</Label>
                            <Input 
                                type="number" 
                                name="billing_day_of_month" 
                                value={formData.billing_day_of_month} 
                                onChange={handleChange}
                                min="1"
                                max="28"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="includes_free_desserts"
                            checked={formData.includes_free_desserts}
                            onCheckedChange={(checked) => handleSwitchChange("includes_free_desserts", checked)}
                        />
                        <Label htmlFor="includes_free_desserts">Inclut des desserts gratuits</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="is_active"
                            checked={formData.is_active}
                            onCheckedChange={(checked) => handleSwitchChange("is_active", checked)}
                        />
                        <Label htmlFor="is_active">Actif</Label>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
