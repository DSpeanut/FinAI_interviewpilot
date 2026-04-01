import { TrendingUp, Target, Flame, BookOpen, Mic, Swords } from "lucide-react"

const stats = [
  { label: "Entries Published", value: "24", sub: "of 287 total", icon: BookOpen, color: "text-[#10B981]", bg: "bg-white", border: "border-emerald-200" },
  { label: "Interview Sessions", value: "12", sub: "this month", icon: Mic, color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  { label: "Sparring Sessions", value: "8", sub: "this month", icon: Swords, color: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200" },
  { label: "Study Streak", value: "7", sub: "days", icon: Flame, color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
]

const weakAreas = [
  { topic: "Stochastic Calculus", score: 32, category: "Finance" },
  { topic: "Graph Neural Networks", score: 45, category: "Deep Learning" },
  { topic: "RLHF", score: 51, category: "NLP / LLM" },
  { topic: "Hypothesis Testing", score: 58, category: "Statistics" },
]

const recentSessions = [
  { type: "Interview", topic: "Machine Learning — Regression", score: 78, date: "Today", duration: "45 min" },
  { type: "Sparring", topic: "Transformers architecture", score: null, date: "Yesterday", duration: "30 min" },
  { type: "Interview", topic: "Deep Learning — CNNs", score: 65, date: "2 days ago", duration: "60 min" },
]

export default function DashboardPage() {
  return (
    <div className="h-full overflow-auto bg-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#064E3B]">Progress Dashboard</h1>
          <p className="text-[#4B7C68] text-sm mt-1">Your study activity and performance over time</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map(stat => (
            <div key={stat.label} className={`${stat.bg} border ${stat.border} rounded-2xl p-4 shadow-sm`}>
              <div className="flex items-center gap-2 mb-3">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-xs text-[#4B7C68] font-medium">{stat.label}</span>
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white border border-[#D1FAE5] rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-[#064E3B] mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#10B981]" />
              Wiki Coverage
            </h2>
            <div className="space-y-3">
              {[
                { name: "Machine Learning", pct: 40 },
                { name: "Statistics", pct: 25 },
                { name: "Deep Learning", pct: 18 },
                { name: "Finance & Quant", pct: 12 },
                { name: "NLP / LLM", pct: 8 },
              ].map(item => (
                <div key={item.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#1F2937] font-medium">{item.name}</span>
                    <span className="text-[#9CA3AF]">{item.pct}%</span>
                  </div>
                  <div className="h-2 bg-[#ECFDF5] rounded-full overflow-hidden">
                    <div className="h-full bg-[#10B981] rounded-full transition-all" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#D1FAE5] rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-[#064E3B] mb-4 flex items-center gap-2">
              <Target className="h-4 w-4 text-rose-600" />
              Weak Areas
            </h2>
            <div className="space-y-2">
              {weakAreas.map(area => (
                <div key={area.topic} className="flex items-center justify-between p-2.5 bg-[#F0FDF9] rounded-xl border border-[#D1FAE5]">
                  <div>
                    <p className="text-xs text-[#1F2937] font-semibold">{area.topic}</p>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">{area.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-[#ECFDF5] rounded-full overflow-hidden">
                      <div className="h-full bg-rose-400 rounded-full" style={{ width: `${area.score}%` }} />
                    </div>
                    <span className="text-xs text-rose-600 font-mono font-bold w-8 text-right">{area.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#D1FAE5] rounded-2xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-[#064E3B] mb-4">Recent Sessions</h2>
          <div className="space-y-2">
            {recentSessions.map((session, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#F0FDF9] rounded-xl border border-[#D1FAE5]">
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${session.type === "Interview" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-rose-50 text-rose-700 border-rose-200"}`}>
                    {session.type}
                  </span>
                  <div>
                    <p className="text-xs text-[#1F2937] font-medium">{session.topic}</p>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">{session.date} · {session.duration}</p>
                  </div>
                </div>
                {session.score !== null && (
                  <span className={`text-sm font-bold font-mono ${session.score >= 70 ? "text-emerald-700" : "text-amber-600"}`}>
                    {session.score}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#D1FAE5] rounded-2xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-[#064E3B] mb-4">Activity Heatmap</h2>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 28 }).map((_, i) => {
              const intensities = ["#ECFDF5", "#6EE7B7", "#10B981", "#064E3B"]
              const idx = Math.floor(Math.random() * 4)
              return (
                <div key={i} className="aspect-square rounded-md" style={{ backgroundColor: intensities[idx] }} />
              )
            })}
          </div>
          <div className="flex items-center gap-2 mt-3 justify-end">
            <span className="text-[10px] text-[#9CA3AF]">Less</span>
            {["#ECFDF5", "#6EE7B7", "#10B981", "#064E3B"].map(color => (
              <div key={color} className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
            ))}
            <span className="text-[10px] text-[#9CA3AF]">More</span>
          </div>
        </div>
      </div>
    </div>
  )
}
