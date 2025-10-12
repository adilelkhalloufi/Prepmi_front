import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import { setPageTitle } from '@/utils'

import ClientDashboard from '@/components/dashboard/ClientDashboard'
import AdminDashboard from '@/components/dashboard/AdminDashboard'
import DeliveryDashboard from '@/components/dashboard/DeliveryDashboard'
import CuisineDashboard from '@/components/dashboard/CuisineDashboard'

// Types pour les rôles utilisateur
type UserRole = 'client' | 'admin' | 'delivery' | 'cuisine'

export default function Dashboard() {
    // Simuler le rôle utilisateur - à remplacer par votre système d'auth
    const [userRole, setUserRole] = useState<UserRole>('client')

    useEffect(() => {
        setPageTitle("Tableau de Bord")
    }, [])

    const getDashboardTitle = () => {
        switch (userRole) {
            case 'client': return 'Tableau de Bord - Client'
            case 'admin': return 'Tableau de Bord - Administrateur'
            case 'delivery': return 'Tableau de Bord - Livreur'
            case 'cuisine': return 'Tableau de Bord - Cuisine'
            default: return 'Tableau de Bord'
        }
    }


    return (
        <>
            <div className='mb-2 flex items-center justify-between space-y-2'>
                <h1 className='text-2xl font-bold tracking-tight'>{getDashboardTitle()}</h1>
                <div className='flex items-center space-x-2'>
                    {/* Sélecteur de rôle pour demo - à supprimer en production */}
                    <select
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value as UserRole)}
                        className='px-3 py-1 border rounded'
                    >
                        <option value="client">Client</option>
                        <option value="admin">Admin</option>
                        <option value="delivery">Livreur</option>
                        <option value="cuisine">Cuisine</option>
                    </select>
                </div>
            </div>

            <Tabs
                orientation='vertical'
                defaultValue='overview'
                className='space-y-4'
            >
                <div className='w-full overflow-x-auto pb-2'>
                    {/* <TabsList>
                        <TabsTrigger value='overview'>Aperçu</TabsTrigger>
                    </TabsList> */}
                </div>
                <TabsContent value='overview' className='space-y-4'>
                    {userRole === 'client' && <ClientDashboard />}
                    {userRole === 'admin' && <AdminDashboard />}
                    {userRole === 'delivery' && <DeliveryDashboard />}
                    {userRole === 'cuisine' && <CuisineDashboard />}


                    <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
                        <Card className='col-span-1 lg:col-span-4'>
                            <CardHeader>
                                <CardTitle>
                                    {userRole === 'client' && 'Évolution nutritionnelle'}
                                    {userRole === 'admin' && 'Évolution du chiffre d\'affaires'}
                                    {userRole === 'delivery' && 'Itinéraires du jour'}
                                    {userRole === 'cuisine' && 'Planning de production'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='pl-2'>
                                {/* Graphiques spécifiques selon le rôle */}
                            </CardContent>
                        </Card>
                        <Card className='col-span-1 lg:col-span-3'>
                            <CardHeader>
                                <CardTitle>
                                    {userRole === 'client' && 'Commandes récentes'}
                                    {userRole === 'admin' && 'Ventes récentes'}
                                    {userRole === 'delivery' && 'Prochaines livraisons'}
                                    {userRole === 'cuisine' && 'Commandes prioritaires'}
                                </CardTitle>
                                <CardDescription>
                                    {userRole === 'client' && 'Vos dernières commandes'}
                                    {userRole === 'admin' && 'Vous avez fait 265 ventes ce mois'}
                                    {userRole === 'delivery' && 'Livraisons programmées'}
                                    {userRole === 'cuisine' && 'À préparer en priorité'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Contenu spécifique selon le rôle */}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </>
    )
}

