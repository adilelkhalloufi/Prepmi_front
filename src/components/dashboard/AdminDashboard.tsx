import { useQuery } from '@tanstack/react-query'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    IconZoomMoney,
    IconClipboardList,
    IconUsersGroup,
    IconChefHat
} from '@tabler/icons-react'
import http from '@/utils/http'
import { apiRoutes } from '@/routes/api'

interface DashboardData {
    dailyRevenue: number
    monthlyRevenue: number
    todayOrders: number
    activeClients: number
    totalUsers: number
    totalMeals: number
    pendingOrders: number
    totalOrders: number
}

export default function AdminDashboard() {
    // Fetch all dashboard data from single API
    const { data: dashboardData, isLoading } = useQuery({
        queryKey: ['admin-dashboard'],
        queryFn: async () => {
            const response = await http.get(apiRoutes.dashboard)
            return response.data as DashboardData
        }
    })

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>
    }

    const {
        dailyRevenue = 0,
        monthlyRevenue = 0,
        todayOrders = 0,
        activeClients = 0,
        totalUsers = 0,
        totalMeals = 0,
        totalOrders = 0
    } = dashboardData || {}

    return (
        <div className='space-y-6'>
            {/* Stats Cards */}
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Chiffre d'affaires journalier
                        </CardTitle>
                        <IconZoomMoney />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>{dailyRevenue} DH</div>
                        <p className='text-xs text-muted-foreground'>
                            Revenus d'aujourd'hui
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Commandes aujourd'hui
                        </CardTitle>
                        <IconClipboardList />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>{todayOrders}</div>
                        <p className='text-xs text-muted-foreground'>
                            Commandes reçues
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Clients actifs
                        </CardTitle>
                        <IconUsersGroup />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>{activeClients}</div>
                        <p className='text-xs text-muted-foreground'>
                            Utilisateurs actifs
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Chiffre d'affaires mensuel
                        </CardTitle>
                        <IconZoomMoney />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>{monthlyRevenue} DH</div>
                        <p className='text-xs text-muted-foreground'>
                            Revenus du mois
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Stats */}
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Total Utilisateurs
                        </CardTitle>
                        <IconUsersGroup />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>{totalUsers}</div>
                        <p className='text-xs text-muted-foreground'>
                            Utilisateurs inscrits
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Total Commandes
                        </CardTitle>
                        <IconClipboardList />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>{totalOrders}</div>
                        <p className='text-xs text-muted-foreground'>
                            Toutes les commandes
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Total Repas
                        </CardTitle>
                        <IconChefHat />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>{totalMeals}</div>
                        <p className='text-xs text-muted-foreground'>
                            Repas disponibles
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity or Charts can be added here */}
        </div>
    )
}
