import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect } from 'react'
import { setPageTitle } from '@/utils'
import { IconUsersGroup, IconZoomMoney } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'


export default function Dashboard() {
    useEffect(() => {
        setPageTitle("Dashboard")
    }, [])

    return (

        <>

            <div className='mb-2 flex items-center justify-between space-y-2'>
                <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
                <div className='flex items-center space-x-2'>
                    <Button>Download</Button>
                </div>
            </div>
            <Tabs
                orientation='vertical'
                defaultValue='overview'
                className='space-y-4'
            >
                <div className='w-full overflow-x-auto pb-2'>
                    <TabsList>
                        <TabsTrigger value='overview'>Overview</TabsTrigger>

                    </TabsList>
                </div>
                <TabsContent value='overview' className='space-y-4'>
                    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                        <Card>
                            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                <CardTitle className='text-sm font-medium'>
                                    Total de chiffre d'affaire
                                </CardTitle>
                                <IconZoomMoney />
                            </CardHeader>
                            <CardContent>
                                <div className='text-2xl font-bold'>10 DH</div>
                                <p className='text-xs text-muted-foreground'>
                                    Par jour
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                <CardTitle className='text-sm font-medium'>
                                    Total Viste
                                </CardTitle>
                                <IconUsersGroup />
                            </CardHeader>
                            <CardContent>
                                <div className='text-2xl font-bold'>10 </div>
                                <p className='text-xs text-muted-foreground'>
                                    Par jour
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                <CardTitle className='text-sm font-medium'>
                                    Total de chiffre d'affaires
                                </CardTitle>
                                <IconZoomMoney />
                            </CardHeader>
                            <CardContent>
                                <div className='text-2xl font-bold'>10 DH</div>
                                <p className='text-xs text-muted-foreground'>
                                    Par Mois
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                <CardTitle className='text-sm font-medium'>
                                    Total Viste
                                </CardTitle>
                                <IconUsersGroup />
                            </CardHeader>
                            <CardContent>
                                <div className='text-2xl font-bold'>10 </div>
                                <p className='text-xs text-muted-foreground'>
                                    Par Mois
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
                        <Card className='col-span-1 lg:col-span-4'>
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                            <CardContent className='pl-2'>
                                {/* <Overview /> */}
                            </CardContent>
                        </Card>
                        <Card className='col-span-1 lg:col-span-3'>
                            <CardHeader>
                                <CardTitle>Recent Sales</CardTitle>
                                <CardDescription>
                                    You made 265 sales this month.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* <RecentSales /> */}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

        </>
    )
}

