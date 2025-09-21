import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useTranslation } from "react-i18next"

export function FAQ() {
  const { t } = useTranslation()
  
  const faqs = [
    {
      question: t('faq.question1'),
      answer: t('faq.answer1')
    },
    {
      question: t('faq.question2'),
      answer: t('faq.answer2')
    },
    {
      question: t('faq.question3'),
      answer: t('faq.answer3')
    },
    {
      question: t('faq.question4'),
      answer: t('faq.answer4')
    }
  ]

  return (
    <section id="faq" className="py-16 container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{t('faq.title')}</h2>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          {t('faq.description')}
        </p>
      </div>
      <div className="max-w-[800px] mx-auto">
        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}