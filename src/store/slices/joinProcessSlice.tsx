import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Plan, Category } from '@/interfaces/admin'

export type MealSelection = {
  id: number
  name: string
  protein?: number
  calories?: number
  price?: number
  image_url?: string
  image_path?: string
  quantity: number
  // Add other fields as needed
}

export type JoinProcessState = {
  currentStep?: number
  planData?: {
    // Plan selection
    planId?: number
    planName?: string
    protein?: string
    categoryId?: number
    categoryName?: string
    category?: Category // Store the complete category object
    portion?: string
    mealsPerWeek?: number
    pricePerWeek?: number
    deliveryFee?: number
    isFreeShipping?: boolean
    pointsValue?: number
    plan?: Plan // Store the complete plan object

    // Personal details
    firstName?: string
    lastName?: string
    phoneNumber?: string
    country?: string
    address?: string
    hearAboutUs?: string

    // Meal selections
    selectedMeals?: Record<string, MealSelection>
    selectedBreakfasts?: Record<string, MealSelection>
    selectedDrinks?: Record<string, MealSelection>
    paymentMethod?: 'COD' | 'ONLINE'
  }
}

const initialState: JoinProcessState = {
  currentStep: 1,
  planData: {
    planId: undefined,
    planName: '',
    protein: '',
    categoryId: undefined,
    categoryName: '',
    category: undefined,
    portion: '',
    mealsPerWeek: 10,
    pricePerWeek: 0,
    deliveryFee: 0,
    isFreeShipping: false,
    pointsValue: 0,
    plan: undefined,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    country: '',
    address: '',
    hearAboutUs: '',
    selectedMeals: {},
    selectedBreakfasts: {},
    selectedDrinks: {},
    paymentMethod: 'COD'
  }
}

export const joinProcessSlice = createSlice({
  name: 'joinProcess',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    updatePlanData: (state, action: PayloadAction<Partial<JoinProcessState['planData']>>) => {
      state.planData = { ...state.planData, ...action.payload }
    },
    nextStep: (state) => {
      if (state.currentStep < 4) {
        state.currentStep += 1
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1
      }
    },
    resetJoinProcess: (state) => {
      return initialState
    },
    clearPlan: (state) => {
      if (state.planData) {
        state.planData.plan = undefined
      }
    }
  }
})

export const { setCurrentStep, updatePlanData, nextStep, prevStep, resetJoinProcess, clearPlan } = joinProcessSlice.actions
export default joinProcessSlice.reducer


