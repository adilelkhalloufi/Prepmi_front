import { Meal } from "@/interfaces/admin"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react";
import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { MealTypesEnum } from "@/enum/MealTypesEnum";

// export const MealTypesEnum = [
//   { id: 1, name: "Menu" },
//   { id: 2, name: "Breakfast" },
//   { id: 3, name: "Drink" },
//   { id: 4, name: "Dessert" },
// ];

export default function index() {
  const navigate = useNavigate();
  const [data, setData] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [types] = useState([
    { id: MealTypesEnum.Menu, name: "Menu" },
    { id: MealTypesEnum.Breakfast, name: "Breakfast" },
    { id: MealTypesEnum.Drink, name: "Drink" },
    { id: MealTypesEnum.Dessert, name: "Dessert" },
  ]);

  useEffect(() => {
    // Fetch meals
    http.get(apiRoutes.meals_dashboard).then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
      setLoading(false);
    });

    // Fetch categories
    http.get(apiRoutes.categories).then((res) => {
      setCategories(res.data.data || []);
    });
  }, []);

  return (
    <>
      <div className="flex justify-between items-center w-full mb-4">
        <h1 className="text-3xl font-bold m-2">Repas</h1>
        <Button
          onClick={() => {
            navigate(webRoutes.dashboard_meals_add);
          }}
        >
          Nouveau repas
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        categories={categories}
        types={types}
      />
    </>

  )
}
