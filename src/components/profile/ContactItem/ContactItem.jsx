import InlineField from "../InlineField/InlineField"
import "./ContactItem.css"

/** Baris kontak (ikon krem + teks) yang berubah menjadi kolom isian saat mode edit. */
export default function ContactItem({
  icon: Icon,
  tone,
  label,
  value,
  href,
  editing = false,
  error,
  ...inputProps
}) {
  return (
    <div className={`contact-item contact-item--${tone}`}>
      <span className="contact-item__icon" aria-hidden="true">
        <Icon />
      </span>
      {editing ? (
        <InlineField label={label} value={value} error={error} {...inputProps} />
      ) : (
        <a href={href} className="contact-item__value" aria-label={`${label}: ${value}`}>
          {value}
        </a>
      )}
    </div>
  )
}
