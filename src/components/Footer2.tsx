import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { webRoutes } from "@/routes/web"
import logo from "../assets/Prepme.svg"

export default function Footer2() {
  const { t } = useTranslation()

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content with 3D Meal Image */}
        <div className="grid gap-12 lg:grid-cols-2 items-center mb-12">
          {/* Left Side - 3D Meal Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative group">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-yellow-500/20 to-green-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              
              {/* Meal Image */}
              <div className="relative transform hover:scale-105 transition-transform duration-500">
                <img 
                  src="/example3.png" 
                  alt="Delicious Healthy Meal" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                
                {/* Floating elements around the meal */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <span className="text-3xl">🥗</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-300">
                  <span className="text-2xl">🍋</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Footer Info */}
          <div className="order-1 lg:order-2">
            <div className="max-w-xl">
              <img src={logo} alt="Prepme" className="h-12 mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
                {t('footer.fresh_meals_title') || 'Fresh, Delicious Meals Delivered to You'}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t('footer.company_description')}
              </p>
              
              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t('footer.fresh_ingredients') || 'Fresh Ingredients'}</h4>
                    <p className="text-sm text-muted-foreground">{t('footer.fresh_ingredients_desc') || 'Locally sourced daily'}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t('footer.health_certified') || 'Health Certified'}</h4>
                    <p className="text-sm text-muted-foreground">{t('footer.health_certified_desc') || 'Nutritionist approved'}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t('footer.fast_delivery') || 'Fast Delivery'}</h4>
                    <p className="text-sm text-muted-foreground">{t('footer.delivery_info') || 'Delivered fresh to your door'}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t('footer.custom_plans') || 'Custom Plans'}</h4>
                    <p className="text-sm text-muted-foreground">{t('footer.custom_plans_desc') || 'Tailored to your needs'}</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link to={webRoutes.register}>
                <Button size="lg" className="w-full md:w-auto bg-gradient-to-r from-green-600 to-orange-600 hover:from-green-700 hover:to-orange-700 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  {t('footer.order_now') || 'Order Now'}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Links Section */}
 

    
      </div>
    </footer>
  )
}