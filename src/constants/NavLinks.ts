import {
  LayoutDashboard,
  Users,
  Package,
  BarChart,
  Briefcase,
  Film,
  ClipboardList,
} from "lucide-react";

const creatorNav = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/dashboard/content",
    icon: Film,
    label: "My Content",
  },
  {
    href: "/dashboard/collaborations",
    icon: Briefcase,
    label: "Collaborations",
  },
  {
    href: "/dashboard/analytics",
    icon: BarChart,
    label: "Analytics",
  },
];

const brandNav = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/dashboard/campaigns",
    icon: ClipboardList,
    label: "Campaigns",
  },
  {
    href: "/dashboard/creators",
    icon: Users,
    label: "Creators",
  },
  {
    href: "/dashboard/products",
    icon: Package,
    label: "Products",
  },
];

export const navLinks = {
  creator: creatorNav,
  brand: brandNav,
};
