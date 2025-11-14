import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable } from './data-table'
import { columns } from './columns'
import http from '@/utils/http'
import { apiRoutes } from '@/routes/api'
import { handleErrorResponse } from '@/utils'
import { useNavigate } from 'react-router-dom'
import { webRoutes } from '@/routes/web'

export default function SubscriptionsPage() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')

    const { isLoading, data: subscriptionsResponse, refetch } = useQuery({
        queryKey: ['subscriptions', searchTerm],
        queryFn: () =>
            http
                .get(apiRoutes.subscriptions, {
                    params: { search: searchTerm }
                })
                .then((res) => res.data)
                .catch((e) => {
                    handleErrorResponse(e)
                    throw e
                }),
    })

    const subscriptions = subscriptionsResponse?.data || []

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
                    <p className="text-muted-foreground">
                        Manage customer subscriptions and recurring orders
                    </p>
                </div>
                <Button onClick={() => navigate(webRoutes.dashboard_subscriptions_add)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Subscription
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={subscriptions}
                isLoading={isLoading}
                onSearch={setSearchTerm}
                onRefresh={refetch}
            />
        </div>
    )
}
