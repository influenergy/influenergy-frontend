import {
  LayoutDashboard,
  Film,
  ClipboardList,
  Settings,
  Link,
  Bell,
  LucideIcon,
  Mail,
  WandSparkles,
  // ChartNoAxesCombined,
} from "lucide-react";

interface NavItem {
  href?: string;
  icon: LucideIcon;
  label: string;
  slug: string;
  children?: Array<{
    href: string;
    label: string;
    icon: LucideIcon;
    slug: string;
  }>;
}

interface NavLinks {
  [key: string]: {
    profile: NavItem[];
    dashboard: NavItem[];
  };
}

const creatorNav: NavItem[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    slug: "dashboard",
  },
  // {
  //   href: "/dashboard/creator/analytics",
  //   icon: ChartNoAxesCombined,
  //   label: "My Analytics",
  // },
  {
    href: "/dashboard/creator/content",
    icon: Film,
    label: "My Video",
    slug: "content",
  },
  {
    href: "/dashboard/creator/inbox",
    icon: Mail,
    label: "Inbox",
    slug: "inbox",
  },
];

const brandNav: NavItem[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    slug: "dashboard",
  },
  {
    label: "My Brief",
    href: "/dashboard/brand/posts",
    icon: ClipboardList,
    slug: "posts",
  },
  {
    href: "/dashboard/brand/findai",
    icon: WandSparkles,
    label: "AI Find",
    slug: "findai",
  },
  // {
  //   href: "/dashboard/brand/inbox",
  //   icon: Mail,
  //   label: "Inbox",
  // },
];

const creatorProfileNav: NavItem[] = [
  {
    href: "/user-profile",
    icon: Settings,
    label: "Account Settings",
    slug: "account",
  },
  // {
  //   href: "/user-profile/profile",
  //   icon: PenLine,
  //   label: "Complete Profile",
  // },
  {
    href: "/user-profile/socials",
    icon: Link,
    label: "Linked Socials",
    slug: "socials",
  },
  {
    href: "/user-profile/notifications",
    icon: Bell,
    label: "Notifications",
    slug: "notifications",
  },
];

const brandProfileNav: NavItem[] = [
  {
    href: "/user-profile",
    icon: Settings,
    label: "Account Settings",
    slug: "account",
  },
  {
    href: "/user-profile/notifications",
    icon: Bell,
    label: "Notifications",
    slug: "notifications",
  },
];

export const navLinks: NavLinks = {
  creator: {
    profile: creatorProfileNav,
    dashboard: creatorNav,
  },
  brand: {
    profile: brandProfileNav,
    dashboard: brandNav,
  },
};
