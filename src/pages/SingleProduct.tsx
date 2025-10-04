import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Product } from "@/interfaces/admin";
import { Heart, Clock, ChefHat, Flame, Leaf, CheckCircle2, AlertCircle } from "lucide-react";

import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { handleErrorResponse } from "@/utils";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ListProductSkeleton from "@/components/skeleton/ListProductSkeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import RelatedProduct from "@/components/products/RelatedProduct";
import VendorContact from "@/components/products/VendorContact";

export const SingleProduct = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  // State for favorites
  const [isFavorite, setIsFavorite] = useState(false);

  const addToFavorite = (product_id: any) => {
    http.post(apiRoutes.favoris, { product_id: product_id })
      .then((res) => {
      })
  }

  const { isLoading, data: meal } = useQuery<Product>({
    queryKey: ["meal"],
    queryFn: () =>
      http
        .get<Product>(apiRoutes.product + `/${id}`)
        .then((res) => {
          setIsFavorite(res.data.favaris || false);
          return res.data;
        })
        .catch((e) => {
          handleErrorResponse(e);
          throw e;
        }),
  });

  const getDietaryBadges = (meal: Product) => {
    const badges = [];
    if (meal.is_vegetarian) badges.push({ label: "Vegetarian", color: "bg-green-100 text-green-800" });
    if (meal.is_vegan) badges.push({ label: "Vegan", color: "bg-green-200 text-green-900" });
    if (meal.is_gluten_free) badges.push({ label: "Gluten Free", color: "bg-blue-100 text-blue-800" });
    if (meal.is_dairy_free) badges.push({ label: "Dairy Free", color: "bg-purple-100 text-purple-800" });
    if (meal.is_nut_free) badges.push({ label: "Nut Free", color: "bg-orange-100 text-orange-800" });
    if (meal.is_keto) badges.push({ label: "Keto", color: "bg-red-100 text-red-800" });
    if (meal.is_paleo) badges.push({ label: "Paleo", color: "bg-yellow-100 text-yellow-800" });
    if (meal.is_low_carb) badges.push({ label: "Low Carb", color: "bg-indigo-100 text-indigo-800" });
    if (meal.is_high_protein) badges.push({ label: "High Protein", color: "bg-pink-100 text-pink-800" });
    return badges;
  };

  return (
    isLoading ? (
      <ListProductSkeleton />
    ) : (
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        <div className="grid gap-3 items-start">
          <div className="grid gap-4">
            <img
              src={meal?.image_path || "/placeholder.svg"}
              alt="Meal Image"
              width={600}
              height={900}
              className="aspect-[2/3] object-cover border w-full rounded-lg overflow-hidden"
            />
            <div className="hidden md:grid grid-cols-4 gap-3">
              <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
                <img
                  src="/placeholder.svg"
                  alt="Preview thumbnail"
                  width={100}
                  height={120}
                  className="aspect-[5/6] object-cover"
                />
                <span className="sr-only">View Image 1</span>
              </button>
              <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
                <img
                  src="/placeholder.svg"
                  alt="Preview thumbnail"
                  width={100}
                  height={120}
                  className="aspect-[5/6] object-cover"
                />
                <span className="sr-only">View Image 2</span>
              </button>
              <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
                <img
                  src="/placeholder.svg"
                  alt="Preview thumbnail"
                  width={100}
                  height={120}
                  className="aspect-[5/6] object-cover"
                />
                <span className="sr-only">View Image 3</span>
              </button>
              <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
                <img
                  src="/placeholder.svg"
                  alt="Preview thumbnail"
                  width={100}
                  height={120}
                  className="aspect-[5/6] object-cover"
                />
                <span className="sr-only">View Image 4</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:gap-10 items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl lg:text-4xl">{meal?.name}</h1>

            {/* Dietary Badges */}
            {meal && getDietaryBadges(meal).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {getDietaryBadges(meal).map((badge, index) => (
                  <Badge key={index} className={`${badge.color} border-0`}>
                    <Leaf className="h-3 w-3 mr-1" />
                    {badge.label}
                  </Badge>
                ))}
              </div>
            )}

            {/* Nutritional Information */}
            <div className="grid gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Nutritional Information</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {meal?.calories && (
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <Flame className="h-6 w-6 text-orange-500 mx-auto mb-1" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{meal.calories}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Calories</div>
                  </div>
                )}
                {meal?.protein && (
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{meal.protein}g</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
                  </div>
                )}
                {meal?.carbohydrates && (
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{meal.carbohydrates}g</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Carbs</div>
                  </div>
                )}
                {meal?.fats && (
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{meal.fats}g</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Fats</div>
                  </div>
                )}
              </div>
            </div>

            {/* Preparation Details */}
            <div className="grid gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Preparation Details</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {meal?.prep_time_minutes && (
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Prep Time</div>
                      <div className="text-lg font-bold">{meal.prep_time_minutes} min</div>
                    </div>
                  </div>
                )}
                {meal?.cooking_time_minutes && (
                  <div className="flex items-center gap-3">
                    <ChefHat className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Cook Time</div>
                      <div className="text-lg font-bold">{meal.cooking_time_minutes} min</div>
                    </div>
                  </div>
                )}
                {meal?.difficulty_level && (
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty</div>
                      <Badge variant="outline" className="font-medium">
                        {meal.difficulty_level}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>

              {/* Spice Level */}
              {meal?.is_spicy && meal?.spice_level && (
                <div className="flex items-center gap-3 pt-2 border-t">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Spice Level:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <Flame
                          key={level}
                          className={`h-4 w-4 ${level <= meal.spice_level ? 'text-red-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-4xl font-bold">
              {meal?.price} {t("currency")}
            </div>
          </div>

          <Separator />
          <div className="grid gap-4 text-sm leading-loose">
            {meal?.description}
          </div>

          <form className="grid gap-4 md:gap-10">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1">
                Order Meal
              </Button>
              <Button
                size="lg"
                variant={isFavorite ? "default" : "outline"}
                className={`flex items-center gap-2 ${isFavorite ? 'bg-red-600 hover:bg-red-700' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsFavorite(!isFavorite);
                  addToFavorite(meal?.id)
                }}
                type="button"
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-white' : ''}`} />
                {isFavorite ? "Added to Favorites" : "Add to Favorites"}
              </Button>
            </div>
          </form>

          {/* Vendor Contact Section */}
          {meal?.user && (
            <div className="grid gap-4">
              <VendorContact vendor={meal.user} productId={meal.id} />
            </div>
          )}

          <div className="grid gap-4">
            <h2 className="font-bold text-lg">Related Meals</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {meal?.relatedProducts?.length > 0 ? (
                meal.relatedProducts.map((relatedMeal) => (
                  <RelatedProduct key={relatedMeal.id} product={relatedMeal} />
                ))
              ) : (
                <p className="text-muted-foreground">No related meals found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SingleProduct;
