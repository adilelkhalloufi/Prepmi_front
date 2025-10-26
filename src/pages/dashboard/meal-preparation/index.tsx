import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react";
import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarView } from "./calendar-view"
import { MealPreparation } from "@/interfaces/admin"
import { handleErrorResponse } from "@/utils";
import { toast } from "sonner";

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

    const groupByOrder = (items: MealPreparation[]) => {
        const grouped: Record<string, any> = {};
        items.forEach(item => {
            const orderNum = item.order_num;
            if (!grouped[orderNum]) {
                grouped[orderNum] = {
                    order_num: orderNum,
                    meals: [],
                    order_status: item.order_status,
                    order_id: item.order_id, // Add order_id here
                };
            }
            grouped[orderNum].meals.push({
                name: item.meal?.name,
                quantity: item.quantity,
                order_meal_id: item.order_meal_id,
                // Add other meal details if needed
            });
            // Optionally, update order_status if you want to show a status if any meal differs
        });
        return Object.values(grouped);
    };

    const allowedStatuses = [
        "Pending",
        "Confirmed",
        "Preparing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Refunded"
    ];

    const handleStatusUpdate = async (order_id: number, newStatus: string) => {
        if (!allowedStatuses.includes(newStatus)) {
            toast.error("Statut sélectionné invalide.");
            return;
        }
        console.log("Updating order", order_id, "to status", newStatus);
        http.put(apiRoutes.updateMealPreparationStatus(order_id), { statue: newStatus })
            .then(() => {
                fetchMealPreparations();
                toast.success("Statut mis à jour avec succès");
            })
            .catch((error) => {
                handleErrorResponse(error);
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
                        data={groupByOrder(data)}
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
