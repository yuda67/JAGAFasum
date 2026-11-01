import { useRef, useState } from "react"
import { CameraIcon } from "../../icons/DashboardIcons"
import { compressImage, validateImageFile } from "../../../utils/image"
import { profilePage } from "../../../data/content"
import "./ProfileAvatar.css"

/** Foto profil bulat dengan cincin krem; di mode edit bisa diganti (klik / seret foto). */
export default function ProfileAvatar({ src, name, editing = false, onChange, onError }) {
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [dragging, setDragging] = useState(false)

  const handleFile = async (file) => {
    if (!file) return
    const error = validateImageFile(file)
    if (error) {
      onError?.(error)
      return
    }
    setBusy(true)
    try {
      const { dataUrl } = await compressImage(file, { maxSize: 480, quality: 0.82 })
      onChange?.(dataUrl)
    } catch (err) {
      onError?.(err.message || profilePage.photoError)
    } finally {
      setBusy(false)
    }
  }

  const dropProps = editing
    ? {
        onDragOver: (event) => {
          event.preventDefault()
          setDragging(true)
        },
        onDragLeave: () => setDragging(false),
        onDrop: (event) => {
          event.preventDefault()
          setDragging(false)
          handleFile(event.dataTransfer.files?.[0])
        },
      }
    : {}

  return (
    <div
      className={[
        "profile-avatar",
        editing && "is-editing",
        dragging && "is-dragging",
        busy && "is-busy",
      ]
        .filter(Boolean)
        .join(" ")}
      {...dropProps}
    >
      <div className="profile-avatar__frame">
        <img key={src} src={src} alt={`Foto profil ${name}`} className="profile-avatar__img" />
      </div>

      {editing && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="u-visually-hidden"
            tabIndex={-1}
            aria-hidden="true"
            onChange={(event) => {
              handleFile(event.target.files?.[0])
              event.target.value = ""
            }}
          />
          <button
            type="button"
            className="profile-avatar__change"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            aria-label={profilePage.changePhoto}
          >
            {busy ? (
              <span className="profile-avatar__spinner" aria-hidden="true" />
            ) : (
              <CameraIcon className="profile-avatar__camera" />
            )}
            <span className="profile-avatar__hint">Ganti foto</span>
          </button>
        </>
      )}
    </div>
  )
}
