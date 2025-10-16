export interface Admin {
    token?: string
    user?: User
    register?: RegisterForm
    favoris?: Favoris[]
}
export interface Favoris {
    id?: any
}

export interface Specialitie {
    id: any
    name: any
    slug?: string
    description?: string
}
export interface Cart {
    products: Meal[]
}
export interface RegisterForm {

    company_name?: string
    role?: string
    password?: string
    email?: string
    specialitie_id?: number
    interests?: number[]
    phone?: string
    address?: string
    zip_code?: string
    city_id?: string
    country?: string
    agreement?: boolean
    company_logo?: string
    first_name?: string
    last_name?: string

}

export interface User {
    id?: number
    name?: string
    email?: string
    phone?: string
    password?: string
    role?: any
    token?: string
    coins?: number
    address?: string
    company?: string
}

export interface joinProcess {
    currentStep: number,
    planData: {
        protein: string
        portion: string
        mealsPerWeek: number
        firstName: string
        lastName: string
        phoneNumber: string
        country: string
        address: string
        hearAboutUs: string
        selectedMeals: Record<string, any>
        selectedBreakfasts: Record<string, any>
        selectedDrinks: Record<string, any>

    }
}

export interface ModalOption {
    handleCancel?: any
    isModalVisible?: any
    isUpdate?: any
}

export interface Company {
    id: string
    name?: string
    email?: string
    phone?: string
    address?: string
    logo?: string
    website?: string
    zip_code?: string
}



export interface Categorie {
    id: any
    name: any
    slug?: string
    description?: string
    family_id?: number
    subcategories?: Categorie[]
}

export interface Unite {
    id: any
    name: any
    slug?: string
    description?: string
}
export interface Order {
    id: any
    user?: User
    product?: Meal
    quantity: number
    price: number
    note?: string
    address?: string
    payment?: string
    status?: Status
}
export interface Setting {
    id: any
    licence?: string
    expired?: boolean
    expired_date?: Date
    invoice_number?: number
    order_purchase_number?: number
    order_sale_number?: number
    header?: string
    footer?: string
    company_name?: string
}

export interface Status {

    name: any
    color?: "default" | "secondary" | "destructive" | "outline"
}
export interface Nutrition {
    calories: number
    protein: string
    carbohydrates: string
    fats: string
    fiber: string
    sodium: string
    sugar: string
}

export interface DietaryInfo {
    is_vegetarian: boolean
    is_vegan: boolean
    is_gluten_free: boolean
    is_dairy_free: boolean
    is_nut_free: boolean
    is_keto: boolean
    is_paleo: boolean
    is_low_carb: boolean
    is_high_protein: boolean
}

export interface Preparation {
    prep_time_minutes: number
    cooking_time_minutes: number
    total_time_minutes: number
    difficulty_level: number
    instructions: string | null
    storage_instructions: string | null
}

export interface Meal {
    id: any
    name: any
    slug?: string
    description?: string | null
    short_description?: string | null
    image_path?: string | null
    gallery_images?: string[]
    price: string | number
    weight_grams?: number
    serving_size?: string | null
    nutrition?: Nutrition
    ingredients?: string | null
    allergens?: string | null
    dietary_info?: DietaryInfo
    preparation?: Preparation
    is_spicy?: boolean
    spice_level?: number
    chef_notes?: string | null
    available_from?: string | null
    available_to?: string | null
    is_active?: boolean
    cost_per_serving?: string
    created_at?: string
    updated_at?: string

    // Additional fields for frontend use
    image?: string
    available_date?: string
    coins_cost?: number
    quantity?: number
    qte?: number

    // Meal category and tags
    category?: any
    tags?: string[]

    // E-commerce fields
    categorie?: Categorie
    unite?: Unite
    user?: User
    status?: Status
    status_id?: number
    show_company?: boolean
    favaris?: boolean
    relatedProducts?: Meal[]
}

export interface FormModalProps {
    open: boolean;
    onClose: () => void;
}




