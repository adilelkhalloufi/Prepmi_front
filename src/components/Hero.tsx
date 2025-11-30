import { Button } from "@/components/ui/button"
import { webRoutes } from "@/routes/web";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const { t } = useTranslation();
  const navigator = useNavigate();

  const featuredMeals = [
    {
      name: "BBQ Chicken",
      calories: "500 Calories",
      protein: "40g Protein",
      image: "/meals/bbq-chicken.jpg"
    },
    {
      name: "Salmon With Greens",
      calories: "450 Calories",
      protein: "35g Protein",
      image: "/meals/salmon-greens.jpg"
    },
    {
      name: "Pork Stir-Fry",
      calories: "550 Calories",
      protein: "45g Protein",
      image: "/meals/pork-stir-fry.jpg"
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Wooden Background with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/wooden-background.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        {/* Hero Text */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
            YOU WORK, WE FUEL
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white font-semibold tracking-wide">
            MACRO-BALANCED MEAL PREP
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-20 md:mb-28">
          <Button
            size="lg"
            className="bg-red-700 hover:bg-red-800 text-white font-bold text-lg md:text-xl px-12 py-6 md:px-16 md:py-8 rounded-full shadow-2xl transform transition-all hover:scale-105"
            onClick={() => {
              navigator(webRoutes.join_now)
            }}
          >
            BUILD MY BOX
          </Button>
        </div>

        {/* Featured Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {featuredMeals.map((meal, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-amber-900/40 to-stone-800/40 backdrop-blur-sm rounded-3xl p-6 border border-amber-700/30 hover:border-amber-600/50 transition-all duration-300 hover:transform hover:scale-105 shadow-2xl"
            >
              {/* Meal Image */}
              <div className="relative mb-6 rounded-2xl overflow-hidden aspect-square bg-black/30">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder if image doesn't exist
                    e.currentTarget.src = 'https://via.placeholder.com/400x400/8B4513/FFFFFF?text=' + meal.name.replace(' ', '+');
                  }}
                />
              </div>

              {/* Meal Info */}
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {meal.name}
                </h3>
                <div className="flex justify-center items-center gap-3 text-white/90">
                  <span className="text-sm md:text-base font-medium">{meal.calories}</span>
                  <span className="text-white/50">·</span>
                  <span className="text-sm md:text-base font-medium">{meal.protein}</span>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-600/0 via-amber-600/10 to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements - Food Icons */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-white/5 rounded-full backdrop-blur-sm animate-float" />
      <div className="absolute top-40 right-20 w-12 h-12 bg-white/5 rounded-full backdrop-blur-sm animate-float-delay" />
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-white/5 rounded-full backdrop-blur-sm animate-float" />
    </section>
  )
}