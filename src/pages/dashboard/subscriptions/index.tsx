import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable } from './data-table'
import { createColumns } from './columns'
import http from '@/utils/http'
import { apiRoutes } from '@/routes/api'
import { handleErrorResponse } from '@/utils'
import { useNavigate } from 'react-router-dom'
import { webRoutes } from '@/routes/web'
import { toast } from 'sonner'

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

    const pauseMutation = useMutation({
        mutationFn: (id: number) => http.post(apiRoutes.pauseSubscription(id)),
        onSuccess: () => {
            toast.success('Subscription paused successfully')
            refetch()
        },
        onError: (e) => handleErrorResponse(e),
    })

    const resumeMutation = useMutation({
        mutationFn: (id: number) => http.post(apiRoutes.resumeSubscription(id)),
        onSuccess: () => {
            toast.success('Subscription resumed successfully')
            refetch()
        },
        onError: (e) => handleErrorResponse(e),
    })

    const cancelMutation = useMutation({
        mutationFn: (id: number) => http.post(apiRoutes.cancelSubscription(id)),
        onSuccess: () => {
            toast.success('Subscription cancelled successfully')
            refetch()
        },
        onError: (e) => handleErrorResponse(e),
    })

    const reactivateMutation = useMutation({
        mutationFn: (id: number) => http.post(apiRoutes.reactivateSubscription(id)),
        onSuccess: () => {
            toast.success('Subscription reactivated successfully')
            refetch()
        },
        onError: (e) => handleErrorResponse(e),
    })

    const toggleAutoRenewMutation = useMutation({
        mutationFn: (id: number) => http.post(apiRoutes.toggleAutoRenew(id)),
        onSuccess: () => {
            toast.success('Auto-renew toggled successfully')
            refetch()
        },
        onError: (e) => handleErrorResponse(e),
    })

    const subscriptions = subscriptionsResponse?.data || []

    const columns = createColumns({
        onPause: (id) => pauseMutation.mutate(id),
        onResume: (id) => resumeMutation.mutate(id),
        onCancel: (id) => cancelMutation.mutate(id),
        onReactivate: (id) => reactivateMutation.mutate(id),
        onToggleAutoRenew: (id) => toggleAutoRenewMutation.mutate(id),
        onView: (id) => navigate(webRoutes.dashboard_subscriptions_details.replace(':id', id.toString())),
        onEdit: (id) => navigate(webRoutes.dashboard_subscriptions_edit.replace(':id', id.toString())),
    })

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
