import { Product } from "@/interfaces/admin"
import {  columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react";
import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";

 
export default function DemoPage() {

  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    http.get(apiRoutes.GetOrderForSeller).then((res) => {
      setData(res.data);
      setLoading(false);
    }
    );
  }, []);

  return (
    <>
       <h1 className="text-3xl font-bold m-2">Commandes des clients</h1>
       <DataTable columns={columns} data={data} loading={loading} />
    </>
    
  )
}
