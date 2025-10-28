import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Plan, Category } from '@/interfaces/admin'

export type JoinProcessState = {
  currentStep?: number,
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
    email?: string
    password?: string
    repeatPassword?: string
    lastName?: string
    phoneNumber?: string
    country?: string
    address?: string
    hearAboutUs?: string
    
    // Meal selections
    selectedMeals?: Record<string, any>
    selectedBreakfasts?: Record<string, any>
    selectedDrinks?: Record<string, any>
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
    mealsPerWeek: undefined,
    pricePerWeek: 0,
    deliveryFee: 0,
    isFreeShipping: false,
    pointsValue: 0,
    plan: undefined,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    country: 'UK',
    address: '',
    email: '',
    password: '',
    repeatPassword: '',
    hearAboutUs: '',
    selectedMeals: {},
    selectedBreakfasts: {},
    selectedDrinks: {}
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
    }
  }
})

export const { setCurrentStep, updatePlanData, nextStep, prevStep, resetJoinProcess } = joinProcessSlice.actions
export default joinProcessSlice.reducer


