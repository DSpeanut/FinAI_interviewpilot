"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { categories } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function WikiSidebar() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["4"])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(["4-1"])
  const router = useRouter()

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const toggleSubcategory = (id: string) => {
    setSelectedSubcategories(prev => {
      const next = prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
      return next.length === 0 ? prev : next
    })
    router.push(`/library?sub=${id}`)
  }

  return (
    <aside className="w-64 shrink-0 border-r border-[#D1FAE5] bg-[#F0FDF9] h-full flex flex-col">
      <div className="px-4 py-3.5 border-b border-[#D1FAE5]">
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Knowledge Base</p>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-2">
          {categories.map(cat => (
            <div key={cat.id} className="mb-0.5">
              <button
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[#ECFDF5] transition-colors group"
              >
                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5 text-[#9CA3AF] transition-transform shrink-0",
                    expandedCategories.includes(cat.id) && "rotate-90"
                  )}
                />
                <span className="text-sm text-[#1F2937] font-medium text-left leading-tight">
                  {cat.name}
                </span>
              </button>

              {expandedCategories.includes(cat.id) && (
                <div className="ml-4 mt-0.5 space-y-0.5">
                  {cat.subcategories.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => toggleSubcategory(sub.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-1.5 text-left transition-all text-xs",
                        selectedSubcategories.includes(sub.id)
                          ? "bg-[#10B981] text-white rounded-xl shadow-sm"
                          : "text-[#4B7C68] hover:text-[#064E3B] hover:bg-[#ECFDF5] rounded-lg"
                      )}
                    >
                      <span className="leading-tight">{sub.name}</span>
                      <span className={cn(
                        "text-[10px] shrink-0 ml-1",
                        selectedSubcategories.includes(sub.id) ? "text-emerald-100" : "text-[#9CA3AF]"
                      )}>{sub.entryCount}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}
