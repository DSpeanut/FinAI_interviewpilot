# Wiki Structure — Categories, Subcategories & Entries

> 3-level hierarchy: **Category → Subcategory → Entry (grid items)**

---

## Content Principles

> These apply to every entry written for this wiki — no exceptions.

**1. Use credible sources — always cite.**
Every factual claim, equation, and definition must be traceable to a credible primary or secondary source (textbooks, peer-reviewed papers, official documentation). Acceptable sources include: ESL/ISLR, Bishop's PRML, Stanford/MIT course notes, arXiv papers, and official library docs. Blog posts and tutorial sites are not acceptable as sole sources.

**2. Double-check all terms, equations, and mathematical facts.**
Before writing any formula, verify symbol definitions, index conventions, and derivation steps against the source. Common failure modes: wrong sign in gradient updates, transposed matrix dimensions, missing normalisation constants, incorrect asymptotic claims. When in doubt, cross-reference two independent sources.

**3. Do not paraphrase without understanding.**
If the underlying concept is unclear, do not guess or soften with vague language. Flag the entry as `draft` and leave a note. Confident-sounding but wrong content is worse than an honest placeholder.

---

## 1. Mathematics

| Subcategory | Entries |
|-------------|---------|
| **Linear Algebra** | Vectors & Matrices, Matrix Operations, Eigenvalues & Eigenvectors, SVD, PCA (math), Dot Product & Projections, Norms |
| **Calculus & Optimization** | Derivatives & Gradients, Chain Rule, Partial Derivatives, Gradient Descent, Convexity, Lagrange Multipliers, Taylor Series |
| **Probability Theory** | Sample Space & Events, Conditional Probability, Bayes' Theorem, Distributions (Discrete), Distributions (Continuous), Expectation & Variance, Law of Large Numbers, Central Limit Theorem |
| **Information Theory** | Entropy, KL Divergence, Cross-Entropy, Mutual Information |
| **Numerical Methods** | Floating Point Precision, Numerical Stability, Matrix Decomposition Methods |

---

## 2. Statistics

| Subcategory | Entries |
|-------------|---------|
| **Descriptive Statistics** | Mean, Median, Mode, Variance, Standard Deviation, Skewness, Kurtosis, Percentiles & Quartiles |
| **Inferential Statistics** | Point Estimation, Confidence Intervals, p-value, Statistical Power, Effect Size |
| **Hypothesis Testing** | Z-test, t-test, Chi-Square Test, ANOVA, Mann-Whitney U, Multiple Testing Correction |
| **Bayesian Statistics** | Prior & Posterior, Bayesian Inference, MAP Estimation, MCMC, Bayesian vs Frequentist |
| **Regression Analysis** | Simple Linear Regression, Multiple Linear Regression, Logistic Regression (stats view), GLMs |
| **Sampling Methods** | Random Sampling, Stratified Sampling, Bootstrap, Jackknife |
| **Experimental Design** | A/B Testing, Randomized Control Trials, Confounding Variables, Causal Inference |
| **Time Series (Stats)** | Stationarity, Autocorrelation, ARIMA, Seasonality, ADF Test |

---

## 3. Data

| Subcategory | Entries |
|-------------|---------|
| **Data Collection & Ingestion** | Data Sources, Web Scraping, APIs, Streaming vs Batch |
| **Data Cleaning** | Handling Missing Values, Outlier Detection, Duplicates, Data Type Casting |
| **Exploratory Data Analysis** | Univariate Analysis, Bivariate Analysis, Correlation, Visualization Techniques |
| **Feature Engineering** | Encoding (One-Hot, Ordinal, Target), Scaling & Normalization, Binning, Interaction Features, Date/Time Features, Embeddings as Features |
| **Data Imbalance** | Oversampling (SMOTE), Undersampling, Class Weights, Evaluation under Imbalance |
| **Data Pipelines** | ETL vs ELT, Feature Stores, Data Versioning (DVC), Workflow Orchestration |
| **Databases & Storage** | SQL Fundamentals, NoSQL, Vector Databases, Data Warehouses, Data Lakes |

---

## 4. Machine Learning

> Focus: algorithm theory, how each algorithm works, assumptions, pros/cons

| Subcategory | Entries |
|-------------|---------|
| **Regression** | Linear Regression, Ridge Regression, Lasso Regression, Elastic Net, Polynomial Regression, SVR, Decision Tree Regressor |
| **Classification** | Logistic Regression, SVM, K-Nearest Neighbors, Naive Bayes, Decision Tree Classifier, LDA, QDA |
| **Clustering** | K-Means, DBSCAN, Hierarchical Clustering, Gaussian Mixture Models, Mean Shift |
| **Ensemble Methods** | Random Forest, Gradient Boosting, XGBoost, LightGBM, CatBoost, Bagging, Stacking, AdaBoost |
| **Dimensionality Reduction** | PCA, t-SNE, UMAP, LDA (dimensionality), Autoencoders |
| **Anomaly Detection** | Isolation Forest, One-Class SVM, LOF, Autoencoders for Anomaly |
| **Recommendation Systems** | Collaborative Filtering, Content-Based Filtering, Matrix Factorization, Hybrid Models |
| **Reinforcement Learning** | MDP, Q-Learning, Policy Gradient, Actor-Critic, Multi-Armed Bandit |

---

## 5. Deep Learning

> Focus: architecture theory — how each architecture works, design choices, innovations

| Subcategory | Entries |
|-------------|---------|
| **Fundamentals** | Perceptron, Activation Functions, Neural Network Architecture, Universal Approximation Theorem |
| **CNNs** | Convolution Operation, Pooling, Stride & Padding, ResNet, VGG, EfficientNet, Transfer Learning |
| **RNNs & Sequence Models** | RNN, LSTM, GRU, Seq2Seq, Attention Mechanism (pre-Transformer) |
| **Transformers** | Self-Attention, Multi-Head Attention, Positional Encoding, Encoder-Decoder, BERT, ViT |
| **Generative Models** | GANs, VAEs, Diffusion Models, Normalizing Flows |
| **Graph Neural Networks** | GCN, GAT, GraphSAGE, Message Passing |
| **Reinforcement Learning (Deep)** | DQN, PPO, DDPG, A3C |

---

## 6. NLP / LLM

> Focus: NLP concepts, language model architectures, and LLM theory

| Subcategory | Entries |
|-------------|---------|
| **NLP Fundamentals** | Tokenization, Stemming & Lemmatization, POS Tagging, Named Entity Recognition, Dependency Parsing |
| **Classical NLP** | Bag of Words, TF-IDF, Word2Vec, GloVe, FastText, N-grams |
| **Language Model Fundamentals** | Language Modeling, Perplexity, Masked LM, Causal LM |
| **Large Language Models** | GPT Architecture, BERT Architecture, T5, LLaMA, Scaling Laws, Emergent Abilities, Context Window |
| **Prompt Engineering** | Zero-shot, Few-shot, Chain-of-Thought, ReAct, Prompt Injection & Safety |
| **Retrieval & Grounding** | RAG, Chunking Strategies, Embedding Models, Reranking, Hybrid Search |
| **Multimodal** | Vision-Language Models, CLIP, GPT-4V, Image Captioning, Speech-to-Text |

---

## 7. Training, Optimization & Evaluation

> Focus: how models are trained, optimized, and evaluated — applies across ML, DL, and LLMs

| Subcategory | Entries |
|-------------|---------|
| **Loss Functions** | MSE, MAE, Cross-Entropy, Hinge Loss, Huber Loss, KL Divergence Loss, Contrastive Loss, Triplet Loss |
| **Optimization Algorithms** | SGD, Momentum, Adam, AdaGrad, RMSProp, AdamW, Learning Rate Schedules, Warmup, Cosine Annealing |
| **Regularization** | L1 (Lasso), L2 (Ridge), Dropout, Early Stopping, Weight Decay, Label Smoothing |
| **DL Training Techniques** | Backpropagation, Vanishing/Exploding Gradients, Weight Initialization, Batch Norm, Layer Norm, Gradient Clipping, Mixed Precision Training, Data Augmentation, Curriculum Learning |
| **LLM Training & Alignment** | Pre-training, Supervised Fine-tuning (SFT), RLHF, DPO, Constitutional AI, Instruction Tuning, Parameter-Efficient Fine-tuning (LoRA, QLoRA) |
| **Classical ML Evaluation** | Train/Val/Test Split, Cross-Validation, Bias-Variance Tradeoff, Confusion Matrix, ROC-AUC, F1, RMSE, Log Loss, PR Curve |
| **LLM & DL Evaluation** | Perplexity, BLEU, ROUGE, BERTScore, Human Eval, LLM-as-Judge, Benchmarks (MMLU, HumanEval) |
| **Hyperparameter Tuning** | Grid Search, Random Search, Bayesian Optimization, AutoML, Neural Architecture Search |

---

## 8. AI Engineering

| Subcategory | Entries |
|-------------|---------|
| **AI Agents** | Agent Loop, Tool Use, Function Calling, ReAct Pattern, Plan-and-Execute |
| **Memory & State** | Short-term Memory, Long-term Memory, Episodic vs Semantic, Memory Architectures |
| **Orchestration & Frameworks** | LangChain, LlamaIndex, CrewAI, Autogen, Claude Agent SDK |
| **RAG Systems** | RAG Pipeline Design, Chunking Strategies, Vector Search, Reranking, Evaluation |
| **Tool & API Integration** | MCP (Model Context Protocol), API Design for AI, Structured Outputs, JSON Mode |
| **Evaluation & Observability** | Tracing, Logging, LLM Evaluation Frameworks, Regression Testing |
| **Safety & Guardrails** | Input/Output Filtering, Content Moderation, Prompt Injection Defense, Red Teaming |

---

## 9. AI/ML System Design

| Subcategory | Entries |
|-------------|---------|
| **ML System Architecture** | End-to-End ML Pipeline, Batch vs Real-time, Lambda Architecture, Online Learning |
| **Feature Stores** | Feature Store Design, Point-in-time Correctness, Feast, Tecton |
| **Model Serving & Inference** | REST API Serving, gRPC, Model Batching, Latency vs Throughput, Edge Deployment |
| **MLOps & CI/CD** | Model Registry, Experiment Tracking (MLflow), CI/CD for ML, Shadow Deployment |
| **Scalability** | Distributed Training, Data Parallelism, Model Parallelism, Parameter Servers |
| **Monitoring & Drift** | Data Drift, Concept Drift, Model Degradation, Alerting Strategies |
| **Case Studies** | Search Ranking System, Recommendation at Scale, Fraud Detection, Ad Click Prediction, LLM Serving at Scale |

---

## 10. Finance & Quant Finance

| Subcategory | Entries |
|-------------|---------|
| **Financial Markets** | Asset Classes, Market Microstructure, Order Types, Market Making, Liquidity |
| **Portfolio Theory** | Mean-Variance Optimization, Efficient Frontier, CAPM, Sharpe Ratio, Alpha & Beta |
| **Fixed Income** | Bonds, Duration, Convexity, Yield Curve, Credit Spread, Interest Rate Risk |
| **Derivatives** | Options (Calls/Puts), Greeks (Delta, Gamma, Theta, Vega), Black-Scholes, Futures, Swaps |
| **Risk Management** | VaR, CVaR, Stress Testing, Drawdown, Correlation & Diversification |
| **Factor Models** | Fama-French, Factor Zoo, Smart Beta, Risk Factors |
| **Quantitative Strategies** | Statistical Arbitrage, Pairs Trading, Momentum, Mean Reversion, High-Frequency Trading |
| **Stochastic Calculus** | Brownian Motion, Ito's Lemma, SDE, Risk-Neutral Pricing, Girsanov Theorem |
| **Alternative Investments** | Hedge Funds, Private Equity, Commodities, Crypto |
| **Behavioral Finance** | Market Anomalies, Investor Biases, Efficient Market Hypothesis |
| **Asset Management** | Fund Structures, Benchmarking, Performance Attribution, ESG |
