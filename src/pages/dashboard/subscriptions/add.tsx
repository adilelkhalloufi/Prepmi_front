import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { ArrowLeft } from 'lucide-react'

export default function AddSubscription() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        user_id: '',
        plan_id: '',
        status: 'active',
        started_at: new Date().toISOString().split('T')[0],
        ends_at: '',
        next_billing_date: '',
        next_delivery_date: '',
        weeks_committed: '4',
        weeks_remaining: '4',
        total_amount_paid: '0',
        meals_delivered: '0',
        delivery_address: '',
        delivery_notes: '',
        special_instructions: '',
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

    const mutation = useMutation({
        mutationFn: (data: any) => http.post(apiRoutes.subscriptions, data),
        onSuccess: () => {
            toast.success('Subscription created successfully')
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
                    <h1 className="text-3xl font-bold tracking-tight">Add Subscription</h1>
                    <p className="text-muted-foreground">Create a new subscription</p>
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
                                                {user.first_name} {user.last_name} ({user.email})
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
                                {mutation.isPending ? 'Creating...' : 'Create Subscription'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
