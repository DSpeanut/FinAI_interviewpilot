import json
import random
from pathlib import Path

ENTRIES_DIR = Path(__file__).parent.parent / "web" / "data" / "entries"
STATE_FILE = Path(__file__).parent / "state.json"
WINDOW_SIZE = 60


def _all_slugs() -> list[str]:
    return [p.stem for p in ENTRIES_DIR.glob("*.json")]


def _load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {"recent": []}


def _save_state(state: dict) -> None:
    STATE_FILE.write_text(json.dumps(state, indent=2))


def pick_entries(n: int = 2) -> list[dict]:
    all_slugs = _all_slugs()
    state = _load_state()

    eligible = [s for s in all_slugs if s not in set(state["recent"])]
    if len(eligible) < n:
        state["recent"] = state["recent"][WINDOW_SIZE // 2 :]
        eligible = [s for s in all_slugs if s not in set(state["recent"])]

    slugs = random.sample(eligible, n)
    entries = []
    for slug in slugs:
        entry = json.loads((ENTRIES_DIR / f"{slug}.json").read_text())
        entry["_slug"] = slug
        entries.append(entry)
        state["recent"].append(slug)

    state["recent"] = state["recent"][-WINDOW_SIZE:]
    _save_state(state)

    return entries
