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


def pick_entry() -> dict:
    all_slugs = _all_slugs()
    state = _load_state()
    recent = set(state["recent"])

    eligible = [s for s in all_slugs if s not in recent]
    if not eligible:
        # all entries in window — shrink window by half and retry
        state["recent"] = state["recent"][WINDOW_SIZE // 2 :]
        eligible = [s for s in all_slugs if s not in set(state["recent"])]

    slug = random.choice(eligible)
    entry_path = ENTRIES_DIR / f"{slug}.json"
    entry = json.loads(entry_path.read_text())
    entry["_slug"] = slug

    state["recent"].append(slug)
    state["recent"] = state["recent"][-WINDOW_SIZE:]
    _save_state(state)

    return entry
