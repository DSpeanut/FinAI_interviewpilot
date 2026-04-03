import fs from "fs"
import path from "path"
import type { WikiEntryContent } from "@/lib/mock-data"

export function loadEntryContent(slug: string): WikiEntryContent | undefined {
  try {
    const filePath = path.join(process.cwd(), "content", `${slug}.json`)
    const raw = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(raw) as WikiEntryContent
  } catch {
    return undefined
  }
}
