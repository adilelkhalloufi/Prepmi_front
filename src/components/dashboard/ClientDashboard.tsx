import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Dumbbell, Gift, TrendingUp, ShoppingBag } from 'lucide-react';
import http from '@/utils/http';
import { apiRoutes } from '@/routes/api';
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface NutritionSummary {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

interface MealsHistoryItem {
    meal_name: string;
    quantity: number;
    price: string;
    order_date: string;
}

interface ClientDashboardData {
    nutrition_summary: NutritionSummary;
    orders_this_month: number;
    orders_difference: number;
    meals_history: MealsHistoryItem[];
    total_points_earned: number;
}

export default function ClientDashboard() {
    const [data, setData] = useState<ClientDashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state: RootState) => state.admin?.user);

    useEffect(() => {
        http.get(apiRoutes.dashboard).then((res) => {
            setData(res.data);
        }).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-96">Chargement...</div>;
    }

    if (!data) {
        return <div className="flex justify-center items-center h-96">Aucune donnée disponible.</div>;
    }

    const totalCalories = data.nutrition_summary?.calories ?? 0;
    const protein = data.nutrition_summary?.protein ?? 0;
    const carbs = data.nutrition_summary?.carbs ?? 0;
    const fat = data.nutrition_summary?.fat ?? 0;

    // Calculate percentages for the donut chart
    const proteinCalories = protein * 4;
    const carbsCalories = carbs * 4;
    const fatCalories = fat * 9;
    const totalMacroCalories = proteinCalories + carbsCalories + fatCalories;

    const proteinPercentage = totalMacroCalories > 0 ? (proteinCalories / totalMacroCalories) * 100 : 0;
    const carbsPercentage = totalMacroCalories > 0 ? (carbsCalories / totalMacroCalories) * 100 : 0;

    // SVG donut chart values
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const carbsOffset = (proteinPercentage / 100) * circumference;

    return (
        <div className="space-y-8">
            {/* Header with greeting and gym button */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    Hi {user?.first_name + " " + user?.last_name}, this week at a glance
                </h1>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    <Dumbbell className="mr-2 h-4 w-4" />
                    Garage Gym
                </Button>
            </div>

            {/* Main content grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Left column - Nutrition Summary */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-8">
                                {/* Donut Chart */}
                                <div className="relative">
                                    <svg width="160" height="160" className="transform -rotate-90">
                                        {/* Background circle */}
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r={radius}
                                            fill="none"
                                            stroke="#f3f4f6"
                                            strokeWidth="20"
                                        />
                                        {/* Protein (Blue) */}
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r={radius}
                                            fill="none"
                                            stroke="#60a5fa"
                                            strokeWidth="20"
                                            strokeDasharray={`${(proteinPercentage / 100) * circumference} ${circumference}`}
                                            strokeDashoffset={0}
                                            strokeLinecap="round"
                                        />
                                        {/* Carbs (Yellow) */}
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r={radius}
                                            fill="none"
                                            stroke="#fbbf24"
                                            strokeWidth="20"
                                            strokeDasharray={`${(carbsPercentage / 100) * circumference} ${circumference}`}
                                            strokeDashoffset={-carbsOffset}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    {/* Center text */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <div className="text-3xl font-bold">{totalCalories.toLocaleString()}</div>
                                        <div className="text-sm text-muted-foreground">kcal</div>
                                    </div>
                                </div>

                                {/* Total calories info */}
                                <div className="flex-1 space-y-3">
                                    <div>
                                        <h3 className="font-semibold mb-2">Total calories</h3>
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                                            <span>{proteinCalories.toFixed(0)} g</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm mt-1">
                                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                            <span>{carbsCalories.toFixed(0)} g</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Macro bars */}
                            <div className="mt-6 space-y-3">
                                {/* Protein bar */}
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium w-20">Protein</span>
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-400 rounded-full"
                                            style={{ width: `${Math.min((protein / 200) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-semibold w-16 text-right">{protein} g</span>
                                </div>

                                {/* Carbs bar */}
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium w-20">Carbs</span>
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-yellow-400 rounded-full"
                                            style={{ width: `${Math.min((carbs / 300) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-semibold w-16 text-right">{carbs} g</span>
                                </div>

                                {/* Fats bar */}
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium w-20">Fats</span>
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-400 rounded-full"
                                            style={{ width: `${Math.min((fat / 100) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-semibold w-16 text-right">{fat} g</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Progress Tracker */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Progress tracker</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="w-24 h-32 bg-emerald-600 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <Check className="w-8 h-8 text-yellow-400 mx-auto mb-1" />
                                        <div className="w-12 h-1 bg-yellow-400 rounded mx-auto"></div>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex gap-2 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center ${i < Math.min(data.orders_this_month, 5)
                                                    ? 'border-purple-400 bg-purple-50'
                                                    : 'border-gray-300 bg-white'
                                                    }`}
                                            >
                                                {i < Math.min(data.orders_this_month, 5) && (
                                                    <Check className="w-6 h-6 text-purple-400" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="font-semibold">
                                            {data.orders_this_month} stamps collected
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            10 stamps to unlock a free meal
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Motivational Corner */}
                    <Card className="bg-yellow-100 border-yellow-200">
                        <CardContent className="pt-6">
                            <h3 className="font-semibold text-lg mb-2">Fitness fip</h3>
                            <p className="text-sm">
                                If your goal is weight loss, focus on creating a calorie deficit.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right column - Meal History & Stats */}
                <div className="space-y-6">
                    {/* Quick Stats Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Orders This Month */}
                        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                            <CardContent className="pt-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-blue-700 mb-1">Orders</p>
                                        <p className="text-3xl font-bold text-blue-900">{data.orders_this_month}</p>
                                        {data.orders_difference !== 0 && (
                                            <div className="flex items-center gap-1 mt-2">
                                                <TrendingUp className={`w-4 h-4 ${data.orders_difference > 0 ? 'text-green-600' : 'text-red-600'}`} />
                                                <span className={`text-xs font-medium ${data.orders_difference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {data.orders_difference > 0 ? '+' : ''}{data.orders_difference} this month
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                        <ShoppingBag className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Loyalty Points */}
                        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                            <CardContent className="pt-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-purple-700 mb-1">Points</p>
                                        <p className="text-3xl font-bold text-purple-900">{data.total_points_earned}</p>
                                        <p className="text-xs text-purple-600 mt-2">Loyalty rewards</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                                        <Gift className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Meal History */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Meal history</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {(data.meals_history ?? []).length === 0 ? (
                                    <div className="text-muted-foreground py-8 text-center">
                                        Aucun repas trouvé.
                                    </div>
                                ) : (
                                    (data.meals_history ?? []).slice(0, 4).map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center">
                                                    <span className="text-xl">🍽️</span>
                                                </div>
                                                <div>
                                                    <span className="font-medium block">{item.meal_name}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(item.order_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-300"
                                            >
                                                Reorder
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
