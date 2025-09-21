import { Product } from "@/interfaces/admin"
import {  columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react";
import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";

 
export default function DemoPage() {

  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    http.get(apiRoutes.favoris).then((res) => {
      setLoading(false);
      setData(res.data);
    }
    );
  }, []);

  return (
    <>
       <h1 className="text-3xl font-bold m-2">Favorites</h1>
       <DataTable columns={columns} data={data} loading={loading}   />
    </>
    
  )
}
