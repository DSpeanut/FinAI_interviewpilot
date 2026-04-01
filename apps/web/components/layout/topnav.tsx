"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CostWidget } from "./cost-widget"
import { cn } from "@/lib/utils"
import { BookOpen, Mic, Swords, BarChart2, Briefcase } from "lucide-react"

const navItems = [
  { href: "/library", label: "Library", icon: BookOpen },
  { href: "/interview", label: "Interview", icon: Mic },
  { href: "/sparring", label: "Sparring", icon: Swords },
  { href: "/dashboard", label: "Dashboard", icon: BarChart2 },
  { href: "/pipeline", label: "Pipeline", icon: Briefcase },
]

export function TopNav() {
  const pathname = usePathname()

  return (
    <header className="h-14 border-b border-[#D1FAE5] bg-white backdrop-blur-sm flex items-center px-6 gap-8 shrink-0">
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-7 h-7 rounded-full bg-[#064E3B] flex items-center justify-center">
          <span className="text-[10px] font-bold text-white tracking-tight">FP</span>
        </div>
        <span className="text-sm font-bold text-[#064E3B] tracking-tight">FinAI InterviewPilot</span>
      </div>

      <nav className="flex items-center gap-1 flex-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all",
              pathname.startsWith(href)
                ? "bg-[#10B981] text-white shadow-sm"
                : "text-[#4B7C68] hover:text-[#064E3B] hover:bg-[#ECFDF5]"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <CostWidget />
        <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-xs font-semibold text-white shadow-sm">
          U
        </div>
      </div>
    </header>
  )
}
