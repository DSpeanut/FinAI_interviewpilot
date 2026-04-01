import { Swords } from "lucide-react"

export default function SparringPage() {
  return (
    <div className="h-full flex bg-white">
      <div className="w-72 border-r border-[#D1FAE5] bg-[#F0FDF9] p-4 flex flex-col gap-4">
        <div>
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-3">Debate Setup</p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#1F2937] mb-2 block">Topic</label>
              <input
                type="text"
                placeholder="e.g. Transformers, RLHF, Black-Scholes..."
                className="w-full text-xs bg-white border border-[#D1FAE5] rounded-xl px-2.5 py-2 text-[#064E3B] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6EE7B7]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1F2937] mb-2 block">Mode</label>
              <div className="space-y-2">
                {[
                  { id: "devil", label: "Devil's Advocate", desc: "Agent argues the opposite" },
                  { id: "socratic", label: "Socratic", desc: "Agent asks probing questions" },
                  { id: "expert", label: "Expert Challenge", desc: "Agent pokes holes in your reasoning" },
                ].map(mode => (
                  <label key={mode.id} className="flex items-start gap-2.5 cursor-pointer p-2.5 rounded-xl border border-[#D1FAE5] bg-white hover:border-[#6EE7B7] transition-colors">
                    <input type="radio" name="mode" className="mt-0.5 accent-[#10B981]" defaultChecked={mode.id === "socratic"} />
                    <div>
                      <p className="text-xs text-[#064E3B] font-semibold">{mode.label}</p>
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5">{mode.desc}</p>
                    </div>
                  </label>
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
          <Swords className="h-4 w-4" />
          Start Debate
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-white border border-[#D1FAE5] flex items-center justify-center mx-auto mb-6 shadow-md">
            <Swords className="h-10 w-10 text-[#10B981]" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-[#064E3B] mb-2">Sharpen your thinking</h2>
          <p className="text-[#4B7C68] text-sm leading-relaxed">Pick a topic, choose a debate mode, and go deep. The sparring partner will challenge your reasoning, ask why, and push back on shallow answers.</p>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
          {["Explain your reasoning", "Defend edge cases", "Think deeper"].map(tip => (
            <div key={tip} className="bg-white border border-[#D1FAE5] rounded-xl p-3 text-center shadow-sm hover:border-[#6EE7B7] transition-colors">
              <p className="text-[10px] text-[#4B7C68] font-medium">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
