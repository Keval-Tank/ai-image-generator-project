import { CreditCard, Frame, Image, Images, Layers, LayoutDashboard, Settings2 } from "lucide-react"
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
} from "@/components/ui/sidebar"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { NavUser } from "./nav-user"
import { NavMain } from "./nav-main"
import { createClient } from "@/lib/supabase/server"

// Menu items.

export async function AppSidebar() {
  const supabase = await createClient()
  const {data} = await supabase.auth.getUser()
  const userData = {
    name : data.user?.user_metadata.full_name,
    email : data.user?.email || "" 
  }
  return (
    <Sidebar collapsible="icon">
        <SidebarHeader>
            <div className="flex items-center gap-2">
                <div className="rounded-sm flex aspect-square size-8 items-center justify-center rouned-lg bg-sidebar-primary text-sidebar-primary-foreground"><Sparkles color="white" size={20}/></div>
                <div className="truncate"><div className="text-lg font-semibold">Pictoria AI</div><div className="text-sm">Pro</div></div>
            </div>
        </SidebarHeader>
      <SidebarContent>
          <NavMain/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData}/>
      </SidebarFooter>
    </Sidebar>
  )
}