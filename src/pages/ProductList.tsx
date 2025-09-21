import { FilterSidebar } from "@/components/products/FilterSidebar";
import { ProductCard } from "@/components/products/ProductCard";
import ListProductSkeleton from "@/components/skeleton/ListProductSkeleton";
import { Categorie, Product, Unite } from "@/interfaces/admin";
import { apiRoutes } from "@/routes/api";
import { handleErrorResponse } from "@/utils";
import http, { defaultHttp } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";



const Index = () => {

  const { pathname } = useLocation();
  const type = pathname.includes('stagnant') ? 1 : 2;
  const { data: categories = [] } = useQuery<Categorie[]>({
    queryKey: ['categories'],
    queryFn: () =>
      defaultHttp
        .get<Categorie[]>(apiRoutes.categories, { params: { type: type } })
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

  const { isLoading, data: products = [] } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () =>
      defaultHttp
        .get<Product[]>(apiRoutes.GetProducts)
        .then((res) => {

          return res.data

        })
        .catch((e) => {
          handleErrorResponse(e)
          return []
        }),
  })

  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedUnites, setSelectedUnites] = useState<number[]>([]);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product?.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.categorie?.id);
      const matchesUnites =
        selectedUnites.length === 0 || selectedUnites.includes(product.unite?.id);
      return matchesSearch && matchesCategory && matchesUnites;
    });


  const handleCategoryChange = (categoryId: any) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleUniteChange = (uniteId: any) => {
    setSelectedUnites((prev) =>
      prev.includes(uniteId)
        ? prev.filter((id) => id !== uniteId)
        : [...prev, uniteId]
    );
  };


  return (
    <>
      {isLoading ? <ListProductSkeleton /> :
        <div className="min-h-screen p-6">
          <h1 className="text-3xl font-bold mb-8">{t('our_product')}</h1>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <p className="text-center text-muted-foreground mt-8">
                  {t("no_product_found")}
                </p>
              )}
            </div>
            <FilterSidebar
              categories={categories}
              unites={unites}
              selectedCategories={selectedCategories}
              selectedUnites={selectedUnites}
              searchTerm={searchTerm}
              onCategoryChange={handleCategoryChange}
              onUniteChange={handleUniteChange}
              onSearchChange={setSearchTerm}
            />
          </div>
        </div>}
    </>
  );
};

export default Index;

