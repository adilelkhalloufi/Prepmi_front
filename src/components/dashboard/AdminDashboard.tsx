import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    IconZoomMoney,
    IconClipboardList,
    IconUsersGroup
} from '@tabler/icons-react'

export default function AdminDashboard() {
    return (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                        Chiffre d'affaires journalier
                    </CardTitle>
                    <IconZoomMoney />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>2,450 DH</div>
                    <p className='text-xs text-muted-foreground'>
                        +15% par rapport à hier
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
                    <div className='text-2xl font-bold'>45</div>
                    <p className='text-xs text-muted-foreground'>
                        +8 par rapport à hier
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
                    <div className='text-2xl font-bold'>324</div>
                    <p className='text-xs text-muted-foreground'>
                        +12 nouveaux ce mois
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
                    <div className='text-2xl font-bold'>68,500 DH</div>
                    <p className='text-xs text-muted-foreground'>
                        +25% par rapport au mois dernier
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
