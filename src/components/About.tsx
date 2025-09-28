import { Card, CardContent } from "@/components/ui/card"
import { Heart, ChefHat, Users, MapPin, Sparkles, ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"

export function About() {
  const { t } = useTranslation()
  const [visibleSections, setVisibleSections] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = parseInt(entry.target.getAttribute('data-section') || '0')
            setVisibleSections(prev => [...prev, sectionIndex].filter((v, i, a) => a.indexOf(v) === i))
          }
        })
      },
      { threshold: 0.3 }
    )

    const sectionElements = document.querySelectorAll('[data-section]')
    sectionElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header */}
        <div
          data-section="0"
          className={`text-center mb-16 transition-all duration-1000 ${visibleSections.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 px-4 py-2 rounded-full">
              {t('about.badge')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {t('about.title')}
          </h2>
        </div>

        {/* Story Content */}
        <div className="max-w-4xl mx-auto">
          {/* Opening Story */}
          <div
            data-section="1"
            className={`mb-12 transition-all duration-1000 delay-200 ${visibleSections.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg leading-relaxed text-gray-700 mb-4">
                      {t('about.story_opening')}
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700">
                      {t('about.story_problem')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Journey Story */}
          <div
            data-section="2"
            className={`mb-12 transition-all duration-1000 delay-400 ${visibleSections.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full">
                    <ChefHat className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg leading-relaxed text-gray-700 mb-4">
                      {t('about.story_solution')}
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700">
                      {t('about.story_growth')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mission Story */}
          <div
            data-section="3"
            className={`mb-12 transition-all duration-1000 delay-600 ${visibleSections.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-full">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg leading-relaxed text-gray-700 mb-4">
                      {t('about.story_mission')}
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700">
                      {t('about.story_future')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Values Grid */}
          <div
            data-section="4"
            className={`grid md:grid-cols-3 gap-6 mb-12 transition-all duration-1000 delay-800 ${visibleSections.includes(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{t('about.value1_title')}</h3>
                <p className="text-gray-600">{t('about.value1_desc')}</p>
              </CardContent>
            </Card>

            <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{t('about.value2_title')}</h3>
                <p className="text-gray-600">{t('about.value2_desc')}</p>
              </CardContent>
            </Card>

            <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="p-4 bg-gradient-to-br from-red-100 to-red-200 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{t('about.value3_title')}</h3>
                <p className="text-gray-600">{t('about.value3_desc')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Closing Message */}
          <div
            data-section="5"
            className={`text-center transition-all duration-1000 delay-1000 ${visibleSections.includes(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-0 shadow-lg">
              <CardContent className="p-8">
                <p className="text-xl font-medium text-gray-800 mb-4">
                  {t('about.closing_message')}
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  {t('about.signature')}
                </p>
                <div className="flex justify-center">
                  <div className="flex items-center space-x-2 text-primary font-semibold">
                    <span>{t('about.team_name')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}