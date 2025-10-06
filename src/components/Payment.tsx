import { useState } from "react"
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
    Check
} from "lucide-react"

interface PaymentProps {
    data: {
        protein: string
        portion: string
        mealsPerWeek: number
        firstName: string
        lastName: string
        phoneNumber: string
        country: string
        address: string
        hearAboutUs: string
        selectedMeals?: { [key: number]: number }
        selectedBreakfasts?: { [key: number]: number }
        selectedDrinks?: { [key: number]: number }
    }
    onUpdate: (data: any) => void
}

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

export function Payment({ data, onUpdate }: PaymentProps) {
    const { t } = useTranslation()
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('ONLINE')
    const [discountCode, setDiscountCode] = useState('')
    const [appliedDiscount, setAppliedDiscount] = useState<{ code: string, amount: number } | null>(null)
    const [isEditingMeals, setIsEditingMeals] = useState(false)
    const [selectedMeals, setSelectedMeals] = useState(mockSelectedMeals)
    const [selectedBreakfasts, setSelectedBreakfasts] = useState(mockSelectedBreakfasts)
    const [selectedDrinks, setSelectedDrinks] = useState(mockSelectedDrinks)

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
    const deliveryFee = subtotal > 50 ? 0 : 4.99
    const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.amount / 100) : 0
    const total = subtotal + deliveryFee - discountAmount

    const totalItems = selectedMeals.reduce((sum, meal) => sum + meal.quantity, 0) +
        selectedBreakfasts.reduce((sum, item) => sum + item.quantity, 0) +
        selectedDrinks.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                    {t('joinNow.payment.title', 'ORDER SUMMARY & PAYMENT')}
                </h2>
                <p className="text-muted-foreground">
                    {t('joinNow.payment.subtitle', 'Review your order and complete your purchase')}
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
                                <span>Customer Details</span>
                            </CardTitle>
                            <Button variant="ghost" size="sm" className="text-primary">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="font-semibold">{data.firstName} {data.lastName}</p>
                                <p className="text-sm text-muted-foreground">{data.phoneNumber}</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                                <div>
                                    <p className="text-sm font-medium">Delivery Address</p>
                                    <p className="text-sm text-muted-foreground">{data.address}</p>
                                    <p className="text-sm text-muted-foreground">{data.country}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Order Items */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center space-x-2">
                                <ShoppingCart className="w-5 h-5 text-primary" />
                                <span>Your Order ({totalItems} items)</span>
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary"
                                onClick={() => setIsEditingMeals(!isEditingMeals)}
                            >
                                <Edit className="w-4 h-4 mr-1" />
                                {isEditingMeals ? 'Done' : 'Edit'}
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Main Meals */}
                            {selectedMeals.length > 0 && (
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Utensils className="w-4 h-4 text-primary" />
                                        <h4 className="font-semibold text-foreground">Main Meals</h4>
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
                                                    <p className="text-sm text-muted-foreground">${meal.price} each</p>
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
                                                        <p className="text-sm text-muted-foreground">Qty: {meal.quantity}</p>
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
                                        <h4 className="font-semibold text-foreground">Breakfast</h4>
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
                                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
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
                                        <h4 className="font-semibold text-foreground">Drinks</h4>
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
                                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
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
                    {/* Order Total */}
                    <Card className="sticky top-4">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Receipt className="w-5 h-5 text-primary" />
                                <span>Order Summary</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Meals Subtotal</span>
                                    <span>${mealsSubtotal.toFixed(2)}</span>
                                </div>
                                {breakfastSubtotal > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span>Breakfast Subtotal</span>
                                        <span>${breakfastSubtotal.toFixed(2)}</span>
                                    </div>
                                )}
                                {drinksSubtotal > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span>Drinks Subtotal</span>
                                        <span>${drinksSubtotal.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <div className="flex items-center space-x-1">
                                        <Truck className="w-3 h-3" />
                                        <span>Delivery</span>
                                    </div>
                                    <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'FREE'}</span>
                                </div>
                                {appliedDiscount && (
                                    <div className="flex justify-between text-sm text-primary">
                                        <span>Discount ({appliedDiscount.code})</span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                            </div>

                            <Separator />

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Discount Code */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-base">
                                <Tag className="w-4 h-4 text-primary" />
                                <span>Discount Code</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {!appliedDiscount ? (
                                <div className="flex space-x-2">
                                    <Input
                                        placeholder="Enter discount code"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                                        className="flex-1"
                                    />
                                    <Button
                                        onClick={applyDiscount}
                                        disabled={!discountCode}
                                        size="sm"
                                    >
                                        Apply
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                                    <div className="flex items-center space-x-2">
                                        <Check className="w-4 h-4 text-primary" />
                                        <span className="font-medium text-primary">{appliedDiscount.code}</span>
                                        <span className="text-sm text-muted-foreground">
                                            {appliedDiscount.amount}% off
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
                                <span>Payment Method</span>
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
                                            <p className="font-medium">Online Payment</p>
                                            <p className="text-sm text-muted-foreground">Pay securely with card</p>
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
                                            <p className="font-medium">Cash on Delivery</p>
                                            <p className="text-sm text-muted-foreground">Pay when you receive</p>
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
                                total,
                                items: { selectedMeals, selectedBreakfasts, selectedDrinks }
                            })
                        }}
                    >
                        {paymentMethod === 'COD' ? 'Place Order (COD)' : `Pay $${total.toFixed(2)}`}
                    </Button>
                </div>
            </div>
        </div>
    )
}
