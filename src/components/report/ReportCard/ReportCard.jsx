import StatusBadge from "../StatusBadge/StatusBadge"
import { LocationPinIcon, TrashIcon } from "../../icons/DashboardIcons"
import { dashboardHome, myReports } from "../../../data/content"
import { excerpt } from "../../../utils/search"
import "./ReportCard.css"

/**
 * Kartu laporan.
 * variant 'default' (beranda dashboard): foto, judul, lokasi, deskripsi, status.
 * variant 'compact' (Laporan Yang Sudah dibuat): foto, judul, "desc: …", lokasi, status.
 */
export default function ReportCard({
  report,
  variant = "default",
  highlighted = false,
  onOpen,
  onDelete,
  style,
}) {
  const compact = variant === "compact"
  const location = (
    <p className="report-card__location">
      <LocationPinIcon className="report-card__pin" />
      <span>{report.location.address}</span>
    </p>
  )

  return (
    <article
      className={[
        "report-card",
        compact && "report-card--compact",
        highlighted && "is-highlighted",
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      <button
        type="button"
        className="report-card__hit"
        onClick={() => onOpen?.(report)}
        aria-label={`Lihat detail laporan: ${report.title}`}
      />
      <div className="report-card__media">
        <img
          src={report.photo}
          alt=""
          className="report-card__img"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="report-card__body">
        <h3 className="report-card__title">{report.title}</h3>
        {compact ? (
          <>
            <p className="report-card__desc">
              {myReports.descPrefix} {excerpt(report.description)}
            </p>
            {location}
          </>
        ) : (
          <>
            {location}
            <p className="report-card__desc">{report.description}</p>
          </>
        )}
        <p className="report-card__status">
          <span>{dashboardHome.statusLabel}</span>
          <StatusBadge status={report.status} />
        </p>
      </div>

      {onDelete && (
        <button
          type="button"
          className="report-card__delete"
          onClick={() => onDelete(report)}
          aria-label={`Hapus laporan: ${report.title}`}
        >
          <TrashIcon />
        </button>
      )}
    </article>
  )
}
