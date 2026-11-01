/*
 * Laporan dummy (contoh laporan warga) agar dashboard langsung terisi.
 * Foto memakai wadah gambar `laporan-1` … `laporan-4` di src/assets/images;
 * selama file belum ada, dipakai foto contoh dari Unsplash.
 */
import { getImageUrl } from "./images"

const unsplash = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&h=500&q=75`

const photo = (slot, fallbackId) => getImageUrl(slot) ?? unsplash(fallbackId)

export const DUMMY_USER_ID = "warga-jagafasum"

export const dummyReports = [
  {
    id: "dummy-bus-stop",
    title: "Bus Stop",
    category: "transport",
    description: "Saya melihat bus stop rusak dan mengganggu jalan.",
    location: {
      address: "Jl.Masjid, Pondok Labu",
      lat: -6.30752,
      lon: 106.79602,
    },
    photo: photo("laporan-1", "photo-1654552457050-af17f56045eb"),
    status: "done",
    createdAt: "2026-10-30T09:15:00.000Z",
  },
  {
    id: "dummy-trotoar",
    title: "Trotoar Rusak",
    category: "road",
    description:
      "Saya mendapati trotoar yang rusak, sudah dari lama namun tidak di benahi juga. padahal ramai dilewati masyarakat setiap hari.",
    location: {
      address: "Jl.Bacang, Pasar Minggu, Jakarta selatan",
      lat: -6.28401,
      lon: 106.84205,
    },
    photo: photo("laporan-2", "photo-1779179015285-120aaa822b1b"),
    status: "pending",
    createdAt: "2026-10-29T03:40:00.000Z",
  },
  {
    id: "dummy-jalan",
    title: "Jalan Berlubang",
    category: "road",
    description:
      "Saya sedang berkendara. Saya melihat jalan berlubang yang belum diperbaiki. Tolong segera diperbaiki karena membahayakan pengendara motor.",
    location: {
      address: "Jl. Sudirman, Jakarta Selatan",
      lat: -6.22501,
      lon: 106.80302,
    },
    photo: photo("laporan-3", "photo-1635068741358-ab1b9813623f"),
    status: "progress",
    createdAt: "2026-10-27T11:05:00.000Z",
  },
  {
    id: "dummy-bus-stop-2",
    title: "Bus Stop",
    category: "transport",
    description: "Saya melihat bus stop rusak dan mengganggu jalan.",
    location: {
      address: "Jl.Masjid, Pondok Labu",
      lat: -6.30811,
      lon: 106.79554,
    },
    photo: photo("laporan-4", "photo-1782852031333-70fc1999b5fa"),
    status: "progress",
    createdAt: "2026-10-25T07:30:00.000Z",
  },
].map((report) => ({ ...report, userId: DUMMY_USER_ID, isDummy: true }))

/*
 * Laporan dummy milik pengguna yang sedang login (halaman "Laporan Yang Sudah
 * dibuat"). Isinya mengikuti desain: 6 laporan "Trotoar Rusak" dengan status
 * Pending, In Progress, Resolved, lalu Pending.
 */
const MY_STATUSES = ["pending", "progress", "done", "pending", "pending", "pending"]
const myPhoto = photo("laporan-saya", "photo-1779179015285-120aaa822b1b")

export function createMyDummyReports(userId) {
  return MY_STATUSES.map((status, index) => ({
    id: `dummy-mine-${index + 1}`,
    userId,
    title: "Trotoar Rusak",
    category: "road",
    description:
      "Saya mendapati trotoar yang rusak, sudah dari lama namun tidak di benahi juga. Padahal ramai dilewati masyarakat setiap hari.",
    location: {
      address: "Jl.Masjid, Pondok Labu",
      lat: -6.30752 + index * 0.0004,
      lon: 106.79602 + index * 0.0003,
    },
    photo: myPhoto,
    status,
    createdAt: new Date(Date.UTC(2026, 9, 28 - index, 8, 30)).toISOString(),
    isDummy: true,
  }))
}

export const DUMMY_AVATAR = getImageUrl("avatar") ??
  "https://images.unsplash.com/photo-1760411070204-1437a1eb4249?auto=format&fit=crop&crop=faces&w=480&h=480&q=80"
 