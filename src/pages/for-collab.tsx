import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { IconStar, IconTarget, IconLeaf, IconCurrencyDollar, IconClipboardList, IconShieldCheck, IconShare, IconAward, IconUsers, IconUserPlus, IconHeart, IconUser } from "@tabler/icons-react";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRoutes } from "@/routes/api";
import http from "@/utils/http";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  social_url_1: z.string().refine((val) => {
    if (!val) return false; // required
    const urlPattern = /^https?:\/\/.+/;
    const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return urlPattern.test(val) || domainPattern.test(val);
  }, "Invalid URL or domain"),
  social_url_2: z.string().refine((val) => {
    if (!val) return true; // optional
    const urlPattern = /^https?:\/\/.+/;
    const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return urlPattern.test(val) || domainPattern.test(val);
  }, "Invalid URL or domain").optional().or(z.literal("")),
  social_url_3: z.string().refine((val) => {
    if (!val) return true; // optional
    const urlPattern = /^https?:\/\/.+/;
    const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return urlPattern.test(val) || domainPattern.test(val);
  }, "Invalid URL or domain").optional().or(z.literal("")),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  country: z.string().min(1, "Country is required"),
});

type FormData = z.infer<typeof formSchema>;

const ForCollab = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const settings = useSelector((state: RootState) => state.settings);
  
  // Get collaboration background image from settings
  const collabBgImage = settings.settings?.find(s => s.key === 'collaboration_bg_image')?.value || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80';

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      social_url_1: "",
      social_url_2: "",
      social_url_3: "",
      email: "",
      phone: "",
      country: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await http.post(apiRoutes.collaborations, data);
      toast.success("Application submitted successfully!");
      console.log('Success:', response.data);
      form.reset();
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-primary/5 py-20 overflow-hidden pt-32">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${collabBgImage})` }}></div>
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
              onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
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
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <IconTarget className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {t("for_collab.benefit1_title", "Achieve Results")}
              </h3>
              <p className="text-primary/70">
                {t("for_collab.benefit1_desc", "Help your clients reach their health goals with our nutritious, chef-prepared meals that deliver real results.")}
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <IconLeaf className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {t("for_collab.benefit2_title", "Sustainable Growth")}
              </h3>
              <p className="text-primary/70">
                {t("for_collab.benefit2_desc", "Build your reputation as a trusted health professional by offering comprehensive nutrition solutions.")}
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <IconCurrencyDollar className="w-12 h-12 text-primary" />
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
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <IconClipboardList className="w-10 h-10 text-primary" />
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
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <IconShieldCheck className="w-10 h-10 text-primary" />
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
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <IconShare className="w-10 h-10 text-primary" />
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
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <IconAward className="w-10 h-10 text-primary" />
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
                <IconUsers className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-primary/70">
                {t("for_collab.stat1_desc", "Active Partners")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                <IconCurrencyDollar className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">$2M+</div>
              <p className="text-primary/70">
                {t("for_collab.stat2_desc", "Partner Earnings")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                <IconUserPlus className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <p className="text-primary/70">
                {t("for_collab.stat3_desc", "Clients Referred")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                <IconHeart className="w-10 h-10 text-white" />
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <IconUser className="w-8 h-8 text-primary" />
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <IconUser className="w-8 h-8 text-primary" />
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <IconUser className="w-8 h-8 text-primary" />
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <IconUser className="w-8 h-8 text-primary" />
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
      <section id="apply" className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("for_collab.apply_title", "READY TO BECOME A PREPME PARTNER?")}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t("for_collab.apply_description", "Join our growing network of health professionals and start earning while helping others achieve their wellness goals.")}
          </p>
          <Card className="bg-white text-black p-6 max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle>{t("for_collab.form.title", "Application Form")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-left">{t("for_collab.form.full_name", "Full Name")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("for_collab.form.full_name", "Full Name")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-left">{t("for_collab.form.email", "Email")}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={t("for_collab.form.email", "Email")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">{t("for_collab.form.phone", "Phone")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("for_collab.form.phone", "Phone")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">{t("for_collab.form.country", "Country")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("for_collab.form.country", "Country")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="social_url_1"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-left">{t("for_collab.form.social_url_1", "Social Media URL 1")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("for_collab.form.https_example", "example.com")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="social_url_2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">{t("for_collab.form.social_url_2", "Social Media URL 2 (Optional)")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("for_collab.form.https_example", "example.com")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="social_url_3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">{t("for_collab.form.social_url_3", "Social Media URL 3 (Optional)")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("for_collab.form.https_example", "example.com")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="col-span-2 w-full" disabled={loading}>
                    {loading ? "Submitting..." : t("for_collab.form.submit", "Submit Application")}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
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