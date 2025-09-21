import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { Product } from "@/interfaces/admin";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/store/slices/cartSlice";
import { RootState } from "@/store";
import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { login } from "@/store/slices/adminSlice";
import { Button } from "../ui/button";
 
interface ProductCardProps {
  product: Product
}
export const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const addProductToCart = (product : Product) => {
    console.log("Adding product to cart:", product);
     dispatch(addProduct(product));
  }
  const admin = useSelector((state: RootState) => state.admin);
  

 
 
  const addToFavorite = (product_id:any)=> {
    let newFavoris = [];
    if(admin.favoris.includes(product_id)){
       newFavoris = admin.favoris.filter((fav) => fav !== product_id)
    }else
    {
      newFavoris = [...admin.favoris, product_id]
    }
    dispatch(login({...admin, favoris: newFavoris}))

    http.post(apiRoutes.favoris, {product_id: product_id})
    .then((res) => {  
     })



  
    
  }

  return (
    <Card className="product-card relative"
    
    >
      <CardHeader className="p-0">
        <Link to={webRoutes.SingleProduit.replace(':id', product.id)}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
              onError={(e) => {
                e.currentTarget.src = '/no-image.jpg';
              }}
            />


            <div className="absolute top-2 right-2">
              <Badge
                variant={product.status.color}

                className="text-xs">
                {product.status.name[i18next.language]}
              </Badge>
            </div>
             
          

        </Link>
            {admin && (
            <div className="absolute top-2 left-2" 
           
            >
               <Badge className="px-2 py-1 bg-primary text-white rounded-lg text-xs" 
                onClick={() => addToFavorite(product.id)}
               >
                   {admin.favoris.includes(product.id) ? <IconHeartFilled size={20}  color="red" /> : <IconHeart size={20} />}
               </Badge>
             </div>
            )}
      </CardHeader>
      <CardContent className="p-4">


        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-primary font-bold mb-2">{product.price} {t('currency')}</p>



        <div className="flex items-center gap-6">
        
          <div className="flex flex-col items-start">
            <span className="text-sm text-[#8C929E]">{t('product.unite')}</span>
            {product.unite.name[i18next.language]}

          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm text-[#8C929E]">{t('product.categorie')}</span>
            {product.categorie.name[i18next.language]}
          </div>
       
        </div>



        <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>

        {/* Create button to command  */}
        {/* if status_id = 3 disable button */}
        <Button className="bg-primary text-white py-2 px-4 mt-4 rounded-3xl w-full"
          onClick={() => addProductToCart(product)}
          disabled={product.status_id === 3}
        >
          {t('product.command')}
        </Button>

      </CardContent>
    </Card>
  );
};