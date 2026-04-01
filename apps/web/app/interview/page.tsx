import { Mic, Play } from "lucide-react"

export default function InterviewPage() {
  return (
    <div className="h-full flex bg-white">
      <div className="w-72 border-r border-[#D1FAE5] bg-[#F0FDF9] p-4 flex flex-col gap-4">
        <div>
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-3">Session Setup</p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#1F2937] mb-2 block">Categories</label>
              <div className="space-y-1.5">
                {["Machine Learning", "Deep Learning", "NLP / LLM", "Finance & Quant"].map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-[#ECFDF5] transition-colors">
                    <input type="checkbox" className="rounded border-[#6EE7B7] accent-[#10B981]" defaultChecked={cat === "Machine Learning"} />
                    <span className="text-xs text-[#1F2937]">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1F2937] mb-2 block">Difficulty</label>
              <div className="flex gap-1.5 flex-wrap">
                {["All", "Beginner", "Intermediate", "Advanced"].map(d => (
                  <button key={d} className={`text-xs px-2.5 py-1 rounded-xl border transition-colors font-medium ${d === "All" ? "bg-[#10B981] text-white border-[#10B981] shadow-sm" : "text-[#4B7C68] border-[#D1FAE5] bg-white hover:border-[#6EE7B7]"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1F2937] mb-2 block">Questions</label>
              <div className="flex gap-1.5">
                {[5, 10, 15, 20].map(n => (
                  <button key={n} className={`text-xs px-2.5 py-1.5 rounded-xl border transition-colors font-medium ${n === 10 ? "bg-[#10B981] text-white border-[#10B981] shadow-sm" : "text-[#4B7C68] border-[#D1FAE5] bg-white hover:border-[#6EE7B7]"}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1F2937] mb-2 block">AI Model</label>
              <select className="w-full text-xs bg-white border border-[#D1FAE5] rounded-xl px-2.5 py-2 text-[#1F2937] focus:outline-none focus:border-[#6EE7B7]">
                <option>OpenRouter — Llama 3.3 70B (Free)</option>
                <option>Claude Sonnet (Paid)</option>
                <option>GPT-4o (Paid)</option>
              </select>
            </div>
          </div>
        </div>

        <button className="mt-auto flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#064E3B] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Play className="h-4 w-4" />
          Start Session
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-white border border-[#D1FAE5] flex items-center justify-center mx-auto mb-6 shadow-md">
            <Mic className="h-10 w-10 text-[#10B981]" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-[#064E3B] mb-2">Ready when you are</h2>
          <p className="text-[#4B7C68] text-sm leading-relaxed">Configure your session on the left and hit Start. The interviewer will ask questions and you respond via voice.</p>
        </div>

        <div className="flex items-center gap-6">
          {[
            { dot: "bg-[#10B981]", label: "Voice input (STT)" },
            { dot: "bg-[#10B981]", label: "AI response (TTS)" },
            { dot: "bg-[#10B981]", label: "Real-time feedback" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2 text-xs text-[#9CA3AF]">
              <div className={`w-2 h-2 rounded-full ${item.dot}`} />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
