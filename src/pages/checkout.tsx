import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
 import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React from "react";
 import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import EmptyStateComponent from "@/components/dashboard/custom/emptyState";
import { IconBasket, IconTrash, IconCoins, IconRefresh } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { Badge } from "@/components/ui/badge";
import i18next from "i18next";
import { clearCart, removeProduct } from "@/store/slices/cartSlice";
import { spendCoins, updateUserCoins } from "@/store/slices/adminSlice";
import { Product } from "@/interfaces/admin";
import http  from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { handleErrorResponse } from "@/utils";
import { toast } from "sonner";
 
export default function Component() {
  const products : Product[] = useSelector((state: RootState) => state.cart.products);
  const currentUser = useSelector((state: RootState) => state.admin.user);
 
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [coinsLoading, setCoinsLoading] = React.useState(false);
  const [FromValues, setFromValues] = React.useState({
    note: "",
    payment: "",
 
  });

  // Fetch user coins on component mount
  React.useEffect(() => {
    const fetchUserCoins = async () => {
      if (!currentUser?.id) return;
      
      setCoinsLoading(true);
      try {
        const response = await http.get(apiRoutes.GetCoins);
        if (response.data && response.data.coins !== undefined) {
          dispatch(updateUserCoins(response.data.coins));
        }
      } catch (error) {
        console.error("Failed to fetch user coins:", error);
        handleErrorResponse(error);
      } finally {
        setCoinsLoading(false);
      }
    };

    fetchUserCoins();
  }, [currentUser?.id, dispatch]);

  // Function to manually refresh coins
  const refreshCoins = async () => {
    if (!currentUser?.id) return;
    
    setCoinsLoading(true);
    try {
      const response = await http.get(apiRoutes.GetCoins);
      if (response.data && response.data.coins !== undefined) {
        dispatch(updateUserCoins(response.data.coins));
        toast.success(t('checkout.coins.refreshed'));
      }
    } catch (error) {
      console.error("Failed to refresh user coins:", error);
      handleErrorResponse(error);
    } finally {
      setCoinsLoading(false);
    }
  };

  // Calculate total coins cost (no quantity multiplication for coins)
  const totalCoinsRequired = products.length;

  const remainingCoins = (currentUser?.coins || 0) - totalCoinsRequired;
  const hasEnoughCoins = remainingCoins >= 0;
  const CreateOrder = () => {
    if (!hasEnoughCoins) {
      toast.error(t("checkout.coins.insufficient"));
      return;
    }
    
    setLoading(true);
     http.post(apiRoutes.orders, { 
          products: products, 
          note: FromValues.note, 
          payment: FromValues.payment,
          coins : totalCoinsRequired
        })
          .then((res) => {
            setLoading(false);
            dispatch(clearCart());
            dispatch(spendCoins(totalCoinsRequired));
            toast.success(t("checkout.success"));
            navigate(webRoutes.home, { replace: true });
          }).catch((e) => {
            setLoading(false);
            handleErrorResponse(e);
          });

      
  }

  return (
    <React.Fragment>
      <main className="container mx-auto my-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <h1 className="text-2xl font-bold">{t("checkout.title")}</h1>
          <div className="mt-4 space-y-4">
            {/* if cart vide show message the basket is vide */}
            {products.length === 0 && (
              <EmptyStateComponent
                title={t("checkout.empty")} 
                description={t("checkout.empty.button")}
                icon={<IconBasket className="w-12 h-12" />}
                buttonTitle={t("checkout.empty.button")}  
                onclick={() => (
                  navigate(webRoutes.stagnant), { replace: true }
                )} // if click go to products page
              />
            )}
            {/* if cart not vide show product in cart */}
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-950"
              >
                <img
                  src={product.image}
                  width={80}
                  height={80}
                  alt="Product Image"
                  className="rounded-md"
                  style={{ aspectRatio: "80/80", objectFit: "cover" }}
                  onError={(e) => {
                      e.currentTarget.src = '/no-image.jpg';
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {product.description}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 flex flex-row items-center gap-2">
                    <div>
                      <span className="mr-2 font-medium">
                        {t("product.categorie")} :
                      </span>
                      <Badge>{product.categorie?.name[i18next.language]}</Badge>
                    </div>
                    <div>
                      <span className="mr-2 font-medium">
                        {t("product.unite")} :
                      </span>
                      <Badge>{product.unite?.name[i18next.language]}</Badge>
                    </div>

                    <div>
                      <span className="mr-2 font-medium">
                        {t("product.qte")} :
                      </span>
                      <Badge>{product.quantity}</Badge>
                    </div>

                    {/* {product.coins_cost && (
                      <div>
                        <span className="mr-2 font-medium">
                          {t("checkout.coins.cost")} :
                        </span>
                        <Badge variant="secondary" className="text-yellow-600">
                          <IconCoins className="w-3 h-3 mr-1" />
                          {product.coins_cost}
                        </Badge>
                      </div>
                    )} */}
                    
                  </p>
                </div>

 
                <div className="text-right font-medium">
                  {product.price} {t("currency")}
                </div>
                 <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                     dispatch(removeProduct(product));
                  }}
                >
                    <IconTrash color="red"  />
                   
                </Button>
                
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('checkout.summary')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span>{t('checkout.total')}</span>
                {/* calculate total montant product */}
                <span>{products.reduce((acc, product) => acc + (product.price * product.quantity), 0)} {t('currency')}</span>
               </div>
              <div className="flex items-center justify-between">
                <span>{t('checkout.discount')}</span>
                <span>0</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <span>{t('checkout.total')}</span>
                <span>{products.reduce((acc, product) => acc + (product.price * product.quantity), 0)} {t('currency')}</span>
                  </div>
            </CardContent>
          </Card>
          
          {/* Coins Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconCoins className="w-5 h-5 text-yellow-500" />
                  {t('checkout.coins')}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refreshCoins}
                  disabled={coinsLoading}
                  className="h-8 w-8 p-0"
                >
                  <IconRefresh className={`w-4 h-4 ${coinsLoading ? 'animate-spin' : ''}`} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span>{t('checkout.coins.current')}</span>
                <span className="font-medium text-yellow-600">
                  {coinsLoading ? (
                    <span className="text-gray-400">Loading...</span>
                  ) : (
                    `${currentUser?.coins || 0} ${t('checkout.coins.unit')}`
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t('checkout.coins.cost')}</span>
                <span className="font-medium">
                  {totalCoinsRequired} {t('checkout.coins.unit')}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <span>{t('checkout.coins.remaining')}</span>
                <span className={remainingCoins < 0 ? "text-red-600" : "text-green-600"}>
                  {remainingCoins} {t('checkout.coins.unit')}
                </span>
              </div>
              {!hasEnoughCoins && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">
                    {t('checkout.coins.insufficient')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('checkout.payement')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="address">{t('checkout.note')}</Label>
                <Textarea name="note" placeholder={t('checkout.note')} 
                onChange={(e)=>{
                  setFromValues({...FromValues, note: e.target.value})
                }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment">{t('checkout.type.payement')}</Label>
                <Select 
                   onValueChange={(e)=>{
                    setFromValues({...FromValues, payment: e})
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('checkout.type.payement')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Espèces</SelectItem>
                    <SelectItem value="2">Carte de crédit</SelectItem>
                    <SelectItem value="3">PayPal</SelectItem>
                    <SelectItem value="4">Autre</SelectItem>
                   </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                loading={loading}
                disabled={!hasEnoughCoins}
                onClick={() => {CreateOrder()}}
              >
                {t('checkout.command')}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </React.Fragment>
  );
}
