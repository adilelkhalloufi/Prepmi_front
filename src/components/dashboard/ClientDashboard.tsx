import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    IconClipboardList,
    IconMeat,
    IconBread,
    IconApple
} from '@tabler/icons-react'

export default function ClientDashboard() {
    return (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                        Commandes ce mois
                    </CardTitle>
                    <IconClipboardList />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>12</div>
                    <p className='text-xs text-muted-foreground'>
                        +2 par rapport au mois dernier
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                        Protéines consommées
                    </CardTitle>
                    <IconMeat />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>450g</div>
                    <p className='text-xs text-muted-foreground'>
                        Cette semaine
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                        Glucides consommés
                    </CardTitle>
                    <IconBread />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>320g</div>
                    <p className='text-xs text-muted-foreground'>
                        Cette semaine
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                        Lipides consommés
                    </CardTitle>
                    <IconApple />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>85g</div>
                    <p className='text-xs text-muted-foreground'>
                        Cette semaine
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
