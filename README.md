# ChippoAI

An AI-powered study companion for ML/AI and Finance interview prep. Runs fully locally — just bring your own (free) OpenRouter API key.

## Features

| Feature | What it does |
|---|---|
| **Library** | Structured knowledge base of ML, AI, and finance concepts |
| **Interview** | Voice-based mock interviews — pick category, difficulty, and question count. Get a scored report at the end |
| **Sparring** | Debate any topic with an AI partner that challenges your reasoning and corrects misconceptions |
| **Pipeline** | Kanban board to track job applications, with a yearly activity heatmap |

## Prerequisites

- **Python 3.11+**
- **Node.js 18+**
- A free [OpenRouter](https://openrouter.ai) account and API key

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/DSpeanut/FinAI_interviewpilot.git
cd FinAI_interviewpilot
```

### 2. Set up the API

```bash
cd apps/api

# Create virtual environment
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create your env file
cp .env.example .env
```

Open `apps/api/.env` and paste your OpenRouter API key:
```
OPENROUTER_API_KEY=sk-or-v1-...
```

### 3. Set up the web app

```bash
cd apps/web

# Install dependencies
npm install

# Create env file (no changes needed for local dev)
cp .env.local.example .env.local
```

## Running

You need two terminals — one for the API, one for the web app.

**Terminal 1 — API server:**
```bash
cd apps/api
source .venv/bin/activate      # Windows: .venv\Scripts\activate
uvicorn app.main:app --port 8000
```

**Terminal 2 — Web app:**
```bash
cd apps/web
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Notes

- The default model (`liquid/lfm-2.5-1.2b-instruct:free`) is free with no payment required
- Voice features (Interview) require Chrome or Edge — Safari/Firefox don't support the Web Speech API
- Pipeline data is stored in your browser's `localStorage` — it won't sync across devices
