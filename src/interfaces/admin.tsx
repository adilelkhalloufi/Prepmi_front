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
export interface Product {
    id: any
    name: any
    image?: string
    available_date?: string
    slug?: string
    description?: string
    short_description?: string
    image_path?: string
    price: number
    coins_cost?: number
    quantity: number
    qte: number

    // Nutritional information
    calories?: number
    protein?: number
    carbohydrates?: number
    fats?: number
    fiber?: number

    // Dietary flags
    is_vegetarian?: boolean
    is_vegan?: boolean
    is_gluten_free?: boolean
    is_dairy_free?: boolean
    is_nut_free?: boolean
    is_keto?: boolean
    is_paleo?: boolean
    is_low_carb?: boolean
    is_high_protein?: boolean
    is_spicy?: boolean
    spice_level?: number

    // Preparation details
    prep_time_minutes?: number
    cooking_time_minutes?: number
    difficulty_level?: 'Easy' | 'Medium' | 'Hard'

    // Meal category and tags
    category?: string
    tags?: string[]

    // E-commerce fields
    categorie?: Categorie
    unite?: Unite
    user?: User
    status?: Status
    status_id?: number
    show_company?: boolean
    favaris?: boolean
    relatedProducts?: Product[]
}

export interface FormModalProps {
    open: boolean;
    onClose: () => void;
}




export interface Meal {
    available_date?: string
    name?: string;
    slug?: string;
    description?: string;
    short_description?: string;
    image_path?: string;
    calories?: number;
    protein?: number;
    carbohydrates?: number;
    fats?: number;
    fiber?: number;
    is_vegetarian?: boolean;
    is_vegan?: boolean;
    is_gluten_free?: boolean;
    is_dairy_free?: boolean;
    is_nut_free?: boolean;
    is_keto?: boolean;
    is_paleo?: boolean;
    is_low_carb?: boolean;
    is_high_protein?: boolean;
    is_spicy?: boolean;
    spice_level?: number;
    prep_time_minutes?: number;
    cooking_time_minutes?: number;
    difficulty_level?: 'Easy' | 'Medium' | 'Hard';
    price?: number;
    category?: string;
    tags?: string[];

}