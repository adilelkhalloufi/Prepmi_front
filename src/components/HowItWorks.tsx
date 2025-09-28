import { useTranslation } from "react-i18next";
import { IconChefHat, IconFlame, IconToolsKitchen2, IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function HowItWorks() {
  interface StepProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
    iconBg: string;
  }

  const { t } = useTranslation();
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-step') || '0');
            setVisibleSteps(prev => [...prev, stepIndex].filter((v, i, a) => a.indexOf(v) === i));
          }
        });
      },
      { threshold: 0.2 }
    );

    const stepElements = document.querySelectorAll('[data-step]');
    stepElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const steps: StepProps[] = [
    {
      icon: <IconToolsKitchen2 className="w-8 h-8 text-white" />,
      title: t('how_it_works.step1.title'),
      description: t('how_it_works.step1.description'),
      gradient: "from-emerald-500 to-teal-600",
      iconBg: "bg-gradient-to-br from-emerald-400 to-teal-500"
    },
    {
      icon: <IconChefHat className="w-8 h-8 text-white" />,
      title: t('how_it_works.step2.title'),
      description: t('how_it_works.step2.description'),
      gradient: "from-orange-500 to-red-600",
      iconBg: "bg-gradient-to-br from-orange-400 to-red-500"
    },
    {
      icon: <IconFlame className="w-8 h-8 text-white" />,
      title: t('how_it_works.step3.title'),
      description: t('how_it_works.step3.description'),
      gradient: "from-purple-500 to-pink-600",
      iconBg: "bg-gradient-to-br from-purple-400 to-pink-500"
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      <div className="container relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            {t('how_it_works.simple_process')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-fade-up">
            {t('how_it_works.title')}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {t('how_it_works.description')}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
            {steps.map((step, i) => (
              <div
                key={i}
                data-step={i}
                className={`group relative transition-all duration-700 ${visibleSteps.includes(i)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {/* Step card */}
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 group">
                  {/* Step number */}
                  <div className={`absolute ${step.iconBg}  text-white   -top-4 left-8 bg-background border border-border rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-muted-foreground`}>
                    {i + 1}
                  </div>

                  {/* Icon container */}
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 ${step.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <div className="animate-float">
                        {step.icon}
                      </div>
                    </div>

                    {/* Glow effect */}
                    <div className={`absolute inset-0 w-20 h-20 ${step.iconBg} rounded-2xl mx-auto blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-white">
                    {step.description}
                  </p>

                  {/* Hover gradient border */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`} />
                </div>


              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  )
}