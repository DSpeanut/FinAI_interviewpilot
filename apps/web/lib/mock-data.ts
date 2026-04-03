export const categories = [
  {
    id: "1",
    name: "Mathematics",
    slug: "mathematics",
    subcategories: [
      { id: "1-1", name: "Linear Algebra", slug: "linear-algebra", entryCount: 7 },
      { id: "1-2", name: "Calculus & Optimization", slug: "calculus-optimization", entryCount: 7 },
      { id: "1-3", name: "Probability Theory", slug: "probability-theory", entryCount: 8 },
      { id: "1-4", name: "Information Theory", slug: "information-theory", entryCount: 4 },
      { id: "1-5", name: "Numerical Methods", slug: "numerical-methods", entryCount: 3 },
    ],
  },
  {
    id: "2",
    name: "Statistics",
    slug: "statistics",
    subcategories: [
      { id: "2-1", name: "Descriptive Statistics", slug: "descriptive-statistics", entryCount: 8 },
      { id: "2-2", name: "Inferential Statistics", slug: "inferential-statistics", entryCount: 5 },
      { id: "2-3", name: "Hypothesis Testing", slug: "hypothesis-testing", entryCount: 6 },
      { id: "2-4", name: "Bayesian Statistics", slug: "bayesian-statistics", entryCount: 5 },
      { id: "2-5", name: "Regression Analysis", slug: "regression-analysis", entryCount: 4 },
      { id: "2-6", name: "Sampling Methods", slug: "sampling-methods", entryCount: 4 },
      { id: "2-7", name: "Experimental Design", slug: "experimental-design", entryCount: 4 },
      { id: "2-8", name: "Time Series (Stats)", slug: "time-series-stats", entryCount: 5 },
    ],
  },
  {
    id: "3",
    name: "Data",
    slug: "data",
    subcategories: [
      { id: "3-1", name: "Data Collection & Ingestion", slug: "data-collection", entryCount: 4 },
      { id: "3-2", name: "Data Cleaning", slug: "data-cleaning", entryCount: 4 },
      { id: "3-3", name: "Exploratory Data Analysis", slug: "eda", entryCount: 4 },
      { id: "3-4", name: "Feature Engineering", slug: "feature-engineering", entryCount: 6 },
      { id: "3-5", name: "Data Imbalance", slug: "data-imbalance", entryCount: 4 },
      { id: "3-6", name: "Data Pipelines", slug: "data-pipelines", entryCount: 4 },
      { id: "3-7", name: "Databases & Storage", slug: "databases-storage", entryCount: 5 },
    ],
  },
  {
    id: "4",
    name: "Machine Learning",
    slug: "machine-learning",
    subcategories: [
      { id: "4-1", name: "Regression", slug: "regression", entryCount: 7 },
      { id: "4-2", name: "Classification", slug: "classification", entryCount: 7 },
      { id: "4-3", name: "Clustering", slug: "clustering", entryCount: 7 },
      { id: "4-4", name: "Ensemble Methods", slug: "ensemble-methods", entryCount: 8 },
      { id: "4-5", name: "Dimensionality Reduction", slug: "dimensionality-reduction", entryCount: 5 },
      { id: "4-6", name: "Anomaly Detection", slug: "anomaly-detection", entryCount: 4 },
      { id: "4-7", name: "Recommendation Systems", slug: "recommendation-systems", entryCount: 4 },
      { id: "4-8", name: "Reinforcement Learning", slug: "reinforcement-learning", entryCount: 5 },
    ],
  },
  {
    id: "5",
    name: "Deep Learning",
    slug: "deep-learning",
    subcategories: [
      { id: "5-1", name: "Fundamentals", slug: "dl-fundamentals", entryCount: 4 },
      { id: "5-2", name: "CNNs", slug: "cnns", entryCount: 6 },
      { id: "5-3", name: "RNNs & Sequence Models", slug: "rnns-sequence-models", entryCount: 5 },
      { id: "5-4", name: "Transformers", slug: "transformers", entryCount: 5 },
      { id: "5-5", name: "Generative Models", slug: "generative-models", entryCount: 4 },
      { id: "5-6", name: "Graph Neural Networks", slug: "graph-neural-networks", entryCount: 4 },
      { id: "5-7", name: "Reinforcement Learning (Deep)", slug: "deep-rl", entryCount: 4 },
    ],
  },
  {
    id: "6",
    name: "NLP / LLM",
    slug: "nlp-llm",
    subcategories: [
      { id: "6-1", name: "NLP Fundamentals", slug: "nlp-fundamentals", entryCount: 5 },
      { id: "6-2", name: "Classical NLP", slug: "classical-nlp", entryCount: 6 },
      { id: "6-3", name: "Language Model Fundamentals", slug: "lm-fundamentals", entryCount: 4 },
      { id: "6-4", name: "Large Language Models", slug: "llms", entryCount: 6 },
      { id: "6-5", name: "Prompt Engineering", slug: "prompt-engineering", entryCount: 5 },
      { id: "6-6", name: "Retrieval & Grounding", slug: "retrieval-grounding", entryCount: 5 },
      { id: "6-7", name: "Multimodal", slug: "multimodal", entryCount: 5 },
    ],
  },
  {
    id: "7",
    name: "Training, Optimization & Evaluation",
    slug: "training-optimization-evaluation",
    subcategories: [
      { id: "7-1", name: "Loss Functions", slug: "loss-functions", entryCount: 8 },
      { id: "7-2", name: "Optimization Algorithms", slug: "optimization-algorithms", entryCount: 9 },
      { id: "7-3", name: "Regularization", slug: "regularization", entryCount: 6 },
      { id: "7-4", name: "DL Training Techniques", slug: "dl-training-techniques", entryCount: 9 },
      { id: "7-5", name: "LLM Training & Alignment", slug: "llm-training-alignment", entryCount: 7 },
      { id: "7-6", name: "Classical ML Evaluation", slug: "ml-evaluation", entryCount: 9 },
      { id: "7-7", name: "LLM & DL Evaluation", slug: "llm-dl-evaluation", entryCount: 7 },
      { id: "7-8", name: "Hyperparameter Tuning", slug: "hyperparameter-tuning", entryCount: 5 },
    ],
  },
  {
    id: "8",
    name: "AI Engineering",
    slug: "ai-engineering",
    subcategories: [
      { id: "8-1", name: "AI Agents", slug: "ai-agents", entryCount: 5 },
      { id: "8-2", name: "Memory & State", slug: "memory-state", entryCount: 4 },
      { id: "8-3", name: "Orchestration & Frameworks", slug: "orchestration-frameworks", entryCount: 5 },
      { id: "8-4", name: "RAG Systems", slug: "rag-systems", entryCount: 5 },
      { id: "8-5", name: "Tool & API Integration", slug: "tool-api-integration", entryCount: 5 },
      { id: "8-6", name: "Evaluation & Observability", slug: "evaluation-observability", entryCount: 4 },
      { id: "8-7", name: "Safety & Guardrails", slug: "safety-guardrails", entryCount: 4 },
    ],
  },
  {
    id: "9",
    name: "AI/ML System Design",
    slug: "aiml-system-design",
    subcategories: [
      { id: "9-1", name: "ML System Architecture", slug: "ml-system-architecture", entryCount: 4 },
      { id: "9-2", name: "Feature Stores", slug: "feature-stores", entryCount: 4 },
      { id: "9-3", name: "Model Serving & Inference", slug: "model-serving", entryCount: 5 },
      { id: "9-4", name: "MLOps & CI/CD", slug: "mlops-cicd", entryCount: 4 },
      { id: "9-5", name: "Scalability", slug: "scalability", entryCount: 5 },
      { id: "9-6", name: "Monitoring & Drift", slug: "monitoring-drift", entryCount: 4 },
      { id: "9-7", name: "Case Studies", slug: "case-studies", entryCount: 5 },
    ],
  },
  {
    id: "10",
    name: "Finance & Quant Finance",
    slug: "finance-quant",
    subcategories: [
      { id: "10-1", name: "Financial Markets", slug: "financial-markets", entryCount: 5 },
      { id: "10-2", name: "Portfolio Theory", slug: "portfolio-theory", entryCount: 5 },
      { id: "10-3", name: "Fixed Income", slug: "fixed-income", entryCount: 6 },
      { id: "10-4", name: "Derivatives", slug: "derivatives", entryCount: 5 },
      { id: "10-5", name: "Risk Management", slug: "risk-management", entryCount: 5 },
      { id: "10-6", name: "Factor Models", slug: "factor-models", entryCount: 4 },
      { id: "10-7", name: "Quantitative Strategies", slug: "quant-strategies", entryCount: 5 },
      { id: "10-8", name: "Stochastic Calculus", slug: "stochastic-calculus", entryCount: 5 },
      { id: "10-9", name: "Alternative Investments", slug: "alternative-investments", entryCount: 4 },
      { id: "10-10", name: "Behavioral Finance", slug: "behavioral-finance", entryCount: 3 },
      { id: "10-11", name: "Asset Management", slug: "asset-management", entryCount: 4 },
    ],
  },
]

export type Difficulty = "beginner" | "intermediate" | "advanced"
export type Status = "draft" | "review" | "published"

export type WhenWhyItem = { title: string; body: string }
export type DeepDiveSection = { heading: string; body: string; extraBody?: string[]; formula?: string }
export type EdgeCaseItem = { q: string; a: string }
export type Source = { label: string; url: string }

export interface WikiEntryContent {
  eli3: string[]
  whenWhy: WhenWhyItem[]
  deepDiveIntro?: string[]
  visualizationType?: string
  deepDive: DeepDiveSection[]
  youtubeLabel?: string
  youtubeUrl?: string
  takeaways: string[]
  edgeCases: EdgeCaseItem[]
  sources: Source[]
}

export interface WikiEntry {
  id: string
  title: string
  slug: string
  difficulty: Difficulty
  status: Status
  subcategoryId: string
  tags: string[]
  content?: WikiEntryContent
}

export const mockEntries: WikiEntry[] = [
  {
    id: "e1",
    title: "Linear Regression",
    slug: "linear-regression",
    difficulty: "beginner",
    status: "published",
    subcategoryId: "4-1",
    tags: ["regression", "supervised"],
  },
  {
    id: "e2",
    title: "Ridge Regression",
    slug: "ridge-regression",
    difficulty: "intermediate" as const,
    status: "published" as const,
    subcategoryId: "4-1",
    tags: ["regression", "regularization"],
  },
  {
    id: "e3",
    title: "Lasso Regression",
    slug: "lasso-regression",
    difficulty: "intermediate" as const,
    status: "review" as const,
    subcategoryId: "4-1",
    tags: ["regression", "regularization"],
  },
  { id: "e4", title: "Elastic Net", slug: "elastic-net", difficulty: "intermediate" as const, status: "draft" as const, subcategoryId: "4-1", tags: ["regression", "regularization"] },
  { id: "e5", title: "Polynomial Regression", slug: "polynomial-regression", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "4-1", tags: ["regression"] },
  { id: "e6", title: "SVR", slug: "svr", difficulty: "advanced" as const, status: "draft" as const, subcategoryId: "4-1", tags: ["regression", "svm"] },
  { id: "e7", title: "Decision Tree Regressor", slug: "decision-tree-regressor", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "4-1", tags: ["regression", "tree"] },
  { id: "e11", title: "Logistic Regression", slug: "logistic-regression", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "4-2", tags: ["classification", "supervised", "linear"] },
  { id: "e12", title: "SVM", slug: "svm", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "4-2", tags: ["classification", "supervised", "kernel"] },
  { id: "e13", title: "K-Nearest Neighbors", slug: "k-nearest-neighbors", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "4-2", tags: ["classification", "supervised", "instance-based"] },
  { id: "e14", title: "Naive Bayes", slug: "naive-bayes", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "4-2", tags: ["classification", "supervised", "probabilistic"] },
  { id: "e15", title: "Decision Tree Classifier", slug: "decision-tree-classifier", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "4-2", tags: ["classification", "supervised", "tree"] },
  { id: "e16", title: "LDA", slug: "lda", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-2", tags: ["classification", "supervised", "generative"] },
  { id: "e17", title: "QDA", slug: "qda", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-2", tags: ["classification", "supervised", "generative"] },
  { id: "e8",  title: "K-Means",                slug: "k-means",                difficulty: "beginner"     as const, status: "published" as const, subcategoryId: "4-3", tags: ["clustering", "unsupervised"] },
  { id: "e9",  title: "DBSCAN",                 slug: "dbscan",                 difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-3", tags: ["clustering", "unsupervised", "density"] },
  { id: "e18", title: "Hierarchical Clustering", slug: "hierarchical-clustering", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-3", tags: ["clustering", "unsupervised", "dendrogram"] },
  { id: "e19", title: "Gaussian Mixture Models", slug: "gaussian-mixture-models", difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-3", tags: ["clustering", "unsupervised", "probabilistic", "em"] },
  { id: "e20", title: "Mean Shift",              slug: "mean-shift",              difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-3", tags: ["clustering", "unsupervised", "density"] },
  { id: "e21", title: "HDBSCAN",                slug: "hdbscan",                difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-3", tags: ["clustering", "unsupervised", "density", "hierarchy"] },
  { id: "e22", title: "UMAP",                   slug: "umap",                   difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-3", tags: ["clustering", "dimensionality-reduction", "visualization"] },
  { id: "e10", title: "Self-Attention", slug: "self-attention", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-4", tags: ["transformers", "attention", "nlp"] },
]

export const difficultyColors = {
  beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  advanced: "bg-rose-50 text-rose-700 border-rose-200",
}


export const mockUsage = {
  todayTokens: 124500,
  todayCost: 1.84,
  monthTokens: 2100000,
  monthCost: 31.20,
  breakdown: {
    interview: { tokens: 1500000, cost: 22.50 },
    sparring: { tokens: 200000, cost: 3.00 },
    digest: { tokens: 100000, cost: 0.50 },
  }
}
