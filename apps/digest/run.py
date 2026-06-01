import json
from datetime import datetime, timezone
from pathlib import Path

from selector import pick_entries
from generator import generate_digest
from sender import send_whatsapp

HISTORY_FILE = Path(__file__).parent / "data" / "history.jsonl"


def _append_history(slug: str, message: str) -> None:
    record = {
        "sent_at": datetime.now(timezone.utc).isoformat(),
        "slug": slug,
        "message": message,
    }
    with open(HISTORY_FILE, "a") as f:
        f.write(json.dumps(record) + "\n")


def main():
    entries = pick_entries(n=2)
    blocks = [generate_digest(e) for e in entries]
    message = "\n\n".join(blocks)

    sid = send_whatsapp(message)

    for entry, block in zip(entries, blocks):
        _append_history(entry["_slug"], block)

    slugs = ", ".join(e["_slug"] for e in entries)
    print(f"Sent [{slugs}] — SID: {sid}")
    print(f"Message:\n{message}")


if __name__ == "__main__":
    main()
