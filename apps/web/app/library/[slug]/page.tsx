import Link from "next/link"
import { WikiSidebar } from "@/components/layout/sidebar"
import { mockEntries, difficultyColors } from "@/lib/mock-data"
import type { WikiEntryContent, Source } from "@/lib/mock-data"
import { loadEntryContent } from "@/lib/content"
import { cn } from "@/lib/utils"
import { ArrowLeft, PlayCircle, ExternalLink, Zap, Lightbulb, Brain, Target, AlertTriangle } from "lucide-react"

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = mockEntries.find(e => e.slug === slug)

  if (!entry) {
    return (
      <div className="flex h-full">
        <WikiSidebar />
        <div className="flex-1 flex items-center justify-center bg-white">
          <p className="text-[#9CA3AF]">Entry not found.</p>
        </div>
      </div>
    )
  }

  const content = loadEntryContent(slug)

  return (
    <div className="flex h-full">
      <WikiSidebar />
      <div className="flex-1 overflow-auto bg-white">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <Link href="/library" className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-[#10B981] transition-colors mb-6 font-medium">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Library
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-[#064E3B] mb-3">{entry.title}</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn("text-xs px-2.5 py-1 rounded-lg border font-semibold", difficultyColors[entry.difficulty])}>
                {entry.difficulty}
              </span>
              {entry.tags.map(tag => (
                <span key={tag} className="text-xs text-[#4B7C68] bg-[#F0FDF9] px-2 py-1 rounded-lg border border-[#D1FAE5]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {content ? <EntryContent content={content} /> : <PlaceholderContent title={entry.title} />}
        </div>
      </div>
    </div>
  )
}

// Renders inline [1], [2] citation markers as superscript anchor links
function cite(text: string, sources: Source[]) {
  const parts = text.split(/(\[\d+\])/g)
  return parts.map((part, i) => {
    const match = part.match(/^\[(\d+)\]$/)
    if (match) {
      const n = parseInt(match[1])
      const src = sources[n - 1]
      return (
        <a key={i} href={src?.url ?? "#"} target="_blank" rel="noopener noreferrer"
          className="text-[#10B981] hover:text-[#064E3B] font-semibold align-super text-[8pt] transition-colors">
          [{n}]
        </a>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function EntryContent({ content }: { content: WikiEntryContent }) {
  return (
    <div className="space-y-4">

      {/* Quick Intuition */}
      <Section icon={<Zap className="h-4 w-4 text-[#10B981]" />} title="Quick Intuition">
        <div className="space-y-2.5 text-[10pt] text-[#1F2937] leading-relaxed">
          {content.eli3.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </Section>

      {/* When & Why */}
      <Section icon={<Lightbulb className="h-4 w-4 text-amber-500" />} title="When & Why to Use">
        <ul className="space-y-2.5">
          {content.whenWhy.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[10pt] text-[#1F2937]">
              <span className="text-[#10B981] mt-0.5 shrink-0 font-bold">•</span>
              <span><strong className="text-[#064E3B]">{item.title}.</strong> {item.body}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Deep Dive */}
      <Section icon={<Brain className="h-4 w-4 text-purple-500" />} title="Deep Dive">
        <div className="space-y-6 text-[10pt] text-[#1F2937] leading-relaxed">

          {/* Plain-language intro + visualization */}
          {(content.deepDiveIntro || content.visualizationType) && (
            <div className="grid grid-cols-2 gap-6 items-start">
              {content.deepDiveIntro && (
                <div className="space-y-2.5">
                  {content.deepDiveIntro.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              )}
              {content.visualizationType && (
                <div className="bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl p-4">
                  <Visualization type={content.visualizationType} />
                </div>
              )}
            </div>
          )}

          <div className="border-t border-[#ECFDF5] pt-4 space-y-4">
            {content.deepDive.map((section, i) => (
              <div key={i}>
                <h3 className="text-xs font-bold text-[#064E3B] uppercase tracking-wider mb-2">{section.heading}</h3>
                <p>{cite(section.body, content.sources)}</p>
                {section.formula && (
                  <div className="my-2.5 bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl p-3 font-mono text-sm text-center text-[#10B981] font-semibold">
                    {section.formula}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* Watch */}
      <Section icon={<PlayCircle className="h-4 w-4 text-red-500" />} title="Watch">
        {content.youtubeUrl ? (
          <div className="aspect-video rounded-xl overflow-hidden border border-[#D1FAE5]">
            <iframe
              src={content.youtubeUrl}
              title={content.youtubeLabel}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="aspect-video bg-[#F0FDF9] rounded-xl flex items-center justify-center border border-[#D1FAE5]">
            <div className="text-center">
              <PlayCircle className="h-10 w-10 text-[#10B981] mx-auto mb-2 opacity-60" />
              <p className="text-[#9CA3AF] text-xs">{content.youtubeLabel ?? "No video added yet"}</p>
            </div>
          </div>
        )}
      </Section>

      {/* Key Takeaways */}
      <Section icon={<Target className="h-4 w-4 text-emerald-500" />} title="Key Takeaways">
        <ul className="space-y-2">
          {content.takeaways.map((point, i) => (
            <li key={i} className="flex gap-2.5 text-[10pt] text-[#1F2937]">
              <span className="text-[#10B981] font-mono text-xs mt-0.5 shrink-0 font-bold">{i + 1}.</span>
              <span>{cite(point, content.sources)}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Interview Edge Cases */}
      <Section icon={<AlertTriangle className="h-4 w-4 text-rose-500" />} title="Interview Edge Cases & Gotchas">
        <ul className="space-y-2.5">
          {content.edgeCases.map((item, i) => (
            <li key={i} className="bg-rose-50 border border-rose-100 rounded-xl p-3 space-y-1.5">
              <p className="text-[10pt] font-semibold text-rose-700">{item.q}</p>
              <p className="text-[10pt] text-rose-600/80 leading-relaxed">{cite(item.a, content.sources)}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Sources */}
      <div className="pt-3 border-t border-[#D1FAE5]">
        <div className="flex items-center gap-1.5 mb-2">
          <ExternalLink className="h-3.5 w-3.5 text-[#9CA3AF]" />
          <span className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">Sources</span>
        </div>
        <ol className="space-y-1">
          {content.sources.map((src, i) => (
            <li key={i} id={`source-${i + 1}`} className="flex gap-2 text-xs text-[#4B7C68]">
              <span className="text-[#10B981] font-bold shrink-0">[{i + 1}]</span>
              <a href={src.url} target="_blank" rel="noopener noreferrer"
                className="hover:text-[#064E3B] hover:underline transition-colors">
                {src.label}
              </a>
            </li>
          ))}
        </ol>
      </div>

    </div>
  )
}

function Visualization({ type }: { type: string }) {
  if (type === "linear-regression") return <LinearRegressionViz />
  if (type === "ridge-regression") return <RidgeConstraintViz />
  if (type === "lasso-regression") return <LassoConstraintViz />
  if (type === "polynomial-regression") return <PolynomialRegressionViz />
  if (type === "elastic-net") return <ElasticNetViz />
  if (type === "svr") return <SVRViz />
  if (type === "decision-tree-regressor") return <DecisionTreeRegressorViz />
  if (type === "logistic-regression") return <LogisticRegressionViz />
  if (type === "svm") return <SVMViz />
  if (type === "knn") return <KNNViz />
  if (type === "naive-bayes") return <NaiveBayesViz />
  if (type === "decision-tree") return <DecisionTreeClassifierViz />
  if (type === "lda") return <LDAViz />
  if (type === "qda") return <QDAViz />
  if (type === "k-means") return <KMeansViz />
  if (type === "dbscan") return <DBSCANViz />
  if (type === "hierarchical-clustering") return <HierarchicalClusteringViz />
  if (type === "gmm") return <GMMViz />
  if (type === "mean-shift") return <MeanShiftViz />
  if (type === "hdbscan") return <HDBSCANViz />
  if (type === "umap") return <UMAPViz />
  return null
}

function LinearRegressionViz() {
  const W = 320, H = 210
  const pad = { l: 44, r: 16, t: 16, b: 40 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const data: [number, number][] = [
    [0.08, 0.10], [0.15, 0.20], [0.22, 0.26], [0.30, 0.35],
    [0.40, 0.42], [0.50, 0.53], [0.60, 0.60], [0.68, 0.70],
    [0.78, 0.72], [0.88, 0.84], [0.94, 0.90],
  ]
  const lineY = (x: number) => 0.91 * x + 0.04

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      {/* grid lines */}
      {[0.25, 0.5, 0.75].map(v => (
        <line key={v} x1={pad.l} y1={sy(v)} x2={W - pad.r} y2={sy(v)} stroke="#ECFDF5" strokeWidth="1" />
      ))}
      {/* axis labels */}
      <text x={W / 2} y={H - 6} textAnchor="middle" fontSize="8.5" fill="#9CA3AF">Feature (e.g. house size)</text>
      <text x={10} y={H / 2} textAnchor="middle" fontSize="8.5" fill="#9CA3AF" transform={`rotate(-90,10,${H / 2})`}>Target (e.g. price)</text>
      {/* regression line */}
      <line x1={sx(0)} y1={sy(lineY(0))} x2={sx(1)} y2={sy(lineY(1))} stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      {/* residuals */}
      {data.map(([xn, yn], i) => (
        <line key={i} x1={sx(xn)} y1={sy(yn)} x2={sx(xn)} y2={sy(lineY(xn))}
          stroke="#F87171" strokeWidth="1.2" strokeDasharray="3,2" />
      ))}
      {/* data points */}
      {data.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r="3.5" fill="#064E3B" opacity="0.75" />
      ))}
      {/* line label */}
      <text x={sx(0.55) + 6} y={sy(lineY(0.55)) - 6} fontSize="9" fill="#10B981" fontWeight="600">ŷ = β₀ + β₁x</text>
      {/* legend */}
      <circle cx={pad.l + 8} cy={H - pad.b + 14} r="3" fill="#064E3B" opacity="0.75" />
      <text x={pad.l + 15} y={H - pad.b + 17} fontSize="7.5" fill="#6B7280">observation</text>
      <line x1={pad.l + 70} y1={H - pad.b + 14} x2={pad.l + 82} y2={H - pad.b + 14} stroke="#F87171" strokeWidth="1.2" strokeDasharray="3,2" />
      <text x={pad.l + 86} y={H - pad.b + 17} fontSize="7.5" fill="#6B7280">residual</text>
      <line x1={pad.l + 138} y1={H - pad.b + 14} x2={pad.l + 150} y2={H - pad.b + 14} stroke="#10B981" strokeWidth="2" />
      <text x={pad.l + 154} y={H - pad.b + 17} fontSize="7.5" fill="#6B7280">fitted line</text>
    </svg>
  )
}

function RidgeConstraintViz() {
  const W = 300, H = 218
  const cx = 125, cy = 108          // β = 0 origin
  const r = 55                       // L2 ball radius
  const olsX = 210, olsY = 52
  const dx = olsX - cx, dy = olsY - cy
  const dist = Math.sqrt(dx * dx + dy * dy)
  const ridgeX = Math.round(cx + r * dx / dist)  // ≈ 171
  const ridgeY = Math.round(cy + r * dy / dist)  // ≈ 78

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* axes */}
      <line x1={16} y1={cy} x2={W - 8} y2={cy} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={cx} y1={H - 14} x2={cx} y2={8} stroke="#D1FAE5" strokeWidth="1.2" />
      <text x={W - 7} y={cy + 11} fontSize="9" fill="#9CA3AF" textAnchor="end">β₁</text>
      <text x={cx + 5} y={13} fontSize="9" fill="#9CA3AF">β₂</text>

      {/* RSS contours (concentric ellipses centred at OLS) */}
      <ellipse cx={olsX} cy={olsY} rx={80} ry={54} fill="none" stroke="#E5E7EB" strokeWidth="1" />
      <ellipse cx={olsX} cy={olsY} rx={66} ry={44} fill="none" stroke="#D1D5DB" strokeWidth="1" />
      <ellipse cx={olsX} cy={olsY} rx={54} ry={36} fill="none" stroke="#9CA3AF" strokeWidth="1.2" />

      {/* L2 ball */}
      <circle cx={cx} cy={cy} r={r} fill="#F0FDF9" stroke="#10B981" strokeWidth="2" />

      {/* dashed line from OLS to Ridge solution */}
      <line x1={olsX} y1={olsY} x2={ridgeX} y2={ridgeY}
        stroke="#F59E0B" strokeWidth="1" strokeDasharray="3,2" opacity="0.6" />

      {/* OLS point */}
      <circle cx={olsX} cy={olsY} r={4.5} fill="#F59E0B" />
      <text x={olsX + 7} y={olsY - 3} fontSize="8.5" fill="#F59E0B" fontWeight="700">OLS</text>

      {/* Ridge solution — on the smooth circle boundary */}
      <circle cx={ridgeX} cy={ridgeY} r={5} fill="#10B981" />
      <text x={ridgeX + 7} y={ridgeY - 3} fontSize="8.5" fill="#10B981" fontWeight="700">Ridge</text>

      {/* origin */}
      <circle cx={cx} cy={cy} r={2} fill="#9CA3AF" />
      <text x={cx - 5} y={cy + 12} fontSize="7.5" fill="#9CA3AF" textAnchor="end">0</text>

      {/* L2 label */}
      <text x={cx - r - 4} y={cy - 18} fontSize="7.5" fill="#10B981" textAnchor="end">L2 ball</text>

      {/* key insight annotation */}
      <text x={W / 2} y={H - 2} fontSize="7.5" fill="#6B7280" textAnchor="middle">
        Smooth boundary → solution never lands on an axis → no zeros
      </text>
    </svg>
  )
}

function LassoConstraintViz() {
  const W = 300, H = 218
  const cx = 125, cy = 108          // β = 0 origin
  const r = 55                       // L1 radius
  // diamond vertices
  const dRight = { x: cx + r, y: cy }   // (180, 108) → β₂ = 0
  const dTop   = { x: cx, y: cy - r }   // (125,  53)
  const dLeft  = { x: cx - r, y: cy }   // ( 70, 108)
  const dBot   = { x: cx, y: cy + r }   // (125, 163)

  const olsX = 200, olsY = 72

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* axes */}
      <line x1={16} y1={cy} x2={W - 8} y2={cy} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={cx} y1={H - 14} x2={cx} y2={8} stroke="#D1FAE5" strokeWidth="1.2" />
      <text x={W - 7} y={cy + 11} fontSize="9" fill="#9CA3AF" textAnchor="end">β₁</text>
      <text x={cx + 5} y={13} fontSize="9" fill="#9CA3AF">β₂</text>

      {/* RSS contours centred at OLS, innermost touches the corner (180,108) */}
      <ellipse cx={olsX} cy={olsY} rx={72} ry={66} fill="none" stroke="#E5E7EB" strokeWidth="1" />
      <ellipse cx={olsX} cy={olsY} rx={54} ry={52} fill="none" stroke="#D1D5DB" strokeWidth="1" />
      <ellipse cx={olsX} cy={olsY} rx={36} ry={38} fill="none" stroke="#9CA3AF" strokeWidth="1.2" />

      {/* L1 diamond */}
      <polygon
        points={`${dRight.x},${dRight.y} ${dTop.x},${dTop.y} ${dLeft.x},${dLeft.y} ${dBot.x},${dBot.y}`}
        fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="2"
      />

      {/* dashed line from OLS to Lasso corner */}
      <line x1={olsX} y1={olsY} x2={dRight.x} y2={dRight.y}
        stroke="#F59E0B" strokeWidth="1" strokeDasharray="3,2" opacity="0.6" />

      {/* OLS point */}
      <circle cx={olsX} cy={olsY} r={4.5} fill="#F59E0B" />
      <text x={olsX + 7} y={olsY - 3} fontSize="8.5" fill="#F59E0B" fontWeight="700">OLS</text>

      {/* Lasso solution at the corner — on β₁ axis → β₂ = 0 */}
      <circle cx={dRight.x} cy={dRight.y} r={6} fill="#8B5CF6" />
      <text x={dRight.x + 8} y={dRight.y - 5} fontSize="8.5" fill="#8B5CF6" fontWeight="700">Lasso</text>
      <text x={dRight.x + 8} y={dRight.y + 9} fontSize="8" fill="#8B5CF6" opacity="0.9">β₂ = 0</text>

      {/* origin */}
      <circle cx={cx} cy={cy} r={2} fill="#9CA3AF" />
      <text x={cx - 5} y={cy + 12} fontSize="7.5" fill="#9CA3AF" textAnchor="end">0</text>

      {/* L1 label */}
      <text x={cx - r - 4} y={cy - 18} fontSize="7.5" fill="#8B5CF6" textAnchor="end">L1 diamond</text>

      {/* key insight annotation */}
      <text x={W / 2} y={H - 2} fontSize="7.5" fill="#6B7280" textAnchor="middle">
        Corner on axis → β₂ = 0 exactly → automatic feature selection
      </text>
    </svg>
  )
}

function PolynomialRegressionViz() {
  const W = 300, H = 215
  const pad = { l: 36, r: 14, t: 16, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  // Noisy data points following a cubic-ish curve
  const data: [number, number][] = [
    [0.05, 0.20], [0.10, 0.28], [0.18, 0.42], [0.26, 0.55],
    [0.34, 0.64], [0.42, 0.70], [0.50, 0.72], [0.58, 0.68],
    [0.66, 0.60], [0.74, 0.50], [0.82, 0.38], [0.90, 0.24],
  ]

  // Degree-1 fit (underfit): straight line
  const d1 = (x: number) => 0.72 - 0.48 * x

  // Degree-4 fit (good fit): smooth curve matching the data shape
  const d4 = (x: number) => {
    const t = x - 0.5
    return 0.72 - 0.32 * t - 2.8 * t * t - 0.4 * t * t * t
  }

  // Degree-10 fit (overfit): wiggles wildly
  const d10 = (x: number) => {
    const base = d4(x)
    const wiggle = 0.10 * Math.sin(x * 30) * Math.pow(Math.abs(x - 0.5) + 0.1, 2)
    return Math.min(0.98, Math.max(0.02, base + wiggle))
  }

  const linePoints = (fn: (x: number) => number, steps = 80) =>
    Array.from({ length: steps + 1 }, (_, i) => {
      const xn = i / steps
      return `${sx(xn)},${sy(fn(xn))}`
    }).join(" ")

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8" fill="#9CA3AF">x</text>
      <text x={12} y={H / 2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,12,${H / 2})`}>y</text>

      {/* grid */}
      {[0.25, 0.5, 0.75].map(v => (
        <line key={v} x1={pad.l} y1={sy(v)} x2={W - pad.r} y2={sy(v)} stroke="#ECFDF5" strokeWidth="0.8" />
      ))}

      {/* degree-10 overfit (red) */}
      <polyline points={linePoints(d10)} fill="none" stroke="#F87171" strokeWidth="1.4" strokeDasharray="4,2" opacity="0.8" />

      {/* degree-1 underfit (amber) */}
      <polyline points={linePoints(d1)} fill="none" stroke="#F59E0B" strokeWidth="1.4" strokeDasharray="3,2" opacity="0.85" />

      {/* degree-4 good fit (green) */}
      <polyline points={linePoints(d4)} fill="none" stroke="#10B981" strokeWidth="2" />

      {/* data points */}
      {data.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={3.2} fill="#064E3B" opacity="0.7" />
      ))}

      {/* legend */}
      <line x1={pad.l + 4} y1={H - pad.b + 14} x2={pad.l + 18} y2={H - pad.b + 14} stroke="#F59E0B" strokeWidth="1.4" strokeDasharray="3,2" />
      <text x={pad.l + 22} y={H - pad.b + 17} fontSize="7" fill="#6B7280">degree 1 (underfit)</text>
      <line x1={pad.l + 104} y1={H - pad.b + 14} x2={pad.l + 118} y2={H - pad.b + 14} stroke="#10B981" strokeWidth="2" />
      <text x={pad.l + 122} y={H - pad.b + 17} fontSize="7" fill="#6B7280">degree 4</text>
      <line x1={pad.l + 156} y1={H - pad.b + 14} x2={pad.l + 170} y2={H - pad.b + 14} stroke="#F87171" strokeWidth="1.4" strokeDasharray="4,2" />
      <text x={pad.l + 174} y={H - pad.b + 17} fontSize="7" fill="#6B7280">degree 10 (overfit)</text>
    </svg>
  )
}

// ── Elastic Net: rounded-diamond constraint region (L1 + L2 hybrid) ──────────
function ElasticNetViz() {
  const W = 300, H = 218
  const cx = 120, cy = 108
  const r = 52   // half-width of constraint region

  // Rounded diamond via cubic bezier: corners at cardinal points, handles pull inward
  const h = r * 0.45  // control point offset — larger = rounder corner
  const top    = { x: cx,     y: cy - r }
  const right  = { x: cx + r, y: cy     }
  const bottom = { x: cx,     y: cy + r }
  const left   = { x: cx - r, y: cy     }

  const d = [
    `M ${top.x} ${top.y}`,
    `C ${top.x + h} ${top.y}, ${right.x} ${cy - h}, ${right.x} ${right.y}`,
    `C ${right.x} ${cy + h}, ${bottom.x + h} ${bottom.y}, ${bottom.x} ${bottom.y}`,
    `C ${bottom.x - h} ${bottom.y}, ${left.x} ${cy + h}, ${left.x} ${left.y}`,
    `C ${left.x} ${cy - h}, ${top.x - h} ${top.y}, ${top.x} ${top.y}`,
    "Z",
  ].join(" ")

  const olsX = 210, olsY = 58

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* axes */}
      <line x1={16} y1={cy} x2={W - 8} y2={cy} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={cx} y1={H - 14} x2={cx} y2={8} stroke="#D1FAE5" strokeWidth="1.2" />
      <text x={W - 7} y={cy + 11} fontSize="9" fill="#9CA3AF" textAnchor="end">β₁</text>
      <text x={cx + 5} y={13} fontSize="9" fill="#9CA3AF">β₂</text>

      {/* RSS contours */}
      <ellipse cx={olsX} cy={olsY} rx={80} ry={54} fill="none" stroke="#E5E7EB" strokeWidth="1" />
      <ellipse cx={olsX} cy={olsY} rx={62} ry={42} fill="none" stroke="#D1D5DB" strokeWidth="1" />
      <ellipse cx={olsX} cy={olsY} rx={46} ry={30} fill="none" stroke="#9CA3AF" strokeWidth="1.2" />

      {/* L1 diamond (ghost) */}
      <polygon
        points={`${cx + r},${cy} ${cx},${cy - r} ${cx - r},${cy} ${cx},${cy + r}`}
        fill="none" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3,2" opacity="0.5"
      />
      {/* L2 circle (ghost) */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#10B981" strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />

      {/* Elastic Net constraint region */}
      <path d={d} fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" opacity="0.9" />

      {/* OLS point */}
      <circle cx={olsX} cy={olsY} r={4.5} fill="#F59E0B" />
      <text x={olsX + 7} y={olsY - 3} fontSize="8.5" fill="#F59E0B" fontWeight="700">OLS</text>

      {/* Elastic Net solution — on the rounded corner */}
      <circle cx={cx + r - 4} cy={cy - 28} r={5} fill="#D97706" />
      <text x={cx + r + 2} y={cy - 34} fontSize="8.5" fill="#D97706" fontWeight="700">EN</text>

      {/* origin */}
      <circle cx={cx} cy={cy} r={2} fill="#9CA3AF" />

      {/* legend */}
      <line x1={8} y1={H - 26} x2={22} y2={H - 26} stroke="#8B5CF6" strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7" />
      <text x={25} y={H - 23} fontSize="7" fill="#6B7280">L1 (Lasso)</text>
      <line x1={8} y1={H - 14} x2={22} y2={H - 14} stroke="#10B981" strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7" />
      <text x={25} y={H - 11} fontSize="7" fill="#6B7280">L2 (Ridge)</text>
      <rect x={100} y={H - 29} width={12} height={8} fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.2" />
      <text x={115} y={H - 23} fontSize="7" fill="#6B7280">Elastic Net (rounded corners)</text>
    </svg>
  )
}

// ── SVR: ε-tube around regression line ───────────────────────────────────────
function SVRViz() {
  const W = 320, H = 215
  const pad = { l: 40, r: 14, t: 18, b: 38 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  const fLine = (x: number) => 0.18 + 0.68 * x
  const eps = 0.10   // tube half-width in normalised units

  const data: [number, number, boolean][] = [
    [0.08, 0.24, true],  [0.15, 0.32, true],  [0.23, 0.33, true],
    [0.32, 0.38, false], [0.40, 0.44, true],  [0.48, 0.52, true],
    [0.55, 0.60, true],  [0.63, 0.62, false], [0.70, 0.65, true],
    [0.80, 0.71, true],  [0.88, 0.80, false], [0.95, 0.83, true],
  ]
  // which points are support vectors (on the tube boundary)
  const svIndices = new Set([3, 6, 10])

  // Build tube polygon path
  const steps = 60
  const topPts = Array.from({ length: steps + 1 }, (_, i) => {
    const xn = i / steps
    return `${sx(xn)},${sy(fLine(xn) + eps)}`
  }).join(" ")
  const botPts = Array.from({ length: steps + 1 }, (_, i) => {
    const xn = 1 - i / steps
    return `${sx(xn)},${sy(fLine(xn) - eps)}`
  }).join(" ")

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8" fill="#9CA3AF">x</text>
      <text x={12} y={H / 2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,12,${H / 2})`}>y</text>

      {/* ε-tube fill */}
      <polygon points={`${topPts} ${botPts}`} fill="#D1FAE5" opacity="0.6" />

      {/* tube boundary lines */}
      <polyline points={topPts} fill="none" stroke="#10B981" strokeWidth="1.4" strokeDasharray="4,2" />
      <polyline points={botPts.split(" ").reverse().join(" ")} fill="none" stroke="#10B981" strokeWidth="1.4" strokeDasharray="4,2" />

      {/* regression line */}
      <line x1={sx(0)} y1={sy(fLine(0))} x2={sx(1)} y2={sy(fLine(1))} stroke="#064E3B" strokeWidth="2" />

      {/* data points */}
      {data.map(([xn, yn, inside], i) => (
        <g key={i}>
          {svIndices.has(i) && (
            <circle cx={sx(xn)} cy={sy(yn)} r={8} fill="none" stroke="#F59E0B" strokeWidth="1.5" />
          )}
          {/* slack line for outlier points */}
          {!inside && (
            <line x1={sx(xn)} y1={sy(yn)} x2={sx(xn)}
              y2={sy(yn > fLine(xn) ? fLine(xn) + eps : fLine(xn) - eps)}
              stroke="#F87171" strokeWidth="1.2" strokeDasharray="2,1.5" />
          )}
          <circle cx={sx(xn)} cy={sy(yn)} r={3.5}
            fill={inside ? "#064E3B" : "#F87171"} opacity="0.85" />
        </g>
      ))}

      {/* ε annotation */}
      <line x1={sx(0.5)} y1={sy(fLine(0.5))} x2={sx(0.5)} y2={sy(fLine(0.5) + eps)}
        stroke="#10B981" strokeWidth="1" markerEnd="url(#arr)" />
      <text x={sx(0.5) + 4} y={sy(fLine(0.5) + eps / 2)} fontSize="9" fill="#10B981" fontWeight="700">ε</text>

      {/* labels */}
      <text x={sx(0.02) + 4} y={sy(fLine(0.02)) - 6} fontSize="8.5" fill="#064E3B" fontWeight="600">f(x)</text>

      {/* legend */}
      <circle cx={pad.l + 6} cy={H - pad.b + 14} r={3.5} fill="#064E3B" opacity="0.85" />
      <text x={pad.l + 13} y={H - pad.b + 17} fontSize="7" fill="#6B7280">inside tube (no loss)</text>
      <circle cx={pad.l + 118} cy={H - pad.b + 14} r={3.5} fill="#F87171" opacity="0.85" />
      <text x={pad.l + 125} y={H - pad.b + 17} fontSize="7" fill="#6B7280">outside (penalised)</text>
      <circle cx={pad.l + 218} cy={H - pad.b + 14} r={3.5} fill="#064E3B" stroke="#F59E0B" strokeWidth="1.5" opacity="0.85" />
      <text x={pad.l + 226} y={H - pad.b + 17} fontSize="7" fill="#6B7280">SV</text>
    </svg>
  )
}

// ── Decision Tree Regressor: step-function piecewise constant fit ─────────────
function DecisionTreeRegressorViz() {
  const W = 320, H = 215
  const pad = { l: 40, r: 14, t: 18, b: 38 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  const data: [number, number][] = [
    [0.06,0.30],[0.12,0.38],[0.19,0.34],[0.27,0.52],[0.33,0.58],
    [0.40,0.72],[0.46,0.68],[0.53,0.80],[0.58,0.75],[0.64,0.55],
    [0.70,0.48],[0.77,0.45],[0.84,0.32],[0.90,0.28],[0.96,0.22],
  ]

  // Four leaf regions with mean values
  const splits = [0.30, 0.56, 0.72]
  const means  = [0.36, 0.70, 0.54, 0.27]
  const colors = ["#D1FAE5","#A7F3D0","#6EE7B7","#D1FAE5"]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* region fills */}
      {[0, ...splits, 1].map((start, i) => {
        if (i >= splits.length + 1) return null
        const end = i < splits.length ? splits[i] : 1
        return (
          <rect key={i}
            x={sx(start)} y={pad.t}
            width={sx(end) - sx(start)} height={ph}
            fill={colors[i]} opacity="0.35"
          />
        )
      })}

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#9CA3AF" strokeWidth="1.2" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8" fill="#9CA3AF">x</text>
      <text x={12} y={H / 2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,12,${H / 2})`}>y</text>

      {/* split lines */}
      {splits.map((s, i) => (
        <line key={i} x1={sx(s)} y1={pad.t} x2={sx(s)} y2={H - pad.b}
          stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4,2" />
      ))}

      {/* step-function fit */}
      {[0, ...splits, 1].map((start, i) => {
        if (i >= means.length) return null
        const end = i < splits.length ? splits[i] : 1
        return (
          <line key={i}
            x1={sx(start)} y1={sy(means[i])}
            x2={sx(end)}   y2={sy(means[i])}
            stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"
          />
        )
      })}
      {/* vertical connectors */}
      {splits.map((s, i) => (
        <line key={i}
          x1={sx(s)} y1={sy(means[i])}
          x2={sx(s)} y2={sy(means[i + 1])}
          stroke="#10B981" strokeWidth="2.5"
        />
      ))}

      {/* data points */}
      {data.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={3.5} fill="#064E3B" opacity="0.75" />
      ))}

      {/* split labels */}
      {splits.map((s, i) => (
        <text key={i} x={sx(s)} y={pad.t - 4} textAnchor="middle" fontSize="7.5" fill="#F59E0B" fontWeight="600">
          x={s}
        </text>
      ))}
      <text x={sx(0.15)} y={sy(means[0]) - 6} fontSize="8" fill="#10B981" textAnchor="middle" fontWeight="600">ȳ={means[0]}</text>
      <text x={sx(0.43)} y={sy(means[1]) - 6} fontSize="8" fill="#10B981" textAnchor="middle" fontWeight="600">ȳ={means[1]}</text>
      <text x={sx(0.64)} y={sy(means[2]) - 6} fontSize="8" fill="#10B981" textAnchor="middle" fontWeight="600">ȳ={means[2]}</text>
      <text x={sx(0.84)} y={sy(means[3]) - 6} fontSize="8" fill="#10B981" textAnchor="middle" fontWeight="600">ȳ={means[3]}</text>
    </svg>
  )
}

// ── Logistic Regression: sigmoid curve, threshold, class regions ──────────────
function LogisticRegressionViz() {
  const W = 320, H = 215
  const pad = { l: 42, r: 16, t: 18, b: 38 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  // x axis: linear score from -6 to +6
  const xMin = -6, xMax = 6
  const sx = (v: number) => pad.l + ((v - xMin) / (xMax - xMin)) * pw
  const sy = (p: number) => pad.t + (1 - p) * ph
  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z))

  const steps = 100
  const sigPoints = Array.from({ length: steps + 1 }, (_, i) => {
    const z = xMin + (i / steps) * (xMax - xMin)
    return `${sx(z)},${sy(sigmoid(z))}`
  }).join(" ")

  const threshold = 0   // decision boundary at z=0 → p=0.5
  const threshX = sx(threshold)

  // Axis ticks
  const xTicks = [-6, -4, -2, 0, 2, 4, 6]
  const yTicks = [0, 0.25, 0.5, 0.75, 1]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* class region fills */}
      <rect x={pad.l} y={pad.t} width={threshX - pad.l} height={ph} fill="#FEE2E2" opacity="0.4" />
      <rect x={threshX} y={pad.t} width={W - pad.r - threshX} height={ph} fill="#D1FAE5" opacity="0.4" />

      {/* grid lines */}
      {yTicks.map(p => (
        <line key={p} x1={pad.l} y1={sy(p)} x2={W - pad.r} y2={sy(p)}
          stroke="#E5E7EB" strokeWidth="0.8" />
      ))}

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#9CA3AF" strokeWidth="1.2" />

      {/* axis labels */}
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8" fill="#9CA3AF">Linear score  βᵀx</text>
      <text x={11} y={H / 2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,11,${H / 2})`}>P(y=1|x)</text>

      {/* y axis ticks */}
      {yTicks.map(p => (
        <g key={p}>
          <line x1={pad.l - 3} y1={sy(p)} x2={pad.l} y2={sy(p)} stroke="#9CA3AF" strokeWidth="1" />
          <text x={pad.l - 5} y={sy(p) + 3} textAnchor="end" fontSize="7" fill="#9CA3AF">{p}</text>
        </g>
      ))}

      {/* x axis ticks */}
      {xTicks.map(v => (
        <g key={v}>
          <line x1={sx(v)} y1={H - pad.b} x2={sx(v)} y2={H - pad.b + 3} stroke="#9CA3AF" strokeWidth="1" />
          <text x={sx(v)} y={H - pad.b + 11} textAnchor="middle" fontSize="7" fill="#9CA3AF">{v}</text>
        </g>
      ))}

      {/* decision boundary */}
      <line x1={threshX} y1={pad.t} x2={threshX} y2={H - pad.b}
        stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x={threshX + 3} y={pad.t + 10} fontSize="7.5" fill="#F59E0B" fontWeight="600">threshold</text>
      <text x={threshX + 3} y={pad.t + 19} fontSize="7.5" fill="#F59E0B">p=0.5</text>

      {/* 0.5 horizontal line */}
      <line x1={pad.l} y1={sy(0.5)} x2={W - pad.r} y2={sy(0.5)}
        stroke="#F59E0B" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />

      {/* sigmoid curve */}
      <polyline points={sigPoints} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* class labels */}
      <text x={pad.l + 10} y={pad.t + 20} fontSize="8" fill="#EF4444" fontWeight="700">Class 0</text>
      <text x={W - pad.r - 44} y={pad.t + 20} fontSize="8" fill="#059669" fontWeight="700">Class 1</text>

      {/* formula annotation */}
      <text x={sx(2.2)} y={sy(0.88)} fontSize="8.5" fill="#10B981" fontWeight="600">σ(z) = 1/(1+e⁻ᶻ)</text>
    </svg>
  )
}

// ── SVM: margin, support vectors, decision boundary ───────────────────────────
function SVMViz() {
  const W = 320, H = 215
  const pad = { l: 20, r: 14, t: 18, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  // Decision boundary: yn = 0.5 (horizontal in normalised space) + slope
  // boundary: y = 0.3 + 0.5x (in [0,1] space)
  const f  = (x: number) => 0.32 + 0.5 * x
  const m  = 0.16   // half-margin width

  // Points: class +1 (blue, above) and class -1 (orange, below)
  const pos: [number, number, boolean][] = [
    [0.15,0.75,false],[0.25,0.85,false],[0.35,0.78,false],
    [0.50,0.90,false],[0.60,0.80,false],[0.70,0.88,false],
    [0.40,0.65,true ],[0.55,0.72,true ],  // support vectors (pos)
  ]
  const neg: [number, number, boolean][] = [
    [0.10,0.18,false],[0.20,0.28,false],[0.30,0.22,false],
    [0.55,0.38,false],[0.68,0.28,false],[0.80,0.20,false],
    [0.28,0.40,true ],[0.45,0.48,true ],  // support vectors (neg)
  ]

  const lineX0 = 0, lineX1 = 1
  const boundaryPts = `${sx(lineX0)},${sy(f(lineX0))} ${sx(lineX1)},${sy(f(lineX1))}`
  const upperPts    = `${sx(lineX0)},${sy(f(lineX0)+m)} ${sx(lineX1)},${sy(f(lineX1)+m)}`
  const lowerPts    = `${sx(lineX0)},${sy(f(lineX0)-m)} ${sx(lineX1)},${sy(f(lineX1)-m)}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* margin fill */}
      <polygon
        points={`${sx(0)},${sy(f(0)+m)} ${sx(1)},${sy(f(1)+m)} ${sx(1)},${sy(f(1)-m)} ${sx(0)},${sy(f(0)-m)}`}
        fill="#FEF3C7" opacity="0.6"
      />

      {/* margin lines */}
      <polyline points={upperPts} fill="none" stroke="#F59E0B" strokeWidth="1.4" strokeDasharray="5,3" />
      <polyline points={lowerPts} fill="none" stroke="#F59E0B" strokeWidth="1.4" strokeDasharray="5,3" />

      {/* decision boundary */}
      <polyline points={boundaryPts} fill="none" stroke="#064E3B" strokeWidth="2.2" />

      {/* margin annotation */}
      <line x1={sx(0.85)} y1={sy(f(0.85)+m)} x2={sx(0.85)} y2={sy(f(0.85)-m)}
        stroke="#F59E0B" strokeWidth="1" />
      <text x={sx(0.87)} y={sy(f(0.85))+3} fontSize="8.5" fill="#F59E0B" fontWeight="700">2/‖w‖</text>

      {/* positive class points */}
      {pos.map(([xn, yn, isSV], i) => (
        <g key={i}>
          {isSV && <circle cx={sx(xn)} cy={sy(yn)} r={8.5} fill="none" stroke="#3B82F6" strokeWidth="1.8" />}
          <circle cx={sx(xn)} cy={sy(yn)} r={4} fill="#3B82F6" />
        </g>
      ))}

      {/* negative class points */}
      {neg.map(([xn, yn, isSV], i) => (
        <g key={i}>
          {isSV && <circle cx={sx(xn)} cy={sy(yn)} r={8.5} fill="none" stroke="#F97316" strokeWidth="1.8" />}
          <circle cx={sx(xn)} cy={sy(yn)} r={4} fill="#F97316" />
        </g>
      ))}

      {/* labels */}
      <text x={sx(0.82)} y={sy(0.86)} fontSize="8" fill="#3B82F6" fontWeight="700">+1</text>
      <text x={sx(0.82)} y={sy(0.20)} fontSize="8" fill="#F97316" fontWeight="700">−1</text>
      <text x={sx(0.02)} y={sy(f(0.02)) - 7} fontSize="8" fill="#064E3B" fontWeight="600">decision boundary</text>

      {/* legend */}
      <circle cx={pad.l + 8} cy={H - pad.b + 14} r={4} fill="#3B82F6" />
      <text x={pad.l + 15} y={H - pad.b + 17} fontSize="7" fill="#6B7280">class +1</text>
      <circle cx={pad.l + 70} cy={H - pad.b + 14} r={4} fill="#F97316" />
      <text x={pad.l + 77} y={H - pad.b + 17} fontSize="7" fill="#6B7280">class −1</text>
      <circle cx={pad.l + 136} cy={H - pad.b + 14} r={4} fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.8" />
      <circle cx={pad.l + 136} cy={H - pad.b + 14} r={7.5} fill="none" stroke="#9CA3AF" strokeWidth="1.2" />
      <text x={pad.l + 147} y={H - pad.b + 17} fontSize="7" fill="#6B7280">support vector</text>
    </svg>
  )
}

// ── KNN: query point + K nearest neighbours ───────────────────────────────────
function KNNViz() {
  const W = 320, H = 215
  const pad = { l: 20, r: 14, t: 14, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  // Class A (green) and Class B (orange)
  const classA: [number, number][] = [
    [0.12,0.75],[0.20,0.60],[0.18,0.88],[0.30,0.82],[0.35,0.68],
    [0.08,0.55],[0.25,0.45],[0.40,0.78],[0.15,0.42],
  ]
  const classB: [number, number][] = [
    [0.72,0.30],[0.80,0.20],[0.65,0.18],[0.88,0.38],[0.76,0.50],
    [0.60,0.35],[0.90,0.22],[0.82,0.62],[0.68,0.60],
  ]

  // Query point
  const qx = 0.47, qy = 0.55

  // K=5 neighbours (mix: 3 green, 2 orange — predict green)
  const neighbours: { x: number; y: number; cls: "A" | "B" }[] = [
    { x: 0.40, y: 0.78, cls: "A" },
    { x: 0.35, y: 0.68, cls: "A" },
    { x: 0.60, y: 0.35, cls: "B" },
    { x: 0.68, y: 0.60, cls: "B" },
    { x: 0.30, y: 0.82, cls: "A" },
  ]

  // Radius of KNN circle (encompassing all 5 neighbours)
  const dist = (a: { x: number; y: number }) =>
    Math.sqrt(((a.x - qx) * pw) ** 2 + ((a.y - qy) * ph) ** 2)
  const radius = Math.max(...neighbours.map(dist)) + 6

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* KNN search radius */}
      <circle cx={sx(qx)} cy={sy(qy)} r={radius} fill="#F0FDF9" stroke="#10B981" strokeWidth="1.5" strokeDasharray="5,3" />

      {/* neighbour connection lines */}
      {neighbours.map((n, i) => (
        <line key={i}
          x1={sx(qx)} y1={sy(qy)} x2={sx(n.x)} y2={sy(n.y)}
          stroke={n.cls === "A" ? "#059669" : "#F97316"} strokeWidth="1" opacity="0.5"
        />
      ))}

      {/* class A points */}
      {classA.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={4.5} fill="#059669" opacity="0.85" />
      ))}

      {/* class B points */}
      {classB.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={4.5} fill="#F97316" opacity="0.85" />
      ))}

      {/* highlighted neighbours */}
      {neighbours.map((n, i) => (
        <circle key={i}
          cx={sx(n.x)} cy={sy(n.y)} r={6.5}
          fill={n.cls === "A" ? "#059669" : "#F97316"}
          stroke="white" strokeWidth="1.5"
        />
      ))}

      {/* query point */}
      <circle cx={sx(qx)} cy={sy(qy)} r={7} fill="#7C3AED" />
      <text x={sx(qx) + 10} y={sy(qy) - 8} fontSize="8.5" fill="#7C3AED" fontWeight="700">query x*</text>

      {/* vote summary */}
      <rect x={W - pad.r - 84} y={pad.t} width={82} height={46} rx="6" fill="white" stroke="#D1FAE5" strokeWidth="1.2" />
      <text x={W - pad.r - 42} y={pad.t + 12} textAnchor="middle" fontSize="7.5" fill="#064E3B" fontWeight="700">K=5 vote</text>
      <circle cx={W - pad.r - 68} cy={pad.t + 25} r={4} fill="#059669" />
      <text x={W - pad.r - 60} y={pad.t + 28} fontSize="7.5" fill="#059669" fontWeight="700">3 × A</text>
      <circle cx={W - pad.r - 68} cy={pad.t + 39} r={4} fill="#F97316" />
      <text x={W - pad.r - 60} y={pad.t + 42} fontSize="7.5" fill="#F97316">2 × B</text>
      <text x={W - pad.r - 42} y={pad.t + 56} textAnchor="middle" fontSize="7.5" fill="#059669" fontWeight="700">→ predict A</text>

      {/* legend */}
      <circle cx={pad.l + 6} cy={H - pad.b + 14} r={4.5} fill="#059669" />
      <text x={pad.l + 14} y={H - pad.b + 17} fontSize="7" fill="#6B7280">Class A</text>
      <circle cx={pad.l + 62} cy={H - pad.b + 14} r={4.5} fill="#F97316" />
      <text x={pad.l + 70} y={H - pad.b + 17} fontSize="7" fill="#6B7280">Class B</text>
      <circle cx={pad.l + 118} cy={H - pad.b + 14} r={5} fill="#7C3AED" />
      <text x={pad.l + 126} y={H - pad.b + 17} fontSize="7" fill="#6B7280">Query point</text>
    </svg>
  )
}

// ── Naive Bayes: class-conditional Gaussian densities ────────────────────────
function NaiveBayesViz() {
  const W = 320, H = 215
  const pad = { l: 42, r: 14, t: 18, b: 38 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  // Feature x range [−4, 6]
  const xMin = -4, xMax = 6
  const sx = (v: number) => pad.l + ((v - xMin) / (xMax - xMin)) * pw
  const sy = (p: number) => pad.t + (1 - p) * ph   // 0=bottom, 1=top

  const gauss = (x: number, mu: number, sig: number) =>
    (1 / (sig * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sig) ** 2)

  const mu0 = 0, sig0 = 1.2   // class 0 (red)
  const mu1 = 3, sig1 = 1.0   // class 1 (green)
  const maxDensity = Math.max(gauss(mu0, mu0, sig0), gauss(mu1, mu1, sig1))

  const steps = 120
  const pts0 = Array.from({ length: steps + 1 }, (_, i) => {
    const x = xMin + (i / steps) * (xMax - xMin)
    return `${sx(x)},${sy(gauss(x, mu0, sig0) / maxDensity * 0.88)}`
  }).join(" ")
  const pts1 = Array.from({ length: steps + 1 }, (_, i) => {
    const x = xMin + (i / steps) * (xMax - xMin)
    return `${sx(x)},${sy(gauss(x, mu1, sig1) / maxDensity * 0.88)}`
  }).join(" ")

  // Decision boundary: where P(x|y=0)π₀ = P(x|y=1)π₁ (assume equal priors → where densities cross)
  // Numerically between mu0 and mu1
  let boundX = (mu0 + mu1) / 2
  // Refine: log p(x|0) = log p(x|1) → -(x-mu0)²/(2σ0²) + log(σ1/σ0) = -(x-mu1)²/(2σ1²)
  // Approximate: just find x where gauss(x,0,sig0)≈gauss(x,3,sig1)
  for (let xi = mu0; xi <= mu1; xi += 0.01) {
    if (gauss(xi, mu1, sig1) >= gauss(xi, mu0, sig0)) { boundX = xi; break }
  }

  const xTicks = [-4, -2, 0, 2, 4, 6]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* class region shading */}
      <rect x={pad.l} y={pad.t} width={sx(boundX) - pad.l} height={ph} fill="#FEE2E2" opacity="0.3" />
      <rect x={sx(boundX)} y={pad.t} width={W - pad.r - sx(boundX)} height={ph} fill="#D1FAE5" opacity="0.3" />

      {/* filled area under curves */}
      <polygon
        points={`${sx(xMin)},${sy(0)} ${pts0} ${sx(xMax)},${sy(0)}`}
        fill="#FCA5A5" opacity="0.25"
      />
      <polygon
        points={`${sx(xMin)},${sy(0)} ${pts1} ${sx(xMax)},${sy(0)}`}
        fill="#6EE7B7" opacity="0.25"
      />

      {/* curve lines */}
      <polyline points={pts0} fill="none" stroke="#EF4444" strokeWidth="2" />
      <polyline points={pts1} fill="none" stroke="#10B981" strokeWidth="2" />

      {/* axes */}
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#9CA3AF" strokeWidth="1.2" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8" fill="#9CA3AF">Feature x</text>
      <text x={12} y={H / 2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,12,${H / 2})`}>P(x | y)</text>

      {/* x ticks */}
      {xTicks.map(v => (
        <g key={v}>
          <line x1={sx(v)} y1={H - pad.b} x2={sx(v)} y2={H - pad.b + 3} stroke="#9CA3AF" strokeWidth="1" />
          <text x={sx(v)} y={H - pad.b + 11} textAnchor="middle" fontSize="7" fill="#9CA3AF">{v}</text>
        </g>
      ))}

      {/* decision boundary */}
      <line x1={sx(boundX)} y1={pad.t} x2={sx(boundX)} y2={H - pad.b}
        stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="4,2" />
      <text x={sx(boundX) + 3} y={pad.t + 10} fontSize="7.5" fill="#F59E0B" fontWeight="600">decision</text>
      <text x={sx(boundX) + 3} y={pad.t + 19} fontSize="7.5" fill="#F59E0B">boundary</text>

      {/* mean annotations */}
      <line x1={sx(mu0)} y1={H - pad.b - 4} x2={sx(mu0)} y2={H - pad.b + 3} stroke="#EF4444" strokeWidth="1.5" />
      <text x={sx(mu0)} y={H - pad.b - 7} textAnchor="middle" fontSize="7.5" fill="#EF4444" fontWeight="600">μ₀={mu0}</text>
      <line x1={sx(mu1)} y1={H - pad.b - 4} x2={sx(mu1)} y2={H - pad.b + 3} stroke="#10B981" strokeWidth="1.5" />
      <text x={sx(mu1)} y={H - pad.b - 7} textAnchor="middle" fontSize="7.5" fill="#10B981" fontWeight="600">μ₁={mu1}</text>

      {/* curve labels */}
      <text x={sx(mu0) - 30} y={sy(gauss(mu0, mu0, sig0) / maxDensity * 0.88) - 6} fontSize="8" fill="#EF4444" fontWeight="700">P(x|y=0)</text>
      <text x={sx(mu1) + 6} y={sy(gauss(mu1, mu1, sig1) / maxDensity * 0.88) - 6} fontSize="8" fill="#10B981" fontWeight="700">P(x|y=1)</text>
    </svg>
  )
}

// ── Decision Tree Classifier: 2D feature space with rectangular regions ───────
function DecisionTreeClassifierViz() {
  const W = 320, H = 215
  const pad = { l: 34, r: 14, t: 14, b: 34 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  // Splits: vertical at x=0.5, then horizontal at y=0.55 (left region), y=0.35 (right region)
  const vSplit = 0.50
  const hSplitL = 0.55
  const hSplitR = 0.38

  // Regions → class colours
  const regions = [
    { x1:0, x2:vSplit, y1:hSplitL, y2:1,        cls: "A", fill:"#D1FAE5" },
    { x1:0, x2:vSplit, y1:0, y2:hSplitL,         cls: "B", fill:"#FEE2E2" },
    { x1:vSplit, x2:1, y1:hSplitR, y2:1,          cls: "A", fill:"#D1FAE5" },
    { x1:vSplit, x2:1, y1:0, y2:hSplitR,          cls: "B", fill:"#FEE2E2" },
  ]

  // Data points [x, y, class]
  const pts: [number, number, "A" | "B"][] = [
    [0.10,0.70,"A"],[0.18,0.80,"A"],[0.28,0.72,"A"],[0.35,0.90,"A"],[0.42,0.62,"A"],
    [0.08,0.30,"B"],[0.20,0.25,"B"],[0.32,0.40,"B"],[0.44,0.32,"B"],[0.15,0.48,"B"],
    [0.58,0.58,"A"],[0.68,0.72,"A"],[0.78,0.80,"A"],[0.88,0.65,"A"],[0.94,0.55,"A"],
    [0.56,0.20,"B"],[0.70,0.28,"B"],[0.80,0.18,"B"],[0.90,0.30,"B"],[0.62,0.35,"B"],
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* region fills */}
      {regions.map((r, i) => (
        <rect key={i}
          x={sx(r.x1)} y={sy(r.y2)}
          width={sx(r.x2) - sx(r.x1)}
          height={sy(r.y1) - sy(r.y2)}
          fill={r.fill} opacity="0.55"
        />
      ))}

      {/* split lines */}
      <line x1={sx(vSplit)} y1={pad.t} x2={sx(vSplit)} y2={H - pad.b}
        stroke="#F59E0B" strokeWidth="2" />
      <line x1={pad.l} y1={sy(hSplitL)} x2={sx(vSplit)} y2={sy(hSplitL)}
        stroke="#F59E0B" strokeWidth="2" />
      <line x1={sx(vSplit)} y1={sy(hSplitR)} x2={W - pad.r} y2={sy(hSplitR)}
        stroke="#F59E0B" strokeWidth="2" />

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#9CA3AF" strokeWidth="1.2" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8" fill="#9CA3AF">Feature x₁</text>
      <text x={12} y={H / 2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,12,${H / 2})`}>Feature x₂</text>

      {/* split labels */}
      <text x={sx(vSplit)} y={pad.t - 3} textAnchor="middle" fontSize="7.5" fill="#F59E0B" fontWeight="600">x₁≤0.5?</text>
      <text x={sx(0.08)} y={sy(hSplitL) - 3} fontSize="7.5" fill="#F59E0B" fontWeight="600">x₂≤0.55?</text>
      <text x={sx(0.57)} y={sy(hSplitR) - 3} fontSize="7.5" fill="#F59E0B" fontWeight="600">x₂≤0.38?</text>

      {/* region class labels */}
      <text x={sx(0.25)} y={sy(0.77)} textAnchor="middle" fontSize="9" fill="#059669" fontWeight="700">Class A</text>
      <text x={sx(0.25)} y={sy(0.32)} textAnchor="middle" fontSize="9" fill="#EF4444" fontWeight="700">Class B</text>
      <text x={sx(0.75)} y={sy(0.65)} textAnchor="middle" fontSize="9" fill="#059669" fontWeight="700">Class A</text>
      <text x={sx(0.75)} y={sy(0.20)} textAnchor="middle" fontSize="9" fill="#EF4444" fontWeight="700">Class B</text>

      {/* data points */}
      {pts.map(([xn, yn, cls], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={4}
          fill={cls === "A" ? "#059669" : "#EF4444"} opacity="0.9" />
      ))}
    </svg>
  )
}

// ── LDA: shared-covariance Gaussians + linear boundary + projection ───────────
function LDAViz() {
  const W = 320, H = 215
  const pad = { l: 20, r: 14, t: 14, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  // Two classes with same covariance (similar ellipse shape)
  // Class 0 (red): centre (0.28, 0.65)
  // Class 1 (blue): centre (0.70, 0.38)
  const pts0: [number, number][] = [
    [0.18,0.72],[0.22,0.58],[0.30,0.78],[0.35,0.62],[0.28,0.85],
    [0.38,0.70],[0.15,0.60],[0.25,0.50],[0.40,0.55],
  ]
  const pts1: [number, number][] = [
    [0.62,0.30],[0.68,0.45],[0.72,0.28],[0.78,0.42],[0.65,0.55],
    [0.82,0.35],[0.58,0.22],[0.75,0.18],[0.88,0.48],
  ]

  // Linear decision boundary: perpendicular bisector of the two means
  // midpoint (0.49, 0.515); direction perpendicular to (0.42, -0.27) → slope
  // boundary passes through midpoint with slope normal to mean difference
  // dy/dx for boundary = -dx_mean/dy_mean = -(0.70-0.28)/(0.38-0.65) = 0.42/0.27 ≈ 1.56
  // boundary line: y - 0.515 = 1.56*(x - 0.49)
  const bnd = (x: number) => 0.515 + 1.56 * (x - 0.49)

  // Projection axis (LDA direction): mean difference direction
  // project onto 1D axis shown at bottom
  const projY = 0.08
  const projPts0 = pts0.map(([x]) => x * 0.42 + 0.28 * (1 - x))  // approximate projections
  const projPts1 = pts1.map(([x]) => x * 0.42 + 0.70 * (1 - x))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* class 0 ellipse (shared covariance) */}
      <ellipse cx={sx(0.28)} cy={sy(0.66)} rx={48} ry={30}
        transform={`rotate(-20,${sx(0.28)},${sy(0.66)})`}
        fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" opacity="0.5" />
      {/* class 1 ellipse (same shape = LDA assumption) */}
      <ellipse cx={sx(0.70)} cy={sy(0.37)} rx={48} ry={30}
        transform={`rotate(-20,${sx(0.70)},${sy(0.37)})`}
        fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" />

      {/* decision boundary */}
      {(() => {
        const x0 = 0.25, x1 = 0.72
        return <line
          x1={sx(x0)} y1={sy(bnd(x0))} x2={sx(x1)} y2={sy(bnd(x1))}
          stroke="#064E3B" strokeWidth="2.2"
        />
      })()}

      {/* class 0 points */}
      {pts0.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={4.5} fill="#EF4444" opacity="0.9" />
      ))}
      {/* class 1 points */}
      {pts1.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={4.5} fill="#3B82F6" opacity="0.9" />
      ))}

      {/* class means */}
      <circle cx={sx(0.28)} cy={sy(0.66)} r={6} fill="#EF4444" stroke="white" strokeWidth="1.5" />
      <circle cx={sx(0.70)} cy={sy(0.37)} r={6} fill="#3B82F6" stroke="white" strokeWidth="1.5" />
      <text x={sx(0.22)} y={sy(0.66) - 9} fontSize="7.5" fill="#EF4444" fontWeight="700">μ₀</text>
      <text x={sx(0.72)} y={sy(0.37) - 9} fontSize="7.5" fill="#3B82F6" fontWeight="700">μ₁</text>

      {/* shared covariance note */}
      <text x={sx(0.50)} y={pad.t + 10} textAnchor="middle" fontSize="7.5" fill="#064E3B" fontWeight="600">Σ₀ = Σ₁ = Σ  →  linear boundary</text>

      {/* projection axis */}
      <line x1={pad.l} y1={sy(projY)} x2={W - pad.r} y2={sy(projY)} stroke="#9CA3AF" strokeWidth="1.2" />
      <text x={W - pad.r - 4} y={sy(projY) + 10} textAnchor="end" fontSize="7.5" fill="#9CA3AF">LDA axis</text>
      {pts0.map(([xn], i) => (
        <line key={i} x1={sx(xn)} y1={sy(projY) - 4} x2={sx(xn)} y2={sy(projY) + 4}
          stroke="#EF4444" strokeWidth="2" opacity="0.6" />
      ))}
      {pts1.map(([xn], i) => (
        <line key={i} x1={sx(xn)} y1={sy(projY) - 4} x2={sx(xn)} y2={sy(projY) + 4}
          stroke="#3B82F6" strokeWidth="2" opacity="0.6" />
      ))}

      {/* legend */}
      <circle cx={pad.l + 6} cy={H - pad.b + 14} r={4} fill="#EF4444" />
      <text x={pad.l + 13} y={H - pad.b + 17} fontSize="7" fill="#6B7280">Class 0</text>
      <circle cx={pad.l + 60} cy={H - pad.b + 14} r={4} fill="#3B82F6" />
      <text x={pad.l + 67} y={H - pad.b + 17} fontSize="7" fill="#6B7280">Class 1</text>
      <line x1={pad.l + 116} y1={H - pad.b + 14} x2={pad.l + 132} y2={H - pad.b + 14} stroke="#064E3B" strokeWidth="2" />
      <text x={pad.l + 135} y={H - pad.b + 17} fontSize="7" fill="#6B7280">Linear boundary</text>
    </svg>
  )
}

// ── QDA: class-specific covariances + quadratic boundary ─────────────────────
function QDAViz() {
  const W = 320, H = 215
  const pad = { l: 20, r: 14, t: 18, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  // Class 0 (red): narrow vertical ellipse, centre (0.28, 0.62)
  // Class 1 (blue): wide horizontal ellipse, centre (0.72, 0.45)
  const pts0: [number, number][] = [
    [0.22,0.78],[0.26,0.55],[0.30,0.82],[0.32,0.60],[0.24,0.68],
    [0.28,0.44],[0.20,0.52],[0.34,0.74],[0.18,0.72],
  ]
  const pts1: [number, number][] = [
    [0.52,0.50],[0.60,0.60],[0.70,0.70],[0.80,0.55],[0.90,0.62],
    [0.55,0.30],[0.65,0.22],[0.78,0.35],[0.88,0.28],
  ]

  // Approximate quadratic boundary as a cubic bezier curve
  // separating the two groups
  const qBoundary = `M ${sx(0.38)},${sy(0.95)} C ${sx(0.50)},${sy(0.60)} ${sx(0.52)},${sy(0.40)} ${sx(0.42)},${sy(0.05)}`
  // Also draw the LDA linear boundary (dashed) for comparison
  const ldaBnd = (x: number) => 0.55 + 0.2 * (x - 0.50)   // roughly

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* class 0 ellipse: narrow, tilted */}
      <ellipse cx={sx(0.27)} cy={sy(0.64)} rx={18} ry={46}
        transform={`rotate(10,${sx(0.27)},${sy(0.64)})`}
        fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" opacity="0.55" />

      {/* class 1 ellipse: wide, horizontal — DIFFERENT shape from class 0 */}
      <ellipse cx={sx(0.72)} cy={sy(0.45)} rx={62} ry={26}
        transform={`rotate(-5,${sx(0.72)},${sy(0.45)})`}
        fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" opacity="0.55" />

      {/* LDA boundary (dashed) for comparison */}
      <line x1={sx(0.35)} y1={sy(ldaBnd(0.35))} x2={sx(0.70)} y2={sy(ldaBnd(0.70))}
        stroke="#9CA3AF" strokeWidth="1.2" strokeDasharray="4,2" />
      <text x={sx(0.68)} y={sy(ldaBnd(0.68)) - 5} fontSize="7" fill="#9CA3AF">LDA (linear)</text>

      {/* QDA quadratic boundary */}
      <path d={qBoundary} fill="none" stroke="#064E3B" strokeWidth="2.2" />
      <text x={sx(0.44)} y={sy(0.82)} fontSize="7.5" fill="#064E3B" fontWeight="700">QDA</text>
      <text x={sx(0.44)} y={sy(0.74)} fontSize="7.5" fill="#064E3B">(quadratic)</text>

      {/* class 0 points */}
      {pts0.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={4.5} fill="#EF4444" opacity="0.9" />
      ))}
      {/* class 1 points */}
      {pts1.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={4.5} fill="#3B82F6" opacity="0.9" />
      ))}

      {/* class means */}
      <circle cx={sx(0.27)} cy={sy(0.64)} r={5.5} fill="#EF4444" stroke="white" strokeWidth="1.5" />
      <text x={sx(0.30)} y={sy(0.64) - 8} fontSize="7.5" fill="#EF4444" fontWeight="700">μ₀, Σ₀</text>
      <circle cx={sx(0.72)} cy={sy(0.45)} r={5.5} fill="#3B82F6" stroke="white" strokeWidth="1.5" />
      <text x={sx(0.74)} y={sy(0.45) - 8} fontSize="7.5" fill="#3B82F6" fontWeight="700">μ₁, Σ₁</text>

      {/* key difference note */}
      <text x={W / 2} y={pad.t - 3} textAnchor="middle" fontSize="7.5" fill="#064E3B" fontWeight="600">Σ₀ ≠ Σ₁  →  quadratic boundary</text>

      {/* legend */}
      <ellipse cx={pad.l + 8} cy={H - pad.b + 14} rx={6} ry={9} fill="#FEE2E2" stroke="#EF4444" strokeWidth="1" />
      <text x={pad.l + 18} y={H - pad.b + 17} fontSize="7" fill="#6B7280">Class 0 (Σ₀)</text>
      <ellipse cx={pad.l + 94} cy={H - pad.b + 14} rx={9} ry={6} fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
      <text x={pad.l + 107} y={H - pad.b + 17} fontSize="7" fill="#6B7280">Class 1 (Σ₁)</text>
    </svg>
  )
}

// ── K-Means: centroids + cluster regions + data points ───────────────────────
function KMeansViz() {
  const W = 320, H = 215
  const pad = { l: 18, r: 14, t: 14, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  const clusters: { pts: [number,number][]; cx: number; cy: number; fill: string; stroke: string }[] = [
    { pts: [[0.12,0.78],[0.18,0.85],[0.22,0.72],[0.28,0.80],[0.15,0.65],[0.30,0.75],[0.08,0.70]],
      cx: 0.19, cy: 0.75, fill: "#DBEAFE", stroke: "#3B82F6" },
    { pts: [[0.48,0.55],[0.55,0.65],[0.60,0.50],[0.52,0.45],[0.65,0.60],[0.58,0.72],[0.45,0.68]],
      cx: 0.55, cy: 0.59, fill: "#D1FAE5", stroke: "#10B981" },
    { pts: [[0.72,0.22],[0.80,0.30],[0.85,0.18],[0.78,0.38],[0.90,0.28],[0.68,0.15],[0.82,0.12]],
      cx: 0.79, cy: 0.23, fill: "#FEE2E2", stroke: "#EF4444" },
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* cluster region blobs (approximate via ellipses) */}
      <ellipse cx={sx(0.19)} cy={sy(0.75)} rx={52} ry={36} fill="#DBEAFE" opacity="0.4" />
      <ellipse cx={sx(0.55)} cy={sy(0.59)} rx={56} ry={40} fill="#D1FAE5" opacity="0.4" />
      <ellipse cx={sx(0.79)} cy={sy(0.23)} rx={52} ry={34} fill="#FEE2E2" opacity="0.4" />

      {/* data points */}
      {clusters.map((cl, ci) =>
        cl.pts.map(([x, y], i) => (
          <circle key={`${ci}-${i}`} cx={sx(x)} cy={sy(y)} r={4.5}
            fill={cl.stroke} opacity="0.85" />
        ))
      )}

      {/* centroid stars */}
      {clusters.map((cl, ci) => {
        const cx = sx(cl.cx), cy = sy(cl.cy)
        const r = 8, ri = 4
        const pts = Array.from({ length: 10 }, (_, i) => {
          const a = (i * Math.PI) / 5 - Math.PI / 2
          const rad = i % 2 === 0 ? r : ri
          return `${cx + rad * Math.cos(a)},${cy + rad * Math.sin(a)}`
        }).join(" ")
        return <polygon key={ci} points={pts} fill={cl.stroke} stroke="white" strokeWidth="1.2" />
      })}

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8" fill="#9CA3AF">Feature x₁</text>
      <text x={11} y={H / 2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,11,${H / 2})`}>Feature x₂</text>

      {/* legend */}
      <polygon points={`${pad.l+8},${H-pad.b+10} ${pad.l+11},${H-pad.b+17} ${pad.l+8},${H-pad.b+21} ${pad.l+5},${H-pad.b+17}`}
        fill="#9CA3AF" />
      <text x={pad.l + 14} y={H - pad.b + 19} fontSize="7" fill="#6B7280">centroid μₖ</text>
      <circle cx={pad.l + 90} cy={H - pad.b + 15} r={4.5} fill="#9CA3AF" opacity="0.7" />
      <text x={pad.l + 97} y={H - pad.b + 19} fontSize="7" fill="#6B7280">data point</text>
    </svg>
  )
}

// ── DBSCAN: core / border / noise points + ε-rings ───────────────────────────
function DBSCANViz() {
  const W = 320, H = 215
  const pad = { l: 18, r: 14, t: 14, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  // core points (filled circles), border points, noise
  const coreA:  [number,number][] = [[0.18,0.72],[0.25,0.80],[0.22,0.62],[0.30,0.75],[0.15,0.82]]
  const borderA:[number,number][] = [[0.10,0.68],[0.35,0.78]]
  const coreB:  [number,number][] = [[0.65,0.35],[0.72,0.28],[0.70,0.45],[0.78,0.38]]
  const borderB:[number,number][] = [[0.58,0.30],[0.82,0.42]]
  const noise:  [number,number][] = [[0.42,0.55],[0.90,0.75],[0.05,0.20]]

  // ε radius in screen units (approximate)
  const eps = 26

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* ε-neighbourhood rings on core points */}
      {[...coreA, ...coreB].map(([x, y], i) => (
        <circle key={i} cx={sx(x)} cy={sy(y)} r={eps}
          fill="none" stroke="#10B981" strokeWidth="0.8" strokeDasharray="3,2" opacity="0.4" />
      ))}

      {/* cluster A fill */}
      <ellipse cx={sx(0.22)} cy={sy(0.74)} rx={62} ry={42} fill="#D1FAE5" opacity="0.35" />
      {/* cluster B fill */}
      <ellipse cx={sx(0.70)} cy={sy(0.37)} rx={54} ry={38} fill="#DBEAFE" opacity="0.35" />

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.2" />

      {/* core A */}
      {coreA.map(([x,y],i) => <circle key={i} cx={sx(x)} cy={sy(y)} r={6} fill="#10B981" stroke="white" strokeWidth="1.2" />)}
      {/* border A */}
      {borderA.map(([x,y],i) => <circle key={i} cx={sx(x)} cy={sy(y)} r={6} fill="#6EE7B7" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2,1" />)}
      {/* core B */}
      {coreB.map(([x,y],i) => <circle key={i} cx={sx(x)} cy={sy(y)} r={6} fill="#3B82F6" stroke="white" strokeWidth="1.2" />)}
      {/* border B */}
      {borderB.map(([x,y],i) => <circle key={i} cx={sx(x)} cy={sy(y)} r={6} fill="#93C5FD" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="2,1" />)}
      {/* noise */}
      {noise.map(([x,y],i) => <circle key={i} cx={sx(x)} cy={sy(y)} r={5} fill="#9CA3AF" stroke="#6B7280" strokeWidth="1" />)}

      {/* ε annotation */}
      <line x1={sx(0.18)} y1={sy(0.72)} x2={sx(0.18) + eps} y2={sy(0.72)} stroke="#10B981" strokeWidth="1.2" />
      <text x={sx(0.18) + eps / 2} y={sy(0.72) - 4} textAnchor="middle" fontSize="9" fill="#10B981" fontWeight="700">ε</text>

      {/* labels */}
      <text x={sx(0.17)} y={sy(0.91)} fontSize="7.5" fill="#059669" fontWeight="600" textAnchor="middle">Cluster A</text>
      <text x={sx(0.72)} y={sy(0.55)} fontSize="7.5" fill="#2563EB" fontWeight="600" textAnchor="middle">Cluster B</text>
      {noise.map(([x,y],i) => (
        <text key={i} x={sx(x)} y={sy(y) - 9} fontSize="7" fill="#6B7280" textAnchor="middle">noise</text>
      ))}

      {/* legend */}
      <circle cx={pad.l+6}  cy={H-pad.b+15} r={5} fill="#10B981" stroke="white" strokeWidth="1" />
      <text x={pad.l+14} y={H-pad.b+19} fontSize="7" fill="#6B7280">core</text>
      <circle cx={pad.l+50} cy={H-pad.b+15} r={5} fill="#6EE7B7" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2,1" />
      <text x={pad.l+58} y={H-pad.b+19} fontSize="7" fill="#6B7280">border</text>
      <circle cx={pad.l+102} cy={H-pad.b+15} r={5} fill="#9CA3AF" stroke="#6B7280" strokeWidth="1" />
      <text x={pad.l+110} y={H-pad.b+19} fontSize="7" fill="#6B7280">noise</text>
    </svg>
  )
}

// ── Hierarchical Clustering: dendrogram ──────────────────────────────────────
function HierarchicalClusteringViz() {
  const W = 320, H = 215
  const padL = 30, padR = 20, padT = 14, padB = 50
  const pw = W - padL - padR
  const ph = H - padT - padB

  // 7 leaves, positions evenly spaced along x
  const labels = ["A","B","C","D","E","F","G"]
  const n = labels.length
  const leafX = (i: number) => padL + (i / (n - 1)) * pw
  const leafY = H - padB

  // Dendrogram merges: [left_leaf_idx, right_idx_or_neg, height_norm, result_x_norm]
  // Heights normalised to [0,1], y = padT + (1-h)*ph
  type Merge = { l: number; r: number; h: number; x: number }
  // Bottom-up: merge(0,1), merge(2,3), merge(5,6), merge(m01,m23), merge(4,m56), merge(big,small)
  const merges: Merge[] = [
    { l: 0, r: 1,  h: 0.18, x: (leafX(0)+leafX(1))/2 },   // merge A,B → node 7
    { l: 2, r: 3,  h: 0.22, x: (leafX(2)+leafX(3))/2 },   // merge C,D → node 8
    { l: 5, r: 6,  h: 0.20, x: (leafX(5)+leafX(6))/2 },   // merge F,G → node 9
    { l: 7, r: 8,  h: 0.45, x: ((leafX(0)+leafX(1))/2+(leafX(2)+leafX(3))/2)/2 }, // merge AB,CD → node 10
    { l: 4, r: 9,  h: 0.50, x: (leafX(4)+(leafX(5)+leafX(6))/2)/2 },              // merge E,FG → node 11
    { l: 10, r: 11, h: 0.82, x: W/2 },                                             // merge all → root
  ]

  const sy = (h: number) => padT + (1 - h) * ph
  // node x positions: indices 0-6 are leaves, 7-12 are merged nodes
  const nodeX: number[] = labels.map((_,i) => leafX(i))
  merges.forEach(m => nodeX.push(m.x))

  const cutH = 0.60  // cut line

  // Cluster colouring: nodes below cut get colour
  const colours = ["#3B82F6","#10B981","#F59E0B"]  // 3 clusters after cut

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* y axis */}
      <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#D1FAE5" strokeWidth="1.2" />
      {[0,0.25,0.50,0.75,1.0].map(v => (
        <g key={v}>
          <line x1={padL-4} y1={sy(v)} x2={padL} y2={sy(v)} stroke="#9CA3AF" strokeWidth="1" />
          <text x={padL-6} y={sy(v)+3} textAnchor="end" fontSize="7" fill="#9CA3AF">{v.toFixed(2)}</text>
        </g>
      ))}
      <text x={10} y={H/2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,10,${H/2})`}>Distance</text>

      {/* dendrogram lines */}
      {merges.map((m, i) => {
        const lx = nodeX[m.l], rx = nodeX[m.r]
        const my = sy(m.h)
        const ly = m.l < 7 ? leafY : sy(merges[m.l - 7].h)
        const ry = m.r < 7 ? leafY : sy(merges[m.r - 7].h)
        const col = m.h > cutH ? "#9CA3AF" : colours[Math.floor(i / 2) % 3]
        return (
          <g key={i}>
            <line x1={lx} y1={ly} x2={lx} y2={my} stroke={col} strokeWidth="2" />
            <line x1={rx} y1={ry} x2={rx} y2={my} stroke={col} strokeWidth="2" />
            <line x1={lx} y1={my} x2={rx} y2={my} stroke={col} strokeWidth="2" />
          </g>
        )
      })}

      {/* cut line */}
      <line x1={padL} y1={sy(cutH)} x2={W - padR} y2={sy(cutH)}
        stroke="#EF4444" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x={W - padR - 2} y={sy(cutH) - 4} textAnchor="end" fontSize="7.5" fill="#EF4444" fontWeight="600">cut → 3 clusters</text>

      {/* leaf labels */}
      {labels.map((l, i) => (
        <text key={i} x={leafX(i)} y={leafY + 14} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">{l}</text>
      ))}
    </svg>
  )
}

// ── GMM: overlapping Gaussian ellipses with soft responsibilities ─────────────
function GMMViz() {
  const W = 320, H = 215
  const pad = { l: 18, r: 14, t: 18, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  const components = [
    { cx: 0.25, cy: 0.70, rx: 52, ry: 28, rot: -25, fill: "#DBEAFE", stroke: "#3B82F6", label: "N(μ₁,Σ₁)", pi: "π₁=0.40" },
    { cx: 0.58, cy: 0.45, rx: 44, ry: 44, rot: 0,   fill: "#D1FAE5", stroke: "#10B981", label: "N(μ₂,Σ₂)", pi: "π₂=0.35" },
    { cx: 0.80, cy: 0.72, rx: 38, ry: 24, rot: 20,  fill: "#FEF3C7", stroke: "#F59E0B", label: "N(μ₃,Σ₃)", pi: "π₃=0.25" },
  ]

  const pts: { x:number; y:number; r1:number; r2:number; r3:number }[] = [
    { x:0.18, y:0.75, r1:0.80, r2:0.15, r3:0.05 },
    { x:0.30, y:0.65, r1:0.70, r2:0.25, r3:0.05 },
    { x:0.50, y:0.55, r1:0.20, r2:0.70, r3:0.10 },
    { x:0.62, y:0.40, r1:0.05, r2:0.90, r3:0.05 },
    { x:0.45, y:0.62, r1:0.35, r2:0.55, r3:0.10 },
    { x:0.78, y:0.70, r1:0.05, r2:0.15, r3:0.80 },
    { x:0.68, y:0.60, r1:0.08, r2:0.50, r3:0.42 },  // boundary point
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* Gaussian ellipses (3 layers for density feel) */}
      {components.map((c, i) => (
        <g key={i}>
          <ellipse cx={sx(c.cx)} cy={sy(c.cy)} rx={c.rx * 1.6} ry={c.ry * 1.6}
            transform={`rotate(${c.rot},${sx(c.cx)},${sy(c.cy)})`}
            fill={c.fill} opacity="0.15" />
          <ellipse cx={sx(c.cx)} cy={sy(c.cy)} rx={c.rx * 1.2} ry={c.ry * 1.2}
            transform={`rotate(${c.rot},${sx(c.cx)},${sy(c.cy)})`}
            fill={c.fill} opacity="0.20" />
          <ellipse cx={sx(c.cx)} cy={sy(c.cy)} rx={c.rx} ry={c.ry}
            transform={`rotate(${c.rot},${sx(c.cx)},${sy(c.cy)})`}
            fill={c.fill} stroke={c.stroke} strokeWidth="2" opacity="0.55" />
        </g>
      ))}

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={pad.l} y1={H-pad.b} x2={W-pad.r} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />

      {/* component means */}
      {components.map((c, i) => (
        <g key={i}>
          <circle cx={sx(c.cx)} cy={sy(c.cy)} r={5.5} fill={c.stroke} stroke="white" strokeWidth="1.5" />
          <text x={sx(c.cx)+8} y={sy(c.cy)-6} fontSize="7.5" fill={c.stroke} fontWeight="700">{c.label}</text>
          <text x={sx(c.cx)+8} y={sy(c.cy)+5} fontSize="7" fill={c.stroke}>{c.pi}</text>
        </g>
      ))}

      {/* data points (coloured by dominant responsibility) */}
      {pts.map((p, i) => {
        const max = Math.max(p.r1, p.r2, p.r3)
        const col = max === p.r1 ? "#3B82F6" : max === p.r2 ? "#10B981" : "#F59E0B"
        const opacity = 0.5 + max * 0.4
        return <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={5} fill={col} opacity={opacity} />
      })}

      {/* soft assignment annotation for boundary point */}
      <text x={sx(pts[6].x)+8} y={sy(pts[6].y)-2} fontSize="6.5" fill="#374151">50% C₂ / 42% C₃</text>

      {/* legend */}
      <circle cx={pad.l+6} cy={H-pad.b+15} r={5} fill="#9CA3AF" opacity="0.6" />
      <text x={pad.l+14} y={H-pad.b+19} fontSize="7" fill="#6B7280">soft assignment (rᵢₖ)</text>
      <circle cx={pad.l+5} cy={H-pad.b+15} r={5} fill="#3B82F6" stroke="white" strokeWidth="1.2" />
    </svg>
  )
}

// ── Mean Shift: density landscape + gradient ascent paths ────────────────────
function MeanShiftViz() {
  const W = 320, H = 215
  const pad = { l: 18, r: 14, t: 18, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  // Two density modes (cluster centres)
  const mode1 = { x: 0.28, y: 0.72 }
  const mode2 = { x: 0.72, y: 0.35 }

  // Trajectory paths converging to each mode
  const paths1: [number,number][][] = [
    [[0.10,0.45],[0.18,0.56],[0.24,0.65],[0.27,0.70],[0.28,0.72]],
    [[0.15,0.88],[0.20,0.82],[0.24,0.77],[0.27,0.74],[0.28,0.72]],
    [[0.42,0.62],[0.36,0.67],[0.31,0.70],[0.29,0.71],[0.28,0.72]],
  ]
  const paths2: [number,number][][] = [
    [[0.55,0.60],[0.62,0.52],[0.67,0.44],[0.70,0.38],[0.72,0.35]],
    [[0.90,0.20],[0.82,0.25],[0.76,0.30],[0.73,0.33],[0.72,0.35]],
    [[0.88,0.55],[0.82,0.46],[0.77,0.40],[0.74,0.37],[0.72,0.35]],
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* density halos */}
      {[1.8,1.4,1.0,0.7,0.4].map((r,i) => (
        <g key={i}>
          <ellipse cx={sx(mode1.x)} cy={sy(mode1.y)} rx={r*36} ry={r*30}
            fill="none" stroke="#3B82F6" strokeWidth="0.6" opacity={0.12 + i*0.06} />
          <ellipse cx={sx(mode2.x)} cy={sy(mode2.y)} rx={r*34} ry={r*28}
            fill="none" stroke="#10B981" strokeWidth="0.6" opacity={0.12 + i*0.06} />
        </g>
      ))}

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={pad.l} y1={H-pad.b} x2={W-pad.r} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />

      {/* convergence paths to mode 1 */}
      {paths1.map((path, i) => {
        const pts = path.map(([x,y]) => `${sx(x)},${sy(y)}`).join(" ")
        return (
          <g key={i}>
            <polyline points={pts} fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7" />
            {/* arrow at second-to-last segment */}
            <circle cx={sx(path[path.length-2][0])} cy={sy(path[path.length-2][1])} r={2.5} fill="#3B82F6" opacity="0.7" />
          </g>
        )
      })}

      {/* convergence paths to mode 2 */}
      {paths2.map((path, i) => {
        const pts = path.map(([x,y]) => `${sx(x)},${sy(y)}`).join(" ")
        return (
          <g key={i}>
            <polyline points={pts} fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7" />
            <circle cx={sx(path[path.length-2][0])} cy={sy(path[path.length-2][1])} r={2.5} fill="#10B981" opacity="0.7" />
          </g>
        )
      })}

      {/* starting points */}
      {[...paths1, ...paths2].map((path, i) => (
        <circle key={i} cx={sx(path[0][0])} cy={sy(path[0][1])} r={4}
          fill={i < 3 ? "#3B82F6" : "#10B981"} opacity="0.5" />
      ))}

      {/* modes */}
      <circle cx={sx(mode1.x)} cy={sy(mode1.y)} r={8} fill="#3B82F6" stroke="white" strokeWidth="2" />
      <text x={sx(mode1.x)+11} y={sy(mode1.y)-4} fontSize="8" fill="#3B82F6" fontWeight="700">mode 1</text>
      <circle cx={sx(mode2.x)} cy={sy(mode2.y)} r={8} fill="#10B981" stroke="white" strokeWidth="2" />
      <text x={sx(mode2.x)+11} y={sy(mode2.y)-4} fontSize="8" fill="#10B981" fontWeight="700">mode 2</text>

      {/* legend */}
      <polyline points={`${pad.l+2},${H-pad.b+15} ${pad.l+14},${H-pad.b+15}`}
        fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="3,2" />
      <text x={pad.l+17} y={H-pad.b+19} fontSize="7" fill="#6B7280">gradient ascent path</text>
      <circle cx={pad.l+130} cy={H-pad.b+15} r={7} fill="#9CA3AF" stroke="white" strokeWidth="1.5" />
      <text x={pad.l+140} y={H-pad.b+19} fontSize="7" fill="#6B7280">density mode</text>
    </svg>
  )
}

// ── HDBSCAN: condensed cluster tree (density vs cluster lifetime) ─────────────
function HDBSCANViz() {
  const W = 320, H = 215
  const padL = 52, padR = 20, padT = 14, padB = 50
  const pw = W - padL - padR
  const ph = H - padT - padB

  // λ scale (density): bottom = low density (λ_min=0), top = high density
  const sy = (lam: number) => padT + (1 - lam) * ph

  // Root splits at λ=0.05 into two branches
  // Cluster A (blue): born λ=0.05, persists to λ=0.85, splits into A1 (λ=0.50-0.85) and A2 (λ=0.50-0.65, then noise)
  // Cluster B (green): born λ=0.05, persists to λ=0.90
  // Scattered noise falls off at various λ

  const clusters = [
    { label: "Cluster A",  x: padL + pw*0.25, birth: 0.05, death: 0.85, width: 80, col: "#3B82F6" },
    { label: "Cluster B",  x: padL + pw*0.72, birth: 0.05, death: 0.90, width: 60, col: "#10B981" },
  ]
  const subA1 = { x: padL + pw*0.18, birth: 0.50, death: 0.85, width: 30, col: "#3B82F6" }
  const subA2 = { x: padL + pw*0.36, birth: 0.50, death: 0.65, width: 24, col: "#93C5FD" }

  // Noise points (thin lines dropping out)
  const noisePts = [
    { x: padL + pw*0.08, birth: 0.05, death: 0.30 },
    { x: padL + pw*0.45, birth: 0.05, death: 0.22 },
    { x: padL + pw*0.58, birth: 0.05, death: 0.18 },
  ]

  const cutLam = 0.68  // selected flat clustering

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* y axis (λ = 1/distance = density) */}
      <line x1={padL} y1={padT} x2={padL} y2={H-padB} stroke="#9CA3AF" strokeWidth="1.2" />
      {[0,0.25,0.50,0.75,1.0].map(v => (
        <g key={v}>
          <line x1={padL-4} y1={sy(v)} x2={padL} y2={sy(v)} stroke="#9CA3AF" strokeWidth="1" />
          <text x={padL-6} y={sy(v)+3} textAnchor="end" fontSize="7" fill="#9CA3AF">{v.toFixed(2)}</text>
        </g>
      ))}
      <text x={11} y={H/2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,11,${H/2})`}>λ (density)</text>

      {/* noise drop-off lines */}
      {noisePts.map((n,i) => (
        <line key={i} x1={n.x} y1={sy(n.birth)} x2={n.x} y2={sy(n.death)}
          stroke="#D1D5DB" strokeWidth="2" />
      ))}

      {/* cluster B */}
      <rect x={clusters[1].x - clusters[1].width/2} y={sy(clusters[1].death)}
        width={clusters[1].width} height={sy(clusters[1].birth) - sy(clusters[1].death)}
        fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
      <text x={clusters[1].x} y={sy(clusters[1].death) - 4} textAnchor="middle" fontSize="7.5" fill="#059669" fontWeight="700">{clusters[1].label}</text>

      {/* cluster A (parent, below split) */}
      <rect x={clusters[0].x - clusters[0].width/2} y={sy(0.50)}
        width={clusters[0].width} height={sy(0.05) - sy(0.50)}
        fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />

      {/* sub-clusters A1 and A2 (above split at λ=0.50) */}
      <rect x={subA1.x - subA1.width/2} y={sy(subA1.death)} width={subA1.width} height={sy(subA1.birth)-sy(subA1.death)} fill="#93C5FD" stroke="#3B82F6" strokeWidth="1.5" />
      <text x={subA1.x} y={sy(subA1.death)-4} textAnchor="middle" fontSize="6.5" fill="#2563EB" fontWeight="700">A₁</text>
      <rect x={subA2.x - subA2.width/2} y={sy(subA2.death)} width={subA2.width} height={sy(subA2.birth)-sy(subA2.death)} fill="#BFDBFE" stroke="#93C5FD" strokeWidth="1" />
      <text x={subA2.x} y={sy(subA2.death)-4} textAnchor="middle" fontSize="6.5" fill="#60A5FA">A₂</text>
      <text x={clusters[0].x} y={sy(0.28)} textAnchor="middle" fontSize="7.5" fill="#2563EB" fontWeight="700">Cluster A</text>

      {/* selected flat clustering line */}
      <line x1={padL} y1={sy(cutLam)} x2={W-padR} y2={sy(cutLam)}
        stroke="#EF4444" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x={W-padR-2} y={sy(cutLam)-4} textAnchor="end" fontSize="7.5" fill="#EF4444" fontWeight="600">selected clustering</text>

      {/* leaf labels */}
      <text x={padL + pw*0.25} y={H-padB+14} textAnchor="middle" fontSize="8" fill="#374151">Cluster A</text>
      <text x={padL + pw*0.72} y={H-padB+14} textAnchor="middle" fontSize="8" fill="#374151">Cluster B</text>
      <text x={padL + pw*0.08} y={H-padB+14} textAnchor="middle" fontSize="7" fill="#9CA3AF">noise</text>
    </svg>
  )
}

// ── UMAP: high-dim → 2D projection preserving neighbourhood structure ─────────
function UMAPViz() {
  const W = 320, H = 215
  const pad = { l: 18, r: 14, t: 14, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  // 4 clear clusters after UMAP projection
  const clusters = [
    { pts: [[0.12,0.78],[0.18,0.85],[0.20,0.72],[0.14,0.68],[0.22,0.80]], col: "#3B82F6",  label: "Class A", lx: 0.08, ly: 0.92 },
    { pts: [[0.45,0.80],[0.52,0.88],[0.48,0.72],[0.55,0.78],[0.42,0.84]], col: "#10B981",  label: "Class B", lx: 0.38, ly: 0.92 },
    { pts: [[0.72,0.55],[0.78,0.62],[0.68,0.48],[0.80,0.50],[0.74,0.68]], col: "#F59E0B",  label: "Class C", lx: 0.66, ly: 0.72 },
    { pts: [[0.35,0.25],[0.42,0.32],[0.30,0.18],[0.45,0.22],[0.38,0.38]], col: "#EF4444",  label: "Class D", lx: 0.25, ly: 0.42 },
  ]

  // Neighbourhood edges (thin lines connecting nearby points within cluster)
  const edges: [[number,number],[number,number]][] = [
    [[0.12,0.78],[0.18,0.85]], [[0.18,0.85],[0.20,0.72]], [[0.12,0.78],[0.14,0.68]],
    [[0.45,0.80],[0.52,0.88]], [[0.48,0.72],[0.55,0.78]], [[0.42,0.84],[0.45,0.80]],
    [[0.72,0.55],[0.78,0.62]], [[0.68,0.48],[0.80,0.50]], [[0.74,0.68],[0.72,0.55]],
    [[0.35,0.25],[0.42,0.32]], [[0.30,0.18],[0.35,0.25]], [[0.38,0.38],[0.42,0.32]],
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* cluster halos */}
      {clusters.map((cl, i) => {
        const xs = cl.pts.map(p=>p[0]), ys = cl.pts.map(p=>p[1])
        const cx = xs.reduce((a,b)=>a+b)/xs.length
        const cy = ys.reduce((a,b)=>a+b)/ys.length
        return <ellipse key={i} cx={sx(cx)} cy={sy(cy)} rx={38} ry={32} fill={cl.col} opacity="0.12" />
      })}

      {/* neighbourhood edges */}
      {edges.map(([[x1,y1],[x2,y2]], i) => (
        <line key={i} x1={sx(x1)} y1={sy(y1)} x2={sx(x2)} y2={sy(y2)}
          stroke="#D1D5DB" strokeWidth="0.8" opacity="0.6" />
      ))}

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={pad.l} y1={H-pad.b} x2={W-pad.r} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <text x={W/2} y={H-4} textAnchor="middle" fontSize="8" fill="#9CA3AF">UMAP dim 1</text>
      <text x={11} y={H/2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,11,${H/2})`}>UMAP dim 2</text>

      {/* data points */}
      {clusters.map((cl, ci) =>
        cl.pts.map(([x,y], i) => (
          <circle key={`${ci}-${i}`} cx={sx(x)} cy={sy(y)} r={5} fill={cl.col} opacity="0.9" />
        ))
      )}

      {/* cluster labels */}
      {clusters.map((cl, i) => (
        <text key={i} x={sx(cl.lx)} y={sy(cl.ly)} fontSize="8" fill={cl.col} fontWeight="700">{cl.label}</text>
      ))}

      {/* annotation */}
      <text x={sx(0.58)} y={sy(0.15)} fontSize="7.5" fill="#374151" textAnchor="middle">nearby in 2D</text>
      <text x={sx(0.58)} y={sy(0.08)} fontSize="7.5" fill="#374151" textAnchor="middle">= nearby in high-d</text>
    </svg>
  )
}

function PlaceholderContent({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-[#D1FAE5] rounded-2xl">
      <div className="text-4xl mb-4">📝</div>
      <p className="text-[#064E3B] text-sm font-semibold">{title}</p>
      <p className="text-[#9CA3AF] text-xs mt-1">Use Claude Code to generate content for this entry.</p>
    </div>
  )
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[#D1FAE5] px-6 py-5 space-y-3 shadow-sm">
      <div className="flex items-center gap-2 pb-2 border-b border-[#ECFDF5]">
        {icon}
        <h2 className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  )
}
