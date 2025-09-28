import { Hero } from "@/components/Hero"
import { Sponsors } from "@/components/Sponsors"
import { About } from "@/components/About"
import { HowItWorks } from "@/components/HowItWorks"
import { FreshMeals } from "@/components/FreshMeals"
import { MenuSlider } from "@/components/MenuSlider"
import { MoroccanReviews } from "@/components/MoroccanReviews"
import { Cta } from "@/components/Cta"
import { Newsletter } from "@/components/Newsletter"
import { FAQ } from "@/components/FAQ"

const Index = () => {
  return (


    <main>
      <Hero />
      <HowItWorks />
      <FreshMeals />
      <MenuSlider />
      <MoroccanReviews />
      <About />
      <Cta />
      <Newsletter />
      <FAQ />
    </main>

  );
};

export default Index;