import { MealPreparation } from "@/interfaces/admin"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { format, isSameDay, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface CalendarViewProps {
    data: MealPreparation[]
    loading: boolean
    onStatusUpdate: (id: number, status: string) => void
}

const statusConfig = {
    pending: {
        label: "En attente",
        variant: "bg-yellow-500 hover:bg-yellow-600",
    },
    preparing: {
        label: "En préparation",
        variant: "bg-blue-500 hover:bg-blue-600",
    },
    ready_for_delivery: {
        label: "Prêt pour livraison",
        variant: "bg-green-500 hover:bg-green-600",
    },
    delivered: {
        label: "Livré",
        variant: "bg-gray-500 hover:bg-gray-600",
    },
    cancelled: {
        label: "Annulé",
        variant: "bg-red-500 hover:bg-red-600",
    },
};

export function CalendarView({ data, loading, onStatusUpdate }: CalendarViewProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

    // Get meals for selected date
    const mealsForSelectedDate = data.filter(meal => 
        selectedDate && isSameDay(parseISO(meal.preparation_date), selectedDate)
    )

    // Get dates that have meals
    const datesWithMeals = data.map(meal => parseISO(meal.preparation_date))

    // Group meals by status for summary
    const mealsByStatus = mealsForSelectedDate.reduce((acc, meal) => {
        const status = meal.preparation_status;
        if (!acc[status]) {
            acc[status] = [];
        }
        acc[status].push(meal);
        return acc;
    }, {} as Record<string, MealPreparation[]>);

    // Calculate total quantities
    const totalQuantity = mealsForSelectedDate.reduce((sum, meal) => sum + meal.quantity, 0);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar Section */}
            <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle>Calendrier de préparation</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        locale={fr}
                        className="rounded-md border"
                        modifiers={{
                            hasMeals: datesWithMeals
                        }}
                        modifiersStyles={{
                            hasMeals: {
                                backgroundColor: 'hsl(var(--primary))',
                                color: 'white',
                                fontWeight: 'bold'
                            }
                        }}
                    />
                </CardContent>
            </Card>

            {/* Meals List Section */}
            <Card className="lg:col-span-2">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>
                            {selectedDate ? format(selectedDate, "EEEE d MMMM yyyy", { locale: fr }) : "Sélectionnez une date"}
                        </CardTitle>
                        <Badge variant="outline" className="text-lg px-4 py-1">
                            {totalQuantity} repas
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    {mealsForSelectedDate.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <p className="text-lg">Aucun repas à préparer pour cette date</p>
                        </div>
                    ) : (
                        <>
                            {/* Status Summary */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                {Object.entries(statusConfig).map(([status, config]) => {
                                    const count = mealsByStatus[status]?.length || 0;
                                    const quantity = mealsByStatus[status]?.reduce((sum, m) => sum + m.quantity, 0) || 0;
                                    return (
                                        <Card key={status} className={count > 0 ? 'border-2' : ''}>
                                            <CardContent className="pt-6">
                                                <div className="text-center">
                                                    <div className={`inline-block px-3 py-1 rounded-full text-white text-xs mb-2 ${config.variant}`}>
                                                        {config.label}
                                                    </div>
                                                    <div className="text-2xl font-bold">{quantity}</div>
                                                    <div className="text-xs text-muted-foreground">{count} commande(s)</div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>

                            <Separator className="my-4" />

                            {/* Meals List */}
                            <ScrollArea className="h-[500px] pr-4">
                                <div className="space-y-4">
                                    {mealsForSelectedDate.map((mealPrep) => (
                                        <Card key={mealPrep.id} className="overflow-hidden">
                                            <CardContent className="p-4">
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    {/* Meal Image */}
                                                    {mealPrep.meal?.image_path && (
                                                        <img
                                                            src={mealPrep.meal.image_path}
                                                            alt={mealPrep.meal.name}
                                                            className="w-full md:w-24 h-24 rounded-md object-cover"
                                                        />
                                                    )}

                                                    {/* Meal Info */}
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="font-semibold text-lg">
                                                                    {mealPrep.meal?.name || "N/A"}
                                                                </h3>
                                                                <p className="text-sm text-muted-foreground">
                                                                    Client: {mealPrep.order?.user?.name || mealPrep.customer_name || "N/A"}
                                                                </p>
                                                            </div>
                                                            <Badge variant="outline" className="text-xl font-bold px-4 py-2">
                                                                x{mealPrep.quantity}
                                                            </Badge>
                                                        </div>

                                                        {mealPrep.notes && (
                                                            <p className="text-sm bg-muted p-2 rounded">
                                                                📝 {mealPrep.notes}
                                                            </p>
                                                        )}

                                                        {/* Status Selector */}
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium">Statut:</span>
                                                            <Select
                                                                value={mealPrep.preparation_status}
                                                                onValueChange={(newStatus) => onStatusUpdate(mealPrep.id, newStatus)}
                                                            >
                                                                <SelectTrigger className={`w-[160px] ${statusConfig[mealPrep.preparation_status as keyof typeof statusConfig]?.variant || ''} text-white border-none`}>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {Object.entries(statusConfig).map(([key, value]) => (
                                                                        <SelectItem key={key} value={key}>
                                                                            <div className="flex items-center gap-2">
                                                                                <div className={`w-3 h-3 rounded-full ${value.variant}`}></div>
                                                                                {value.label}
                                                                            </div>
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        {mealPrep.delivery_date && (
                                                            <p className="text-xs text-muted-foreground">
                                                                🚚 Livraison prévue: {format(parseISO(mealPrep.delivery_date), "d MMMM yyyy", { locale: fr })}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </ScrollArea>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
