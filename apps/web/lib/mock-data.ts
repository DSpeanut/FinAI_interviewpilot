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
      { id: "2-1", name: "Descriptive Statistics", slug: "descriptive-statistics", entryCount: 8 }, // entries: mean, median, mode, variance, std-dev, skewness, kurtosis, percentiles
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
  // Ensemble Methods (4-4)
  { id: "e23", title: "Random Forest",       slug: "random-forest",       difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-4", tags: ["ensemble", "bagging", "tree"] },
  { id: "e24", title: "Gradient Boosting",   slug: "gradient-boosting",   difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-4", tags: ["ensemble", "boosting", "tree"] },
  { id: "e25", title: "XGBoost",             slug: "xgboost",             difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-4", tags: ["ensemble", "boosting", "tree"] },
  { id: "e26", title: "LightGBM",            slug: "lightgbm",            difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-4", tags: ["ensemble", "boosting", "tree"] },
  { id: "e27", title: "CatBoost",            slug: "catboost",            difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-4", tags: ["ensemble", "boosting", "categorical"] },
  { id: "e28", title: "Bagging",             slug: "bagging",             difficulty: "beginner"     as const, status: "published" as const, subcategoryId: "4-4", tags: ["ensemble", "bagging"] },
  { id: "e29", title: "Stacking",            slug: "stacking",            difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-4", tags: ["ensemble", "meta-learning"] },
  { id: "e30", title: "AdaBoost",            slug: "adaboost",            difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-4", tags: ["ensemble", "boosting"] },
  // Dimensionality Reduction (4-5)
  { id: "e31", title: "PCA",                 slug: "pca",                 difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-5", tags: ["dimensionality-reduction", "linear", "unsupervised"] },
  { id: "e32", title: "t-SNE",               slug: "tsne",                difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-5", tags: ["dimensionality-reduction", "visualization"] },
  { id: "e33", title: "UMAP",               slug: "umap",                difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-5", tags: ["dimensionality-reduction", "visualization"] },
  { id: "e34", title: "LDA (dimensionality)", slug: "lda-dimensionality", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-5", tags: ["dimensionality-reduction", "supervised", "linear"] },
  { id: "e35", title: "Autoencoders",        slug: "autoencoders",        difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-5", tags: ["dimensionality-reduction", "deep-learning", "generative"] },
  { id: "e10", title: "Self-Attention", slug: "self-attention", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-4", tags: ["transformers", "attention", "nlp"] },
  // Descriptive Statistics (2-1)
  { id: "e36", title: "Mean", slug: "mean", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-1", tags: ["descriptive", "central-tendency"] },
  { id: "e37", title: "Median", slug: "median", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-1", tags: ["descriptive", "central-tendency", "robust"] },
  { id: "e38", title: "Mode", slug: "mode", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-1", tags: ["descriptive", "central-tendency", "categorical"] },
  { id: "e39", title: "Variance", slug: "variance", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-1", tags: ["descriptive", "spread", "moments"] },
  { id: "e40", title: "Standard Deviation", slug: "standard-deviation", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-1", tags: ["descriptive", "spread"] },
  { id: "e41", title: "Skewness", slug: "skewness", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-1", tags: ["descriptive", "shape", "moments"] },
  { id: "e42", title: "Kurtosis", slug: "kurtosis", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-1", tags: ["descriptive", "shape", "tail-risk"] },
  { id: "e43", title: "Percentiles & Quartiles", slug: "percentiles-quartiles", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-1", tags: ["descriptive", "quantiles", "robust"] },
  // Hypothesis Testing (2-3)
  { id: "e44", title: "Z-test", slug: "z-test", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-3", tags: ["hypothesis-testing", "parametric", "normal"] },
  { id: "e45", title: "t-test", slug: "t-test", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-3", tags: ["hypothesis-testing", "parametric"] },
  { id: "e46", title: "Chi-Square Test", slug: "chi-square-test", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-3", tags: ["hypothesis-testing", "categorical"] },
  { id: "e47", title: "ANOVA", slug: "anova", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-3", tags: ["hypothesis-testing", "parametric", "multiple-groups"] },
  { id: "e48", title: "Mann-Whitney U", slug: "mann-whitney-u", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-3", tags: ["hypothesis-testing", "non-parametric"] },
  { id: "e49", title: "Multiple Testing Correction", slug: "multiple-testing-correction", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-3", tags: ["hypothesis-testing", "fdr", "bonferroni"] },
  // Inferential Statistics (2-2)
  { id: "e50", title: "Point Estimation", slug: "point-estimation", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-2", tags: ["estimation", "mle", "bias-variance"] },
  { id: "e51", title: "Confidence Intervals", slug: "confidence-intervals", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-2", tags: ["estimation", "interval", "coverage"] },
  { id: "e52", title: "p-value", slug: "p-value", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-2", tags: ["hypothesis-testing", "significance", "inference"] },
  { id: "e53", title: "Statistical Power", slug: "statistical-power", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-2", tags: ["power", "sample-size", "type-ii-error"] },
  { id: "e54", title: "Effect Size", slug: "effect-size", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-2", tags: ["cohen-d", "practical-significance", "meta-analysis"] },
  // Bayesian Statistics (2-4)
  { id: "e55", title: "Prior & Posterior", slug: "prior-posterior", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-4", tags: ["bayesian", "conjugate-prior", "credible-interval"] },
  { id: "e56", title: "Bayesian Inference", slug: "bayesian-inference", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-4", tags: ["bayesian", "posterior", "bayes-factor"] },
  { id: "e57", title: "MAP Estimation", slug: "map-estimation", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-4", tags: ["bayesian", "map", "regularization"] },
  { id: "e58", title: "MCMC", slug: "mcmc", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "2-4", tags: ["bayesian", "sampling", "metropolis-hastings"] },
  { id: "e59", title: "Bayesian vs Frequentist", slug: "bayesian-vs-frequentist", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-4", tags: ["bayesian", "frequentist", "philosophy"] },
  // Regression Analysis (2-5)
  { id: "e60", title: "Simple Linear Regression", slug: "simple-linear-regression-stats", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-5", tags: ["regression", "ols", "gauss-markov"] },
  { id: "e61", title: "Multiple Linear Regression", slug: "multiple-linear-regression", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-5", tags: ["regression", "ols", "multicollinearity"] },
  { id: "e62", title: "Logistic Regression (Stats)", slug: "logistic-regression-stats", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-5", tags: ["regression", "mle", "odds-ratio"] },
  { id: "e63", title: "GLMs", slug: "glm", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "2-5", tags: ["regression", "generalized-linear-models", "exponential-family"] },
  // Sampling Methods (2-6)
  { id: "e64", title: "Random Sampling", slug: "random-sampling", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-6", tags: ["sampling", "srs", "finite-population"] },
  { id: "e65", title: "Stratified Sampling", slug: "stratified-sampling", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-6", tags: ["sampling", "stratification", "neyman-allocation"] },
  { id: "e66", title: "Bootstrap", slug: "bootstrap", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-6", tags: ["sampling", "resampling", "confidence-intervals"] },
  { id: "e67", title: "Jackknife", slug: "jackknife", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-6", tags: ["sampling", "resampling", "bias-correction"] },
  // Experimental Design (2-7)
  { id: "e68", title: "A/B Testing", slug: "ab-testing", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-7", tags: ["experiment", "hypothesis-testing", "sample-size"] },
  { id: "e69", title: "Randomized Control Trials", slug: "randomized-control-trials", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-7", tags: ["experiment", "rct", "causal-inference"] },
  { id: "e70", title: "Confounding Variables", slug: "confounding-variables", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-7", tags: ["causal-inference", "dag", "confounding"] },
  { id: "e71", title: "Causal Inference", slug: "causal-inference", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "2-7", tags: ["causal-inference", "did", "iv", "rdd"] },
  // Time Series (Stats) (2-8)
  { id: "e72", title: "Stationarity", slug: "stationarity", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-8", tags: ["time-series", "unit-root", "cointegration"] },
  { id: "e73", title: "Autocorrelation", slug: "autocorrelation", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-8", tags: ["time-series", "acf", "pacf"] },
  { id: "e74", title: "ARIMA", slug: "arima", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-8", tags: ["time-series", "forecasting", "box-jenkins"] },
  { id: "e75", title: "Seasonality", slug: "seasonality", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-8", tags: ["time-series", "seasonal-decomposition", "sarima"] },
  { id: "e76", title: "ADF Test", slug: "adf-test", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-8", tags: ["time-series", "unit-root", "stationarity-test"] },
  // NLP Fundamentals (6-1)
  { id: "e77", title: "Tokenization", slug: "tokenization", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "6-1", tags: ["nlp", "bpe", "wordpiece", "sentencepiece"] },
  { id: "e78", title: "Stemming & Lemmatization", slug: "stemming-lemmatization", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "6-1", tags: ["nlp", "morphology", "text-normalization"] },
  { id: "e79", title: "POS Tagging", slug: "pos-tagging", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "6-1", tags: ["nlp", "sequence-labeling", "syntax"] },
  { id: "e80", title: "Named Entity Recognition", slug: "named-entity-recognition", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-1", tags: ["nlp", "ner", "information-extraction"] },
  { id: "e81", title: "Dependency Parsing", slug: "dependency-parsing", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-1", tags: ["nlp", "syntax", "dependency-tree"] },
  // Classical NLP (6-2)
  { id: "e82", title: "Bag of Words", slug: "bag-of-words", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "6-2", tags: ["nlp", "text-representation", "naive-bayes"] },
  { id: "e83", title: "TF-IDF", slug: "tf-idf", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "6-2", tags: ["nlp", "information-retrieval", "bm25"] },
  { id: "e84", title: "Word2Vec", slug: "word2vec", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-2", tags: ["nlp", "word-embeddings", "skip-gram", "cbow"] },
  { id: "e85", title: "GloVe", slug: "glove", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-2", tags: ["nlp", "word-embeddings", "co-occurrence"] },
  { id: "e86", title: "FastText", slug: "fasttext", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-2", tags: ["nlp", "word-embeddings", "subword", "oov"] },
  { id: "e87", title: "N-grams", slug: "n-grams", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "6-2", tags: ["nlp", "language-modeling", "bleu", "smoothing"] },
  // Language Model Fundamentals (6-3)
  { id: "e88", title: "Language Modeling", slug: "language-modeling", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-3", tags: ["nlp", "language-model", "autoregressive", "masked-lm"] },
  { id: "e89", title: "Perplexity", slug: "perplexity", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-3", tags: ["nlp", "evaluation", "cross-entropy", "language-model"] },
  { id: "e90", title: "Masked Language Model", slug: "masked-lm", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-3", tags: ["nlp", "bert", "mlm", "pre-training"] },
  { id: "e91", title: "Causal Language Model", slug: "causal-lm", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-3", tags: ["nlp", "gpt", "autoregressive", "causal-attention"] },
  // Large Language Models (6-4)
  { id: "e92", title: "GPT Architecture", slug: "gpt-architecture", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "6-4", tags: ["llm", "gpt", "decoder-only", "transformer"] },
  { id: "e93", title: "BERT Architecture", slug: "bert-architecture", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "6-4", tags: ["llm", "bert", "encoder-only", "masked-lm"] },
  { id: "e94", title: "Scaling Laws", slug: "scaling-laws", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "6-4", tags: ["llm", "chinchilla", "compute-optimal", "power-law"] },
  { id: "e95", title: "Emergent Abilities", slug: "emergent-abilities", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "6-4", tags: ["llm", "emergence", "scale", "chain-of-thought"] },
  { id: "e96", title: "Context Window", slug: "context-window", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-4", tags: ["llm", "attention", "rope", "flashattention", "kv-cache"] },
  { id: "e97", title: "Llama", slug: "llama", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "6-4", tags: ["llm", "llama", "open-source", "rmsnorm", "swiglu", "gqa"] },
  // Prompt Engineering (6-5)
  { id: "e98", title: "Zero-Shot Prompting", slug: "zero-shot-prompting", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "6-5", tags: ["prompting", "zero-shot", "instruction-tuning"] },
  { id: "e99", title: "Few-Shot Prompting", slug: "few-shot-prompting", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "6-5", tags: ["prompting", "few-shot", "in-context-learning"] },
  { id: "e100", title: "Chain-of-Thought", slug: "chain-of-thought", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-5", tags: ["prompting", "cot", "reasoning", "self-consistency"] },
  { id: "e101", title: "ReAct Prompting", slug: "react-prompting", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-5", tags: ["prompting", "react", "tool-use", "agents"] },
  { id: "e102", title: "Prompt Injection", slug: "prompt-injection", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-5", tags: ["security", "prompt-injection", "adversarial", "llm-security"] },
  // Retrieval & Grounding (6-6)
  { id: "e103", title: "RAG", slug: "rag", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-6", tags: ["rag", "retrieval", "vector-database", "grounding"] },
  { id: "e104", title: "Chunking Strategies", slug: "chunking-strategies", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-6", tags: ["rag", "chunking", "document-processing"] },
  { id: "e105", title: "Embedding Models", slug: "embedding-models", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-6", tags: ["embeddings", "bi-encoder", "contrastive-learning", "mteb"] },
  { id: "e106", title: "Reranking", slug: "reranking", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-6", tags: ["rag", "cross-encoder", "reranking", "rrf"] },
  { id: "e107", title: "Hybrid Search", slug: "hybrid-search", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-6", tags: ["rag", "bm25", "dense-retrieval", "rrf", "splade"] },
  // Multimodal (6-7)
  { id: "e108", title: "Vision-Language Models", slug: "vision-language-models", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "6-7", tags: ["multimodal", "vlm", "vit", "visual-instruction-tuning"] },
  { id: "e109", title: "CLIP", slug: "clip", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "6-7", tags: ["multimodal", "clip", "contrastive-learning", "zero-shot-classification"] },
  { id: "e110", title: "GPT-4V", slug: "gpt-4v", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-7", tags: ["multimodal", "gpt-4v", "visual-qa", "document-understanding"] },
  { id: "e111", title: "Image Captioning", slug: "image-captioning", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-7", tags: ["multimodal", "captioning", "cider", "blip"] },
  { id: "e112", title: "Speech-to-Text", slug: "speech-to-text", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-7", tags: ["multimodal", "asr", "whisper", "wer", "ctc"] },
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
