"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Bell, Calendar, Clock, Home, LogOut, QrCode, Settings, Sun, Moon, User, Users } from "lucide-react"
import { useTheme } from "next-themes"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

interface AppSidebarProps {
  role: "teacher" | "student"
  userName: string
}

export function AppSidebar({ role, userName }: AppSidebarProps) {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  const isTeacher = role === "teacher"
  const basePath = isTeacher ? "/teacher" : "/student"

  const teacherMenuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: `${basePath}/dashboard`,
    },
    {
      title: "Generate QR",
      icon: QrCode,
      href: `${basePath}/generate-qr`,
    },
    {
      title: "Classes",
      icon: Calendar,
      href: `${basePath}/classes`,
    },
    {
      title: "Students",
      icon: Users,
      href: `${basePath}/students`,
    },
    {
      title: "Attendance Reports",
      icon: BarChart3,
      href: `${basePath}/reports`,
    },
    {
      title: "Notifications",
      icon: Bell,
      href: `${basePath}/notifications`,
    },
  ]

  const studentMenuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: `${basePath}/dashboard`,
    },
    {
      title: "Scan QR",
      icon: QrCode,
      href: `${basePath}/scan-qr`,
    },
    {
      title: "My Attendance",
      icon: Clock,
      href: `${basePath}/attendance`,
    },
    {
      title: "Classes",
      icon: Calendar,
      href: `${basePath}/classes`,
    },
    {
      title: "Notifications",
      icon: Bell,
      href: `${basePath}/notifications`,
    },
  ]

  const menuItems = isTeacher ? teacherMenuItems : studentMenuItems

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b pb-2">
        <div className="flex items-center gap-2 px-4 py-2">
          <QrCode className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">AttendEase</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Profile">
              <Link href={`${basePath}/profile`}>
                <User className="h-5 w-5" />
                <span>{userName}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href={`${basePath}/settings`}>
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={toggleTheme} tooltip={theme === "dark" ? "Light Mode" : "Dark Mode"}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Link href="/login">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
