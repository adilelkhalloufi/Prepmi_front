import { MealPreparation } from "@/interfaces/admin";

/**
 * Mock data for testing the Meal Preparation Dashboard
 * Use this data when the API is not yet available
 */

export const mockMealPreparations: MealPreparation[] = [
    {
        id: 1,
        order_id: 101,
        meal_id: 1,
        quantity: 3,
        preparation_status: 'pending',
        preparation_date: new Date().toISOString().split('T')[0], // Today
        delivery_date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
        notes: 'Client allergique aux noix',
        customer_name: 'Mohammed Alami',
        meal: {
            id: 1,
            name: 'Tajine de Poulet aux Olives',
            short_description: 'Tajine marocain traditionnel avec citron confit',
            image_path: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
            price: 85,
        },
        order: {
            id: 101,
            quantity: 3,
            price: 255,
            user: {
                id: 1,
                name: 'Mohammed Alami',
                email: 'mohammed@example.com'
            }
        }
    },
    {
        id: 2,
        order_id: 102,
        meal_id: 2,
        quantity: 2,
        preparation_status: 'preparing',
        preparation_date: new Date().toISOString().split('T')[0],
        delivery_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        customer_name: 'Fatima Zahra',
        meal: {
            id: 2,
            name: 'Couscous Royal',
            short_description: 'Couscous avec agneau, poulet et merguez',
            image_path: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400',
            price: 95,
        },
        order: {
            id: 102,
            quantity: 2,
            price: 190,
            user: {
                id: 2,
                name: 'Fatima Zahra',
                email: 'fatima@example.com'
            }
        }
    },
    {
        id: 3,
        order_id: 103,
        meal_id: 3,
        quantity: 5,
        preparation_status: 'preparing',
        preparation_date: new Date().toISOString().split('T')[0],
        notes: 'Pour une fête - servir chaud',
        customer_name: 'Ahmed Benjelloun',
        meal: {
            id: 3,
            name: 'Pastilla au Poulet',
            short_description: 'Pastilla sucrée-salée aux amandes',
            image_path: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
            price: 120,
        },
        order: {
            id: 103,
            quantity: 5,
            price: 600,
            user: {
                id: 3,
                name: 'Ahmed Benjelloun',
                email: 'ahmed@example.com'
            }
        }
    },
    {
        id: 4,
        order_id: 104,
        meal_id: 4,
        quantity: 1,
        preparation_status: 'ready_for_delivery',
        preparation_date: new Date().toISOString().split('T')[0],
        delivery_date: new Date().toISOString().split('T')[0],
        customer_name: 'Yasmine Idrissi',
        meal: {
            id: 4,
            name: 'Briouates aux Crevettes',
            short_description: 'Cigares croustillants farcis aux crevettes',
            image_path: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400',
            price: 75,
        },
        order: {
            id: 104,
            quantity: 1,
            price: 75,
            user: {
                id: 4,
                name: 'Yasmine Idrissi',
                email: 'yasmine@example.com'
            }
        }
    },
    {
        id: 5,
        order_id: 105,
        meal_id: 5,
        quantity: 4,
        preparation_status: 'pending',
        preparation_date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
        delivery_date: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
        notes: 'Client préfère moins épicé',
        customer_name: 'Karim El Fassi',
        meal: {
            id: 5,
            name: 'Harira Traditionnelle',
            short_description: 'Soupe marocaine aux lentilles et pois chiches',
            image_path: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400',
            price: 45,
        },
        order: {
            id: 105,
            quantity: 4,
            price: 180,
            user: {
                id: 5,
                name: 'Karim El Fassi',
                email: 'karim@example.com'
            }
        }
    },
    {
        id: 6,
        order_id: 106,
        meal_id: 6,
        quantity: 2,
        preparation_status: 'pending',
        preparation_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        customer_name: 'Laila Benkirane',
        meal: {
            id: 6,
            name: 'Méchoui d\'Agneau',
            short_description: 'Épaule d\'agneau rôtie aux épices',
            image_path: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400',
            price: 150,
        },
        order: {
            id: 106,
            quantity: 2,
            price: 300,
            user: {
                id: 6,
                name: 'Laila Benkirane',
                email: 'laila@example.com'
            }
        }
    },
    {
        id: 7,
        order_id: 107,
        meal_id: 7,
        quantity: 3,
        preparation_status: 'ready_for_delivery',
        preparation_date: new Date().toISOString().split('T')[0],
        delivery_date: new Date().toISOString().split('T')[0],
        customer_name: 'Omar Tazi',
        meal: {
            id: 7,
            name: 'Zaalouk d\'Aubergines',
            short_description: 'Salade d\'aubergines cuisinées aux tomates',
            image_path: 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?w=400',
            price: 35,
        },
        order: {
            id: 107,
            quantity: 3,
            price: 105,
            user: {
                id: 7,
                name: 'Omar Tazi',
                email: 'omar@example.com'
            }
        }
    },
    {
        id: 8,
        order_id: 108,
        meal_id: 8,
        quantity: 6,
        preparation_status: 'preparing',
        preparation_date: new Date().toISOString().split('T')[0],
        notes: 'Grande commande - livraison à 18h',
        customer_name: 'Salma Berrada',
        meal: {
            id: 8,
            name: 'Cornes de Gazelle',
            short_description: 'Pâtisserie aux amandes et fleur d\'oranger',
            image_path: 'https://images.unsplash.com/photo-1587241321921-91a834d82ebc?w=400',
            price: 25,
        },
        order: {
            id: 108,
            quantity: 6,
            price: 150,
            user: {
                id: 8,
                name: 'Salma Berrada',
                email: 'salma@example.com'
            }
        }
    },
];

/**
 * Use this function in index.tsx for testing:
 * 
 * import { mockMealPreparations } from "./mock-data"
 * 
 * useEffect(() => {
 *   // For testing without API
 *   setData(mockMealPreparations);
 *   setLoading(false);
 *   
 *   // Comment out the real API call temporarily
 *   // fetchMealPreparations();
 * }, []);
 */
