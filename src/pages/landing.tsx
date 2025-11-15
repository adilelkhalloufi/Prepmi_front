import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { HowItWorks } from "@/components/HowItWorks"
import { FreshMeals } from "@/components/FreshMeals"
import { MenuSlider } from "@/components/MenuSlider"
import { MenuPage } from "@/components/MenuPage"
import { MoroccanReviews } from "@/components/MoroccanReviews"
import { Newsletter } from "@/components/Newsletter"
import { Cta } from "@/components/Cta"
import { HeroVariant3 } from "@/components/hero-variants/HeroVariant3"


const Index = () => {
  return (


    <main>
      {/* <Hero /> */}
      <HeroVariant3 />
      <HowItWorks />
      <FreshMeals />
      <MenuSlider />
      <MoroccanReviews />
      <About />
      <Newsletter />

    </main>

  );
};

export default Index;