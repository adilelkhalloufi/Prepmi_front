import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, Star, GiftIcon, PlaneIcon, MapIcon, MedalIcon } from "lucide-react"
import { useTranslation } from "react-i18next"


interface FeatureProps {
  icon: JSX.Element;
  title?: string;
  description?: string;
}


export function About() {
  const { t } = useTranslation()
  const features: FeatureProps[] = [
    {
      icon: <MedalIcon />,
      title: t('why.title1'),
      description: t('why.description1')

    },
    {
      icon: <MapIcon />,
      title: t('why.title2'),
      description:
        t('why.description2'),
    },
    {
      icon: <PlaneIcon />,
      title: t('why.title3'),
      description:
        t('why.description3'),
    },
    {
      icon: <GiftIcon />,
      title: t('why.title4'),
      description:
        t('why.description4'),
    },
    {
      icon: <GiftIcon />,
      title: t('why.title5'),
      description:
        t('why.description5'),
    },
    {
      icon: <GiftIcon />,
      title: t('why.title6'),
      description:
        t('why.description6'),
    },
    {
      icon: <GiftIcon />,
      title: t('why.title7'),
      description:
        t('why.description7'),
    },
  ];
  return (
    <section id="about" className="py-16 container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">     {t('why.title')}</h2>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          {t('why.description')}

        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <Card key={i} className="animate-fade-up" style={{
            animationDelay: `${i * 100}ms`
          }}>
            <CardHeader>
              {/* <feature.icon className="w-10 h-10 text-primary mb-4" /> */}
              {feature.icon}
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}