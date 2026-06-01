from selector import pick_entry
from generator import generate_digest
from sender import send_whatsapp


def main():
    entry = pick_entry()
    message = generate_digest(entry)
    sid = send_whatsapp(message)
    print(f"Sent [{entry['_slug']}] — SID: {sid}")
    print(f"Message:\n{message}")


if __name__ == "__main__":
    main()
