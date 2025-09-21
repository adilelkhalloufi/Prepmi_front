import { Order } from "@/interfaces/admin"
import {  columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react";
import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";

 
export default function DemoPage() {

  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    http.get(apiRoutes.orders).then((res) => {
      setData(res.data);
      console.log(res.data);
      setLoading(false);
    }
    );
  }, []);

  return (
    <>
       <div className="flex justify-between items-center m-2 mb-4">
         <div>
           <h1 className="text-3xl font-bold">Gestion des Commandes</h1>
           <p className="text-gray-600 mt-1">Voir et gérer les commandes avec les informations de contact des clients</p>
         </div>
       </div>
       <DataTable columns={columns} data={data} loading={loading} />
    </>
    
  )
}
