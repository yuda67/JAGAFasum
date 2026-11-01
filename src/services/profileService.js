/*
 * Simulasi penyimpanan profil di frontend (tanpa server).
 * Profil tiap pengguna disimpan di localStorage: { [userId]: profile }.
 */
import { writeJSON } from "./storage"

export const PROFILES_KEY = "jagafasum:v1:profiles"

const SIMULATED_LATENCY = 600
const EMPTY = {}
const listeners = new Set()

let cachedRaw = null
let cachedProfiles = EMPTY

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function readRaw() {
  try {
    return window.localStorage.getItem(PROFILES_KEY)
  } catch {
    return null
  }
}

/** Snapshot stabil untuk useSyncExternalStore. */
export function getAllProfiles() {
  const raw = readRaw()
  if (raw === cachedRaw) return cachedProfiles
  cachedRaw = raw
  try {
    const parsed = raw ? JSON.parse(raw) : EMPTY
    cachedProfiles = parsed && typeof parsed === "object" ? parsed : EMPTY
  } catch {
    cachedProfiles = EMPTY
  }
  return cachedProfiles
}

export function subscribeProfiles(listener) {
  listeners.add(listener)
  const handleStorage = (event) => {
    if (event.key === null || event.key === PROFILES_KEY) listener()
  }
  window.addEventListener("storage", handleStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", handleStorage)
  }
}

export async function saveProfile(userId, values) {
  await wait(SIMULATED_LATENCY)
  const profile = {
    name: values.name.trim().replace(/\s+/g, " "),
    province: values.province,
    email: values.email.trim().toLowerCase(),
    phone: values.phone.replace(/[^\d+]/g, ""),
    description: values.description.trim(),
    avatar: values.avatar,
    updatedAt: new Date().toISOString(),
  }
  const saved = writeJSON(PROFILES_KEY, { ...getAllProfiles(), [userId]: profile })
  if (!saved) {
    return {
      ok: false,
      formError: "Penyimpanan browser penuh. Coba pakai foto profil yang lebih kecil.",
    }
  }
  listeners.forEach((listener) => listener())
  return { ok: true, profile }
}
