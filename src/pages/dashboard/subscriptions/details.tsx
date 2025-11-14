import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import http from '@/utils/http'
import { apiRoutes } from '@/routes/api'
import { handleErrorResponse } from '@/utils'
import { webRoutes } from '@/routes/web'
import {
    ArrowLeft,
    Calendar,
    CreditCard,
    MapPin,
    Package,
    User,
    Clock,
    DollarSign,
    TrendingUp,
    AlertCircle,
    Loader2,
} from 'lucide-react'
import { format } from 'date-fns'

export default function SubscriptionDetails() {
    const navigate = useNavigate()
    const { id } = useParams()

    const { isLoading, data: subscriptionResponse } = useQuery({
        queryKey: ['subscription', id],
        queryFn: () =>
            http
                .get(`${apiRoutes.subscriptions}/${id}`)
                .then((res) => res.data)
                .catch((e) => {
                    handleErrorResponse(e)
                    throw e
                }),
        enabled: !!id,
    })

    const subscription = subscriptionResponse?.data

    const statusColors = {
        active: 'bg-green-500',
        paused: 'bg-yellow-500',
        cancelled: 'bg-red-500',
        expired: 'bg-gray-500',
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (!subscription) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">Subscription not found</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(webRoutes.dashboard_subscriptions)}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Subscription #{subscription.id}
                        </h1>
                        <p className="text-muted-foreground">View subscription details</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => navigate(`${webRoutes.dashboard_subscriptions}/edit/${id}`)}
                    >
                        Edit
                    </Button>
                    <Badge
                        className={`${statusColors[subscription.status as keyof typeof statusColors]} text-white`}
                    >
                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer & Plan Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Customer & Plan Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Customer</p>
                                    <p className="font-medium">{subscription.user?.name || 'N/A'}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {subscription.user?.email || ''}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Plan</p>
                                    <p className="font-medium">{subscription.plan?.name || 'N/A'}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {subscription.plan?.meals_per_week} meals per week
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timeline */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Timeline
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Started At</p>
                                    <p className="font-medium">
                                        {subscription.started_at
                                            ? format(new Date(subscription.started_at), 'MMM dd, yyyy')
                                            : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Ends At</p>
                                    <p className="font-medium">
                                        {subscription.ends_at
                                            ? format(new Date(subscription.ends_at), 'MMM dd, yyyy')
                                            : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Next Billing Date</p>
                                    <p className="font-medium">
                                        {subscription.next_billing_date
                                            ? format(new Date(subscription.next_billing_date), 'MMM dd, yyyy')
                                            : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Next Delivery Date</p>
                                    <p className="font-medium">
                                        {subscription.next_delivery_date
                                            ? format(new Date(subscription.next_delivery_date), 'MMM dd, yyyy')
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pause/Cancellation Info */}
                    {(subscription.status === 'paused' || subscription.status === 'cancelled') && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5" />
                                    {subscription.status === 'paused' ? 'Pause' : 'Cancellation'} Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {subscription.status === 'paused' && (
                                    <>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Paused At</p>
                                            <p className="font-medium">
                                                {subscription.paused_at
                                                    ? format(new Date(subscription.paused_at), 'MMM dd, yyyy')
                                                    : 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Pause Reason</p>
                                            <p className="font-medium">
                                                {subscription.pause_reason || 'No reason provided'}
                                            </p>
                                        </div>
                                    </>
                                )}
                                {subscription.status === 'cancelled' && (
                                    <>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Cancelled At</p>
                                            <p className="font-medium">
                                                {subscription.cancelled_at
                                                    ? format(new Date(subscription.cancelled_at), 'MMM dd, yyyy')
                                                    : 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Cancellation Reason</p>
                                            <p className="font-medium">
                                                {subscription.cancellation_reason || 'No reason provided'}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Delivery Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Delivery Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Delivery Address</p>
                                <p className="font-medium">{subscription.delivery_address || 'N/A'}</p>
                            </div>
                            {subscription.delivery_notes && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Delivery Notes</p>
                                    <p className="font-medium">{subscription.delivery_notes}</p>
                                </div>
                            )}
                            {subscription.special_instructions && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Special Instructions</p>
                                    <p className="font-medium">{subscription.special_instructions}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    {/* Progress Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Progress
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted-foreground">Weeks Remaining</span>
                                    <span className="font-medium">
                                        {subscription.weeks_remaining} / {subscription.weeks_committed}
                                    </span>
                                </div>
                                <div className="w-full bg-secondary rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all"
                                        style={{
                                            width: `${((subscription.weeks_committed - subscription.weeks_remaining) / subscription.weeks_committed) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm text-muted-foreground">Meals Delivered</p>
                                <p className="text-2xl font-bold">{subscription.meals_delivered || 0}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Financial Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5" />
                                Financial
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Amount Paid</p>
                                <p className="text-2xl font-bold">
                                    ${subscription.total_amount_paid?.toFixed(2) || '0.00'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5" />
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {subscription.status === 'active' && (
                                <Button variant="outline" className="w-full">
                                    <Clock className="mr-2 h-4 w-4" />
                                    Pause Subscription
                                </Button>
                            )}
                            {subscription.status === 'paused' && (
                                <Button variant="outline" className="w-full">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Resume Subscription
                                </Button>
                            )}
                            {(subscription.status === 'active' || subscription.status === 'paused') && (
                                <Button variant="destructive" className="w-full">
                                    <AlertCircle className="mr-2 h-4 w-4" />
                                    Cancel Subscription
                                </Button>
                            )}
                            <Button variant="outline" className="w-full">
                                <CreditCard className="mr-2 h-4 w-4" />
                                View Billing History
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
