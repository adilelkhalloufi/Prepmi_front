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
  IconUser,
  IconCalendarMonth

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
    role: [RoleEnum.ADMIN, RoleEnum.CUSINIER, RoleEnum.LIVRAEUR, RoleEnum.CLIENT]
  },
  {
    title: 'Repas',
    label: '',
    href: webRoutes.dashboard_meals,
    icon: <IconBox size={18} />,
    role: [RoleEnum.ADMIN]

  },

  {
    title: 'Weekly Plans',
    label: '',
    href: webRoutes.dashboard_weekly_menus,
    icon: <IconCalendarMonth size={18} />,
    role: [RoleEnum.ADMIN]

  },

  {
    title: 'Utilisateurs',
    label: '',
    href: webRoutes.dashboard_users,
    icon: <IconUser size={18} />,
    role: [RoleEnum.ADMIN]

  },



]
