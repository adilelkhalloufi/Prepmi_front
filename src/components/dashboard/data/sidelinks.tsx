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
    role: [RoleEnum.ADMIN ,RoleEnum.CLIENT]
  },
  {
    title: 'Gestion des repas',
    label: '',
    href: '',
    icon: <IconBox size={18} />,
    role: [RoleEnum.ADMIN],
    sub: [
      {
        title: 'Repas',
        href: webRoutes.dashboard_meals,
        icon: <IconBox size={18} />
      },
     
      {
        title: 'Catégories',
        href: webRoutes.dashboard_categories,
        icon: <IconHeart size={18} />
      }
    ]
  },
  {
    title: 'Gestion des utilisateurs',
    label: '',
    href: '',
    icon: <IconUser size={18} />,
    role: [RoleEnum.ADMIN],
    sub: [
      {
        title: 'Utilisateurs',
        href: webRoutes.dashboard_users,
        icon: <IconUser size={18} />
      },
      {
        title: 'Collaborateurs',
        href: webRoutes.dashboard_collaborators,
        icon: <IconUsers size={18} />
      },
      {
        title: 'Partenaires',
        href: webRoutes.dashboard_partners,
        icon: <IconUser size={18} />
      }
    ]
  },
  {
    title: 'Commandes & opérations',
    label: '',
    href: '',
    icon: <IconShoppingCart size={18} />,
    role: [RoleEnum.ADMIN, RoleEnum.CUISINIER, RoleEnum.CLIENT],
    sub: [
      {
        title: 'Commandes',
        href: webRoutes.dashboard_orders,
        icon: <IconShoppingCart size={18} />,
        role: [RoleEnum.ADMIN, RoleEnum.CLIENT]
      },
      {
        title: 'Préparation repas',
        href: webRoutes.dashboard_meal_preparation,
        icon: <IconChefHat size={18} />,
        role: [RoleEnum.ADMIN, RoleEnum.CUISINIER]
      },
      {
        title: 'Créneaux livraison',
        href: webRoutes.dashboard_delivery_slots,
        icon: <IconSettings size={18} />,
        role: [RoleEnum.ADMIN]
      }
    ]
  },
  {
    title: 'Business & abonnements',
    label: '',
    href: '',
    icon: <IconCreditCard size={18} />,
    role: [RoleEnum.ADMIN, RoleEnum.CLIENT],
    sub: [
      {
        title: 'Plans tarifaires',
        href: webRoutes.dashboard_plans,
        icon: <IconFileInvoice size={18} />,
        role: [RoleEnum.ADMIN]
      },
      {
        title: 'Plans d\'adhésion',
        href: webRoutes.dashboard_membership_plans,
        icon: <IconCreditCard size={18} />,
        role: [RoleEnum.ADMIN]
      },
      {
        title: 'Adhésions',
        href: webRoutes.dashboard_memberships,
        icon: <IconUsers size={18} />,
        role: [RoleEnum.ADMIN, RoleEnum.CLIENT]
      },
      {
        title: 'Récompenses',
        href: webRoutes.dashboard_rewards,
        icon: <IconSettings2 size={18} />,
        role: [RoleEnum.ADMIN, RoleEnum.CLIENT]
      }
    ]
  },
  {
    title: 'Settings',
    label: '',
    href: webRoutes.dashboard_settings,
    icon: <IconSettings size={18} />,
    role: [RoleEnum.ADMIN]
  }
]