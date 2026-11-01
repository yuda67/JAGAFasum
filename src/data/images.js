/*
 * Registry "wadah gambar".
 * Taruh file bergambar di src/assets/images/ dengan nama = nama slot
 * (contoh: hero.jpg, fasilitas-1.webp, auth.png). File otomatis dipakai;
 * jika belum ada, komponen ImageSlot menampilkan placeholder.
 */
const modules = import.meta.glob(
  "../assets/images/*.{jpg,jpeg,png,webp,avif,svg,gif,JPG,JPEG,PNG,WEBP,AVIF,SVG,GIF}",
  { eager: true, import: "default" },
)

const filesBySlot = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => {
    const fileName = path.split("/").pop() ?? ""
    return [fileName.replace(/\.[^.]+$/, "").toLowerCase(), url]
  }),
)

export const IMAGE_SLOTS = {
  hero: {
    label: "Foto latar hero",
    size: "2880 × 2060 px (landscape)",
    alt: "",
  },
  "fasilitas-1": {
    label: "Foto fasilitas 1",
    size: "976 × 670 px",
    alt: "Tangga jembatan penyeberangan orang yang berkarat",
  },
  "fasilitas-2": {
    label: "Foto fasilitas 2",
    size: "976 × 670 px",
    alt: "Trotoar dengan ubin yang rusak dan berlubang",
  },
  "fasilitas-3": {
    label: "Foto fasilitas 3",
    size: "976 × 670 px",
    alt: "Jalan raya yang berlubang",
  },
  auth: {
    label: "Foto panel Login & Register",
    size: "1440 × 2048 px (portrait)",
    alt: "",
  },
  "laporan-1": {
    label: "Foto laporan dummy 1 (Bus Stop)",
    size: "800 × 500 px",
    alt: "Halte bus yang rusak",
  },
  "laporan-2": {
    label: "Foto laporan dummy 2 (Trotoar Rusak)",
    size: "800 × 500 px",
    alt: "Trotoar rusak",
  },
  "laporan-3": {
    label: "Foto laporan dummy 3 (Jalan Berlubang)",
    size: "800 × 500 px",
    alt: "Jalan berlubang",
  },
  "laporan-4": {
    label: "Foto laporan dummy 4 (Bus Stop)",
    size: "800 × 500 px",
    alt: "Tangga halte yang berkarat",
  },
  "laporan-saya": {
    label: "Foto dummy halaman Laporan Yang Sudah dibuat (Trotoar Rusak)",
    size: "800 × 530 px",
    alt: "Trotoar rusak",
  },
  avatar: {
    label: "Foto profil dummy",
    size: "480 × 480 px (persegi)",
    alt: "Foto profil",
  },
  logo: {
    label: "Logo (opsional)",
    size: "SVG atau PNG ≥ 184 × 166 px",
    alt: "JAGAFasum",
  },
}

/** URL gambar untuk slot tertentu, atau null bila file belum ditambahkan. */
export function getImageUrl(slot) {
  return filesBySlot[String(slot).toLowerCase()] ?? null
}
