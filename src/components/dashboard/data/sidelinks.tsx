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
  IconCalendarMonth,
  IconChefHat,
  IconCreditCard,
  IconUsers

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
    role: [RoleEnum.ADMIN, RoleEnum.CUISINIER, RoleEnum.LIVREUR, RoleEnum.CLIENT]
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
  {
    title: 'Commandes',
    label: '',
    href: webRoutes.dashboard_orders,
    icon: <IconShoppingCart size={18} />,
    role: [RoleEnum.ADMIN, RoleEnum.CLIENT]

  },
  {
    title: 'Préparation Repas',
    label: '',
    href: webRoutes.dashboard_meal_preparation,
    icon: <IconChefHat size={18} />,
    role: [RoleEnum.ADMIN, RoleEnum.CUISINIER]

  },
  {
    title: 'Plans',
    label: '',
    href: webRoutes.dashboard_plans,
    icon: <IconFileInvoice size={18} />,
    role: [RoleEnum.ADMIN]
  },
  {
    title: 'Catégories',
    label: '',
    href: webRoutes.dashboard_categories,
    icon: <IconHeart size={18} />,
    role: [RoleEnum.ADMIN]
  },
  {
    title: 'Rewards',
    label: '',
    href: webRoutes.dashboard_rewards,
    icon: <IconSettings2 size={18} />,
    role: [RoleEnum.ADMIN, RoleEnum.CLIENT]
  },
  {
    title: 'Membership Plans',
    label: '',
    href: webRoutes.dashboard_membership_plans,
    icon: <IconCreditCard size={18} />,
    role: [RoleEnum.ADMIN]
  },
  {
    title: 'Memberships',
    label: '',
    href: webRoutes.dashboard_memberships,
    icon: <IconUsers size={18} />,
    role: [RoleEnum.ADMIN, RoleEnum.CLIENT]
  },
  {
    title: 'Créneaux de livraison',
    label: '',
    href: webRoutes.dashboard_delivery_slots,
    icon: <IconSettings size={18} />,
    role: [RoleEnum.ADMIN]
  },
  // show collaborators and partners only to admin
  {
    title: 'Collaborateurs',
    label: '',
    href: webRoutes.dashboard_collaborators,
    icon: <IconUsers size={18} />,
    role: [RoleEnum.ADMIN]
  },
  {
    title: 'Partenaires',
    label: '',
    href: webRoutes.dashboard_partners,
    icon: <IconUser size={18} />,
    role: [RoleEnum.ADMIN]
  }



]
