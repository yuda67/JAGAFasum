import { useMemo, useSyncExternalStore } from "react"
import { getAllReports, subscribeReports } from "../services/reportService"
import { createMyDummyReports, dummyReports } from "../data/dummyReports"

const newestFirst = (a, b) => b.createdAt.localeCompare(a.createdAt)

/** Daftar laporan milik pengguna, terbaru lebih dulu; otomatis ter-update. */
export default function useReports(userId) {
  const all = useSyncExternalStore(subscribeReports, getAllReports)
  return useMemo(
    () => all.filter((report) => report.userId === userId).sort(newestFirst),
    [all, userId],
  )
}

/** Semua laporan warga (laporan dummy + laporan yang dikirim di browser ini). */
export function useCommunityReports() {
  const all = useSyncExternalStore(subscribeReports, getAllReports)
  return useMemo(() => [...all, ...dummyReports].sort(newestFirst), [all])
}

/**
 * Laporan di halaman "Laporan Yang Sudah dibuat": laporan yang dikirim pengguna
 * (terbaru dulu) diikuti laporan dummy miliknya.
 */
export function useMyReports(userId) {
  const own = useReports(userId)
  const dummies = useMemo(() => createMyDummyReports(userId), [userId])
  return useMemo(() => [...own, ...dummies], [own, dummies])
}
