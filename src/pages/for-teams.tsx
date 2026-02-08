import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { IconCheck, IconUsers, IconClock, IconHeart, IconStar } from "@tabler/icons-react";
import { webRoutes } from "@/routes/web";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRoutes } from "@/routes/api";
import http from "@/utils/http";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  job_title: z.string().optional(),
  email: z.string().email("Invalid email address"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  company_name: z.string().min(1, "Company name is required"),
  company_website: z.string().refine((val) => {
    if (!val) return true; // optional
    const urlPattern = /^https?:\/\/.+/;
    const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return urlPattern.test(val) || domainPattern.test(val);
  }, "Invalid URL or domain").optional().or(z.literal("")),
  partnership_type: z.string().min(1, "Partnership type is required"),
  team_members_per_week: z.string().min(1, "Team members per week is required"),
  products_interested: z.string().min(1, "Products interested is required"),
  heard_about_us: z.string().optional(),
  accept_terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
  accept_communications: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

const ForTeams = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job_title: "",
      email: "",
      first_name: "",
      last_name: "",
      company_name: "",
      company_website: "",
      partnership_type: "",
      team_members_per_week: "",
      products_interested: "",
      heard_about_us: "",
      accept_terms: false,
      accept_communications: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await http.post(apiRoutes.teamPartnerships, data);
      toast.success("Form submitted successfully!");
      console.log('Success:', response.data);
      // Reset form or navigate
      form.reset();
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-primary/5 py-20 overflow-hidden pt-32 ">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80)' }}></div>
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
              onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
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
      <section id="cta" className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("for_teams.cta_title", "READY TO FEED YOUR TEAM?")}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t("for_teams.cta_description", "Contact us today to learn more about our corporate meal delivery solutions.")}
          </p>
          <Card className="bg-white text-black p-6 max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle>{t("for_teams.contact_title", "Contact Us for Corporate Meals")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="job_title"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-left">{t("for_teams.form.job_title", "Job Title (Optional)")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("for_teams.form.job_title", "Job Title")} {...field} />
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
                        <FormLabel className="text-left">{t("for_teams.form.email", "Email")}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={t("for_teams.form.email", "Email")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">{t("for_teams.form.first_name", "First Name")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("for_teams.form.first_name", "First Name")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">{t("for_teams.form.last_name", "Last Name")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("for_teams.form.last_name", "Last Name")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">{t("for_teams.form.company_name", "Company Name")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("for_teams.form.company_name", "Company Name")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company_website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">{t("for_teams.form.company_website", "Company Website (Optional)")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("for_teams.form.https_example", "example.com")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="partnership_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">{t("for_teams.form.partnership_type", "Partnership Type")}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("for_teams.form.select_partnership_type", "Select partnership type")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="vendor">Vendor</SelectItem>
                            <SelectItem value="partner">Partner</SelectItem>
                            <SelectItem value="client">Client</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="team_members_per_week"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">{t("for_teams.form.team_members_per_week", "Team Members per Week")}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("for_teams.form.select_range", "Select range")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-10">1-10</SelectItem>
                            <SelectItem value="11-50">11-50</SelectItem>
                            <SelectItem value="51-100">51-100</SelectItem>
                            <SelectItem value="100+">100+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="products_interested"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-left">{t("for_teams.form.products_interested", "Products Interested")}</FormLabel>
                        <FormControl>
                          <Textarea placeholder={t("for_teams.form.list_products", "List products you're interested in")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="heard_about_us"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-left">{t("for_teams.form.heard_about_us", "How did you hear about us? (Optional)")}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("for_teams.form.select_option", "Select option")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="social_media">Social Media</SelectItem>
                            <SelectItem value="referral">Referral</SelectItem>
                            <SelectItem value="search">Search Engine</SelectItem>
                            <SelectItem value="advertisement">Advertisement</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="accept_terms"
                    render={({ field }) => (
                      <FormItem className="col-span-2 flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-left">
                            {t("for_teams.form.accept_terms", "I accept the terms and conditions")}
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="accept_communications"
                    render={({ field }) => (
                      <FormItem className="col-span-2 flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-left">
                            {t("for_teams.form.accept_communications", "I agree to receive communications")}
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="col-span-2 w-full" disabled={loading}>
                    {loading ? "Submitting..." : t("for_teams.form.submit", "Submit")}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ForTeams;