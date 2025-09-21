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
  // {
  //   title: 'Tableau de bord',
  //   label: '',
  //   href: webRoutes.Dashboard,
  //   icon: <IconLayoutDashboard size={18} />,
  //   role: [RoleEnum.BUYER, RoleEnum.SELLER, RoleEnum.ADMIN,RoleEnum.USER]
  // },
  {
    title: 'Produit',
    label: '',
    href: webRoutes.dashboard_product,
    icon: <IconBox size={18} />,
    role: [RoleEnum.BUYER, RoleEnum.SELLER, RoleEnum.ADMIN,RoleEnum.USER]

  },
  {
    title: 'Votre Commandes',
    label: '',
    href: webRoutes.dashboard_order,
    icon: <IconShoppingCart size={18} />,
    role: [RoleEnum.BUYER, RoleEnum.SELLER, RoleEnum.ADMIN,RoleEnum.USER]

  },
  {
    title: 'Commandes des clients',
    label: '',
    href: webRoutes.dashboard_order_seller,
    icon: <IconShoppingCart size={18} />,
    role: [RoleEnum.SELLER]

  },
  {
    title: 'Favorites',
    label: '',
    href: webRoutes.dashboard_favris,
    icon: <IconHeart size={18} />,
    role: [RoleEnum.BUYER, RoleEnum.SELLER, RoleEnum.ADMIN,RoleEnum.USER]

  },
 
]
