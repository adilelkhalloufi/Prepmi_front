import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Pause, Play, XCircle, RotateCcw, ToggleLeft } from 'lucide-react'
import { format } from 'date-fns'

export interface Subscription {
    id: number
    user_id: number
    plan_id: number
    order_id: number | null
    status: 'active' | 'paused' | 'cancelled' | 'expired'
    started_at: string
    ends_at: string | null
    next_billing_date: string | null
    next_delivery_date: string | null
    cancellation_deadline: string | null
    paused_at: string | null
    pause_reason: string | null
    pause_start_date: string | null
    pause_end_date: string | null
    max_pause_weeks: number
    paused_weeks_used: number
    preferred_delivery_days: string[] | null
    delivery_restrictions: string | null
    auto_renew: boolean | number
    auto_renew_disabled_at: string | null
    cancelled_at: string | null
    cancellation_reason: string | null
    weeks_committed: number
    weeks_remaining: number
    total_amount_paid: string | number
    meals_delivered: number
    delivery_address: string | null
    delivery_notes: string | null
    special_instructions: string | null
    created_at: string
    updated_at: string
    user?: {
        id: number
        first_name: string
        last_name: string
        email: string
    }
    plan?: {
        id: number
        name: string
        meals_per_week: number
        price_per_week: string
        price_subscription_per_week: string
    }
}

interface ColumnActions {
    onPause: (id: number) => void
    onResume: (id: number) => void
    onCancel: (id: number) => void
    onReactivate: (id: number) => void
    onToggleAutoRenew: (id: number) => void
    onView: (id: number) => void
    onEdit: (id: number) => void
}

export const createColumns = (actions: ColumnActions): ColumnDef<Subscription>[] => [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <div className="font-medium">#{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'user',
        header: 'Customer',
        cell: ({ row }) => {
            const user = row.original.user
            const fullName = user ? `${user.first_name} ${user.last_name}` : 'N/A'
            return (
                <div>
                    <div className="font-medium">{fullName}</div>
                    <div className="text-sm text-muted-foreground">{user?.email || ''}</div>
                </div>
            )
        },
    },
    {
        accessorKey: 'plan',
        header: 'Plan',
        cell: ({ row }) => <div>{row.original.plan?.name || 'N/A'}</div>,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
                active: 'default',
                paused: 'secondary',
                cancelled: 'destructive',
                expired: 'outline',
            }
            return <Badge variant={variants[status] || 'outline'}>{status}</Badge>
        },
    },
    {
        accessorKey: 'auto_renew',
        header: 'Auto Renew',
        cell: ({ row }) => {
            const autoRenew = row.getValue('auto_renew')
            const isEnabled = autoRenew === true || autoRenew === 1
            return (
                <Badge variant={isEnabled ? 'default' : 'outline'}>
                    {isEnabled ? 'Yes' : 'No'}
                </Badge>
            )
        },
    },
    {
        accessorKey: 'next_billing_date',
        header: 'Next Billing',
        cell: ({ row }) => {
            const date = row.getValue('next_billing_date') as string
            return date ? format(new Date(date), 'MMM dd, yyyy') : 'N/A'
        },
    },
    {
        accessorKey: 'next_delivery_date',
        header: 'Next Delivery',
        cell: ({ row }) => {
            const date = row.getValue('next_delivery_date') as string
            return date ? format(new Date(date), 'MMM dd, yyyy') : 'N/A'
        },
    },
    {
        accessorKey: 'weeks_remaining',
        header: 'Weeks',
        cell: ({ row }) => (
            <div className="text-center">
                {row.getValue('weeks_remaining')}/{row.original.weeks_committed}
            </div>
        ),
    },
    {
        accessorKey: 'total_amount_paid',
        header: 'Total Paid',
        cell: ({ row }) => {
            const amount = row.getValue('total_amount_paid') as string | number
            const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
            return <div className="font-medium">{numAmount?.toFixed(2) || '0.00'} MAD</div>
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const subscription = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => actions.onView(subscription.id)}>
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => actions.onEdit(subscription.id)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {subscription.status === 'active' && (
                            <DropdownMenuItem onClick={() => actions.onPause(subscription.id)}>
                                <Pause className="mr-2 h-4 w-4" />
                                Pause
                            </DropdownMenuItem>
                        )}
                        {subscription.status === 'paused' && (
                            <DropdownMenuItem onClick={() => actions.onResume(subscription.id)}>
                                <Play className="mr-2 h-4 w-4" />
                                Resume
                            </DropdownMenuItem>
                        )}
                        {subscription.status === 'active' && (
                            <DropdownMenuItem onClick={() => actions.onCancel(subscription.id)}>
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel
                            </DropdownMenuItem>
                        )}
                        {subscription.status === 'cancelled' && (
                            <DropdownMenuItem onClick={() => actions.onReactivate(subscription.id)}>
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Reactivate
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => actions.onToggleAutoRenew(subscription.id)}>
                            <ToggleLeft className="mr-2 h-4 w-4" />
                            Toggle Auto Renew
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
