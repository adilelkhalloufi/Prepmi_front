import { Hero } from "@/components/Hero"
import { Sponsors } from "@/components/Sponsors"
import { About } from "@/components/About"
import { HowItWorks } from "@/components/HowItWorks"
import { Cta } from "@/components/Cta"
import { Newsletter } from "@/components/Newsletter"
import { FAQ } from "@/components/FAQ"

const Index = () => {
  return (


    <main>
      <Hero />
      <Sponsors />
      <HowItWorks />
      <About />
      <Cta />
      <Newsletter />
      <FAQ />
    </main>

  );
};

export default Index;