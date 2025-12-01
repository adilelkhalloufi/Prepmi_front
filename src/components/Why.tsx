import { useTranslation } from "react-i18next";

 
export function Why({meals}) {
 
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="relative py-20 bg-gradient-to-b from-[#e8e4e1] to-[#dbd7d6] overflow-hidden">
       {/* Decorative basil leaves - top left */}
       <div className="absolute top-0 left-0 w-64 md:w-80 h-64 md:h-80 opacity-60 pointer-events-none z-0">
         <svg viewBox="0 0 200 200" className="w-full h-full">
           {/* Basil leaf cluster */}
           <path d="M30,60 Q20,40 35,25 Q50,10 65,20 Q75,5 90,15 Q100,25 95,40 Q110,35 115,50 Q120,65 105,75 Q95,85 80,80 Q75,95 60,90 Q45,85 40,70 Q25,75 30,60 Z" 
                 fill="url(#greenGradient1)" opacity="0.9"/>
           <path d="M40,80 Q30,65 40,50 Q50,40 60,45 Q70,35 80,42 Q88,50 85,62 Q95,58 98,68 Q100,78 90,85 Q82,92 72,88 Q70,100 58,96 Q48,92 45,82 Q35,85 40,80 Z" 
                 fill="url(#greenGradient2)" opacity="0.85"/>
           <path d="M60,100 Q52,88 58,75 Q65,65 75,68 Q82,60 90,65 Q96,72 94,82 Q102,79 104,87 Q106,95 98,100 Q92,106 84,103 Q82,112 72,109 Q64,105 62,98 Q55,100 60,100 Z" 
                 fill="url(#greenGradient3)" opacity="0.8"/>
           <defs>
             <linearGradient id="greenGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#16a34a" />
               <stop offset="100%" stopColor="#15803d" />
             </linearGradient>
             <linearGradient id="greenGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#22c55e" />
               <stop offset="100%" stopColor="#16a34a" />
             </linearGradient>
             <linearGradient id="greenGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#4ade80" />
               <stop offset="100%" stopColor="#22c55e" />
             </linearGradient>
           </defs>
         </svg>
       </div>

       {/* Decorative basil leaves - top right */}
       <div className="absolute top-0 right-0 w-64 md:w-80 h-64 md:h-80 opacity-60 pointer-events-none z-0 transform scale-x-[-1]">
         <svg viewBox="0 0 200 200" className="w-full h-full">
           <path d="M30,60 Q20,40 35,25 Q50,10 65,20 Q75,5 90,15 Q100,25 95,40 Q110,35 115,50 Q120,65 105,75 Q95,85 80,80 Q75,95 60,90 Q45,85 40,70 Q25,75 30,60 Z" 
                 fill="url(#greenGradient4)" opacity="0.9"/>
           <path d="M40,80 Q30,65 40,50 Q50,40 60,45 Q70,35 80,42 Q88,50 85,62 Q95,58 98,68 Q100,78 90,85 Q82,92 72,88 Q70,100 58,96 Q48,92 45,82 Q35,85 40,80 Z" 
                 fill="url(#greenGradient5)" opacity="0.85"/>
           <defs>
             <linearGradient id="greenGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#059669" />
               <stop offset="100%" stopColor="#047857" />
             </linearGradient>
             <linearGradient id="greenGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#10b981" />
               <stop offset="100%" stopColor="#059669" />
             </linearGradient>
           </defs>
         </svg>
       </div>

       {/* Tomato decoration - bottom left */}
       <div className="absolute bottom-10 left-10 w-32 h-32 md:w-40 md:h-40 opacity-70 pointer-events-none z-0 animate-float">
         <svg viewBox="0 0 100 100" className="w-full h-full">
           <circle cx="50" cy="55" r="35" fill="url(#tomatoGradient)"/>
           <ellipse cx="50" cy="55" rx="32" ry="35" fill="url(#tomatoHighlight)" opacity="0.3"/>
           <path d="M35,20 Q40,15 45,18 Q50,10 55,18 Q60,15 65,20 Q60,25 50,30 Q40,25 35,20 Z" fill="#22c55e"/>
           <defs>
             <radialGradient id="tomatoGradient">
               <stop offset="0%" stopColor="#ef4444" />
               <stop offset="100%" stopColor="#dc2626" />
             </radialGradient>
             <radialGradient id="tomatoHighlight">
               <stop offset="0%" stopColor="#ffffff" />
               <stop offset="100%" stopColor="transparent" />
             </radialGradient>
           </defs>
         </svg>
       </div>

       {/* Lemon slice - bottom right */}
       <div className="absolute bottom-10 right-10 w-28 h-28 md:w-36 md:h-36 opacity-70 pointer-events-none z-0 animate-bounce-slow">
         <svg viewBox="0 0 100 100" className="w-full h-full">
           <circle cx="50" cy="50" r="40" fill="url(#lemonGradient)"/>
           <circle cx="50" cy="50" r="35" fill="none" stroke="#fde047" strokeWidth="2"/>
           {[...Array(8)].map((_, i) => (
             <line 
               key={i}
               x1="50" y1="50" 
               x2={50 + Math.cos(i * Math.PI / 4) * 35} 
               y2={50 + Math.sin(i * Math.PI / 4) * 35}
               stroke="#fde047" 
               strokeWidth="1" 
               opacity="0.4"
             />
           ))}
           <circle cx="50" cy="50" r="12" fill="#fef3c7" opacity="0.6"/>
           <defs>
             <radialGradient id="lemonGradient">
               <stop offset="0%" stopColor="#fef08a" />
               <stop offset="100%" stopColor="#facc15" />
             </radialGradient>
           </defs>
         </svg>
       </div>

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
                  className="w-full h-full object-cover rounded-lg "
                />
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