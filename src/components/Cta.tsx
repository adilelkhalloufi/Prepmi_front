import { Button } from "@/components/ui/button"
import { IconBrandKakoTalk, IconBrandWhatsapp } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"

export function Cta() {
  const { t } = useTranslation()

  return (
    <section className="py-16 container">
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-background p-8 md:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4"> {t('contact.title')}</h2>
        <p className="text-muted-foreground mb-8 max-w-[600px] mx-auto">
          {t('contact.description')}
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            size="lg"
            onClick={() => {
              const defaultMessage = "Salut, je voudrais vous demander comment fonctionne la plateforme ?";
              const whatsappUrl = `https://wa.me/212612704187?text=${encodeURIComponent(defaultMessage)}`;
              window.open(whatsappUrl, '_blank');
            }}
          >
            <IconBrandWhatsapp />
            {t('button.whatsup')}
          </Button>
          {/* <Button
            variant="outline"
            size="lg"
          >
            <IconBrandKakoTalk />
            {t('button.contact')}
          </Button> */}
        </div>

      </div>
    </section>
  )
}