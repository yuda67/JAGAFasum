import { getStatusLabel } from "../reportMeta"
import "./StatusBadge.css"

/** Badge status laporan: kapsul berwarna penuh dengan teks putih (sesuai desain). */
export default function StatusBadge({ status = "pending", className = "" }) {
  return (
    <span className={`status-badge status-badge--${status} ${className}`.trim()}>
      {getStatusLabel(status)}
    </span>
  )
}
