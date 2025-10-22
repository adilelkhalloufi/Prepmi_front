import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type JoinProcessState = {
  currentStep?: number,
  planData?: {
    // Plan selection
    planId?: number
    protein?: string
    portion?: string
    mealsPerWeek?: number
    pricePerWeek?: number
    deliveryFee?: number
    isFreeShipping?: boolean
    
    // Personal details
    firstName?: string
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
    protein: '',
    portion: '',
    mealsPerWeek: 10,
    pricePerWeek: 0,
    deliveryFee: 0,
    isFreeShipping: false,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    country: 'UK',
    address: '',
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


