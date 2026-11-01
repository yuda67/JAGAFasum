import { useState } from "react"
import { saveProfile } from "../services/profileService"
import { validateProfile } from "../utils/validation"

const FIELDS = ["name", "province", "email", "phone", "description", "avatar"]

/** State form Edit Profile: mode edit, draf nilai, error, dan proses simpan. */
export default function useProfileForm(userId, profile) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(profile)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const dirty = editing && FIELDS.some((field) => draft[field] !== profile[field])

  const start = () => {
    setDraft(profile)
    setErrors({})
    setEditing(true)
  }

  const cancel = () => {
    setEditing(false)
    setErrors({})
  }

  const setField = (name, value) => {
    setDraft((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!current[name] && !current.form) return current
      const next = { ...current }
      delete next[name]
      delete next.form
      return next
    })
  }

  const submit = async () => {
    const nextErrors = validateProfile(draft)
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return { ok: false, errors: nextErrors }
    }
    setSaving(true)
    const result = await saveProfile(userId, draft)
    setSaving(false)
    if (result.ok) setEditing(false)
    else setErrors({ form: result.formError })
    return result
  }

  return { editing, draft, errors, saving, dirty, start, cancel, setField, submit }
}
