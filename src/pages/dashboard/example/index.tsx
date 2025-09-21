import { Product } from "@/interfaces/admin"
import {  columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react";

 
export default function DemoPage() {

  const [data, setData] = useState<Product[]>( [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 10,
      status: { name: "Status 1", color: "default" },
      description: "Description 1",
      categorie: { id: 1, name: "Category 1" },
      unite: { id: 1, name: "Unite 1" },
      qte: 1,
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      quantity: 20,
      status: { name: "Status 2", color: "secondary" },
      description: "Description 2",
      categorie: { id: 2, name: "Category 2" },
      unite: { id: 2, name: "Unite 2" },
      qte: 2,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      quantity: 30,
      status: { name: "Status 3", color: "destructive" },
      description: "Description 3",
      categorie: { id: 3, name: "Category 3" },
      unite: { id: 3, name: "Unite 3" },
      qte: 3,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      quantity: 30,
      status: { name: "Status 3", color: "destructive" },
      description: "Description 3",
      categorie: { id: 3, name: "Category 3" },
      unite: { id: 3, name: "Unite 3" },
      qte: 3,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      quantity: 30,
      status: { name: "Status 3", color: "destructive" },
      description: "Description 3",
      categorie: { id: 3, name: "Category 3" },
      unite: { id: 3, name: "Unite 3" },
      qte: 3,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      quantity: 30,
      status: { name: "Status 3", color: "destructive" },
      description: "Description 3",
      categorie: { id: 3, name: "Category 3" },
      unite: { id: 3, name: "Unite 3" },
      qte: 3,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      quantity: 30,
      status: { name: "Status 3", color: "destructive" },
      description: "Description 3",
      categorie: { id: 3, name: "Category 3" },
      unite: { id: 3, name: "Unite 3" },
      qte: 3,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      quantity: 30,
      status: { name: "Status 3", color: "destructive" },
      description: "Description 3",
      categorie: { id: 3, name: "Category 3" },
      unite: { id: 3, name: "Unite 3" },
      qte: 3,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      quantity: 30,
      status: { name: "Status 3", color: "destructive" },
      description: "Description 3",
      categorie: { id: 3, name: "Category 3" },
      unite: { id: 3, name: "Unite 3" },
      qte: 3,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      quantity: 30,
      status: { name: "Status 3", color: "destructive" },
      description: "Description 3",
      categorie: { id: 3, name: "Category 3" },
      unite: { id: 3, name: "Unite 3" },
      qte: 3,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      quantity: 30,
      status: { name: "Status 3", color: "destructive" },
      description: "Description 3",
      categorie: { id: 3, name: "Category 3" },
      unite: { id: 3, name: "Unite 3" },
      qte: 3,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      quantity: 30,
      status: { name: "Status 3", color: "destructive" },
      description: "Description 3",
      categorie: { id: 3, name: "Category 3" },
      unite: { id: 3, name: "Unite 3" },
      qte: 3,
    },


  ]);

  return (
       <DataTable columns={columns} data={data} />
    
  )
}
