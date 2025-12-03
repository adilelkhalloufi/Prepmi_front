import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { webRoutes } from "@/routes/web"
import logo from "../assets/Prepme.svg"

export default function Footer2() {
  const { t } = useTranslation()

  return (
    <footer className="relative py-20 bg-gradient-to-b from-[#e8e4e1] to-[#dbd7d6] overflow-hidden">
   
    </footer>
  )
}