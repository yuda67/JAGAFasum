/*
 * Simulasi autentikasi di frontend (tanpa server).
 * Data akun & sesi disimpan di localStorage browser ini saja.
 * Catatan: ini hanya simulasi, BUKAN pengamanan sungguhan.
 */
import { readJSON, removeItem, writeJSON } from "./storage"

export const USERS_KEY = "jagafasum:v1:users"
export const SESSION_KEY = "jagafasum:v1:session"

const SIMULATED_LATENCY = 650

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const normalizeEmail = (email) => email.trim().toLowerCase()

function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID()
  return `u_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

async function hashPassword(email, password) {
  const input = `${email}:${password}`
  const subtle = globalThis.crypto?.subtle
  if (subtle) {
    const digest = await subtle.digest(
      "SHA-256",
      new TextEncoder().encode(input),
    )
    return Array.from(new Uint8Array(digest), (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("")
  }
  // Cadangan non-kriptografis (FNV-1a) bila Web Crypto tidak tersedia.
  let hash = 0x811c9dc5
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return `fnv-${(hash >>> 0).toString(16)}`
}

function getUsers() {
  const users = readJSON(USERS_KEY, [])
  return Array.isArray(users) ? users : []
}

function toSession(user) {
  return {
    userId: user.id,
    name: user.name,
    email: user.email,
    startedAt: new Date().toISOString(),
  }
}

export function getSession() {
  const session = readJSON(SESSION_KEY, null)
  return session && typeof session === "object" && session.email
    ? session
    : null
}

export async function registerUser({ name, email, password }) {
  await wait(SIMULATED_LATENCY)
  const normalizedEmail = normalizeEmail(email)
  const users = getUsers()

  if (users.some((user) => user.email === normalizedEmail)) {
    return { ok: false, errors: { email: "This email is already registered." } }
  }

  const user = {
    id: createId(),
    name: name.trim().replace(/\s+/g, " "),
    email: normalizedEmail,
    passwordHash: await hashPassword(normalizedEmail, password),
    createdAt: new Date().toISOString(),
  }
  writeJSON(USERS_KEY, [...users, user])

  const session = toSession(user)
  writeJSON(SESSION_KEY, session)
  return { ok: true, user: session }
}

export async function loginUser({ email, password }) {
  await wait(SIMULATED_LATENCY)
  const normalizedEmail = normalizeEmail(email)
  const user = getUsers().find(
    (candidate) => candidate.email === normalizedEmail,
  )
  const passwordHash = await hashPassword(normalizedEmail, password)

  if (!user || user.passwordHash !== passwordHash) {
    return { ok: false, formError: "Incorrect email or password." }
  }

  const session = toSession(user)
  writeJSON(SESSION_KEY, session)
  return { ok: true, user: session }
}

export function logoutUser() {
  removeItem(SESSION_KEY)
}

/** Data akun publik (tanpa hash password) untuk halaman Profil. */
export function getAccount(userId) {
  const user = getUsers().find((candidate) => candidate.id === userId)
  if (!user) return null
  return { name: user.name, email: user.email, createdAt: user.createdAt }
}
