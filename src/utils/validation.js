/* Aturan validasi form Login & Register (pesan mengikuti bahasa desain: Inggris). */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_HINT = `Use at least ${PASSWORD_MIN_LENGTH} characters.`

function validateEmail(email) {
  const value = email.trim()
  if (!value) return "Please enter your email."
  if (!EMAIL_PATTERN.test(value)) return "Please enter a valid email address."
  return ""
}

export function validateLogin({ email, password }) {
  const errors = {}
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  if (!password) errors.password = "Please enter your password."
  return errors
}

export function validateRegister({ name, email, password }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = "Please enter your full name."
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  if (password.length < PASSWORD_MIN_LENGTH) errors.password = PASSWORD_HINT
  return errors
}

/* Aturan validasi form Buat Laporan (pesan dalam Bahasa Indonesia). */
export const REPORT_LIMITS = { title: 80, description: 600 }

/* Aturan validasi form Edit Profile. */
export const PROFILE_LIMITS = { name: 40, description: 300 }

export function validateProfile({ name, email, phone, description }) {
  const errors = {}
  const trimmedName = name.trim()
  if (trimmedName.length < 2) errors.name = "Nama minimal 2 karakter."
  else if (trimmedName.length > PROFILE_LIMITS.name)
    errors.name = `Nama maksimal ${PROFILE_LIMITS.name} karakter.`
  if (!EMAIL_PATTERN.test(email.trim())) errors.email = "Format email belum benar."
  const digits = phone.replace(/\D/g, "")
  if (!/^[\d\s+-]+$/.test(phone.trim()) || digits.length < 8 || digits.length > 15)
    errors.phone = "Nomor telepon 8–15 digit."
  if (description.trim().length > PROFILE_LIMITS.description)
    errors.description = `Deskripsi maksimal ${PROFILE_LIMITS.description} karakter.`
  return errors
}

export function validateReport({ photo, title, category, description, location }) {
  const errors = {}
  if (!photo) errors.photo = "Unggah foto fasilitas yang rusak."
  const trimmedTitle = title.trim()
  if (trimmedTitle.length < 4) errors.title = "Tulis judul laporan (min. 4 karakter)."
  else if (trimmedTitle.length > REPORT_LIMITS.title)
    errors.title = `Judul maksimal ${REPORT_LIMITS.title} karakter.`
  if (!category) errors.category = "Pilih kategori fasilitas."
  const trimmedDescription = description.trim()
  if (trimmedDescription.length < 10)
    errors.description = "Jelaskan kerusakannya (min. 10 karakter)."
  else if (trimmedDescription.length > REPORT_LIMITS.description)
    errors.description = `Deskripsi maksimal ${REPORT_LIMITS.description} karakter.`
  if (location.address.trim().length < 5)
    errors.location = "Isi lokasi atau tekan Get my Location."
  return errors
}
