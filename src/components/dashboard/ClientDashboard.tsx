import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconClipboardList, IconMeat, IconBread, IconApple } from '@tabler/icons-react';
import http from '@/utils/http';
import { apiRoutes } from '@/routes/api';

interface NutritionSummary {
    protein: number;
    carbs: number;
    fat: number;
}

interface MealsHistoryItem {
    date: string;
    meal: string;
    // add more fields as needed
}

interface ClientDashboardData {
    nutrition_summary: NutritionSummary;
    orders_this_month: number;
    orders_difference: number;
    meals_history: MealsHistoryItem[];
}

export default function ClientDashboard() {
    const [data, setData] = useState<ClientDashboardData | null>(null);
    const [loading, setLoading] = useState(true);

        useEffect(() => {
            http.get(apiRoutes.dashboard).then((res) => {
                setData(res.data.data);
            }).finally(() => setLoading(false));
        }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!data) {
        return <div>Aucune donnée disponible.</div>;
    }

        return (
            <div>
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Commandes ce mois</CardTitle>
                            <IconClipboardList />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>{data.orders_this_month}</div>
                            <p className='text-xs text-muted-foreground'>
                                {data.orders_difference >= 0 ? `+${data.orders_difference}` : data.orders_difference} par rapport au mois dernier
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Protéines consommées</CardTitle>
                            <IconMeat />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>{data.nutrition_summary.protein}g</div>
                            <p className='text-xs text-muted-foreground'>Cette semaine</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Glucides consommés</CardTitle>
                            <IconBread />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>{data.nutrition_summary.carbs}g</div>
                            <p className='text-xs text-muted-foreground'>Cette semaine</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Lipides consommés</CardTitle>
                            <IconApple />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>{data.nutrition_summary.fat}g</div>
                            <p className='text-xs text-muted-foreground'>Cette semaine</p>
                        </CardContent>
                    </Card>
                </div>
                <div className='mt-8'>
                    <h2 className='text-xl font-bold mb-4'>Historique des repas</h2>
                    {data.meals_history.length === 0 ? (
                        <div className='text-muted-foreground'>Aucun repas trouvé.</div>
                    ) : (
                        <ul className='space-y-2'>
                            {data.meals_history.map((item, idx) => (
                                <li key={idx} className='border rounded p-2 flex justify-between items-center'>
                                    <span>{item.date}</span>
                                    <span>{item.meal}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        );
}
