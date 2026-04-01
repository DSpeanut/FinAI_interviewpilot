import { Plus } from "lucide-react"

const columns = [
  { id: "wishlist", label: "Wishlist", dot: "bg-stone-400", text: "text-stone-600" },
  { id: "applied", label: "Applied", dot: "bg-blue-400", text: "text-blue-700" },
  { id: "oa", label: "OA", dot: "bg-purple-400", text: "text-purple-700" },
  { id: "phone_screen", label: "Phone Screen", dot: "bg-amber-500", text: "text-amber-700" },
  { id: "onsite", label: "Onsite", dot: "bg-orange-500", text: "text-orange-700" },
  { id: "offer", label: "Offer", dot: "bg-emerald-500", text: "text-emerald-700" },
  { id: "rejected", label: "Rejected", dot: "bg-rose-400", text: "text-rose-700" },
]

const mockApplications = [
  { id: "1", company: "Jane Street", role: "Quantitative Researcher", domain: "Quant", status: "onsite", appliedAt: "Mar 10", followUp: null },
  { id: "2", company: "Two Sigma", role: "ML Engineer", domain: "ML", status: "phone_screen", appliedAt: "Mar 15", followUp: "Mar 30" },
  { id: "3", company: "Citadel", role: "Quantitative Developer", domain: "Quant", status: "oa", appliedAt: "Mar 18", followUp: null },
  { id: "4", company: "Google DeepMind", role: "Research Engineer", domain: "ML", status: "applied", appliedAt: "Mar 20", followUp: null },
  { id: "5", company: "Bridgewater", role: "Investment Engineer", domain: "Finance", status: "wishlist", appliedAt: "-", followUp: null },
  { id: "6", company: "Anthropic", role: "ML Engineer", domain: "ML", status: "applied", appliedAt: "Mar 22", followUp: "Apr 1" },
  { id: "7", company: "D.E. Shaw", role: "Quant Analyst", domain: "Quant", status: "rejected", appliedAt: "Mar 5", followUp: null },
]

const domainColors: Record<string, string> = {
  ML: "bg-amber-50 text-amber-700 border-amber-200",
  Quant: "bg-[#F0FDF9] text-[#10B981] border-[#D1FAE5]",
  Finance: "bg-emerald-50 text-emerald-700 border-emerald-200",
}

export default function PipelinePage() {
  return (
    <div className="h-full flex flex-col overflow-hidden bg-white">
      <div className="p-4 border-b border-[#D1FAE5] bg-white flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-base font-semibold text-[#064E3B]">Application Pipeline</h1>
          <p className="text-xs text-[#4B7C68] mt-0.5">{mockApplications.length} applications tracked</p>
        </div>
        <button className="flex items-center gap-1.5 text-xs bg-[#10B981] hover:bg-[#064E3B] text-white px-3 py-2 rounded-xl transition-colors font-semibold shadow-sm">
          <Plus className="h-3.5 w-3.5" />
          Add Application
        </button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-3 p-4 h-full" style={{ minWidth: "max-content" }}>
          {columns.map(col => {
            const cards = mockApplications.filter(a => a.status === col.id)
            return (
              <div key={col.id} className="w-56 flex flex-col gap-2 shrink-0">
                <div className="flex items-center gap-2 px-1 mb-1">
                  <div className={`w-2 h-2 rounded-full ${col.dot}`} />
                  <span className={`text-xs font-bold ${col.text}`}>{col.label}</span>
                  <span className="text-[10px] text-[#9CA3AF] ml-auto font-medium">{cards.length}</span>
                </div>

                <div className="flex flex-col gap-2 overflow-y-auto flex-1">
                  {cards.map(app => (
                    <div key={app.id} className="bg-white border border-[#D1FAE5] hover:border-[#6EE7B7] hover:shadow-md rounded-xl p-3 cursor-pointer transition-all group">
                      <div className="flex items-start justify-between gap-1 mb-2">
                        <p className="text-xs font-bold text-[#1F2937] group-hover:text-[#10B981] leading-tight transition-colors">{app.company}</p>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-md border shrink-0 font-semibold ${domainColors[app.domain]}`}>
                          {app.domain}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#4B7C68] leading-tight mb-2 font-medium">{app.role}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#9CA3AF]">Applied {app.appliedAt}</span>
                        {app.followUp && (
                          <span className="text-[10px] text-amber-600 font-semibold">↑ {app.followUp}</span>
                        )}
                      </div>
                    </div>
                  ))}

                  <button className="w-full border-2 border-dashed border-[#D1FAE5] hover:border-[#6EE7B7] rounded-xl p-2 text-[10px] text-[#9CA3AF] hover:text-[#10B981] transition-colors flex items-center justify-center gap-1 font-medium">
                    <Plus className="h-3 w-3" />
                    Add
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
