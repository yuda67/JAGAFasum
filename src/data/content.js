/*
 * Semua teks & angka yang tampil di website dikumpulkan di sini
 * supaya mudah diubah tanpa menyentuh komponen.
 */

export const brand = {
  name: "JAGAFasum",
}

export const hero = {
  title: "The comfort of our future lies in our public facilities.",
  welcome: { before: "Selamat datang di ", highlight: "JAGAFasum" },
  lead: "Tujuan program ini adalah menciptakan sistem pengaduan terintegrasi, di mana masyarakat dapat melaporkan berbagai masalah terkait fasilitas apa pun melalui satu platform.",
}

export const stats = [
  { id: "reports", label: "Jumlah Pelaporan", value: 2245 },
  { id: "repairs", label: "Jumlah Perbaikan", value: 1077 },
]

// `slot` = nama file gambar di src/assets/images (lihat src/data/images.js)
export const facilityPhotos = [
  { slot: "fasilitas-1", caption: "Tangga JPO berkarat" },
  { slot: "fasilitas-2", caption: "Trotoar rusak" },
  { slot: "fasilitas-3", caption: "Jalan berlubang" },
]

export const reportSteps = [
  {
    id: "foto",
    label: "Foto",
    description: "Ambil foto fasilitas umum yang rusak.",
  },
  {
    id: "laporkan",
    label: "Laporkan",
    description: "Kirim laporan lengkap dengan lokasinya.",
  },
  {
    id: "pantau",
    label: "Pantau",
    description: "Pantau status tindak lanjut laporanmu.",
  },
  {
    id: "selesai",
    label: "Selesai",
    description: "Fasilitas diperbaiki oleh pihak pengelola.",
  },
  {
    id: "nilai",
    label: "Nilai Kinerja",
    description: "Beri penilaian atas kinerja perbaikan.",
  },
]

// `id` menentukan ikon yang dipakai (lihat components/sections/Categories)
export const categories = [
  { id: "bus", label: "Bis" },
  { id: "traffic", label: "Lalu lintas" },
  { id: "sidewalk", label: "Trotoar" },
  { id: "train", label: "Kereta Api" },
]

export const about = {
  title: "Tentang JAGAFasum",
  subtitle: "Satu tempat untuk menyuarakan kondisi fasilitas di sekitar Anda",
  body: "JAGAFasum menghubungkan warga dengan pihak pengelola fasilitas publik. Setiap laporan tercatat, terlihat oleh publik, dan dapat dipantau hingga selesai, sehingga perbaikan menjadi lebih cepat dan akuntabel.",
}

export const contact = {
  heading: "Contact",
  email: "JAGAFasum@gmail.com",
  phone: { display: "(021)9928 8227", href: "tel:+622199288227" },
  address: {
    lines: ["Jl. RS. Fatmawati,", "Pondok Labu, Jakarta"],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Jl.%20RS.%20Fatmawati%2C%20Pondok%20Labu%2C%20Jakarta",
  },
}

/* ===================== Area dashboard (setelah login) ===================== */

// Menu sidebar. `icon` menentukan ikon (lihat components/icons/DashboardIcons).
export const dashboardNav = [
  { id: "home", label: "Beranda", to: "/dashboard", icon: "grid", end: true },
  {
    id: "create",
    label: "Buat Laporan",
    to: "/dashboard/buat-laporan",
    icon: "report",
  },
  {
    id: "reports",
    label: "Laporan Saya",
    to: "/dashboard/laporan",
    icon: "document",
  },
  { id: "profile", label: "Profil", to: "/dashboard/profil", icon: "user" },
]

export const logoutNav = { label: "Keluar", icon: "logout" }

export const logoutDialog = {
  title: ["Oh no! You’re leaving...", "Are you sure?"],
  cancel: "Cancel",
  confirm: "Yes, Log out",
  confirming: "Logging out…",
  toast: "Kamu sudah keluar. Sampai jumpa!",
}

// Beranda dashboard (mengikuti desain: header, banner, ringkasan, cari & filter, kartu laporan)
export const dashboardHome = {
  cta: "Create a report",
  banner:
    "Foto, tandai lokasinya, lalu pantau sampai petugas selesai memperbaikinya. Semua laporan warga ada di satu tempat.",
  searchPlaceholder: "Cari laporan atau lokasi",
  searchLabel: "Cari laporan",
  filterAll: "All",
  statusLabel: "Status :",
  noResultTitle: "Laporan tidak ditemukan",
  noResultBody: "Coba kata kunci lain atau pilih status yang berbeda.",
  noResultReset: "Tampilkan semua laporan",
}

// Kartu ringkasan di beranda dashboard (urutan & label sesuai desain).
export const dashboardStats = [
  { id: "pending", label: "Laporan Pending", status: "pending" },
  { id: "progress", label: "Laporan In Progress", status: "progress" },
  { id: "done", label: "Laporan Resolved", status: "done" },
]

export const reportStatuses = {
  pending: { label: "Pending" },
  progress: { label: "In Progress" },
  done: { label: "Resolved" },
}

// Kategori fasilitas di form Buat Laporan (3 kolom). `id` menentukan ikon.
export const reportCategories = [
  { id: "road", label: "Jalan & Trotoar" },
  { id: "transport", label: "Transportasi Umum" },
  { id: "building", label: "Gedung Publik" },
  { id: "drainage", label: "Drainase & Saluran Air" },
  { id: "park", label: "Taman & Ruang Terbuka" },
  { id: "other", label: "Fasilitas Lainnya" },
]

export const createReport = {
  title: "Buat Laporan",
  photo: {
    label: "Foto fasilitas",
    hint: "PNG, JPG atau WebP. Foto harus jelas dan terlihat fasilitas yang rusak tersebut",
    button: "Upload foto",
    dropHint: "atau seret & lepas foto ke sini (maks. 5 MB)",
    dropActive: "Lepaskan untuk mengunggah",
    replace: "Ganti foto",
    remove: "Hapus foto",
    processing: "Memproses foto…",
  },
  titleField: { label: "Judul Laporan", placeholder: "Jalan Ambles" },
  category: { label: "Kategori Fasilitas" },
  description: {
    label: "Deskripsi",
    placeholder: "detail kerusakanya, sudah dari kapan, dll",
  },
  location: {
    label: "Location",
    placeholder: "Jl, masjid, Lenteng Agungg....",
    button: "Get my Location",
    locating: "Mencari lokasi…",
    approximate:
      "Izin GPS tidak tersedia di jendela ini, jadi dipakai perkiraan lokasi dari jaringan. Periksa & rapikan alamatnya.",
    found: "Lokasi ditemukan",
    mapTitle: "Peta lokasi laporan",
    openMap: "Buka di OpenStreetMap",
  },
  submit: "Kirim Laporan",
  submitting: "Mengirim…",
  reset: "Kosongkan form",
  success: "Laporan berhasil dikirim! Kamu bisa memantaunya di Laporan Saya.",
}

export const myReports = {
  titleLines: ["Laporan Yang", "Sudah dibuat"],
  searchPlaceholder: "Cari laporan atau lokasi",
  searchLabel: "Cari laporan yang sudah dibuat",
  filterAll: "All",
  descPrefix: "desc:",
  emptyTitle: "Belum ada laporan di sini",
  emptyBody: "Laporan yang kamu kirim akan tercatat dan bisa dipantau di halaman ini.",
  noResultTitle: "Laporan tidak ditemukan",
  noResultBody: "Coba kata kunci lain atau pilih status yang berbeda.",
  noResultReset: "Tampilkan semua laporan",
  cta: "Buat Laporan",
  delete: "Hapus laporan",
  deleted: "Laporan dihapus.",
}

export const profilePage = {
  title: "Profile",
  provincePlaceholder: "Provinsi",
  reportCount: "Jumlah Laporan",
  description: "Description",
  descriptionPlaceholder: "Ceritakan harapanmu untuk fasilitas umum di daerahmu…",
  edit: "Edit Profile",
  save: "Simpan",
  cancel: "Batal",
  changePhoto: "Ganti foto profil",
  saved: "Profil berhasil diperbarui.",
  cancelled: "Perubahan dibatalkan.",
  photoError: "Foto tidak dapat dipakai.",
  fields: {
    name: "Nama lengkap",
    province: "Provinsi",
    email: "Email",
    phone: "Nomor telepon",
    description: "Deskripsi",
  },
  // Nilai bawaan profil (dummy) sebelum pengguna mengubahnya.
  defaults: {
    province: "DKI Jakarta",
    phone: "0823259723",
    description:
      "Saya berharap kedepanya daerah yang saya tinggali semakin maju dan mempunyai kualitas fasilitas umum yang terbaik",
  },
}
