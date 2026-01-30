import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { IconStar } from "@tabler/icons-react";
import Footer from "@/components/Footer";

const ForCollab = () => {
  const { t } = useTranslation();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-primary/5 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80)'}}></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {t("for_collab.hero_title", "BECOME A PREPME PARTNER")}
            </h1>
            <p className="text-xl text-primary/80 mb-8 leading-relaxed">
              {t("for_collab.hero_description", "Join our partnership program and help your clients achieve their health goals while earning rewards. Together, we can make healthy eating accessible to everyone.")}
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
            >
              {t("for_collab.apply_now", "APPLY NOW")}
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t("for_collab.benefits_title", "AWESOME PERKS OF PARTNERING WITH PREPME")}
            </h2>
            <p className="text-lg text-primary/70 max-w-2xl mx-auto">
              {t("for_collab.benefits_description", "Discover the benefits of joining our partnership network.")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
                  alt="Healthy meal results"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {t("for_collab.benefit1_title", "Achieve Results")}
              </h3>
              <p className="text-primary/70">
                {t("for_collab.benefit1_desc", "Help your clients reach their health goals with our nutritious, chef-prepared meals that deliver real results.")}
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
                  alt="Sustainable healthy eating"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {t("for_collab.benefit2_title", "Sustainable Growth")}
              </h3>
              <p className="text-primary/70">
                {t("for_collab.benefit2_desc", "Build your reputation as a trusted health professional by offering comprehensive nutrition solutions.")}
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1981&q=80"
                  alt="Healthy meal rewards"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {t("for_collab.benefit3_title", "Generate Revenue")}
              </h3>
              <p className="text-primary/70">
                {t("for_collab.benefit3_desc", "Earn commissions when your clients subscribe using your referral code. Turn your network into income.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t("for_collab.how_title", "HOW IT WORKS")}
            </h2>
            <p className="text-lg text-primary/70">
              {t("for_collab.how_description", "Joining our partnership program is simple and rewarding.")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt="Healthy meal application"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {t("for_collab.step1_title", "Apply")}
              </h3>
              <p className="text-primary/70">
                {t("for_collab.step1_desc", "Fill out our simple application form. It takes less than 2 minutes!")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80"
                  alt="Fresh healthy meals"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {t("for_collab.step2_title", "Get Approved")}
              </h3>
              <p className="text-primary/70">
                {t("for_collab.step2_desc", "We'll review your application and get back to you within 48 hours.")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                  alt="Sharing healthy meals"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {t("for_collab.step3_title", "Share & Promote")}
              </h3>
              <p className="text-primary/70">
                {t("for_collab.step3_desc", "Use your unique referral link and promotional materials to share PrepMe with your network.")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1981&q=80"
                  alt="Healthy meal rewards"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                4
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {t("for_collab.step4_title", "Earn Rewards")}
              </h3>
              <p className="text-primary/70">
                {t("for_collab.step4_desc", "Earn commissions on every successful referral. Watch your network grow!")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stats Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t("for_collab.stats_title", "PARTNERSHIP SUCCESS STORIES")}
            </h2>
            <p className="text-lg text-primary/70">
              {t("for_collab.stats_description", "See how our partners are succeeding with PrepMe")}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1551782450-17144efb5723?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                  alt="Healthy meal partners"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-primary/70">
                {t("for_collab.stat1_desc", "Active Partners")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1981&q=80"
                  alt="Healthy meal earnings"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">$2M+</div>
              <p className="text-primary/70">
                {t("for_collab.stat2_desc", "Partner Earnings")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
                  alt="Healthy meal clients"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <p className="text-primary/70">
                {t("for_collab.stat3_desc", "Clients Referred")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
                  alt="Healthy meal satisfaction"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <p className="text-primary/70">
                {t("for_collab.stat4_desc", "Partner Satisfaction")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t("for_collab.testimonials_title", "WHAT OUR PARTNERS SAY")}
            </h2>
            <p className="text-lg text-primary/70">
              {t("for_collab.testimonials_description", "Hear from successful partners in our network.")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt="Sarah M."
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <IconStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-primary/80 mb-4 italic">
                "{t("for_collab.testimonial1", "PrepMe has been a game-changer for my clients. The meals are delicious and the results speak for themselves!")}"
              </p>
              <p className="font-semibold text-primary">
                {t("for_collab.partner1_name", "Sarah M.")}
              </p>
              <p className="text-sm text-primary/60">
                {t("for_collab.partner1_title", "Fitness Coach")}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Ahmed K."
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <IconStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-primary/80 mb-4 italic">
                "{t("for_collab.testimonial2", "The partnership program is fantastic. I've earned great commissions while helping my clients eat healthier.")}"
              </p>
              <p className="font-semibold text-primary">
                {t("for_collab.partner2_name", "Ahmed K.")}
              </p>
              <p className="text-sm text-primary/60">
                {t("for_collab.partner2_title", "Nutrition Specialist")}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Fatima R."
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <IconStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-primary/80 mb-4 italic">
                "{t("for_collab.testimonial3", "PrepMe makes it easy to provide complete nutrition solutions to my clients. Highly recommended!")}"
              </p>
              <p className="font-semibold text-primary">
                {t("for_collab.partner3_name", "Fatima R.")}
              </p>
              <p className="text-sm text-primary/60">
                {t("for_collab.partner3_title", "Wellness Coach")}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Youssef B."
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <IconStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-primary/80 mb-4 italic">
                "{t("for_collab.testimonial4", "The support team is amazing and the commissions are paid on time. Great partnership opportunity!")}"
              </p>
              <p className="font-semibold text-primary">
                {t("for_collab.partner4_name", "Youssef B.")}
              </p>
              <p className="text-sm text-primary/60">
                {t("for_collab.partner4_title", "Health Consultant")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("for_collab.apply_title", "READY TO BECOME A PREPME PARTNER?")}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t("for_collab.apply_description", "Join our growing network of health professionals and start earning while helping others achieve their wellness goals.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3"
            >
              {t("for_collab.apply_now", "APPLY NOW")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-3"
              onClick={() => window.open('mailto:partnerships@prepme.ma', '_self')}
            >
              {t("for_collab.contact_us", "CONTACT US")}
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-6">
            {t("for_collab.application_note", "Applications are reviewed within 48 hours. We'll get back to you with next steps.")}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ForCollab;