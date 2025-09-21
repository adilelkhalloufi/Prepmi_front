import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Categorie, FormModalProps, Unite } from "@/interfaces/admin";
import { DatePicker } from "@/components/ui/date-picker";
import http, { defaultHttp } from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { useQuery } from "@tanstack/react-query";
import { handleErrorResponse } from "@/utils";
import i18next from "i18next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Form({ open, onClose }: FormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    quantity: "",
    categorie_id: "",
    unite_id: "",
    auction: false,
    date_end_auction: null,
    conditions_document: "",
    conditions_document_price: "",
    show_company: false,
  });
  const [error, setError] = useState(false);
  const { data: categories = [] } = useQuery<Categorie[]>({
    queryKey: ['categories'],
    queryFn: () =>
      defaultHttp
        .get<Categorie[]>(apiRoutes.categories)
        .then((res) => res.data)
        .catch((e) => {
          handleErrorResponse(e)
          return []
        }),
  })
  const { data: unites = [] } = useQuery<Unite[]>({
    queryKey: ['unites'],
    queryFn: () =>
      defaultHttp
        .get<Unite[]>(apiRoutes.unites)
        .then((res) => res.data)
        .catch((e) => {
          handleErrorResponse(e)
          return []
        }),
  })
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    setError(false)
  }, [open])
  const handleSubmit = () => {
    // test if name and price are not empty

    if (formData.name && formData.price) {
      http.post(apiRoutes.product, formData).then((res) => {
        // redirect to the product page
        onClose()


      }).catch((e) => {
        handleErrorResponse(e)
      });

    }
    else {
      setError(true)
    }






  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl">
        <DialogHeader className="font-bold">Ajouter un produit</DialogHeader>
        {error && <Alert variant="destructive">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>
            Veuillez remplir tous les champs obligatoires
          </AlertDescription>
        </Alert>}


        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Nom</Label>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <Label>Image</Label>
            <Input type="file" name="image" onChange={handleChange} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Prix</Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Quantité</Label>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Catégorie</Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, categorie_id: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name[i18next.language]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Unité</Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, unite_id: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une unité" />
              </SelectTrigger>
              <SelectContent>
                {unites.map((unite) => (
                  <SelectItem key={unite.id} value={unite.id}>
                    {unite.name[i18next.language]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>




          <div>
            <Label>Document de conditions</Label>
            <Input
              name="conditions_document"
              type="file"
              value={formData.conditions_document}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Conditions Document Prix</Label>
            <Input
              type="number"
              name="conditions_document_price"
              value={formData.conditions_document_price}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <Label className="mb-2">Affiche Socéte</Label>
            <Switch
              checked={formData.show_company}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, show_company: checked }))
              }
            />
          </div>
          <div className="flex flex-col">
            <Label className="mb-2">Enchères</Label>
            <Switch
              checked={formData.auction}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, auction: checked }))
              }
            />
          </div>
          {formData.auction && (
            <div>
              <DatePicker
                label="Date de fin de l'enchère"
                value={formData.date_end_auction}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, date_end_auction: date }))
                }
              />
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>Ajouter</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
