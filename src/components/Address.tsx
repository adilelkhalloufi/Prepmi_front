import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { updatePlanData } from "@/store/slices/joinProcessSlice"
import {
    User,
    Phone,
    MapPin,
    Truck,
    Clock,
    Shield,
    Mail,

    Lock
} from "lucide-react"
import { useTranslation } from "react-i18next"



const hearAboutUsOptions = [
    { value: 'google', label: 'Google Search' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'friend', label: 'Friend/Family' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'other', label: 'Other' }
]

export function Address({ deliverySlotsData = [], membershipData = null, isLoadingDeliverySlots = false }: {
    deliverySlotsData?: any[],
    membershipData?: any,
    isLoadingDeliverySlots?: boolean
}) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const planData = useSelector((state: RootState) => state.joinProcess.planData)
    const admin = useSelector((state: RootState) => state.admin?.user?.id) // Uncomment if auth slice exists

    // Filter delivery slots based on membership status
    const filteredDeliverySlots = deliverySlotsData.filter((slot: any) => {
        if (!slot.is_active) return false

        // Check if user has active membership
        const hasActiveMembership = membershipData && membershipData.status === 'active'

        if (hasActiveMembership) {
            // Show membership and both types for membership users
            return slot.slot_type === 'membership' || slot.slot_type === 'both'
        } else {
            // Show only normal and both types for non-membership users (exclude membership-only slots)
            return slot.slot_type === 'normal' || slot.slot_type === 'both'
        }
    })

    const [addressData, setAddressData] = useState({
        firstName: planData?.firstName || '',
        lastName: planData?.lastName || '',
        phoneNumber: planData?.phoneNumber || '',
        country: planData?.country || '',
        address: planData?.address || '',
        hearAboutUs: planData?.hearAboutUs || '',
        email: planData?.email || '',
        password: '',
        repeatPassword: ''
    })
    const [selectedDeliverySlots, setSelectedDeliverySlots] = useState<number[]>(
        planData?.delivery_slot_ids || []
    )
    const [isManualAddress, setIsManualAddress] = useState(true)
    const [addressSuggestions, setAddressSuggestions] = useState<string[]>([])
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    console.log('membershipData :', membershipData);
    // Update local state when Redux state changes
    useEffect(() => {
        if (planData) {
            setAddressData(prev => ({
                ...prev,
                firstName: planData.firstName || '',
                lastName: planData.lastName || '',
                phoneNumber: planData.phoneNumber || '',
                country: planData.country || 'UK',
                address: planData.address || '',
                hearAboutUs: planData.hearAboutUs || '',
                email: planData.email || ''
            }))
            setSelectedDeliverySlots(planData.delivery_slot_ids || [])
        }
    }, [planData])

    const handleInputChange = (field: string, value: string) => {
        const updatedData = { ...addressData, [field]: value }
        setAddressData(updatedData)
        dispatch(updatePlanData({ [field]: value }))
    }

    const handleDeliverySlotToggle = (slotId: number) => {
        const hasActiveMembership = membershipData && membershipData.status === 'active'
        
        let updatedSlots: number[]
        
        if (selectedDeliverySlots.includes(slotId)) {
            // Remove the slot if already selected
            updatedSlots = selectedDeliverySlots.filter(id => id !== slotId)
        } else {
            // Add the slot
            if (hasActiveMembership) {
                // Members can select up to 2 slots
                if (selectedDeliverySlots.length < 2) {
                    updatedSlots = [...selectedDeliverySlots, slotId]
                } else {
                    // Already have 2 slots, don't add more
                    return
                }
            } else {
                // Non-members can only select one slot (replace existing)
                updatedSlots = [slotId]
            }
        }

        setSelectedDeliverySlots(updatedSlots)
        dispatch(updatePlanData({ delivery_slot_ids: updatedSlots }))
    }

    // Address search handler using Nominatim API
    const handleAddressSearch = (query: string) => {
        setAddressData(prev => ({ ...prev, address: query }))
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
        if (!query || query.length < 3) {
            setAddressSuggestions([])
            return
        }
        setIsLoadingSuggestions(true)
        searchTimeoutRef.current = setTimeout(() => {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`)
                .then(res => res.json())
                .then(data => {
                    setAddressSuggestions(data.map((item: any) => item.display_name))
                    setIsLoadingSuggestions(false)
                })
                .catch(() => {
                    setAddressSuggestions([])
                    setIsLoadingSuggestions(false)
                })
        }, 400)
    }

    const isFormValid = () => {
        const basicValid = addressData.firstName &&
            addressData.lastName &&
            addressData.phoneNumber &&
            addressData.address &&
            selectedDeliverySlots.length > 0; // Require at least one delivery slot
        if (!admin) {

            return basicValid && addressData.email && addressData.password && addressData.password === addressData.repeatPassword;
        }
        return basicValid;
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                    {t('joinNow.address.title')}
                </h2>
                <p className="text-muted-foreground">
                    {t('joinNow.address.subtitle')}
                </p>
            </div>

            {/* Personal Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-primary" />
                        <span>{t('joinNow.address.personalInformation')}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-foreground font-medium">
                                {t('joinNow.address.firstName')} *
                            </Label>
                            <Input
                                id="firstName"
                                type="text"
                                value={addressData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                placeholder={t('joinNow.address.firstNamePlaceholder', 'Enter your first name')}
                                className="border-border focus:border-primary"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-foreground font-medium">
                                {t('joinNow.address.lastName')} *
                            </Label>
                            <Input
                                id="lastName"
                                type="text"
                                value={addressData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                placeholder={t('joinNow.address.lastNamePlaceholder', 'Enter your last name')}
                                className="border-border focus:border-primary"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className="text-foreground font-medium">
                                {t('joinNow.address.phoneNumber')} *
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="phoneNumber"
                                    type="tel"
                                    value={addressData.phoneNumber}
                                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                    placeholder={t('joinNow.address.phoneNumberPlaceholder', 'phone number')}
                                    className="pl-10 border-border focus:border-primary"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Account Information - shown if not connected */}
            {!admin && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Mail className="w-5 h-5 text-primary" />
                            <span>{t('joinNow.address.accountInformation')}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-foreground font-medium">
                                {t('joinNow.address.email')} *
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={addressData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder={t('joinNow.address.emailPlaceholder', 'Enter your email')}
                                    className="pl-10 border-border focus:border-primary"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-foreground font-medium">
                                    {t('joinNow.address.password')} *
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        value={addressData.password}
                                        onChange={(e) => setAddressData(prev => ({ ...prev, password: e.target.value }))}
                                        onBlur={() => dispatch(updatePlanData({ password: addressData.password }))}
                                        placeholder={t('joinNow.address.passwordPlaceholder', 'Enter your password')}
                                        className="pl-10 border-border focus:border-primary"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="repeatPassword" className="text-foreground font-medium">
                                    {t('joinNow.address.repeatPassword')} *
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="repeatPassword"
                                        type="password"
                                        value={addressData.repeatPassword}
                                        onChange={(e) => setAddressData(prev => ({ ...prev, repeatPassword: e.target.value }))}
                                        onBlur={() => dispatch(updatePlanData({ repeatPassword: addressData.repeatPassword }))}
                                        placeholder={t('joinNow.address.repeatPasswordPlaceholder', 'Repeat your password')}
                                        className="pl-10 border-border focus:border-primary"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Delivery Address */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span>{t('joinNow.address.deliveryAddress')} *</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        {!isManualAddress ? (
                            <div className="space-y-3">
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        value={addressData.address}
                                        onChange={(e) => handleAddressSearch(e.target.value)}
                                        placeholder={t('joinNow.address.addressSearch', 'Start typing your address...')}
                                        className="pl-10 border-border focus:border-primary"
                                        autoComplete="off"
                                    />
                                    {isLoadingSuggestions && (
                                        <div className="absolute left-0 right-0 top-full bg-white border border-border z-10 p-2 text-sm">
                                            {t('joinNow.address.loading', 'Searching...')}
                                        </div>
                                    )}
                                    {addressSuggestions.length > 0 && (
                                        <ul className="absolute left-0 right-0 top-full bg-white border border-border z-10 mt-1 rounded shadow">
                                            {addressSuggestions.map((suggestion, idx) => (
                                                <li
                                                    key={idx}
                                                    className="px-3 py-2 cursor-pointer hover:bg-primary/10"
                                                    onClick={() => {
                                                        setAddressData(prev => ({ ...prev, address: suggestion }))
                                                        setAddressSuggestions([])
                                                        dispatch(updatePlanData({ address: suggestion }))
                                                    }}
                                                >
                                                    {suggestion}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsManualAddress(true)}
                                    className="text-primary hover:text-primary/80 h-auto p-0 font-normal"
                                >
                                    {t('joinNow.address.manualEntry')}
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Input
                                    type="text"
                                    value={addressData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    placeholder={t('joinNow.address.fullAddress', 'Enter your full address')}
                                    className="border-border focus:border-primary"
                                />
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsManualAddress(false)}
                                    className="text-primary hover:text-primary/80 h-auto p-0 font-normal"
                                >
                                    {t('joinNow.address.searchAddress')}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Delivery Information */}
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg border border-primary/20">
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                                    <Shield className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        {t('joinNow.address.freshness')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                                    <Mail className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        {t('joinNow.address.updates')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                                    <Truck className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        {t('joinNow.address.delivery')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Delivery Slots Selection */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <span>{t('joinNow.address.deliverySlots', 'Select Delivery Time Slots')} *</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isLoadingDeliverySlots ? (
                        <div className="text-center py-4">
                            <p className="text-muted-foreground">{t('joinNow.address.loadingSlots', 'Loading delivery slots...')}</p>
                        </div>
                    ) : filteredDeliverySlots.length === 0 ? (
                        <div className="text-center py-4">
                            <p className="text-muted-foreground">{t('joinNow.address.noSlots', 'No delivery slots available')}</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                                {t('joinNow.address.selectSlotsDescription', 'Select your preferred delivery time slots')}
                            </p>
                            {membershipData && membershipData.status === 'active' ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                                    <p className="text-sm text-green-800 font-medium">
                                        {t('joinNow.address.membershipMultipleSlots', '✨ As a member, you can select up to 2 delivery slots!')}
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                                    <p className="text-sm text-blue-800">
                                        {t('joinNow.address.nonMemberSingleSlot', 'You can select one delivery slot. Upgrade to membership to select up to 2 slots.')}
                                    </p>
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {filteredDeliverySlots.map((slot: any) => {
                                    const isSelected = selectedDeliverySlots.includes(slot.id)
                                    const isFull = slot.current_bookings >= slot.max_capacity
                                    const hasActiveMembership = membershipData && membershipData.status === 'active'
                                    const isMaxSlotsReached = hasActiveMembership && selectedDeliverySlots.length >= 2 && !isSelected
                                    const isDisabled = isFull || isMaxSlotsReached

                                    return (
                                        <div
                                            key={slot.id}
                                            className={`relative border rounded-lg p-4 cursor-pointer transition-all ${isSelected
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border hover:border-primary/50'
                                                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => !isDisabled && handleDeliverySlotToggle(slot.id)}
                                        >
                                            <div className="flex items-start space-x-3">
                                                <Checkbox
                                                    checked={isSelected}
                                                    disabled={isDisabled}
                                                    onCheckedChange={() => !isDisabled && handleDeliverySlotToggle(slot.id)}
                                                    className="mt-1"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-semibold text-foreground">
                                                            {t(`joinNow.address.days.${slot.day_of_week}`, ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][slot.day_of_week])}

                                                        </h4>

                                                    </div>
                                                    <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{slot.start_time} - {slot.end_time}</span>
                                                    </div>



                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            {selectedDeliverySlots.length === 0 && (
                                <p className="text-sm text-red-500 mt-2">
                                    {t('joinNow.address.selectAtLeastOneSlot', 'Please select at least one delivery slot')}
                                </p>
                            )}
                            {membershipData && membershipData.status === 'active' && selectedDeliverySlots.length === 2 && (
                                <p className="text-sm text-green-600 mt-2">
                                    {t('joinNow.address.maxSlotsReached', '✓ Maximum slots selected (2/2)')}
                                </p>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Marketing Source */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        {t('joinNow.address.hearAbout')}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Select
                        value={addressData.hearAboutUs}
                        onValueChange={(value) => handleInputChange('hearAboutUs', value)}
                    >
                        <SelectTrigger className="border-border focus:border-primary">
                            <SelectValue placeholder={t('joinNow.address.selectSource')} />
                        </SelectTrigger>
                        <SelectContent>
                            {hearAboutUsOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Form Validation Indicator */}
            {!isFormValid() && (
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        {t('joinNow.address.requiredFields')}
                    </p>
                </div>
            )}
        </div>
    )
}
