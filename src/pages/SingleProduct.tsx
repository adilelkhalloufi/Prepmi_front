import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Product } from "@/interfaces/admin";
import { Heart, Package, Tag, CheckCircle, Scale } from "lucide-react";

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

   const addToFavorite = (product_id:any)=> {
    

    http.post(apiRoutes.favoris, {product_id: product_id})
    .then((res) => {  
     })



  
    
  }
  const { isLoading, data: product } = useQuery<Product>({
    queryKey: ["product"],
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

  return (
    // test loading if load show skeleton like single product skeleto
    // if not show single product
    isLoading ? (
      <ListProductSkeleton />
    ) : (
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        <div className="grid gap-3 items-start">
          <div className="grid gap-4">
            <img
              src="/placeholder.svg"
              alt="Product Image"
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
            <h1 className="font-bold text-3xl lg:text-4xl">{product?.name}</h1>
            {product?.reference && (
              <p className="text-sm text-muted-foreground">
                Reference: <span className="font-mono">{product.reference}</span>
              </p>
            )}
            
            {/* Product Attributes Section */}
            <div className="grid gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('product.detail')}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Status */}
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('product.status')}</span>
                    <Badge 
                      variant={product?.status?.color === "destructive" ? "destructive" : "default"}
                      className="font-medium"
                    >
                      {typeof product?.status?.name === 'object' 
                        ? product?.status?.name?.[i18next.language] || product?.status?.name?.en || "Available"
                        : product?.status?.name || "Available"}
                    </Badge>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5 text-blue-600" />
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300"> {t('product.categorie')}</span>
                    <Badge variant="secondary" className="font-medium">
                      {typeof product?.categorie?.name === 'object' 
                        ? product?.categorie?.name?.[i18next.language] || product?.categorie?.name?.en || "N/A"
                        : product?.categorie?.name || "N/A"}
                    </Badge>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-orange-600" />
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('product.qte')}</span>
                    <Badge variant="outline" className="font-medium">
                      {product?.quantity || product?.qte || 0}
                    </Badge>
                  </div>
                </div>

                {/* Unit */}
                <div className="flex items-center gap-3">
                  <Scale className="h-5 w-5 text-purple-600" />
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Unit:</span>
                    <Badge variant="outline" className="font-medium">
                      {typeof product?.unite?.name === 'object' 
                        ? product?.unite?.name?.[i18next.language] || product?.unite?.name?.en || "Unit"
                        : product?.unite?.name || "Unit"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p></p>
            </div>
            {/* <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
              <div className="text-sm text-muted-foreground">(12 reviews)</div>
            </div> */}
            <div className="text-4xl font-bold">
              {" "}
              {product.price} {t("currency")}{" "}
            </div>
          </div>

          <Separator />
          <div className="grid gap-4 text-sm leading-loose">
            {product?.description}
          </div>
          <form className="grid gap-4 md:gap-10">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1">
                {t("product.command")}
              </Button>
              <Button 
                size="lg" 
                variant={isFavorite ? "default" : "outline"} 
                className={`flex items-center gap-2 ${isFavorite ? 'bg-red-600 hover:bg-red-700' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsFavorite(!isFavorite);
                  addToFavorite(product.id)         

                }}
                type="button"
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-white' : ''}`} />
                {isFavorite ? <>{t("product.added_to_fav")}</> : t("product.add_to_fav")}
              </Button>
            </div>
          </form>
          
          {/* Vendor Contact Section */}
          {product?.user && (
            <div className="grid gap-4">
              <VendorContact vendor={product.user} productId={product.id} />
            </div>
          )}
          
          {/* <div className="grid gap-4">
            <h2 className="font-bold text-lg">Customer Reviews</h2>
         <ReviewCustomer/>
         <ReviewCustomer/>

          
          </div> */}
          <div className="grid gap-4">
            <h2 className="font-bold text-lg">{t("product.related")}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product?.relatedProducts?.length > 0 ? (
                product.relatedProducts.map((relatedProduct) => (
                  
                  <RelatedProduct key={relatedProduct.id} product={relatedProduct} />
                ))
              ) : (
                <p className="text-muted-foreground">{t("product.no_related_products")}</p>
              )}
             </div>
          </div>
        </div>
      </div>
    )
  );
        
  
};
export default SingleProduct;
