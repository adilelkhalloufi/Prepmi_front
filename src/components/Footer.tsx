import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { webRoutes } from "@/routes/web"
import ThemeSwitcher from "./theme-switcher"

export default function Footer() {
  const { t } = useTranslation()
  const [isChatOpen, setIsChatOpen] = React.useState(false)




  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">{t('website')}</h2>
            <p className="mb-6 text-muted-foreground">
              {t('about.description')}
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder={t('footer.email_placeholder')}
                className="pr-12 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">{t('footer.subscribe')}</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('footer.quick_links')}</h3>
            <nav className="space-y-2 text-sm">
              <a href="#" className="block transition-colors hover:text-primary">
                {t('menu_home')}
              </a>
              <a href="#" className="block transition-colors hover:text-primary">
                {t('menu_about')}
              </a>
              <a href="#" className="block transition-colors hover:text-primary">
                {t('footer.services')}
              </a>
              <a href="#" className="block transition-colors hover:text-primary">
                {t('footer.products')}
              </a>
              <a href="#" className="block transition-colors hover:text-primary">
                {t('menu_contact')}
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('footer.contact_us')}</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>{t('footer.address_line1')}</p>
              <p>{t('footer.address_line2')}</p>
              <p>{t('footer.phone')}: {t('footer.phone_number')}</p>
              <p>{t('footer.email')}: {t('footer.email_address')}</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">{t('footer.follow_us')}</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('footer.follow_facebook')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('footer.follow_twitter')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('footer.follow_instagram')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('footer.follow_linkedin')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeSwitcher type="checkbox" />
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
          <nav className="flex gap-4 text-sm">
            <Link to={webRoutes.privacy_policy} className="transition-colors hover:text-primary">
              {t('footer.privacy_policy')}
            </Link>
            <Link to={webRoutes.terms_service} className="transition-colors hover:text-primary">
              {t('footer.terms_service')}
            </Link>
            <Link to={webRoutes.cookie_settings} className="transition-colors hover:text-primary">
              {t('footer.cookie_settings')}
            </Link>
          </nav>
        </div>
      </div>
      {/* <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
      >
        {isChatOpen ? "Close Chat" : "Open Chat"}
      </Button>
      {isChatOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 rounded-lg border bg-background p-4 shadow-lg">
          <h4 className="mb-4 text-lg font-semibold">Live Chat</h4>
          <div className="mb-4 h-40 overflow-y-auto rounded border p-2">
            <p className="mb-2">
              <strong>Support:</strong> Hello! How can I assist you today?
            </p>
          </div>
          <form className="flex gap-2">
            <Textarea placeholder="Type your message..." className="flex-grow" />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      )} */}
    </footer>
  )
}