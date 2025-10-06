import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useTranslation } from "react-i18next"
import {
    CreditCard,
    Truck,
    Tag,
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
    Check,
    Clock,
    Zap,
    Gift,
    Star
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { updatePlanData } from "@/store/slices/joinProcessSlice"

// Mock data - replace with actual data from previous steps
const mockSelectedMeals = [
    { id: 1, name: "Grilled Chicken Teriyaki", price: 12.99, quantity: 3, image: "/api/placeholder/100/100" },
    { id: 2, name: "Salmon with Quinoa", price: 14.99, quantity: 2, image: "/api/placeholder/100/100" },
    { id: 3, name: "Beef Stir Fry", price: 13.99, quantity: 3, image: "/api/placeholder/100/100" },
    { id: 4, name: "Vegetarian Buddha Bowl", price: 11.99, quantity: 2, image: "/api/placeholder/100/100" }
]

const mockSelectedBreakfasts = [
    { id: 101, name: "Overnight Oats Bowl", price: 6.99, quantity: 7, image: "/api/placeholder/100/100" }
]

const mockSelectedDrinks = [
    { id: 201, name: "Fresh Green Smoothie", price: 4.99, quantity: 5, image: "/api/placeholder/100/100" }
]

export function Payment() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const planData = useSelector((state: RootState) => state.joinProcess.planData)

    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('ONLINE')
    const [deliveryType, setDeliveryType] = useState<'STANDARD' | 'EXPRESS'>('STANDARD')
    const [discountCode, setDiscountCode] = useState('')
    const [appliedDiscount, setAppliedDiscount] = useState<{ code: string, amount: number } | null>(null)
    const [isEditingMeals, setIsEditingMeals] = useState(false)
    const [selectedMeals, setSelectedMeals] = useState(mockSelectedMeals)
    const [selectedBreakfasts, setSelectedBreakfasts] = useState(mockSelectedBreakfasts)
    const [selectedDrinks, setSelectedDrinks] = useState(mockSelectedDrinks)

    // Loyalty Points System
    const [currentPoints, setCurrentPoints] = useState(8) // Mock current points
    const [useReward, setUseReward] = useState(false)
    const rewardThreshold = 12
    const rewardValue = 49 // MAD
    const canUseReward = currentPoints >= rewardThreshold

    // Update local state when Redux state changes
    useEffect(() => {
        if (planData) {
            // You can also sync the selected items from Redux if they exist
            // setSelectedMeals based on planData.selectedMeals etc.
        }
    }, [planData])

    const applyDiscount = () => {
        // Mock discount validation
        const validCodes = {
            'WELCOME10': 10,
            'FIRST15': 15,
            'SAVE20': 20
        }

        if (validCodes[discountCode as keyof typeof validCodes]) {
            setAppliedDiscount({
                code: discountCode,
                amount: validCodes[discountCode as keyof typeof validCodes]
            })
        }
    }

    const removeDiscount = () => {
        setAppliedDiscount(null)
        setDiscountCode('')
    }

    const updateQuantity = (type: 'meal' | 'breakfast' | 'drink', id: number, change: number) => {
        if (type === 'meal') {
            setSelectedMeals(prev => prev.map(meal =>
                meal.id === id
                    ? { ...meal, quantity: Math.max(0, meal.quantity + change) }
                    : meal
            ).filter(meal => meal.quantity > 0))
        } else if (type === 'breakfast') {
            setSelectedBreakfasts(prev => prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(0, item.quantity + change) }
                    : item
            ).filter(item => item.quantity > 0))
        } else if (type === 'drink') {
            setSelectedDrinks(prev => prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(0, item.quantity + change) }
                    : item
            ).filter(item => item.quantity > 0))
        }
    }

    const removeItem = (type: 'meal' | 'breakfast' | 'drink', id: number) => {
        if (type === 'meal') {
            setSelectedMeals(prev => prev.filter(meal => meal.id !== id))
        } else if (type === 'breakfast') {
            setSelectedBreakfasts(prev => prev.filter(item => item.id !== id))
        } else if (type === 'drink') {
            setSelectedDrinks(prev => prev.filter(item => item.id !== id))
        }
    }

    // Calculate totals
    const mealsSubtotal = selectedMeals.reduce((sum, meal) => sum + (meal.price * meal.quantity), 0)
    const breakfastSubtotal = selectedBreakfasts.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const drinksSubtotal = selectedDrinks.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const subtotal = mealsSubtotal + breakfastSubtotal + drinksSubtotal

    const totalItems = selectedMeals.reduce((sum, meal) => sum + meal.quantity, 0) +
        selectedBreakfasts.reduce((sum, item) => sum + item.quantity, 0) +
        selectedDrinks.reduce((sum, item) => sum + item.quantity, 0)

    // Calculate delivery fee based on type
    const getDeliveryFee = () => {
        if (subtotal > 50) return 0
        return deliveryType === 'EXPRESS' ? 9.99 : 4.99
    }

    const deliveryFee = getDeliveryFee()

    // Calculate points earned based on total meals
    const calculatePointsEarned = () => {
        if (totalItems >= 10) return 5
        if (totalItems >= 8) return 4
        if (totalItems >= 6) return 3
        if (totalItems >= 4) return 2
        return 0
    }

    const pointsEarned = calculatePointsEarned()
    const rewardDiscount = useReward && canUseReward ? rewardValue : 0
    const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.amount / 100) : 0
    const total = subtotal + deliveryFee - discountAmount - rewardDiscount

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
                            <Button variant="ghost" size="sm" className="text-primary">
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
                        </CardContent>
                    </Card>

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
                            {selectedMeals.length > 0 && (
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Utensils className="w-4 h-4 text-primary" />
                                        <h4 className="font-semibold text-foreground">{t('joinNow.payment.mainMeals')}</h4>
                                    </div>
                                    <div className="space-y-3">
                                        {selectedMeals.map((meal) => (
                                            <div key={meal.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                                                <img
                                                    src={meal.image}
                                                    alt={meal.name}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                                <div className="flex-1">
                                                    <h5 className="font-medium text-foreground">{meal.name}</h5>
                                                    <p className="text-sm text-muted-foreground">${meal.price} {t('joinNow.payment.each')}</p>
                                                </div>
                                                {isEditingMeals ? (
                                                    <div className="flex items-center space-x-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-6 w-6 p-0"
                                                            onClick={() => updateQuantity('meal', meal.id, -1)}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="w-6 text-center text-sm font-semibold">{meal.quantity}</span>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-6 w-6 p-0"
                                                            onClick={() => updateQuantity('meal', meal.id, 1)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-6 w-6 p-0 text-destructive"
                                                            onClick={() => removeItem('meal', meal.id)}
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="text-right">
                                                        <p className="text-sm text-muted-foreground">{t('joinNow.payment.qty')}: {meal.quantity}</p>
                                                        <p className="font-semibold">${(meal.price * meal.quantity).toFixed(2)}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Breakfast Items */}
                            {selectedBreakfasts.length > 0 && (
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Coffee className="w-4 h-4 text-secondary" />
                                        <h4 className="font-semibold text-foreground">{t('joinNow.payment.breakfast')}</h4>
                                    </div>
                                    <div className="space-y-3">
                                        {selectedBreakfasts.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-4 p-3 bg-secondary/10 rounded-lg">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                                <div className="flex-1">
                                                    <h5 className="font-medium text-foreground">{item.name}</h5>
                                                    <p className="text-sm text-muted-foreground">${item.price} each</p>
                                                </div>
                                                {isEditingMeals ? (
                                                    <div className="flex items-center space-x-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-6 w-6 p-0"
                                                            onClick={() => updateQuantity('breakfast', item.id, -1)}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-6 w-6 p-0"
                                                            onClick={() => updateQuantity('breakfast', item.id, 1)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-6 w-6 p-0 text-destructive"
                                                            onClick={() => removeItem('breakfast', item.id)}
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="text-right">
                                                        <p className="text-sm text-muted-foreground">{t('joinNow.payment.qty')}: {item.quantity}</p>
                                                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Drinks */}
                            {selectedDrinks.length > 0 && (
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Coffee className="w-4 h-4 text-accent" />
                                        <h4 className="font-semibold text-foreground">{t('joinNow.payment.drinks')}</h4>
                                    </div>
                                    <div className="space-y-3">
                                        {selectedDrinks.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-4 p-3 bg-accent/10 rounded-lg">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                                <div className="flex-1">
                                                    <h5 className="font-medium text-foreground">{item.name}</h5>
                                                    <p className="text-sm text-muted-foreground">${item.price} each</p>
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
                                                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                )}
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
                                    <span className="text-2xl font-bold text-primary">{currentPoints}</span>
                                    <span className="text-muted-foreground">/ {rewardThreshold}</span>
                                    <span className="text-sm text-muted-foreground">{t('joinNow.payment.pointsCollected')}</span>
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
                                <div className="flex justify-between text-sm">
                                    <span>{t('joinNow.payment.mealsSubtotal')}</span>
                                    <span>${mealsSubtotal.toFixed(2)}</span>
                                </div>
                                {breakfastSubtotal > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span>{t('joinNow.payment.breakfastSubtotal')}</span>
                                        <span>${breakfastSubtotal.toFixed(2)}</span>
                                    </div>
                                )}
                                {drinksSubtotal > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span>{t('joinNow.payment.drinksSubtotal')}</span>
                                        <span>${drinksSubtotal.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <div className="flex items-center space-x-1">
                                        {deliveryType === 'EXPRESS' ? (
                                            <Zap className="w-3 h-3 text-orange-500" />
                                        ) : (
                                            <Truck className="w-3 h-3" />
                                        )}
                                        <span>
                                            {deliveryType === 'EXPRESS'
                                                ? t('joinNow.payment.expressDelivery')
                                                : t('joinNow.payment.delivery')
                                            }
                                        </span>
                                    </div>
                                    <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : t('joinNow.payment.free')}</span>
                                </div>
                                {appliedDiscount && (
                                    <div className="flex justify-between text-sm text-primary">
                                        <span>{t('joinNow.payment.discount')} ({appliedDiscount.code})</span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                {useReward && canUseReward && (
                                    <div className="flex justify-between text-sm text-primary">
                                        <div className="flex items-center space-x-1">
                                            <Gift className="w-3 h-3" />
                                            <span>{t('joinNow.payment.freeMealReward')}</span>
                                        </div>
                                        <span>-${rewardValue.toFixed(2)}</span>
                                    </div>
                                )}
                            </div>

                            <Separator />

                            <div className="flex justify-between text-lg font-bold">
                                <span>{t('joinNow.payment.total')}</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Discount Code */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-base">
                                <Tag className="w-4 h-4 text-primary" />
                                <span>{t('joinNow.payment.discountCode')}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {!appliedDiscount ? (
                                <div className="flex space-x-2">
                                    <Input
                                        placeholder={t('joinNow.payment.enterDiscountCode')}
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                                        className="flex-1"
                                    />
                                    <Button
                                        onClick={applyDiscount}
                                        disabled={!discountCode}
                                        size="sm"
                                    >
                                        {t('joinNow.payment.apply')}
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                                    <div className="flex items-center space-x-2">
                                        <Check className="w-4 h-4 text-primary" />
                                        <span className="font-medium text-primary">{appliedDiscount.code}</span>
                                        <span className="text-sm text-muted-foreground">
                                            {appliedDiscount.amount}% {t('joinNow.payment.off')}
                                        </span>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={removeDiscount}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

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
                                    className={`p-4 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'ONLINE'
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50'
                                        }`}
                                    onClick={() => setPaymentMethod('ONLINE')}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'ONLINE'
                                            ? 'border-primary bg-primary'
                                            : 'border-border'
                                            }`} />
                                        <div>
                                            <p className="font-medium">{t('joinNow.payment.onlinePayment')}</p>
                                            <p className="text-sm text-muted-foreground">{t('joinNow.payment.paySecurely')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`p-4 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'COD'
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50'
                                        }`}
                                    onClick={() => setPaymentMethod('COD')}
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
                        onClick={() => {
                            // Handle order submission
                            console.log('Order placed:', {
                                paymentMethod,
                                deliveryType,
                                total,
                                pointsEarned,
                                rewardUsed: useReward && canUseReward,
                                items: { selectedMeals, selectedBreakfasts, selectedDrinks }
                            })
                        }}
                    >
                        {paymentMethod === 'COD' ? t('joinNow.payment.placeOrderCOD') : t('joinNow.payment.payAmount', { amount: total.toFixed(2) })}
                    </Button>
                </div>
            </div>
        </div>
    )
}

