import {
  LayoutDashboard,
  Film,
  ClipboardList,
  Settings,
  // Link,
  Bell,
  LucideIcon,
  Mail,
  WandSparkles,
  FileText,
  UserRoundSearch
  // ChartNoAxesCombined,
} from "lucide-react";

interface NavItem {
  href?: string;
  icon: LucideIcon;
  label: string;
  slug: string;
  matchPaths?: string[];
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
  {
    href: "/dashboard/creator/content",
    icon: Film,
    label: "My Videos",
    slug: "content",
  },
  // {
  //   href: "/dashboard/creator/inbox",
  //   icon: Mail,
  //   label: "Educational Hub",
  //   slug: "inbox",
  // },
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
    label: "My Ad Brief",
    href: "/dashboard/brand/posts",
    icon: ClipboardList,
    slug: "posts",
    matchPaths: ["/dashboard/brand/posts", "/dashboard/brand/create-post"],
  },
  {
    href: "/dashboard/brand/findai",
    icon: WandSparkles,
    label: "AI Find",
    slug: "findai",
    matchPaths: [
      "/dashboard/brand/findai",
      "/dashboard/brand/findai/campaign",
      "/dashboard/brand/findai/campaign/[campaignId]/creator",
    ],
  },
  {
    label: "Explore Creators",
    href: "/dashboard/brand/explore",
    icon: UserRoundSearch,
    slug: "explore",
    
  },
  {
    href: "/dashboard/feedback",
    icon: FileText,
    label: "Feedback",
    slug: "feedback",
  },
];

const creatorProfileNav: NavItem[] = [
  {
    href: "/user-profile",
    icon: Settings,
    label: "Account Settings",
    slug: "account",
  },
  // {
  //   href: "/user-profile/socials",
  //   icon: Link,
  //   label: "Linked Socials",
  //   slug: "socials",
  // },
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
