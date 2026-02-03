import {
  LayoutDashboard,
  Film,
  FolderSearch,
  ClipboardList,
  Settings,
  // Link,
  Bell,
  LucideIcon,
  Mail,
  WandSparkles,
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
    href: "/dashboard/creator/browse-campaigns",
    icon: FolderSearch,
    label: "Browse Campaigns",
    slug: "campaigns",
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
    label: "My Applications",
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
  // {
  //   label: "My Ad Brief",
  //   href: "/dashboard/brand/posts",
  //   icon: ClipboardList,
  //   slug: "posts",
  //   matchPaths: ["/dashboard/brand/posts", "/dashboard/brand/create-post"],
  // },
  // {
  //   label: "My Ad Brief",
  //   href: "/dashboard/brand/create-campaign",
  //   icon: ClipboardList,
  //   slug: "posts",
  //   matchPaths: ["/dashboard/brand/create-campaign", "/dashboard/brand/create-campaign"],
  // },
  {
    label: "My Campaigns",
    href: "/dashboard/brand/my-campaigns",
    icon: ClipboardList,
    slug: "posts",
    matchPaths: ["/dashboard/brand/create-campaign", "/dashboard/brand/create-campaign"],
  },
  {
    label: "Collaboration Manager",
    href: "/dashboard/brand/application-inbox",
    icon: Mail,
    slug: "manager",
    matchPaths: ["/dashboard/brand/xyz", "/dashboard/brand/xyz"],
  },
  // {
  //   href: "/dashboard/brand/findai",
  //   icon: WandSparkles,
  //   label: "AI Find",
  //   slug: "findai",
  //   matchPaths: [
  //     "/dashboard/brand/findai",
  //     "/dashboard/brand/findai/campaign",
  //     "/dashboard/brand/findai/campaign/[campaignId]/creator",
  //   ],
  // },
  {
    label: "Discover Creators",
    href: "/dashboard/brand/explore",
    icon: UserRoundSearch,
    slug: "explore",

  },
];

const creatorProfileNav: NavItem[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    slug: "dashboard",
  },
  {
    href: "/dashboard/creator/browse-campaigns",
    icon: FolderSearch,
    label: "Browse Campaigns",
    slug: "campaigns",
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
    label: "My Applications",
    slug: "inbox",
  },
  // {
  //   href: "/user-profile",
  //   icon: Settings,
  //   label: "Account Settings",
  //   slug: "account",
  // },
  // {
  //   href: "/user-profile/socials",
  //   icon: Link,
  //   label: "Linked Socials",
  //   slug: "socials",
  // },
  // {
  //   href: "/user-profile/notifications",
  //   icon: Bell,
  //   label: "Notifications",
  //   slug: "notifications",
  // },
];

const brandProfileNav: NavItem[] = [
  // {
  //   href: "/user-profile",
  //   icon: Settings,
  //   label: "Account Settings",
  //   slug: "account",
  // },
  // {
  //   href: "/user-profile/notifications",
  //   icon: Bell,
  //   label: "Notifications",
  //   slug: "notifications",
  // },

  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    slug: "dashboard",
  },
  // {
  //   label: "My Ad Brief",
  //   href: "/dashboard/brand/posts",
  //   icon: ClipboardList,
  //   slug: "posts",
  //   matchPaths: ["/dashboard/brand/posts", "/dashboard/brand/create-post"],
  // },
  // {
  //   label: "My Ad Brief",
  //   href: "/dashboard/brand/create-campaign",
  //   icon: ClipboardList,
  //   slug: "posts",
  //   matchPaths: ["/dashboard/brand/create-campaign", "/dashboard/brand/create-campaign"],
  // },
  {
    label: "My Campaigns",
    href: "/dashboard/brand/my-campaigns",
    icon: ClipboardList,
    slug: "posts",
    matchPaths: ["/dashboard/brand/create-campaign", "/dashboard/brand/create-campaign"],
  },
  {
    label: "Collaboration Manager",
    href: "/dashboard/brand/application-inbox",
    icon: Mail,
    slug: "manager",
    matchPaths: ["/dashboard/brand/xyz", "/dashboard/brand/xyz"],
  },
  // {
  //   href: "/dashboard/brand/findai",
  //   icon: WandSparkles,
  //   label: "AI Find",
  //   slug: "findai",
  //   matchPaths: [
  //     "/dashboard/brand/findai",
  //     "/dashboard/brand/findai/campaign",
  //     "/dashboard/brand/findai/campaign/[campaignId]/creator",
  //   ],
  // },
  {
    label: "Discover Creators",
    href: "/dashboard/brand/explore",
    icon: UserRoundSearch,
    slug: "explore",

  },
];

export const navLinks: NavLinks = {
  creator: {
    profile: creatorNav,
    dashboard: creatorNav,
  },
  brand: {
    profile: brandNav,
    dashboard: brandNav,
  },
};
