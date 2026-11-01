import { useId } from "react"
import "./InlineField.css"

/**
 * Kolom edit "di tempat" untuk halaman Profil: tampil menyatu dengan teks,
 * bergaris bawah krem lalu hijau saat fokus. Bisa berupa input atau select.
 * size: 'lg' (nama) | 'md' (provinsi) | 'sm' (kontak)
 */
export default function InlineField({
  ref,
  label,
  error,
  size = "sm",
  options,
  className = "",
  ...inputProps
}) {
  const id = useId()
  const errorId = `${id}-error`
  const shared = {
    id,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": error ? errorId : undefined,
    ...inputProps,
  }

  return (
    <div
      className={[`inline-field inline-field--${size}`, error && "has-error", className]
        .filter(Boolean)
        .join(" ")}
    >
      <label htmlFor={id} className="u-visually-hidden">
        {label}
      </label>
      {options ? (
        <select ref={ref} className="inline-field__control inline-field__select" {...shared}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input ref={ref} className="inline-field__control" {...shared} />
      )}
      {error && (
        <p id={errorId} className="inline-field__error">
          {error}
        </p>
      )}
    </div>
  )
}
