import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { HowItWorks } from "@/components/HowItWorks";
import { FreshMeals } from "@/components/FreshMeals";
import { MenuSlider } from "@/components/MenuSlider";
import { MoroccanReviews } from "@/components/MoroccanReviews";
import { Newsletter } from "@/components/Newsletter";
import { Why } from "@/components/Why";
import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { useQuery } from "@tanstack/react-query";
 import Footer2 from "@/components/Footer2";

const Index = () => {
  const {
    data: meals,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await http.get(apiRoutes.meals);
      const mealsData = res.data.data || res.data;
      console.log("Fetched meals:", mealsData);
      // Limit to first 6 meals for the slider
      return Array.isArray(mealsData) ? mealsData.slice(0, 3) : [];
    },
  });
  return (
    <main>
      {/* <Hero />
      <HowItWorks />
      <FreshMeals />
      <MenuSlider />
      <MoroccanReviews />
      <About />
      <Newsletter /> */}
      <Hero meals={meals} />
      <Why meals={meals} />
 
    </main>
  );
};

export default Index;
