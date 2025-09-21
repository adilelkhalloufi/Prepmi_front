import { Product } from "@/interfaces/admin"
import {  columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react";
import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { Button } from "@/components/ui/button";
import Form from "./form";

 
export default function index() {

  const [data, setData] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    http.get(apiRoutes.product).then((res) => {
      setData(res.data);
      setLoading(false);
    }
    );
  }, [open]);

  return (
    <>
       <Form open={open} onClose={()=>{
        setOpen(!open);
       }} />
       <div className="flex justify-between items-center w-full mb-4">
        <h1 className="text-3xl font-bold m-2">Produit</h1>
        <Button
            onClick={()=>{
              setOpen(!open);
            }}
            >
              Nouveau
            </Button>
       </div>
      
    
       <DataTable columns={columns} data={data} loading={loading} />
    </>
    
  )
}
