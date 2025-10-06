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

const JoinNow = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { currentStep, planData } = useSelector((state: RootState) => state.joinProcess)

    const steps = [
        { id: 1, title: t('joinNow.steps.plan'), component: Plan },
        { id: 2, title: t('joinNow.steps.meals'), component: Meals },
        { id: 3, title: t('joinNow.steps.address'), component: Address },
        { id: 4, title: t('joinNow.steps.payment'), component: Payment }
    ]

    const handleNext = () => {
        dispatch(nextStep())
    }

    const handlePrev = () => {
        dispatch(prevStep())
    }

    const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5">
            <div className="container mx-auto px-4 py-8">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between max-w-4xl mx-auto">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep >= step.id
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {step.id}
                                </div>
                                <span className={`ml-2 font-medium ${currentStep >= step.id ? 'text-primary' : 'text-gray-500'
                                    }`}>
                                    {step.title}
                                </span>
                                {index < steps.length - 1 && (
                                    <div className={`w-16 h-1 mx-4 ${currentStep > step.id ? 'bg-primary' : 'bg-gray-200'
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
                <div className="flex justify-between items-center max-w-4xl mx-auto mt-8">
                    <Button
                        variant="outline"
                        onClick={handlePrev}
                        disabled={currentStep === 1}
                        className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        {t('joinNow.navigation.previous')}
                    </Button>

                    <Button
                        onClick={handleNext}
                        disabled={currentStep === steps.length}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
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