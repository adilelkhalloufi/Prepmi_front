import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "react-i18next"
import {
    User,
    Phone,
    MapPin,
    Truck,
    Clock,
    Shield,
    Mail,
    Globe
} from "lucide-react"

interface AddressProps {
    data: {
        firstName: string
        lastName: string
        phoneNumber: string
        country: string
        address: string
        hearAboutUs: string
    }
    onUpdate: (data: any) => void
}

const countries = [
    { value: 'UK', label: 'United Kingdom' },
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' }
]

const hearAboutUsOptions = [
    { value: 'google', label: 'Google Search' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'friend', label: 'Friend/Family' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'other', label: 'Other' }
]

export function Address({ data, onUpdate }: AddressProps) {
    const { t } = useTranslation()
    const [addressData, setAddressData] = useState({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phoneNumber: data.phoneNumber || '',
        country: data.country || 'UK',
        address: data.address || '',
        hearAboutUs: data.hearAboutUs || ''
    })
    const [isManualAddress, setIsManualAddress] = useState(false)

    const handleInputChange = (field: string, value: string) => {
        const updatedData = { ...addressData, [field]: value }
        setAddressData(updatedData)
        onUpdate(updatedData)
    }

    const isFormValid = () => {
        return addressData.firstName &&
            addressData.lastName &&
            addressData.phoneNumber &&
            addressData.address
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                    {t('joinNow.address.title', 'DELIVERY DETAILS')}
                </h2>
                <p className="text-muted-foreground">
                    {t('joinNow.address.subtitle', 'Tell us where to deliver your delicious meals')}
                </p>
            </div>

            {/* Personal Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-primary" />
                        <span>Personal Information</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-foreground font-medium">
                                {t('joinNow.address.firstName', 'FIRST NAME')} *
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
                                {t('joinNow.address.lastName', 'LAST NAME')} *
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
                            <Label htmlFor="country" className="text-foreground font-medium">
                                {t('joinNow.address.country', 'COUNTRY')}
                            </Label>
                            <Select
                                value={addressData.country}
                                onValueChange={(value) => handleInputChange('country', value)}
                            >
                                <SelectTrigger className="border-border focus:border-primary">
                                    <SelectValue>
                                        <div className="flex items-center space-x-2">
                                            <Globe className="w-4 h-4 text-muted-foreground" />
                                            <span>{countries.find(c => c.value === addressData.country)?.label}</span>
                                        </div>
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {countries.map((country) => (
                                        <SelectItem key={country.value} value={country.value}>
                                            {country.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className="text-foreground font-medium">
                                {t('joinNow.address.phoneNumber', 'PHONE NUMBER')} *
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

            {/* Delivery Address */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span>DELIVERY ADDRESS *</span>
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
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        placeholder={t('joinNow.address.addressSearch', 'start typing your address...')}
                                        className="pl-10 border-border focus:border-primary"
                                    />
                                </div>
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsManualAddress(true)}
                                    className="text-primary hover:text-primary/80 h-auto p-0 font-normal"
                                >
                                    {t('joinNow.address.manualEntry', 'Or enter your address manually')}
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
                                    {t('joinNow.address.searchAddress', 'Search for address instead')}
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
                                        {t('joinNow.address.freshness', 'Insulated packaging keeps your meals fresh for up to 12 hours')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                                    <Mail className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        {t('joinNow.address.updates', 'Delivery slot updates on the day via text and email')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                                    <Truck className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        {t('joinNow.address.delivery', 'Free delivery on all orders over $50')}
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
                        {t('joinNow.address.hearAbout', 'HOW DID YOU HEAR ABOUT PREPME?')}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Select
                        value={addressData.hearAboutUs}
                        onValueChange={(value) => handleInputChange('hearAboutUs', value)}
                    >
                        <SelectTrigger className="border-border focus:border-primary">
                            <SelectValue placeholder={t('joinNow.address.selectSource', 'Select how you heard about us')} />
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
                        {t('joinNow.address.requiredFields', 'Please fill in all required fields to continue')}
                    </p>
                </div>
            )}
        </div>
    )
}
