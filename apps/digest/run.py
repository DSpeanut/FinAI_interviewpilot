from selector import pick_entries
from generator import generate_digest
from sender import send_whatsapp


def main():
    entries = pick_entries(n=2)
    blocks = [generate_digest(e) for e in entries]
    message = "\n\n".join(blocks)

    sid = send_whatsapp(message)
    slugs = ", ".join(e["_slug"] for e in entries)
    print(f"Sent [{slugs}] — SID: {sid}")
    print(f"Message:\n{message}")


if __name__ == "__main__":
    main()
