/* Pencarian laporan sederhana: semua kata kunci harus muncul di judul/lokasi/deskripsi. */
export const normalizeText = (text) => text.toLowerCase().normalize("NFKD")

export function matchesQuery(report, query) {
  if (!query) return true
  const haystack = normalizeText(
    `${report.title} ${report.location.address} ${report.description}`,
  )
  return query.split(/\s+/).every((word) => haystack.includes(word))
}

/** Potong teks di batas kata: "Saya mendapati trotoar yang ...." */
export function excerpt(text = "", max = 30) {
  const clean = text.trim().replace(/\s+/g, " ")
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max + 1)
  const lastSpace = cut.lastIndexOf(" ")
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : clean.slice(0, max)).replace(/[,.;:]$/, "")} ....`
}
