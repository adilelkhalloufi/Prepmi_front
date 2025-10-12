import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { handleErrorResponse } from "@/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { webRoutes } from "@/routes/web";

export default function EditMeal() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        short_description: "",
        image_path: "",
        gallery_images: [],
        calories: "",
        protein: "",
        carbohydrates: "",
        fats: "",
        fiber: "",
        sodium: "",
        sugar: "",
        ingredients: "",
        allergens: "",
        preparation_instructions: "",
        storage_instructions: "",
        is_vegetarian: false,
        is_vegan: false,
        is_gluten_free: false,
        is_dairy_free: false,
        is_nut_free: false,
        is_keto: false,
        is_paleo: false,
        is_low_carb: false,
        is_high_protein: false,
        is_spicy: false,
        spice_level: "1",
        difficulty_level: "1",
        prep_time_minutes: "",
        cooking_time_minutes: "",
        price: "",
        cost_per_serving: "",
        weight_grams: "",
        serving_size: "",
        chef_notes: "",
        available_from: "",
        available_to: "",
        is_active: true,
    });

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            http.get(`${apiRoutes.meals}/${id}`)
                .then((res) => {
                    const meal = res.data;
                    setFormData({
                        ...meal,
                        calories: meal.calories?.toString() || "",
                        protein: meal.protein?.toString() || "",
                        carbohydrates: meal.carbohydrates?.toString() || "",
                        fats: meal.fats?.toString() || "",
                        fiber: meal.fiber?.toString() || "",
                        sodium: meal.sodium?.toString() || "",
                        sugar: meal.sugar?.toString() || "",
                        prep_time_minutes: meal.prep_time_minutes?.toString() || "",
                        cooking_time_minutes: meal.cooking_time_minutes?.toString() || "",
                        price: meal.price?.toString() || "",
                        cost_per_serving: meal.cost_per_serving?.toString() || "",
                        weight_grams: meal.weight_grams?.toString() || "",
                        available_from: meal.available_from ? new Date(meal.available_from).toISOString().slice(0, 16) : "",
                        available_to: meal.available_to ? new Date(meal.available_to).toISOString().slice(0, 16) : "",
                    });

                    // Set existing image preview
                    if (meal.image_path) {
                        setImagePreview(meal.image_path);
                    }

                    setLoading(false);
                })
                .catch((e) => {
                    handleErrorResponse(e);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSwitchChange = (name: string, checked: boolean) => {
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image_path: file }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setFormData((prev) => ({ ...prev, gallery_images: files }));

            const previews: string[] = [];
            files.forEach((file: any, index) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    previews[index] = reader.result as string;
                    if (previews.length === files.length) {
                        setGalleryPreviews([...previews]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleSubmit = () => {
        setError(false);
        setSuccess(false);

        if (formData.name && formData.description) {
            http.put(`${apiRoutes.meals}/${id}`, formData)
                .then((res) => {
                    setSuccess(true);
                    setTimeout(() => {
                        navigate(webRoutes.dashboard_meals);
                    }, 2000);
                })
                .catch((e) => {
                    handleErrorResponse(e);
                    setError(true);
                });
        } else {
            setError(true);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto p-6 max-w-6xl">
                <div className="flex items-center justify-center h-64">
                    <p>Chargement...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/dashboard/meals')}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Retour
                        </Button>
                        <h1 className="text-3xl font-bold">Modifier le repas</h1>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button onClick={handleSubmit} disabled={success}>
                            {success ? "Modifié..." : "Modifier le repas"}
                        </Button>
                    </div>
                </div>
            </div>

            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>
                        Veuillez remplir tous les champs obligatoires (nom, description)
                    </AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert className="mb-4 border-green-500 text-green-700">
                    <AlertTitle>Succès</AlertTitle>
                    <AlertDescription>
                        Le repas a été modifié avec succès. Redirection en cours...
                    </AlertDescription>
                </Alert>
            )}

            <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic">Informations</TabsTrigger>
                    <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                    <TabsTrigger value="preparation">Préparation</TabsTrigger>
                    <TabsTrigger value="dietary">Régime</TabsTrigger>
                </TabsList>

                {/* Copy all tab content from add.tsx but with the loaded formData */}
                <TabsContent value="basic" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations de base</CardTitle>
                            <CardDescription>Informations générales du repas</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Nom *</Label>
                                <Input name="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Slug</Label>
                                <Input name="slug" value={formData.slug} onChange={handleChange} />
                            </div>
                            <div className="col-span-2">
                                <Label>Description courte</Label>
                                <Textarea
                                    name="short_description"
                                    value={formData.short_description}
                                    onChange={handleChange}
                                    rows={2}
                                />
                            </div>
                            <div className="col-span-2">
                                <Label>Description complète *</Label>
                                <Textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                />
                            </div>
                            <div className="col-span-2 flex items-center space-x-2">
                                <Switch
                                    checked={formData.is_active}
                                    onCheckedChange={(checked) => handleSwitchChange("is_active", checked)}
                                />
                                <Label>Actif</Label>
                            </div>
                            <div>
                                <Label>Image principale</Label>
                                <Input
                                    type="file"
                                    name="image_path"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                                {imagePreview && (
                                    <div className="mt-2">
                                        <img
                                            src={imagePreview}
                                            alt="Aperçu"
                                            className="w-32 h-32 object-cover rounded-md border"
                                        />
                                    </div>
                                )}
                            </div>
                            {/* ...rest of the form fields... */}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Include all other tabs with the same structure as add.tsx */}
            </Tabs>
        </div>
    );
}
