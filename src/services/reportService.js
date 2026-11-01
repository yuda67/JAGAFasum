/*
 * Simulasi penyimpanan laporan di frontend (tanpa server).
 * Semua laporan disimpan di localStorage browser ini dan bisa dipantau
 * lewat hook useReports (memakai useSyncExternalStore).
 */
import { writeJSON } from "./storage"

export const REPORTS_KEY = "jagafasum:v1:reports"

const SIMULATED_LATENCY = 900
const EMPTY = []
const listeners = new Set()

let cachedRaw = null
let cachedReports = EMPTY

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID()
  return `r_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

function readRaw() {
  try {
    return window.localStorage.getItem(REPORTS_KEY)
  } catch {
    return null
  }
}

/** Snapshot stabil: hanya mem-parse ulang bila isi storage berubah. */
export function getAllReports() {
  const raw = readRaw()
  if (raw === cachedRaw) return cachedReports
  cachedRaw = raw
  try {
    const parsed = raw ? JSON.parse(raw) : EMPTY
    cachedReports = Array.isArray(parsed) ? parsed : EMPTY
  } catch {
    cachedReports = EMPTY
  }
  return cachedReports
}

function emit() {
  listeners.forEach((listener) => listener())
}

export function subscribeReports(listener) {
  listeners.add(listener)
  const handleStorage = (event) => {
    if (event.key === null || event.key === REPORTS_KEY) listener()
  }
  window.addEventListener("storage", handleStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", handleStorage)
  }
}

export async function createReport(userId, values) {
  await wait(SIMULATED_LATENCY)
  const report = {
    id: createId(),
    userId,
    title: values.title.trim().replace(/\s+/g, " "),
    category: values.category,
    description: values.description.trim(),
    location: {
      address: values.location.address.trim(),
      lat: values.location.lat ?? null,
      lon: values.location.lon ?? null,
    },
    photo: values.photo,
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  const saved = writeJSON(REPORTS_KEY, [report, ...getAllReports()])
  if (!saved) {
    return {
      ok: false,
      formError:
        "Penyimpanan browser penuh. Hapus beberapa laporan lama atau pakai foto yang lebih kecil.",
    }
  }
  emit()
  return { ok: true, report }
}

export function deleteReport(userId, reportId) {
  const next = getAllReports().filter(
    (report) => !(report.id === reportId && report.userId === userId),
  )
  writeJSON(REPORTS_KEY, next)
  emit()
}
