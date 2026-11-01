import { useDeferredValue, useState } from "react"
import { useLocation, useOutletContext } from "react-router"
import ReportCard from "../../components/report/ReportCard/ReportCard"
import ReportDetailDialog from "../../components/report/ReportDetailDialog/ReportDetailDialog"
import EmptyState from "../../components/report/EmptyState/EmptyState"
import ConfirmDialog from "../../components/ui/ConfirmDialog/ConfirmDialog"
import ReportSearch from "../../components/dashboard/ReportSearch/ReportSearch"
import ReportFilter from "../../components/dashboard/ReportFilter/ReportFilter"
import { SearchIcon, TrashIcon } from "../../components/icons/DashboardIcons"
import { useMyReports } from "../../hooks/useReports"
import useToast from "../../hooks/useToast"
import useDocumentTitle from "../../hooks/useDocumentTitle"
import { deleteReport } from "../../services/reportService"
import { matchesQuery, normalizeText } from "../../utils/search"
import { myReports, reportStatuses } from "../../data/content"
import "./MyReportsPage.css"

const FILTERS = [
  { id: "all", label: myReports.filterAll },
  ...Object.entries(reportStatuses).map(([id, status]) => ({
    id,
    label: status.label,
  })),
]

export default function MyReportsPage() {
  useDocumentTitle("Laporan Yang Sudah dibuat — JAGAFasum")
  const { user } = useOutletContext()
  const { state } = useLocation()
  const { show } = useToast()
  const reports = useMyReports(user.userId)
  const [filter, setFilter] = useState("all")
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(normalizeText(query.trim()))
  const [openReport, setOpenReport] = useState(null)
  // Target hapus disimpan terpisah dari status buka agar teks tetap ada saat dialog menutup.
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const visible = reports.filter(
    (report) =>
      (filter === "all" || report.status === filter) &&
      matchesQuery(report, deferredQuery),
  )

  const resetFilters = () => {
    setFilter("all")
    setQuery("")
  }

  const requestDelete = (target) => {
    setPendingDelete(target)
    setDeleteOpen(true)
  }

  const confirmDelete = () => {
    deleteReport(user.userId, pendingDelete.id)
    setDeleteOpen(false)
    show(myReports.deleted, { tone: "info" })
  }

  return (
    <div className="mreports">
      <section className="mreports__hero">
        <div className="mreports__stage">
          {/* Dekorasi: garis krem di kiri & batang kuning diagonal di kanan */}
          <div className="mreports__stripes" aria-hidden="true" />
          <span className="mreports__bar mreports__bar--1" aria-hidden="true" />
          <span className="mreports__bar mreports__bar--2" aria-hidden="true" />

          <div className="mreports__inner">
            <h1 className="mreports__title">
              {myReports.titleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>

            <div className="mreports__toolbar">
              <ReportSearch
                className="mreports__search"
                value={query}
                onChange={setQuery}
                placeholder={myReports.searchPlaceholder}
                label={myReports.searchLabel}
              />
              <ReportFilter options={FILTERS} value={filter} onChange={setFilter} />
            </div>
          </div>
        </div>
      </section>

      <section className="mreports__list" aria-label="Daftar laporan yang sudah dibuat">
        <div className="mreports__stage">
          <p className="u-visually-hidden" aria-live="polite">
            {visible.length} laporan ditampilkan
          </p>

          {!reports.length ? (
            <EmptyState
              title={myReports.emptyTitle}
              body={myReports.emptyBody}
              cta={myReports.cta}
            />
          ) : visible.length ? (
            <ul key={`${filter}-${deferredQuery}`} className="mreports__grid">
              {visible.map((report, index) => (
                <li key={report.id} style={{ "--i": Math.min(index, 8) }}>
                  <ReportCard
                    variant="compact"
                    report={report}
                    highlighted={state?.highlight === report.id}
                    onOpen={setOpenReport}
                    onDelete={report.isDummy ? undefined : requestDelete}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mreports__empty">
              <span className="mreports__empty-icon" aria-hidden="true">
                <SearchIcon />
              </span>
              <p className="mreports__empty-title">{myReports.noResultTitle}</p>
              <p className="mreports__empty-body">{myReports.noResultBody}</p>
              <button type="button" className="mreports__empty-btn" onClick={resetFilters}>
                {myReports.noResultReset}
              </button>
            </div>
          )}
        </div>
      </section>

      <ReportDetailDialog report={openReport} onClose={() => setOpenReport(null)} />
      <ConfirmDialog
        open={deleteOpen}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        tone="danger"
        icon={<TrashIcon />}
        title="Hapus laporan ini?"
        body={
          pendingDelete
            ? `“${pendingDelete.title}” akan dihapus permanen dari browser ini.`
            : ""
        }
        cancelLabel="Batal"
        confirmLabel={myReports.delete}
      />
    </div>
  )
}
