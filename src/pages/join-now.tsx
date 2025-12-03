import { Plan } from "@/components/Plan"
import { Meals } from "@/components/Meals"
import { Address } from "@/components/Address"
import { Payment } from "@/components/Payment"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { nextStep, prevStep } from "@/store/slices/joinProcessSlice"
import { useEffect } from "react"
import { toast } from "sonner"

const JoinNow = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { currentStep, planData } = useSelector((state: RootState) => state.joinProcess)
    const admin = useSelector((state: RootState) => state.admin?.user) // Uncomment if auth slice exists

    const steps = [
        { id: 1, title: t('joinNow.steps.plan'), component: Plan },
        { id: 2, title: t('joinNow.steps.meals'), component: Meals },
        { id: 3, title: t('joinNow.steps.address'), component: Address },
        { id: 4, title: t('joinNow.steps.payment'), component: Payment }
    ]

    // Scroll to top when step changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [currentStep])

    const handleNext = () => {
        // Validate Plan step (step 1)
        if (currentStep === 1) {
            if (!planData.protein || planData.protein === '') {
                toast.error(t('joinNow.validation.selectProtein'))
                return
            }
            if (!planData.mealsPerWeek || planData.mealsPerWeek === 0) {
                toast.error(t('joinNow.validation.selectPlan'))
                return
            }
        }
        // Validate Meals step (step 2)
        if (currentStep === 2) {
            const selectedMealsCount = planData.selectedMeals
                ? Object.values(planData.selectedMeals).reduce((sum, qty) => sum + qty, 0)
                : 0
            if (!planData.mealsPerWeek || selectedMealsCount < planData.mealsPerWeek) {
                toast.error(t('joinNow.validation.selectAllMeals', 'Please select all your meals before continuing.'))
                return
            }
        }
        // Validate Address step (step 3)
        if (currentStep === 3) {
             if (
                !planData.firstName ||
                !planData.lastName ||
                !planData.phoneNumber ||
                !planData.address
            ) {
                toast.error(t('joinNow.validation.fillAllFields', 'Please fill in all required fields.'))
                return
            }
            console.log('planData.password', planData.password);
            console.log('planData.email', planData.email);

            if (!admin?.id) {
                console.log('ha  admin', admin);

                if (!planData.email || !planData.password) {
                    toast.error(t('joinNow.validation.fillAccountFields', 'Please fill in email and password.'))
                    return
                }
                if (planData.password !== planData.repeatPassword) {
                    toast.error(t('joinNow.validation.passwordMismatch', 'Passwords do not match.'))
                    return
                }
            }
        }

        dispatch(nextStep())
    }

    const handlePrev = () => {
        dispatch(prevStep())
    }

    const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 pt-20">
            <div className="container mx-auto px-4 py-8">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between max-w-4xl mx-auto gap-0 sm:gap-0">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto">
                                <div className="flex items-center w-full">
                                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base flex-shrink-0 ${currentStep >= step.id
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-gray-200 text-gray-500'
                                        }`}>
                                        {step.id}
                                    </div>
                                    <span className={`ml-2 font-medium text-sm sm:text-base ${currentStep >= step.id ? 'text-primary' : 'text-gray-500'
                                        }`}>
                                        {step.title}
                                    </span>
                                    {/* Desktop: Horizontal connector */}
                                    {index < steps.length - 1 && (
                                        <div className={`hidden sm:block w-16 h-1 mx-4 flex-shrink-0 ${currentStep > step.id ? 'bg-primary' : 'bg-gray-200'
                                            }`} />
                                    )}
                                </div>
                                {/* Mobile: Vertical connector */}
                                {index < steps.length - 1 && (
                                    <div className={`sm:hidden w-1 h-6 ml-4 my-2 ${currentStep > step.id ? 'bg-primary' : 'bg-gray-200'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <div className="max-w-4xl mx-auto">
                    {CurrentStepComponent && (
                        <CurrentStepComponent />
                    )}
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row justify-between items-center max-w-4xl mx-auto mt-8 gap-4 sm:gap-0">
                    <Button
                        variant="outline"
                        onClick={handlePrev}
                        disabled={currentStep === 1}
                        className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto order-2 sm:order-1"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        {t('joinNow.navigation.previous')}
                    </Button>

                    <Button
                        onClick={handleNext}
                        disabled={currentStep === steps.length}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto order-1 sm:order-2"
                    >
                        {t('joinNow.navigation.next')}
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </main>
    )
}

export default JoinNow