import Link from "next/link"
import { WikiSidebar } from "@/components/layout/sidebar"
import { mockEntries, difficultyColors } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { ArrowLeft, PlayCircle, ExternalLink, BookOpen, Lightbulb, Brain, Target, AlertTriangle } from "lucide-react"

export default function EntryPage({ params }: { params: { slug: string } }) {
  const entry = mockEntries.find(e => e.slug === params.slug)

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

  const isLinearRegression = entry.slug === "linear-regression"

  return (
    <div className="flex h-full">
      <WikiSidebar />
      <div className="flex-1 overflow-auto bg-white">
        <div className="max-w-3xl mx-auto px-8 py-6">
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

          {isLinearRegression ? <LinearRegressionContent /> : <PlaceholderContent title={entry.title} />}
        </div>
      </div>
    </div>
  )
}

function LinearRegressionContent() {
  return (
    <div className="space-y-4">

      {/* ELI3 */}
      <Section icon={<BookOpen className="h-4 w-4 text-[#10B981]" />} title="Explain Like I'm 5">
        <div className="space-y-2.5 text-[10pt] text-[#1F2937] leading-relaxed">
          <p>
            Imagine you're trying to guess how much a house costs based on its size. You collect data on 100 houses — their square footage and their sale prices — and plot them on a graph. You notice a pattern: bigger houses tend to cost more. Linear regression is the algorithm that draws the single best straight line through all those points.
          </p>
          <p>
            "Best" means the line is as close as possible to all the points at once. Once you have that line, you can point to any square footage on the x-axis, follow it up to the line, and read off a price prediction on the y-axis. That's it — that's linear regression.
          </p>
          <p>
            The line has two properties: a <strong className="text-[#064E3B]">slope</strong> (how much the price increases per extra square foot) and an <strong className="text-[#064E3B]">intercept</strong> (the baseline price when size is zero). Learning those two numbers from data is what the algorithm does.
          </p>
        </div>
      </Section>

      {/* When & Why */}
      <Section icon={<Lightbulb className="h-4 w-4 text-amber-500" />} title="When & Why to Use">
        <ul className="space-y-2.5">
          {[
            {
              title: "Predicting a continuous outcome",
              body: "Use it when your target variable is a real number — house prices, stock returns, patient blood pressure, temperature. If the output is a category, use classification instead."
            },
            {
              title: "You need interpretability",
              body: "Each coefficient β directly tells you: 'holding everything else constant, a one-unit increase in feature X changes y by β units.' This makes linear regression the gold standard for explainability in regulated industries (finance, healthcare)."
            },
            {
              title: "As a baseline before complex models",
              body: "Always run linear regression first. If it achieves 85% of the performance of a neural network, the added complexity of the neural network may not be worth the loss of interpretability and speed."
            },
            {
              title: "When data is limited",
              body: "Linear regression has very few parameters (just n+1 coefficients for n features), so it generalises well even with small datasets where more complex models would overfit."
            },
          ].map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[10pt] text-[#1F2937]">
              <span className="text-[#10B981] mt-0.5 shrink-0 font-bold">•</span>
              <span><strong className="text-[#064E3B]">{item.title}.</strong> {item.body}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Deep Dive */}
      <Section icon={<Brain className="h-4 w-4 text-purple-500" />} title="Deep Dive">
        <div className="space-y-4 text-[10pt] text-[#1F2937] leading-relaxed">

          <div>
            <h3 className="text-xs font-bold text-[#064E3B] uppercase tracking-wider mb-2">The Model</h3>
            <p>
              In <strong>simple linear regression</strong> (one feature), the model predicts:
            </p>
            <div className="my-2.5 bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl p-3 font-mono text-sm text-center text-[#10B981] font-semibold">
              ŷ = β₀ + β₁x
            </div>
            <p>
              In <strong>multiple linear regression</strong> (p features), this extends to:
            </p>
            <div className="my-2.5 bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl p-3 font-mono text-sm text-center text-[#10B981] font-semibold">
              ŷ = β₀ + β₁x₁ + β₂x₂ + · · · + βₚxₚ
            </div>
            <p>
              In matrix form with <code className="bg-[#F0FDF9] px-1.5 py-0.5 rounded text-[#10B981] font-mono text-xs">n</code> observations and <code className="bg-[#F0FDF9] px-1.5 py-0.5 rounded text-[#10B981] font-mono text-xs">p</code> features:
            </p>
            <div className="my-2.5 bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl p-3 font-mono text-sm text-center text-[#10B981] font-semibold">
              ŷ = Xβ &nbsp;&nbsp; where X ∈ ℝⁿˣ⁽ᵖ⁺¹⁾, β ∈ ℝᵖ⁺¹
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#064E3B] uppercase tracking-wider mb-2">Ordinary Least Squares (OLS)</h3>
            <p>
              The objective is to minimise the <strong>Residual Sum of Squares (RSS)</strong> — the total squared error between actual and predicted values:
            </p>
            <div className="my-2.5 bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl p-3 font-mono text-sm text-center text-[#10B981] font-semibold">
              RSS = Σᵢ (yᵢ − ŷᵢ)² = (y − Xβ)ᵀ(y − Xβ)
            </div>
            <p>
              Taking the derivative with respect to β and setting to zero yields the <strong>Normal Equations</strong>, giving the closed-form solution:
            </p>
            <div className="my-2.5 bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl p-3 font-mono text-sm text-center text-[#10B981] font-semibold">
              β̂ = (XᵀX)⁻¹ Xᵀy
            </div>
            <p>
              This solution is exact and computed in one step — no iteration needed. However, it requires <strong>XᵀX to be invertible</strong> (full column rank), and matrix inversion is O(p³), which becomes expensive for very high-dimensional data. In those cases, gradient descent is preferred.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#064E3B] uppercase tracking-wider mb-2">The Four Assumptions (LINE)</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { letter: "L", name: "Linearity", desc: "The relationship between X and y is linear. Violated when the true relationship is curved — check with residual vs fitted plots." },
                { letter: "I", name: "Independence", desc: "Observations are independent of each other. Violated by time-series data with autocorrelation or clustered data." },
                { letter: "N", name: "Normality", desc: "Residuals (errors) are normally distributed. Important for valid confidence intervals and hypothesis tests on coefficients." },
                { letter: "E", name: "Equal Variance", desc: "Variance of residuals is constant across all fitted values (homoscedasticity). Heteroscedasticity inflates standard errors." },
              ].map(item => (
                <div key={item.letter} className="bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-lg bg-[#10B981] text-white text-xs font-bold flex items-center justify-center shrink-0">{item.letter}</span>
                    <span className="text-xs font-bold text-[#064E3B]">{item.name}</span>
                  </div>
                  <p className="text-[10px] text-[#4B7C68] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#064E3B] uppercase tracking-wider mb-2">Model Evaluation</h3>
            <p className="mb-2">
              <strong>R² (coefficient of determination)</strong> measures the proportion of variance in y explained by the model:
            </p>
            <div className="my-2.5 bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl p-3 font-mono text-sm text-center text-[#10B981] font-semibold">
              R² = 1 − RSS / TSS &nbsp;&nbsp; where TSS = Σ(yᵢ − ȳ)²
            </div>
            <p className="mb-2">
              R² ranges from 0 to 1. A value of 0.85 means the model explains 85% of the variance. However, R² <em>always increases</em> as you add more features, even useless ones. Use <strong>Adjusted R²</strong> to penalise unnecessary complexity:
            </p>
            <div className="my-2.5 bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl p-3 font-mono text-sm text-center text-[#10B981] font-semibold">
              R²_adj = 1 − (1 − R²) · (n − 1) / (n − p − 1)
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#064E3B] uppercase tracking-wider mb-2">Gradient Descent Alternative</h3>
            <p>
              When p is very large (e.g. millions of features) inverting XᵀX is infeasible. Instead, use gradient descent with learning rate α to iteratively update coefficients:
            </p>
            <div className="my-2.5 bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl p-3 font-mono text-sm text-center text-[#10B981] font-semibold">
              βⱼ := βⱼ − α · (1/n) Σᵢ (ŷᵢ − yᵢ) xᵢⱼ
            </div>
            <p>
              This converges to the same solution as OLS when the cost surface is convex (which it always is for linear regression with MSE loss).
            </p>
          </div>

        </div>
      </Section>

      {/* Watch */}
      <Section icon={<PlayCircle className="h-4 w-4 text-red-500" />} title="Watch">
        <div className="aspect-video bg-[#F0FDF9] rounded-xl flex items-center justify-center border border-[#D1FAE5]">
          <div className="text-center">
            <PlayCircle className="h-10 w-10 text-[#10B981] mx-auto mb-2 opacity-60" />
            <p className="text-[#9CA3AF] text-xs">YouTube embed · StatQuest: Linear Regression</p>
          </div>
        </div>
      </Section>

      {/* Key Takeaways */}
      <Section icon={<Target className="h-4 w-4 text-emerald-500" />} title="Key Takeaways">
        <ul className="space-y-2">
          {[
            "OLS minimises the sum of squared residuals and has a closed-form solution β̂ = (XᵀX)⁻¹Xᵀy — no iteration required when p is small.",
            "The four assumptions (LINE) must hold for OLS estimates to be BLUE (Best Linear Unbiased Estimator) — always validate with residual plots.",
            "R² always increases with more features; use Adjusted R² or cross-validation MSE for honest model comparison.",
            "Coefficients are interpretable: βⱼ is the expected change in y for a one-unit increase in xⱼ, holding all other features constant.",
            "Use regularisation (Ridge/Lasso) when features are correlated or p is large relative to n — plain OLS will overfit.",
          ].map((point, i) => (
            <li key={i} className="flex gap-2.5 text-[10pt] text-[#1F2937]">
              <span className="text-[#10B981] font-mono text-xs mt-0.5 shrink-0 font-bold">{i + 1}.</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Interview Edge Cases */}
      <Section icon={<AlertTriangle className="h-4 w-4 text-rose-500" />} title="Interview Edge Cases & Gotchas">
        <ul className="space-y-2.5">
          {[
            {
              q: "What is multicollinearity and why does it matter?",
              a: "When two or more features are highly correlated, XᵀX becomes near-singular, making β̂ extremely sensitive to small changes in the data. The coefficients become unreliable even if overall predictions are fine. Detect with Variance Inflation Factor (VIF > 10 is a red flag). Fix with Ridge regression, PCA, or dropping one of the correlated features."
            },
            {
              q: "Linear regression gives a straight line — how do you handle non-linear relationships?",
              a: "Add polynomial features (x², x³) or interaction terms (x₁·x₂) to the feature matrix X. The model remains linear in the parameters β even though it's non-linear in the original features. Alternatively, apply a log transformation to y or X to linearise the relationship."
            },
            {
              q: "Why is OLS sensitive to outliers?",
              a: "Squaring the residuals in RSS gives disproportionate weight to large errors — an outlier 10 units away contributes 100× more than a point 1 unit away. Use Huber loss or RANSAC for robust regression, or Lasso/Ridge to reduce sensitivity."
            },
            {
              q: "When would you use gradient descent instead of the normal equations?",
              a: "When p (number of features) is very large. Inverting XᵀX is O(p³) — for p = 10,000 this is 10¹² operations. Gradient descent scales linearly with p and n. Also when the dataset doesn't fit in memory (use mini-batch SGD)."
            },
            {
              q: "What's the difference between homoscedasticity and heteroscedasticity, and why does it matter?",
              a: "Homoscedasticity means the variance of residuals is constant across all predicted values. Heteroscedasticity (non-constant variance) makes OLS standard errors incorrect, invalidating t-tests and confidence intervals on coefficients. Fix with weighted least squares (WLS) or by transforming the target (e.g. log y)."
            },
          ].map((item, i) => (
            <li key={i} className="bg-rose-50 border border-rose-100 rounded-xl p-3 space-y-1.5">
              <p className="text-[10pt] font-semibold text-rose-700">{item.q}</p>
              <p className="text-[10pt] text-rose-600/80 leading-relaxed">{item.a}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Source */}
      <div className="flex items-center gap-2 pt-3 border-t border-[#D1FAE5]">
        <ExternalLink className="h-3.5 w-3.5 text-[#9CA3AF] shrink-0" />
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {[
            "Hastie, Tibshirani & Friedman — The Elements of Statistical Learning, Ch. 3",
            "James et al. — An Introduction to Statistical Learning, Ch. 3",
          ].map(src => (
            <a key={src} href="#" className="text-xs text-[#10B981] hover:text-[#064E3B] transition-colors font-medium">
              {src}
            </a>
          ))}
        </div>
      </div>

    </div>
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
