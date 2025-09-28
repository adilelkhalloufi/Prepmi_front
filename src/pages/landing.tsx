import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { HowItWorks } from "@/components/HowItWorks"
import { FreshMeals } from "@/components/FreshMeals"
import { MenuSlider } from "@/components/MenuSlider"
import { MoroccanReviews } from "@/components/MoroccanReviews"
import { Cta } from "@/components/Cta"


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

    </main>

  );
};

export default Index;