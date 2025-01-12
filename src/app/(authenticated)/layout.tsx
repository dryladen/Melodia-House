import AppNavbar from "@/components/app-navbar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { directus } from "@/lib/directus";
import { readMe } from "@directus/sdk";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const token = (await cookies()).get("directus_session_token")?.value;
    const result = await directus(token).request(readMe({ fields: ["email"] }));
    return (
      <SidebarProvider>
        <AppSidebar email={result.email} />
        <SidebarInset className="min-h-screen">
          <div className="flex p-4 border-b-[1px] w-full">
            <AppNavbar />
          </div>
          <div className="p-4 bg-muted flex flex-col grow">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    );
  } catch (error) {
    redirect("/login");
  }
}
