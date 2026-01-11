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
import { useQuery } from "@tanstack/react-query"
import { apiRoutes } from "@/routes/api"
import { handleErrorResponse } from "@/utils"
import http from "@/utils/http"

const JoinNow = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { currentStep = 1, planData } = useSelector((state: RootState) => state.joinProcess)
    const admin = useSelector((state: RootState) => state.admin?.user) // Uncomment if auth slice exists

    // Fetch delivery slots from API
    const { isLoading: isLoadingDeliverySlots, data: deliverySlotsResponse } = useQuery<{ data: any[] }>({
        queryKey: ["delivery-slots"],
        queryFn: () =>
            http
                .get(apiRoutes.deliverySlots)
                .then((res) => res.data)
                .catch((e) => {
                    handleErrorResponse(e);
                    throw e;
                }),
        staleTime: 0,
        gcTime: 0,
    });

    // Fetch categories from API
    const { isLoading: isLoadingCategories, data: categoriesResponse } = useQuery<{ data: any[] }>({
        queryKey: ["categories"],
        queryFn: () =>
            http
                .get(apiRoutes.categories)
                .then((res) => res.data)
                .catch((e) => {
                    handleErrorResponse(e);
                    throw e;
                }),
        staleTime: 0,
        gcTime: 0,
    });

    // Fetch plans from API
    const { isLoading: isLoadingPlans, data: plansResponse } = useQuery<{ data: any[] }>({
        queryKey: ["plans"],
        queryFn: () =>
            http
                .get(apiRoutes.plans)
                .then((res) => res.data)
                .catch((e) => {
                    handleErrorResponse(e);
                    throw e;
                }),
        staleTime: 0,
        gcTime: 0,
    });

    // Fetch user's active membership if logged in
    const { data: membershipResponse, isLoading: isLoadingMembership } = useQuery({
        queryKey: ["user-membership", admin?.id],
        queryFn: () =>
            http
                .get(`${apiRoutes.memberships}?user_id=${admin?.id}&status=active`)
                .then((res) => {
                    const memberships = res.data.data ?? res.data
                    return Array.isArray(memberships) ? memberships[0] : null
                })
                .catch(() => null),
        enabled: !!admin?.id,
        staleTime: 0,
        gcTime: 0,
    });



    // Fetch all meals from API (for breakfasts and drinks)
    const { isLoading: isLoadingMeals, data: mealsResponse } = useQuery<{ data: any[] }>({
        queryKey: ["meals", membershipResponse ? "with-membership" : "no-membership"],
        queryFn: () =>
            http
                .get(`${apiRoutes.meals}?active=1&type_id=1&is_membership=${membershipResponse ? '1' : ''}`)
                .then((res) => res.data)
                .catch((e) => {
                    handleErrorResponse(e);
                    throw e;
                }),
        staleTime: 0,
        gcTime: 0,
    });

    // Fetch drinks from API with type_id=2 filter
    const { isLoading: isLoadingDrinks, data: drinksResponse } = useQuery<{ data: any[] }>({
        queryKey: ["meals", "drinks"],
        queryFn: () =>
            http
                .get(`${apiRoutes.meals}?type_id=3`)
                .then((res) => res.data)
                .catch((e) => {
                    handleErrorResponse(e);
                    throw e;
                }),
        staleTime: 0,
        gcTime: 0,
    });

    // Fetch rewards for current user
    const { isLoading: isLoadingRewards, data: rewardsResponse } = useQuery<any>({
        queryKey: ["rewards", admin?.id],
        queryFn: () =>
            http.get(apiRoutes.rewards)
                .then((res) => res.data)
                .catch((error) => {
                    handleErrorResponse(error);
                    throw error;
                }),
        enabled: !!admin?.id,
        staleTime: 0,
        gcTime: 0,
    });

    // Fetch total points earned
    const { isLoading: isLoadingPoints, data: pointsResponse } = useQuery({
        queryKey: ["total-points", admin?.id],
        queryFn: () =>
            http.get(apiRoutes.totalPointsEarned)
                .then((res) => res.data)
                .catch(() => ({ total_points_earned: 0 })),
        enabled: !!admin?.id,
        staleTime: 0,
        gcTime: 0,
    });

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
            if (!planData?.protein || planData?.protein === '') {
                toast.error(t('joinNow.validation.selectProtein'))
                return
            }
            if (!planData?.mealsPerWeek || planData?.mealsPerWeek === 0) {
                toast.error(t('joinNow.validation.selectPlan'))
                return
            }
        }
        // Validate Meals step (step 2)
        if (currentStep === 2) {
            const selectedMealsCount = planData?.selectedMeals
                ? Object.values(planData.selectedMeals).reduce((sum, meal: any) => sum + (meal.quantity || 0), 0)
                : 0
            if (!planData?.mealsPerWeek || selectedMealsCount < planData?.mealsPerWeek) {
                toast.error(t('joinNow.validation.selectAllMeals', 'Please select all your meals before continuing.'))
                return
            }

            // Validate free drinks from membership
            const membershipPlan = membershipResponse?.membership_plan || null
            const hasFreeDesserts = membershipPlan?.includes_free_desserts || false
            const freeDessertsQuantity = Number(membershipPlan?.free_desserts_quantity || 0)

            if (hasFreeDesserts && freeDessertsQuantity > 0) {
                const selectedFreeDrinksCount = planData?.selectedFreeDrinks
                    ? Object.values(planData.selectedFreeDrinks).reduce((sum, drink: any) => sum + (drink.quantity || 0), 0)
                    : 0

                if (selectedFreeDrinksCount < freeDessertsQuantity) {
                    toast.error(t('joinNow.validation.selectFreeDrinks', `Please select all ${freeDessertsQuantity} free drinks from your membership before continuing.`))
                    return
                }
            }
        }
        // Validate Address step (step 3)
        if (currentStep === 3) {
            if (
                !planData?.firstName ||
                !planData?.lastName ||
                !planData?.phoneNumber ||
                !planData?.address
            ) {
                toast.error(t('joinNow.validation.fillAllFields', 'Please fill in all required fields.'))
                return
            }

            // Validate delivery slots selection
            if (!planData?.delivery_slot_ids || planData?.delivery_slot_ids.length === 0) {
                toast.error(t('joinNow.validation.selectDeliverySlot', 'Please select at least one delivery time slot.'))
                return
            }

            console.log('planData.password', planData?.password);
            console.log('planData.email', planData?.email);

            if (!admin?.id) {
                console.log('ha  admin', admin);

                if (!planData?.email || !planData?.password) {
                    toast.error(t('joinNow.validation.fillAccountFields', 'Please fill in email and password.'))
                    return
                }
                if (planData?.password !== planData?.repeatPassword) {
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

    // Prepare props for each component
    const getComponentProps = () => {
        const commonProps = {
            categoriesData: categoriesResponse?.data || [],
            plansData: plansResponse?.data || [],
            membershipData: membershipResponse || null,
            isLoadingCategories,
            isLoadingPlans,
            isLoadingMembership
        }

        switch (currentStep) {
            case 1:
                return commonProps
            case 2:
                return {
                    ...commonProps,
                    // weeklyMenuData: weeklyMenuResponse?.data?.[0] || null,
                    mealsData: mealsResponse?.data || [],
                    drinksData: drinksResponse?.data || [],
                    rewardsData: rewardsResponse,
                    // isLoadingMenu,
                    isLoadingMeals,
                    isLoadingDrinks,
                    isLoadingRewards
                }
            case 3:
                return {
                    deliverySlotsData: deliverySlotsResponse?.data || [],
                    membershipData: membershipResponse || null,
                    isLoadingDeliverySlots
                }
            case 4:
                return {
                    membershipData: membershipResponse || null,
                    pointsData: pointsResponse?.total_points_earned || 0,
                    isLoadingPoints,
                    deliverySlotsData: deliverySlotsResponse?.data || []
                }
            default:
                return {}
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 pt-20">
            <div className="container mx-auto px-4 py-8">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between   mx-auto gap-0 sm:gap-0">
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
                <div className=" mx-auto max-w-6xl">
                    {CurrentStepComponent && (
                        <CurrentStepComponent {...getComponentProps()} />
                    )}
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row justify-between items-center  mx-auto mt-8 gap-4 sm:gap-0">
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