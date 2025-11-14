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
import { MoreHorizontal, Eye, Edit, Trash2, PauseCircle, PlayCircle, XCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { webRoutes } from '@/routes/web'
import { format } from 'date-fns'

export interface Subscription {
    id: number
    user_id: number
    plan_id: number
    status: 'active' | 'paused' | 'cancelled' | 'expired'
    started_at: string
    ends_at: string | null
    next_billing_date: string | null
    next_delivery_date: string | null
    paused_at: string | null
    pause_reason: string | null
    cancelled_at: string | null
    cancellation_reason: string | null
    weeks_committed: number
    weeks_remaining: number
    total_amount_paid: number
    meals_delivered: number
    delivery_address: string
    delivery_notes: string | null
    special_instructions: string | null
    user?: {
        id: number
        name: string
        email: string
    }
    plan?: {
        id: number
        name: string
        meals_per_week: number
    }
}

const statusColors = {
    active: 'bg-green-500',
    paused: 'bg-yellow-500',
    cancelled: 'bg-red-500',
    expired: 'bg-gray-500',
}

const ActionsCell = ({ subscription }: { subscription: Subscription }) => {
    const navigate = useNavigate()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => navigate(`${webRoutes.dashboard_subscriptions}/details/${subscription.id}`)}
                >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => navigate(`${webRoutes.dashboard_subscriptions}/edit/${subscription.id}`)}
                >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {subscription.status === 'active' && (
                    <DropdownMenuItem>
                        <PauseCircle className="mr-2 h-4 w-4" />
                        Pause Subscription
                    </DropdownMenuItem>
                )}
                {subscription.status === 'paused' && (
                    <DropdownMenuItem>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Resume Subscription
                    </DropdownMenuItem>
                )}
                {(subscription.status === 'active' || subscription.status === 'paused') && (
                    <DropdownMenuItem className="text-destructive">
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancel Subscription
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const columns: ColumnDef<Subscription>[] = [
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
            return (
                <div>
                    <div className="font-medium">{user?.name || 'N/A'}</div>
                    <div className="text-sm text-muted-foreground">{user?.email || ''}</div>
                </div>
            )
        },
    },
    {
        accessorKey: 'plan',
        header: 'Plan',
        cell: ({ row }) => {
            const plan = row.original.plan
            return (
                <div>
                    <div className="font-medium">{plan?.name || 'N/A'}</div>
                    <div className="text-sm text-muted-foreground">
                        {plan?.meals_per_week} meals/week
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            return (
                <Badge className={`${statusColors[status as keyof typeof statusColors]} text-white`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
            )
        },
    },
    {
        accessorKey: 'started_at',
        header: 'Started',
        cell: ({ row }) => {
            const date = row.getValue('started_at') as string
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
        header: 'Weeks Left',
        cell: ({ row }) => {
            const remaining = row.getValue('weeks_remaining') as number
            const committed = row.original.weeks_committed
            return (
                <div>
                    <div className="font-medium">{remaining}</div>
                    <div className="text-sm text-muted-foreground">of {committed}</div>
                </div>
            )
        },
    },
    {
        accessorKey: 'total_amount_paid',
        header: 'Total Paid',
        cell: ({ row }) => {
            const amount = row.getValue('total_amount_paid') as number
            return <div className="font-medium">${amount?.toFixed(2) || '0.00'}</div>
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <ActionsCell subscription={row.original} />,
    },
]
