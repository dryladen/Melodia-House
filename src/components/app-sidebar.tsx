"use client";
import {
  ArrowRightLeft,
  BookOpenCheck,
  ChevronUp,
  Guitar,
  HandCoins,
  Home,
  LogOut,
  Package,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signout } from "@/lib/action";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Instruments",
    url: "/instruments",
    icon: Guitar,
  },
  {
    title: "Packages",
    url: "/packages",
    icon: Package,
  },
  {
    title: "Lessons",
    url: "/lessons",
    icon: BookOpenCheck,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: HandCoins,
  },
  {
    title: "Relations",
    url: "/relations",
    icon: ArrowRightLeft,
  },
];

type Props = {
  email: string | undefined;
};
export function AppSidebar({ email }: Props) {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b-[1px]">
        <span className="truncate font-semibold text-lg">Melodia House</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {email}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem asChild>
                  <form action={signout} className="w-full">
                    <button
                      className="button flex gap-2 w-full text-start text-sidebar-foreground "
                      type="submit"
                    >
                      <LogOut size={16} />
                      Log out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
