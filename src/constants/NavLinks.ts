import {
  LayoutDashboard,
  Film,
  ClipboardList,
  Settings,
  PenLine,
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
  children?: Array<{
    href: string;
    label: string;
    icon: LucideIcon;
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
  },
  // {
  //   href: "/dashboard/creator/analytics",
  //   icon: ChartNoAxesCombined,
  //   label: "My Analytics",
  // },
  {
    href: "/dashboard/creator/content",
    icon: Film,
    label: "My Videos",
  },
  {
    href: "/dashboard/creator/inbox",
    icon: Mail,
    label: "Inbox",
  },
];

const brandNav: NavItem[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    icon: LayoutDashboard,
    label: "My Postings",
    children: [
      {
        href: "/dashboard/brand/posts",
        icon: ClipboardList,
        label: "My Posts",
      },
      {
        href: "/dashboard/brand/create-post",
        icon: PenLine,
        label: "Create Post",
      },
    ],
  },
  {
    href: "/dashboard/brand/findai",
    icon: WandSparkles,
    label: "AI Find",
  },
  {
    href: "/dashboard/brand/inbox",
    icon: Mail,
    label: "Inbox",
  },
];

const creatorProfileNav: NavItem[] = [
  {
    href: "/user-profile",
    icon: Settings,
    label: "Account Settings",
  },
  {
    href: "/user-profile/profile",
    icon: PenLine,
    label: "Complete Profile",
  },
  {
    href: "/user-profile/socials",
    icon: Link,
    label: "Linked Socials",
  },
  {
    href: "/user-profile/notifications",
    icon: Bell,
    label: "Notifications",
  },
];

const brandProfileNav: NavItem[] = [
  {
    href: "/user-profile",
    icon: Settings,
    label: "Account Settings",
  },
  {
    href: "/user-profile/notifications",
    icon: Bell,
    label: "Notifications",
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
