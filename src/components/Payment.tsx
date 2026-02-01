import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    CreditCard,
    Edit,
    Trash2,
    Plus,
    Minus,
    Receipt,
    ShoppingCart,
    MapPin,
    User,
    Coffee,
    Utensils,
    Gift,
    Star,
    ImageIcon,

} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { resetJoinProcess, updatePlanData } from "@/store/slices/joinProcessSlice"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { defaultHttp } from "@/utils/http"
import { apiRoutes } from "@/routes/api"
import { toast } from "sonner"
import { handleErrorResponse } from "@/utils"
import { useNavigate } from "react-router-dom"
import { webRoutes } from "@/routes/web"
import { useTranslation } from "react-i18next"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface PaymentProps {
    membershipData?: any
    pointsData?: number
    isLoadingPoints?: boolean
    deliverySlotsData?: any[]
}

export function Payment({
    membershipData = null,
    pointsData = 0,
    isLoadingPoints = false,
    deliverySlotsData = []
}: PaymentProps) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const planData = useSelector((state: RootState) => state.joinProcess.planData)
    const admin = useSelector((state: RootState) => state.admin?.user)
    const settings = useSelector((state: RootState) => state.settings)

    // Get selected meals and drinks as arrays of objects
    const selectedMeals = Object.values(planData?.selectedMeals || {})
    const selectedDrinks = Object.values(planData?.selectedDrinks || {})
    const selectedFreeDrinks = Object.values(planData?.selectedFreeDrinks || {})
    const selectedRewardsMeals = planData?.selectedRewardsMeals

    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>((planData as any)?.paymentMethod || 'COD')
    const [isEditingMeals, setIsEditingMeals] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editData, setEditData] = useState({
        firstName: planData?.firstName || '',
        lastName: planData?.lastName || '',
        phoneNumber: planData?.phoneNumber || '',
        address: planData?.address || '',
        country: planData?.country || ''
    })

    // Loyalty Points System
    const [currentPoints, setCurrentPoints] = useState(pointsData)
    const [pointsLoading, setPointsLoading] = useState(isLoadingPoints)
    const [useReward, setUseReward] = useState(false)
    const rewardThreshold = parseInt(settings.settings.find(s => s.key === 'system_points_per_order')?.value || '12')
    const rewardValue = 49 // MAD
    const canUseReward = currentPoints >= rewardThreshold

    useEffect(() => {
        setCurrentPoints(pointsData)
        setPointsLoading(isLoadingPoints)
    }, [pointsData, isLoadingPoints])

    // Use props data instead of fetching
    const userMembership = membershipData;
    const membershipPlan = userMembership?.membership_plan || null;
    console.log('userMembership:', userMembership);
    // add loading state
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)

    // Update local state when Redux state changes
    useEffect(() => {
        if (planData) {
            // You can also sync the selected items from Redux if they exist
            // setSelectedMeals based on planData.selectedMeals etc.
            setEditData({
                firstName: planData.firstName || '',
                lastName: planData.lastName || '',
                phoneNumber: planData.phoneNumber || '',
                address: planData.address || '',
                country: planData.country || ''
            })
        }
    }, [planData])

    // Sync paymentMethod with Redux store
    useEffect(() => {
        if ((planData as any)?.paymentMethod && (planData as any).paymentMethod !== paymentMethod) {
            setPaymentMethod((planData as any).paymentMethod)
        }
    }, [(planData as any)?.paymentMethod])

    const updateQuantity = (type: 'meal' | 'breakfast' | 'drink', id: number, change: number) => {
        if (type === 'meal') {
            const updatedMeals = selectedMeals
                .map(meal =>
                    meal.id === id
                        ? { ...meal, quantity: Math.max(0, (meal.quantity || 0) + change) }
                        : meal
                )
                .filter(meal => meal.quantity > 0)
            dispatch(updatePlanData({
                selectedMeals: Object.fromEntries(updatedMeals.map(m => [m.id, m]))
            }))
        } else if (type === 'breakfast') {
            // const updatedBreakfasts = selectedBreakfasts
            //     .map(item =>
            //         item.id === id
            //             ? { ...item, quantity: Math.max(0, (item.quantity || 0) + change) }
            //             : item
            //     )
            //     .filter(item => item.quantity > 0)
            // dispatch(updatePlanData({
            //     selectedBreakfasts: Object.fromEntries(updatedBreakfasts.map(b => [b.id, b]))
            // }))
        } else if (type === 'drink') {
            const updatedDrinks = selectedDrinks
                .map(drink =>
                    drink.id === id
                        ? { ...drink, quantity: Math.max(0, (drink.quantity || 0) + change) }
                        : drink
                )
                .filter(drink => drink.quantity > 0)
            dispatch(updatePlanData({
                selectedDrinks: Object.fromEntries(updatedDrinks.map(d => [d.id, d]))
            }))
        }
    }

    const removeItem = (type: 'meal' | 'breakfast' | 'drink', id: number) => {
        if (type === 'meal') {
            const updatedMeals = selectedMeals.filter(meal => meal.id !== id)
            dispatch(updatePlanData({
                selectedMeals: Object.fromEntries(updatedMeals.map(m => [m.id, m]))
            }))
        } else if (type === 'breakfast') {
            // If you use selectedBreakfasts, apply similar logic:
            // const updatedBreakfasts = selectedBreakfasts.filter(item => item.id !== id)
            // dispatch(updatePlanData({
            //     selectedBreakfasts: Object.fromEntries(updatedBreakfasts.map(b => [b.id, b]))
            // }))
        } else if (type === 'drink') {
            const updatedDrinks = selectedDrinks.filter(drink => drink.id !== id)
            dispatch(updatePlanData({
                selectedDrinks: Object.fromEntries(updatedDrinks.map(d => [d.id, d]))
            }))
        }
    }

    const handleEditChange = (field: string, value: string) => {
        setEditData(prev => ({ ...prev, [field]: value }))
    }

    const handleEditSave = () => {
        dispatch(updatePlanData(editData))
        setEditModalOpen(false)
    }

    // Calculate totals with membership discount
    // const breakfastSubtotal = selectedBreakfasts.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0)
    const drinksSubtotal = selectedDrinks.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0)
    const planSubtotal = Number(planData?.plan?.price_per_week || 0)
    const subtotalBeforeDiscount = planSubtotal + drinksSubtotal

    // Apply membership discount
    const membershipDiscountPercent = membershipPlan ? Number(membershipPlan.discount_percentage || 0) : 0
    const membershipDiscount = membershipDiscountPercent > 0 ? (subtotalBeforeDiscount * membershipDiscountPercent) / 100 : 0
    const subtotal = subtotalBeforeDiscount - membershipDiscount

    // Always use arrays for totalItems calculation
    const totalItems =
        selectedMeals.reduce((sum, meal) => sum + (meal.quantity || 0), 0) +
        // selectedBreakfasts.reduce((sum, item) => sum + (item.quantity || 0), 0) +
        selectedDrinks.reduce((sum, item) => sum + (item.quantity || 0), 0) +
        selectedFreeDrinks.reduce((sum, item) => sum + (item.quantity || 0), 0)






    const pointsEarned = planData?.plan?.points_value ?? 0
    const total = subtotal

    // Replace mockSelectedMeals with Redux selectedMeals
    const mealList = selectedMeals

    // Replace mockSelectedDrinks with Redux selectedDrinks

    // Simulate user authentication (replace with your actual auth logic)
    const isUserConnected = !!admin?.id // or use your auth state

    // make handlePlaceOrder async and set loading state
    const handlePlaceOrder = async () => {

        const payload = {
            size: planData?.selectedSize || null,
            paymentMethod: paymentMethod,
            plan: planData?.plan || null,
            meals: selectedMeals, // array of meal objects
            drinks: selectedDrinks, // array of drink objects
            freeDrinks: selectedFreeDrinks, // array of free drink objects
            rewardMeal: selectedRewardsMeals,
            totalAmount: subtotal,
            originalAmount: subtotalBeforeDiscount,
            membershipDiscount: membershipDiscount,
            membershipId: userMembership?.id || null,
            delivery_slot_ids: planData?.delivery_slot_ids || [],
            infos: {
                firstName: planData?.firstName,
                lastName: planData?.lastName,
                phoneNumber: planData?.phoneNumber,
                country: planData?.country,
                address: planData?.address,
                email: planData?.email,
                password: planData?.password,
            },
            user_id: admin?.id || null
        }
        console.log('Placing order with payload:', payload);
        setIsPlacingOrder(true)

        defaultHttp.post(apiRoutes.orders, payload).then(() => {
            // Optionally redirect to order confirmation page
            toast.success(t('joinNow.payment.orderSuccess'))
            dispatch(resetJoinProcess())
            navigate(webRoutes.thank_you)


        }).catch((error) => {
            handleErrorResponse(error);

            setIsPlacingOrder(false)
        });

    }


    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                    {t('joinNow.payment.title')}
                </h2>
                <p className="text-muted-foreground">
                    {t('joinNow.payment.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Order Summary */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer Details */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center space-x-2">
                                <User className="w-5 h-5 text-primary" />
                                <span>{t('joinNow.payment.customerDetails')}</span>
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary"
                                onClick={() => setEditModalOpen(true)}
                            >
                                <Edit className="w-4 h-4 mr-1" />
                                {t('joinNow.payment.edit')}
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="font-semibold">{planData?.firstName || 'N/A'} {planData?.lastName || ''}</p>
                                <p className="text-sm text-muted-foreground">{planData?.phoneNumber || 'N/A'}</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                                <div>
                                    <p className="text-sm font-medium">{t('joinNow.payment.deliveryAddress')}</p>
                                    <p className="text-sm text-muted-foreground">{planData?.address || 'N/A'}</p>
                                    <p className="text-sm text-muted-foreground">{planData?.country || 'N/A'}</p>
                                </div>
                            </div>
                            {planData?.delivery_slot_ids && planData.delivery_slot_ids.length > 0 && (
                                <div className="flex items-start space-x-2">
                                    <Receipt className="w-4 h-4 text-muted-foreground mt-1" />
                                    <div>
                                        <p className="text-sm font-medium">{t('joinNow.payment.deliverySlots', 'Delivery Time Slots')}</p>
                                        <div className="space-y-1 mt-1">
                                            {planData.delivery_slot_ids.map((slotId: number) => {
                                                const slot = deliverySlotsData.find((s: any) => s.id === slotId)
                                                if (!slot) return null
                                                const dayName = slot.day_of_week !== null ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][slot.day_of_week] : ''
                                                return (
                                                    <Badge key={slotId} variant="outline" className="mr-2 mb-1">
                                                        {dayName} {slot.start_time} - {slot.end_time}
                                                    </Badge>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    {/* Edit Modal */}
                    <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{t('joinNow.payment.editDetails')}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <Input
                                    placeholder={t('joinNow.address.firstName')}
                                    value={editData.firstName}
                                    onChange={e => handleEditChange('firstName', e.target.value)}
                                />
                                <Input
                                    placeholder={t('joinNow.address.lastName')}
                                    value={editData.lastName}
                                    onChange={e => handleEditChange('lastName', e.target.value)}
                                />
                                <Input
                                    placeholder={t('joinNow.address.phoneNumber')}
                                    value={editData.phoneNumber}
                                    onChange={e => handleEditChange('phoneNumber', e.target.value)}
                                />
                                <Input
                                    placeholder={t('joinNow.address.deliveryAddress')}
                                    value={editData.address}
                                    onChange={e => handleEditChange('address', e.target.value)}
                                />

                            </div>
                            <DialogFooter>
                                <Button onClick={handleEditSave}>{t('joinNow.payment.save')}</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Order Items */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center space-x-2">
                                <ShoppingCart className="w-5 h-5 text-primary" />
                                <span>{t('joinNow.payment.yourOrder', { count: totalItems })}</span>
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary"
                                onClick={() => setIsEditingMeals(!isEditingMeals)}
                            >
                                <Edit className="w-4 h-4 mr-1" />
                                {isEditingMeals ? t('joinNow.payment.done') : t('joinNow.payment.edit')}
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Main Meals */}
                            {mealList.length > 0 ? (
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Utensils className="w-4 h-4 text-primary" />
                                        <h4 className="font-semibold text-foreground">{t('joinNow.payment.mainMeals')}</h4>
                                    </div>
                                    <div className="space-y-3">
                                        {mealList.map((meal) => (
                                            <div key={meal.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                                                {meal?.image ? (
                                                    <img
                                                        src={meal.image}
                                                        alt={meal.name}
                                                        className="w-16 h-16 object-cover rounded-md"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md">
                                                        <ImageIcon className="w-8 h-8 text-gray-400" />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <h5 className="font-medium text-foreground">{meal.name}</h5>
                                                    <p className="text-sm text-muted-foreground">
                                                        {/* {meal.price ? `$${meal.price}` : ''} {t('joinNow.payment.each')} */}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-muted-foreground">{t('joinNow.payment.qty')}: {meal.quantity}</p>
                                                    <p className="font-semibold">
                                                        {/* {meal.price ? `$${(meal.price * meal.quantity).toFixed(2)}` : ''} */}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">No meals selected.</p>
                                </div>
                            )}

                            {/* Applied Reward Meal */}
                            {selectedRewardsMeals && selectedRewardsMeals.mealId && (
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Gift className="w-4 h-4 text-secondary" />
                                        <h4 className="font-semibold text-foreground">{t('joinNow.payment.appliedReward', 'Applied Reward')}</h4>
                                    </div>
                                    <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/30">
                                        <div className="flex items-center space-x-4">
                                            {selectedRewardsMeals.mealImage ? (
                                                <img
                                                    src={selectedRewardsMeals.mealImage}
                                                    alt={selectedRewardsMeals.mealName}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md">
                                                    <ImageIcon className="w-8 h-8 text-gray-400" />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <h5 className="font-medium text-foreground">{selectedRewardsMeals.mealName}</h5>
                                                <p className="text-sm text-muted-foreground">
                                                    {selectedRewardsMeals.mealCalories || 0} kcal • {selectedRewardsMeals.mealProtein || 0}g protein
                                                </p>
                                                <p className="text-xs text-secondary font-semibold mt-1">FREE (Reward Applied)</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-secondary">-{selectedRewardsMeals.mealPrice || 0} {t('menu.currency')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Drinks */}
                            {selectedDrinks.length > 0 && (
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Coffee className="w-4 h-4 " />
                                        <h4 className="font-semibold text-foreground">{t('joinNow.payment.drinks')}</h4>
                                    </div>
                                    <div className="space-y-3">
                                        {selectedDrinks.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-4 p-3 bg-accent/10 rounded-lg">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded-md"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md">
                                                        <ImageIcon className="w-8 h-8 text-gray-400" />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <h5 className="font-medium text-foreground">{item.name}</h5>
                                                    <p className="text-sm text-muted-foreground">{item.price} {t('menu.currency')} {t('joinNow.payment.each')}</p>
                                                </div>
                                                {isEditingMeals ? (
                                                    <div className="flex items-center space-x-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-6 w-6 p-0"
                                                            onClick={() => updateQuantity('drink', item.id, -1)}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-6 w-6 p-0"
                                                            onClick={() => updateQuantity('drink', item.id, 1)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-6 w-6 p-0 text-destructive"
                                                            onClick={() => removeItem('drink', item.id)}
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="text-right">
                                                        <p className="text-sm text-muted-foreground">{t('joinNow.payment.qty')}: {item.quantity}</p>
                                                        <p className="font-semibold">{(item.price * item.quantity).toFixed(2)} {t('menu.currency')}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Free Drinks (Membership Benefits) */}
                            {selectedFreeDrinks.length > 0 && (
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Gift className="w-4 h-4 text-green-600" />
                                        <h4 className="font-semibold text-foreground">Free Drinks (Membership)</h4>
                                    </div>
                                    <div className="space-y-3">
                                        {selectedFreeDrinks.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg border border-green-200">
                                                {item.image_url || item.image_path ? (
                                                    <img
                                                        src={item.image_url || item.image_path}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded-md"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md">
                                                        <ImageIcon className="w-8 h-8 text-gray-400" />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <h5 className="font-medium text-foreground">{item.name}</h5>
                                                    <p className="text-sm text-green-600 font-medium">Free (Membership Benefit)</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {item.calories || 0} kcal • {item.protein || 0}g protein
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <Badge className="bg-green-600 text-white mb-2">FREE</Badge>
                                                    <p className="text-sm text-muted-foreground">{t('joinNow.payment.qty')}: {item.quantity}</p>
                                                    <p className="font-semibold text-green-600">0.00 {t('menu.currency')}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Payment Section */}
                <div className="space-y-6">
                    {/* Loyalty Points Card */}
                    {isUserConnected ? (
                        <Card className="border-gradient-to-r from-primary/20 to-secondary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-base">
                                    <Star className="w-5 h-5 text-primary" />
                                    <span>{t('joinNow.payment.loyaltyPoints')}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Current Points Display */}
                                <div className="text-center space-y-2">
                                    <div className="flex items-center justify-center space-x-2">
                                        {pointsLoading ? (
                                            <span className="text-muted-foreground text-sm">Loading...</span>
                                        ) : (
                                            <>
                                                <span className="text-2xl font-bold text-primary">{currentPoints}</span>
                                                <span className="text-muted-foreground">/ {rewardThreshold}</span>
                                                <span className="text-sm text-muted-foreground">{t('joinNow.payment.pointsCollected')}</span>
                                            </>
                                        )}
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="w-full bg-secondary rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${Math.min((currentPoints / rewardThreshold) * 100, 100)}%` }}
                                        ></div>
                                    </div>

                                    {canUseReward ? (
                                        <p className="text-sm text-primary font-medium">
                                            🎉 {t('joinNow.payment.rewardAvailable')}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            {t('joinNow.payment.pointsUntilReward', { points: rewardThreshold - currentPoints })}
                                        </p>
                                    )}
                                </div>

                                {/* Points Earning Preview */}
                                {pointsEarned > 0 && (
                                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                                        <div className="flex items-center space-x-2">
                                            <Gift className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-medium text-primary">
                                                {t('joinNow.payment.willEarnPoints', { points: pointsEarned })}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Use Reward Toggle */}
                                {canUseReward && (
                                    <div className="p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Gift className="w-4 h-4 text-primary" />
                                                <div>
                                                    <p className="font-medium text-sm">{t('joinNow.payment.useFreeMeal')}</p>
                                                    <p className="text-xs text-muted-foreground">-{rewardValue} MAD</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant={useReward ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setUseReward(!useReward)}
                                            >
                                                {useReward ? t('joinNow.payment.applied') : t('joinNow.payment.use')}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="border-gradient-to-r from-primary/20 to-secondary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-base">
                                    <Star className="w-5 h-5 text-primary" />
                                    <span>{t('joinNow.payment.loyaltyPoints')}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-6">
                                    <p className="text-muted-foreground">
                                        {t('joinNow.payment.connectToSeePoints', 'Connect your account to view and use loyalty points.')}
                                    </p>
                                    {/* Optionally add a connect/login button here */}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Order Total */}
                    <Card className="sticky top-4">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Receipt className="w-5 h-5 text-primary" />
                                <span>{t('joinNow.payment.orderSummary')}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                {/* Show plan total */}
                                {planData?.pricePerWeek && (
                                    <div className="flex justify-between text-sm">
                                        <span>Plan ({planData?.plan?.name})</span>
                                        <span>{Number(planData?.plan?.price_per_week).toFixed(2)} {t('menu.currency')}</span>
                                    </div>
                                )}
                                {/* Show drinks total if any drinks selected */}
                                {drinksSubtotal > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span>{t('joinNow.payment.drinksSubtotal')}</span>
                                        <span>{drinksSubtotal.toFixed(2)} {t('menu.currency')}</span>
                                    </div>
                                )}

                                {/* Subtotal before discount */}
                                {membershipDiscount > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal</span>
                                        <span>{subtotalBeforeDiscount.toFixed(2)} {t('menu.currency')}</span>
                                    </div>
                                )}

                                {/* Membership discount */}
                                {membershipDiscount > 0 && (
                                    <>
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>Discount ({membershipDiscountPercent}%)</span>
                                            <span>-{membershipDiscount.toFixed(2)} {t('menu.currency')}</span>
                                        </div>
                                        <Separator />
                                    </>
                                )}

                                {/* Show overall total */}
                                <div className="flex justify-between text-lg font-bold mt-2">
                                    <span>{t('joinNow.payment.total')}</span>
                                    <span>
                                        {subtotal.toFixed(2)} {t('menu.currency')}
                                        {membershipDiscount > 0 && (
                                            <span className="block text-xs font-normal text-green-600">
                                                You saved {membershipDiscount.toFixed(2)} {t('menu.currency')}!
                                            </span>
                                        )}
                                    </span>
                                </div>

                                {/* Subscriber note */}
                                {membershipDiscount > 0 && (
                                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="text-sm text-blue-800">
                                            <strong>{t('joinNow.payment.note', 'Note')}:</strong> {t('joinNow.payment.subscriberNote', 'As a subscriber, you can cancel or freeze your subscription anytime if you want.')}
                                            <button
                                                onClick={() => navigate(webRoutes.dashboard_memberships_view.replace(':id', userMembership?.id || ''))}
                                                className="ml-2 text-blue-600 underline hover:text-blue-800"
                                            >
                                                {t('joinNow.payment.viewSubscription', 'View Subscription')}
                                            </button>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Discount Code */}


                    {/* Payment Method */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-base">
                                <CreditCard className="w-4 h-4 text-primary" />
                                <span>{t('joinNow.payment.paymentMethod')}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div
                                    className={`p-4 rounded-lg border cursor-not-allowed transition-all opacity-50 border-border`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-4 h-4 rounded-full border-2 border-border`} />
                                        <div>
                                            <p className="font-medium">{t('joinNow.payment.onlinePayment')}</p>
                                            <p className="text-sm text-muted-foreground">{t('joinNow.payment.paySecurely')} (Coming Soon)</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`p-4 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'COD'
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50'
                                        }`}
                                    onClick={() => {
                                        setPaymentMethod('COD')
                                        dispatch(updatePlanData({ paymentMethod: 'COD' } as any))
                                    }}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'COD'
                                            ? 'border-primary bg-primary'
                                            : 'border-border'
                                            }`} />
                                        <div>
                                            <p className="font-medium">{t('joinNow.payment.cashOnDelivery')}</p>
                                            <p className="text-sm text-muted-foreground">{t('joinNow.payment.payWhenReceive')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Place Order Button */}
                    <Button
                        className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                        onClick={handlePlaceOrder}
                        disabled={isPlacingOrder}
                        aria-busy={isPlacingOrder}
                    >
                        {isPlacingOrder ? (
                            <>
                                {/* simple inline spinner */}
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            (paymentMethod === 'COD'
                                ? t('joinNow.payment.placeOrderCOD')
                                : t('joinNow.payment.payAmount', { amount: total.toFixed(2) }))
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

