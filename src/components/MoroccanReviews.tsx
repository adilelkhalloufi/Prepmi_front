import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslation } from "react-i18next"
import { Star, Quote, MapPin } from "lucide-react"

interface Review {
    name: string;
    city: string;
    rating: number;
    review: string;
    avatar: string;
    initials: string;
}

// Moroccan customer reviews
const mockReviews: Review[] = [
    {
        name: "Aicha Benali",
        city: "Casablanca",
        rating: 5,
        review: "reviews.review1",
        avatar: "",
        initials: "AB"
    },
    {
        name: "Youssef El Amrani",
        city: "Rabat",
        rating: 5,
        review: "reviews.review2",
        avatar: "",
        initials: "YE"
    },
    {
        name: "Fatima Zahra",
        city: "Marrakech",
        rating: 5,
        review: "reviews.review3",
        avatar: "",
        initials: "FZ"
    },
    {
        name: "Omar Tazi",
        city: "Fès",
        rating: 4,
        review: "reviews.review4",
        avatar: "",
        initials: "OT"
    },
    {
        name: "Khadija Alami",
        city: "Agadir",
        rating: 5,
        review: "reviews.review5",
        avatar: "",
        initials: "KA"
    },
    {
        name: "Mehdi Jouahri",
        city: "Tanger",
        rating: 5,
        review: "reviews.review6",
        avatar: "",
        initials: "MJ"
    }
];

export function MoroccanReviews() {
    const { t } = useTranslation();

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
            />
        ));
    };

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Moroccan-inspired background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
                {/* Geometric patterns inspired by Moroccan tiles */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full transform rotate-45 -translate-x-16 -translate-y-16"></div>
                    <div className="absolute top-20 right-10 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 transform rotate-12"></div>
                    <div className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-500 transform rotate-45 translate-x-20 translate-y-20"></div>
                </div>

                {/* Moroccan pattern overlay */}
                <div className="absolute inset-0 opacity-5">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="moroccan-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                                <g fill="#D97706">
                                    <circle cx="40" cy="40" r="3" />
                                    <path d="M40 20 L50 30 L40 40 L30 30 Z" />
                                    <path d="M20 40 L30 50 L40 40 L30 30 Z" />
                                    <path d="M40 60 L50 50 L40 40 L30 50 Z" />
                                    <path d="M60 40 L50 50 L40 40 L50 30 Z" />
                                </g>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#moroccan-pattern)" />
                    </svg>
                </div>
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-6">
                        <span className="text-sm font-semibold tracking-wider text-orange-700 uppercase bg-orange-100 px-4 py-2 rounded-full border border-orange-200">
                            {t('reviews.badge')}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        {t('reviews.title')}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t('reviews.description')}
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {mockReviews.map((review, index) => (
                        <Card
                            key={index}
                            className="group relative bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                            {/* Moroccan accent border */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-red-500 to-amber-500"></div>

                            <CardContent className="p-6">
                                {/* Quote icon */}
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-full">
                                        <Quote className="w-6 h-6 text-orange-600" />
                                    </div>
                                </div>

                                {/* Review text with Moroccan styling */}
                                <blockquote className="text-gray-700 text-center mb-6 leading-relaxed italic relative">
                                    <span className="text-4xl text-orange-300 absolute -top-2 -left-2 font-serif">"</span>
                                    {t(review.review)}
                                    <span className="text-4xl text-orange-300 absolute -bottom-4 -right-2 font-serif">"</span>
                                </blockquote>

                                {/* Rating */}
                                <div className="flex justify-center mb-4">
                                    <div className="flex space-x-1 p-2 bg-orange-50 rounded-full">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>

                                {/* Customer info */}
                                <div className="flex items-center space-x-3">
                                    <Avatar className="border-2 border-orange-200">
                                        <AvatarImage src={review.avatar} alt={review.name} />
                                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-500 text-white font-semibold">
                                            {review.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                                            <MapPin className="w-3 h-3 text-orange-500" />
                                            <span>{review.city}, {t('reviews.morocco')}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative Moroccan corner */}
                                <div className="absolute top-4 right-4 opacity-20">
                                    <svg width="24" height="24" viewBox="0 0 24 24" className="text-orange-400">
                                        <path fill="currentColor" d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                                    </svg>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Bottom decorative element inspired by Moroccan architecture */}
                <div className="mt-16 flex justify-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-12 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full"></div>
                        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                        <div className="w-8 h-1 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-12 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}