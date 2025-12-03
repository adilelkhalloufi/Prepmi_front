import { useTranslation } from "react-i18next";

 
export function Why({meals}) {
 
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="relative py-20 bg-gradient-to-b from-[#e8e4e1] to-[#dbd7d6] overflow-hidden">
 

       {/* Additional scattered basil leaves */}
       <div className="absolute top-1/3 left-1/4 w-16 h-16 opacity-40 pointer-events-none z-0 animate-float" style={{animationDelay: '1s'}}>
         <svg viewBox="0 0 50 50" className="w-full h-full transform rotate-45">
           <path d="M15,25 Q10,18 16,12 Q22,8 28,13 Q32,8 36,14 Q38,20 34,26 Q30,30 25,28 Q20,32 15,25 Z" 
                 fill="url(#leafGreen1)"/>
           <defs>
             <linearGradient id="leafGreen1">
               <stop offset="0%" stopColor="#22c55e" />
               <stop offset="100%" stopColor="#16a34a" />
             </linearGradient>
           </defs>
         </svg>
       </div>

       <div className="absolute top-1/2 right-1/4 w-20 h-20 opacity-40 pointer-events-none z-0 animate-float" style={{animationDelay: '2s'}}>
         <svg viewBox="0 0 50 50" className="w-full h-full transform -rotate-12">
           <path d="M15,25 Q10,18 16,12 Q22,8 28,13 Q32,8 36,14 Q38,20 34,26 Q30,30 25,28 Q20,32 15,25 Z" 
                 fill="url(#leafGreen2)"/>
           <defs>
             <linearGradient id="leafGreen2">
               <stop offset="0%" stopColor="#4ade80" />
               <stop offset="100%" stopColor="#22c55e" />
             </linearGradient>
           </defs>
         </svg>
       </div>

       <div className="text-center mb-16 relative z-10">
       
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-fade-up">
            {t('how_it_works.title')}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {t('how_it_works.description')}
          </p>
        </div>

        <div className="container mx-auto px-4 flex gap-4 items-stretch justify-center flex-wrap">
          {meals?.map((meal: any) => (
            <div 
              key={meal.id}
              className="rounded-lg   flex flex-col p-4 items-center w-72 max-w-72"
            >
              <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex-shrink-0 relative">
                <img
                  src='./example3.png'
                  alt={meal.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/20 blur-md rounded-full"></div>
              </div>
              <h3 className="text-gray-900 text-center mt-4 font-semibold text-lg min-h-[3.5rem] flex items-center justify-center">
                {meal.name}
              </h3>
              <p className="text-gray-600 text-center text-sm mt-2 line-clamp-3">
                {meal.description}
              </p>
              {/* Show calories and protein */}
              <div className="flex space-x-4 mt-4 p-2">
                <span className="text-gray-700 text-sm">
                  {meal.nutrition.calories} {t("calories")}
                </span>
                <span className="text-gray-400 text-sm">|</span>
                <span className="text-gray-700 text-sm">
                  {meal.nutrition.protein}g {t("protein")}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <style>{`
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg);
            }
            50% { 
              transform: translateY(-15px) rotate(5deg);
            }
          }
          @keyframes bounce-slow {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg);
            }
            50% { 
              transform: translateY(-10px) rotate(-5deg);
            }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }
        `}</style>
    </section>
  )
}