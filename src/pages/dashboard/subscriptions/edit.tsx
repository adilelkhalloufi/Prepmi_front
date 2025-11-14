import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import http from '@/utils/http'
import { apiRoutes } from '@/routes/api'
import { handleErrorResponse } from '@/utils'
import { webRoutes } from '@/routes/web'
import { ArrowLeft, Loader2 } from 'lucide-react'

export default function EditSubscription() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [formData, setFormData] = useState({
        user_id: '',
        plan_id: '',
        status: 'active',
        started_at: '',
        ends_at: '',
        next_billing_date: '',
        next_delivery_date: '',
        paused_at: '',
        pause_reason: '',
        cancelled_at: '',
        cancellation_reason: '',
        weeks_committed: '',
        weeks_remaining: '',
        total_amount_paid: '',
        meals_delivered: '',
        delivery_address: '',
        delivery_notes: '',
        special_instructions: '',
    })

    // Fetch subscription details
    const { isLoading, data: subscriptionResponse } = useQuery({
        queryKey: ['subscription', id],
        queryFn: () => http.get(`${apiRoutes.subscriptions}/${id}`).then((res) => res.data),
        enabled: !!id,
    })

    // Fetch users for dropdown
    const { data: usersResponse } = useQuery({
        queryKey: ['users'],
        queryFn: () => http.get(apiRoutes.users).then((res) => res.data),
    })

    // Fetch plans for dropdown
    const { data: plansResponse } = useQuery({
        queryKey: ['plans'],
        queryFn: () => http.get(apiRoutes.plans).then((res) => res.data),
    })

    const users = usersResponse?.data || []
    const plans = plansResponse?.data || []
    const subscription = subscriptionResponse?.data

    useEffect(() => {
        if (subscription) {
            setFormData({
                user_id: subscription.user_id?.toString() || '',
                plan_id: subscription.plan_id?.toString() || '',
                status: subscription.status || 'active',
                started_at: subscription.started_at?.split('T')[0] || '',
                ends_at: subscription.ends_at?.split('T')[0] || '',
                next_billing_date: subscription.next_billing_date?.split('T')[0] || '',
                next_delivery_date: subscription.next_delivery_date?.split('T')[0] || '',
                paused_at: subscription.paused_at?.split('T')[0] || '',
                pause_reason: subscription.pause_reason || '',
                cancelled_at: subscription.cancelled_at?.split('T')[0] || '',
                cancellation_reason: subscription.cancellation_reason || '',
                weeks_committed: subscription.weeks_committed?.toString() || '',
                weeks_remaining: subscription.weeks_remaining?.toString() || '',
                total_amount_paid: subscription.total_amount_paid?.toString() || '',
                meals_delivered: subscription.meals_delivered?.toString() || '',
                delivery_address: subscription.delivery_address || '',
                delivery_notes: subscription.delivery_notes || '',
                special_instructions: subscription.special_instructions || '',
            })
        }
    }, [subscription])

    const mutation = useMutation({
        mutationFn: (data: any) => http.put(`${apiRoutes.subscriptions}/${id}`, data),
        onSuccess: () => {
            toast.success('Subscription updated successfully')
            navigate(webRoutes.dashboard_subscriptions)
        },
        onError: (error) => {
            handleErrorResponse(error)
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutation.mutate(formData)
    }

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate(webRoutes.dashboard_subscriptions)}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Subscription</h1>
                    <p className="text-muted-foreground">Update subscription details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Subscription Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* User Selection */}
                            <div className="space-y-2">
                                <Label htmlFor="user_id">Customer *</Label>
                                <Select
                                    value={formData.user_id}
                                    onValueChange={(value) => handleChange('user_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select customer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users.map((user: any) => (
                                            <SelectItem key={user.id} value={user.id.toString()}>
                                                {user.name} ({user.email})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Plan Selection */}
                            <div className="space-y-2">
                                <Label htmlFor="plan_id">Plan *</Label>
                                <Select
                                    value={formData.plan_id}
                                    onValueChange={(value) => handleChange('plan_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select plan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {plans.map((plan: any) => (
                                            <SelectItem key={plan.id} value={plan.id.toString()}>
                                                {plan.name} ({plan.meals_per_week} meals/week)
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <Label htmlFor="status">Status *</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) => handleChange('status', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="paused">Paused</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                        <SelectItem value="expired">Expired</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Started At */}
                            <div className="space-y-2">
                                <Label htmlFor="started_at">Started At *</Label>
                                <Input
                                    id="started_at"
                                    type="date"
                                    value={formData.started_at}
                                    onChange={(e) => handleChange('started_at', e.target.value)}
                                    required
                                />
                            </div>

                            {/* Ends At */}
                            <div className="space-y-2">
                                <Label htmlFor="ends_at">Ends At</Label>
                                <Input
                                    id="ends_at"
                                    type="date"
                                    value={formData.ends_at}
                                    onChange={(e) => handleChange('ends_at', e.target.value)}
                                />
                            </div>

                            {/* Next Billing Date */}
                            <div className="space-y-2">
                                <Label htmlFor="next_billing_date">Next Billing Date</Label>
                                <Input
                                    id="next_billing_date"
                                    type="date"
                                    value={formData.next_billing_date}
                                    onChange={(e) => handleChange('next_billing_date', e.target.value)}
                                />
                            </div>

                            {/* Next Delivery Date */}
                            <div className="space-y-2">
                                <Label htmlFor="next_delivery_date">Next Delivery Date</Label>
                                <Input
                                    id="next_delivery_date"
                                    type="date"
                                    value={formData.next_delivery_date}
                                    onChange={(e) => handleChange('next_delivery_date', e.target.value)}
                                />
                            </div>

                            {/* Paused At */}
                            <div className="space-y-2">
                                <Label htmlFor="paused_at">Paused At</Label>
                                <Input
                                    id="paused_at"
                                    type="date"
                                    value={formData.paused_at}
                                    onChange={(e) => handleChange('paused_at', e.target.value)}
                                />
                            </div>

                            {/* Pause Reason */}
                            <div className="space-y-2">
                                <Label htmlFor="pause_reason">Pause Reason</Label>
                                <Input
                                    id="pause_reason"
                                    value={formData.pause_reason}
                                    onChange={(e) => handleChange('pause_reason', e.target.value)}
                                    placeholder="Reason for pausing"
                                />
                            </div>

                            {/* Cancelled At */}
                            <div className="space-y-2">
                                <Label htmlFor="cancelled_at">Cancelled At</Label>
                                <Input
                                    id="cancelled_at"
                                    type="date"
                                    value={formData.cancelled_at}
                                    onChange={(e) => handleChange('cancelled_at', e.target.value)}
                                />
                            </div>

                            {/* Cancellation Reason */}
                            <div className="space-y-2">
                                <Label htmlFor="cancellation_reason">Cancellation Reason</Label>
                                <Input
                                    id="cancellation_reason"
                                    value={formData.cancellation_reason}
                                    onChange={(e) => handleChange('cancellation_reason', e.target.value)}
                                    placeholder="Reason for cancellation"
                                />
                            </div>

                            {/* Weeks Committed */}
                            <div className="space-y-2">
                                <Label htmlFor="weeks_committed">Weeks Committed *</Label>
                                <Input
                                    id="weeks_committed"
                                    type="number"
                                    value={formData.weeks_committed}
                                    onChange={(e) => handleChange('weeks_committed', e.target.value)}
                                    required
                                    min="1"
                                />
                            </div>

                            {/* Weeks Remaining */}
                            <div className="space-y-2">
                                <Label htmlFor="weeks_remaining">Weeks Remaining *</Label>
                                <Input
                                    id="weeks_remaining"
                                    type="number"
                                    value={formData.weeks_remaining}
                                    onChange={(e) => handleChange('weeks_remaining', e.target.value)}
                                    required
                                    min="0"
                                />
                            </div>

                            {/* Total Amount Paid */}
                            <div className="space-y-2">
                                <Label htmlFor="total_amount_paid">Total Amount Paid</Label>
                                <Input
                                    id="total_amount_paid"
                                    type="number"
                                    step="0.01"
                                    value={formData.total_amount_paid}
                                    onChange={(e) => handleChange('total_amount_paid', e.target.value)}
                                />
                            </div>

                            {/* Meals Delivered */}
                            <div className="space-y-2">
                                <Label htmlFor="meals_delivered">Meals Delivered</Label>
                                <Input
                                    id="meals_delivered"
                                    type="number"
                                    value={formData.meals_delivered}
                                    onChange={(e) => handleChange('meals_delivered', e.target.value)}
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div className="space-y-2">
                            <Label htmlFor="delivery_address">Delivery Address *</Label>
                            <Textarea
                                id="delivery_address"
                                value={formData.delivery_address}
                                onChange={(e) => handleChange('delivery_address', e.target.value)}
                                placeholder="Enter full delivery address"
                                required
                                rows={3}
                            />
                        </div>

                        {/* Delivery Notes */}
                        <div className="space-y-2">
                            <Label htmlFor="delivery_notes">Delivery Notes</Label>
                            <Textarea
                                id="delivery_notes"
                                value={formData.delivery_notes}
                                onChange={(e) => handleChange('delivery_notes', e.target.value)}
                                placeholder="Any special delivery instructions"
                                rows={3}
                            />
                        </div>

                        {/* Special Instructions */}
                        <div className="space-y-2">
                            <Label htmlFor="special_instructions">Special Instructions</Label>
                            <Textarea
                                id="special_instructions"
                                value={formData.special_instructions}
                                onChange={(e) => handleChange('special_instructions', e.target.value)}
                                placeholder="Dietary restrictions, preferences, etc."
                                rows={3}
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate(webRoutes.dashboard_subscriptions)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending ? 'Updating...' : 'Update Subscription'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
