import { Link } from "react-router"
import useCountUp from "../../../hooks/useCountUp"
import { formatNumber } from "../../../utils/format"
import "./ReportCountCard.css"

/** Kartu krem "Jumlah Laporan" dengan angka yang menghitung naik; klik → daftar laporan. */
export default function ReportCountCard({ label, count, to = "/dashboard/laporan" }) {
  const value = useCountUp(count, { start: true, duration: 1400, delay: 250 })

  return (
    <Link
      to={to}
      className="count-card"
      aria-label={`${label}: ${formatNumber(count)}. Lihat laporan yang sudah dibuat`}
    >
      <span className="count-card__label">{label}</span>
      <span className="count-card__value" aria-hidden="true">
        {formatNumber(value)}
      </span>
    </Link>
  )
}
