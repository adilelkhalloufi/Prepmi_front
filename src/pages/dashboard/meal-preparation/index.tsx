import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react";
import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarView } from "./calendar-view"
import { MealPreparation } from "@/interfaces/admin"
import { mockMealPreparations } from "./mock-data";

export default function MealPreparationIndex() {
    const [data, setData] = useState<MealPreparation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [view, setView] = useState<"table" | "calendar">("table");

    const fetchMealPreparations = () => {
        // Replace with your actual API endpoint for meal preparations
        http.get(apiRoutes.mealPreparations).then((res) => {
            console.log(res.data.data);
            setData(res.data.data);
            setLoading(false);
        }).catch(() => {
            // setData(mockMealPreparations);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchMealPreparations();
    }, []);

    const handleStatusUpdate = (id: number, newStatus: string) => {
        // Optimistic update
        setData(prevData => 
            prevData.map(item => 
                item.id === id ? { ...item, preparation_status: newStatus as MealPreparation['preparation_status'] } : item
            )
        );
        
        // API call using PATCH
        http.patch(`${apiRoutes.mealPreparations}/${id}/status`, { 
            preparation_status: newStatus 
        }).then(() => {
            fetchMealPreparations();
        }).catch((error) => {
            console.error("Error updating status:", error);
            // Revert on error
            fetchMealPreparations();
        });
    };

    return (
        <div className="w-full h-full">
            <div className="flex justify-between items-center w-full mb-4">
                <h1 className="text-3xl font-bold m-2">Préparation des Repas</h1>
            </div>

            <Tabs value={view} onValueChange={(v) => setView(v as "table" | "calendar")} className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
                    <TabsTrigger value="table">Vue Liste</TabsTrigger>
                    <TabsTrigger value="calendar">Vue Calendrier</TabsTrigger>
                </TabsList>
                
                <TabsContent value="table" className="w-full">
                    <DataTable 
                        columns={columns(handleStatusUpdate)} 
                        data={data} 
                        loading={loading} 
                    />
                </TabsContent>
                
                <TabsContent value="calendar" className="w-full">
                    <CalendarView 
                        data={data} 
                        loading={loading}
                        onStatusUpdate={handleStatusUpdate}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}
