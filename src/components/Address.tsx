import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
    Globe,
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

export function Address() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const planData = useSelector((state: RootState) => state.joinProcess.planData)
    const admin = useSelector((state: RootState) => state.admin?.user?.id) // Uncomment if auth slice exists

   

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
    const [isManualAddress, setIsManualAddress] = useState(true)
    const [addressSuggestions, setAddressSuggestions] = useState<string[]>([])
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
        }
    }, [planData])

    const handleInputChange = (field: string, value: string) => {
        const updatedData = { ...addressData, [field]: value }
        setAddressData(updatedData)
        dispatch(updatePlanData({ [field]: value }))
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
            addressData.address;
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
