import { RoleEnum } from '@/enum/RoleEnum'
import { webRoutes } from '@/routes/web'
import {
  IconBox,
  IconFileInvoice,
  IconHeart,
  IconLayoutDashboard,
  IconSettings,
  IconSettings2,
  IconShoppingCart,

} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
  role?: number[]
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Tableau de bord',
    label: '',
    href: webRoutes.dashboard,
    icon: <IconLayoutDashboard size={18} />,
    role: [RoleEnum.BUYER, RoleEnum.SELLER, RoleEnum.ADMIN, RoleEnum.USER]
  },
  {
    title: 'Repas',
    label: '',
    href: webRoutes.dashboard_meals,
    icon: <IconBox size={18} />,
    role: [RoleEnum.BUYER, RoleEnum.SELLER, RoleEnum.ADMIN, RoleEnum.USER]

  },


]
