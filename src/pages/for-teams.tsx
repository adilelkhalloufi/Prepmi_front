import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { IconCheck, IconTruck, IconUsers, IconClock, IconHeart, IconStar } from "@tabler/icons-react";
import { webRoutes } from "@/routes/web";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const ForTeams = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-32 ">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {t("for_teams.hero_title", "CORPORATE MEAL DELIVERY FOR YOUR TEAM")}
            </h1>
            <p className="text-xl text-primary/80 mb-8 leading-relaxed">
              {t("for_teams.hero_description", "Elevate your employees' well-being with fresh, nutritious meals delivered directly to your workplace. Show you care about their health and productivity.")}
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
              onClick={() => navigate(webRoutes.join_now)}
            >
              {t("for_teams.get_started", "GET STARTED")}
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose PrepMe Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t("for_teams.why_title", "WHY CHOOSE PREPME FOR YOUR TEAM?")}
            </h2>
            <p className="text-lg text-primary/70 max-w-2xl mx-auto">
              {t("for_teams.why_description", "Invest in your team's health and productivity with our comprehensive corporate meal solution.")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <IconHeart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {t("for_teams.benefit1_title", "Employee Well-being")}
              </h3>
              <p className="text-primary/70">
                {t("for_teams.benefit1_desc", "Promote healthy eating habits and show your team you care about their health and happiness.")}
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <IconClock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {t("for_teams.benefit2_title", "Time Saving")}
              </h3>
              <p className="text-primary/70">
                {t("for_teams.benefit2_desc", "No more lunch breaks spent searching for food. Meals arrive ready to eat.")}
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <IconUsers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {t("for_teams.benefit3_title", "Team Building")}
              </h3>
              <p className="text-primary/70">
                {t("for_teams.benefit3_desc", "Create opportunities for team bonding during lunch breaks with shared healthy meals.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t("for_teams.comparison_title", "HOW WE COMPARE")}
            </h2>
            <p className="text-lg text-primary/70">
              {t("for_teams.comparison_description", "See why PrepMe is the better choice for corporate meal delivery.")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-red-600 mb-4 text-center">
                {t("for_teams.takeout_title", "Takeout & Delivery")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-red-500">
                  <IconCheck className="w-5 h-5 mr-2" />
                  <span>{t("for_teams.takeout_con1", "Expensive per meal")}</span>
                </div>
                <div className="flex items-center text-red-500">
                  <IconCheck className="w-5 h-5 mr-2" />
                  <span>{t("for_teams.takeout_con2", "Limited healthy options")}</span>
                </div>
                <div className="flex items-center text-red-500">
                  <IconCheck className="w-5 h-5 mr-2" />
                  <span>{t("for_teams.takeout_con3", "Inconsistent quality")}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-red-600 mb-4 text-center">
                {t("for_teams.restaurant_title", "Restaurant Catering")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-red-500">
                  <IconCheck className="w-5 h-5 mr-2" />
                  <span>{t("for_teams.restaurant_con1", "Time-consuming setup")}</span>
                </div>
                <div className="flex items-center text-red-500">
                  <IconCheck className="w-5 h-5 mr-2" />
                  <span>{t("for_teams.restaurant_con2", "Employees leave office")}</span>
                </div>
                <div className="flex items-center text-red-500">
                  <IconCheck className="w-5 h-5 mr-2" />
                  <span>{t("for_teams.restaurant_con3", "Higher costs")}</span>
                </div>
              </div>
            </div>

            <div className="bg-primary p-6 rounded-lg shadow-md text-white">
              <h3 className="text-xl font-semibold mb-4 text-center">
                {t("for_teams.prepme_title", "PrepMe Solution")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <IconStar className="w-5 h-5 mr-2" />
                  <span>{t("for_teams.prepme_pro1", "Fresh, chef-prepared meals")}</span>
                </div>
                <div className="flex items-center">
                  <IconStar className="w-5 h-5 mr-2" />
                  <span>{t("for_teams.prepme_pro2", "Delivered to your office")}</span>
                </div>
                <div className="flex items-center">
                  <IconStar className="w-5 h-5 mr-2" />
                  <span>{t("for_teams.prepme_pro3", "Cost-effective & convenient")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t("for_teams.how_title", "HOW IT WORKS")}
            </h2>
            <p className="text-lg text-primary/70">
              {t("for_teams.how_description", "Getting started with corporate meal delivery is simple.")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {t("for_teams.step1_title", "Contact Us")}
              </h3>
              <p className="text-primary/70">
                {t("for_teams.step1_desc", "Reach out to discuss your team's needs and preferences.")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {t("for_teams.step2_title", "Customize Plan")}
              </h3>
              <p className="text-primary/70">
                {t("for_teams.step2_desc", "We'll create a tailored meal plan that fits your budget and team size.")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {t("for_teams.step3_title", "Enjoy Delivery")}
              </h3>
              <p className="text-primary/70">
                {t("for_teams.step3_desc", "Fresh meals delivered weekly to your office. No hassle, just great food.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("for_teams.cta_title", "READY TO FEED YOUR TEAM?")}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t("for_teams.cta_description", "Contact us today to learn more about our corporate meal delivery solutions.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3"
              onClick={() => navigate(webRoutes.join_now)}
            >
              {t("for_teams.start_today", "START TODAY")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white hover:bg-white text-primary px-8 py-3 hover:text-white hover:bg-primary"
              onClick={() => window.open('tel:+212600000000', '_self')}
            >
              <IconTruck className="w-5 h-5 mr-2" />
              {t("for_teams.call_us", "CALL US")}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ForTeams;