import { useDeferredValue, useState } from "react"
import { Link } from "react-router"
import Logo from "../../components/ui/Logo/Logo"
import DashStat from "../../components/dashboard/DashStat/DashStat"
import ReportSearch from "../../components/dashboard/ReportSearch/ReportSearch"
import ReportFilter from "../../components/dashboard/ReportFilter/ReportFilter"
import ReportCard from "../../components/report/ReportCard/ReportCard"
import ReportDetailDialog from "../../components/report/ReportDetailDialog/ReportDetailDialog"
import { PlusCircleIcon, SearchIcon } from "../../components/icons/DashboardIcons"
import { useCommunityReports } from "../../hooks/useReports"
import useDocumentTitle from "../../hooks/useDocumentTitle"
import { matchesQuery, normalizeText as normalize } from "../../utils/search"
import {
  brand,
  dashboardHome,
  dashboardStats,
  reportStatuses,
} from "../../data/content"
import "./DashboardHomePage.css"

const FILTERS = [
  { id: "all", label: dashboardHome.filterAll },
  ...Object.entries(reportStatuses).map(([id, status]) => ({
    id,
    label: status.label,
  })),
]

export default function DashboardHomePage() {
  useDocumentTitle("Dashboard — JAGAFasum")
  const reports = useCommunityReports()
  const [filter, setFilter] = useState("all")
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(normalize(query.trim()))
  const [openReport, setOpenReport] = useState(null)

  const visible = reports.filter(
    (report) =>
      (filter === "all" || report.status === filter) &&
      matchesQuery(report, deferredQuery),
  )
  const countFor = (status) =>
    reports.filter((report) => report.status === status).length

  const resetFilters = () => {
    setFilter("all")
    setQuery("")
  }

  return (
    <div className="dhome">
      <section className="dhome__hero">
        <div className="dhome__stage">
          {/* Dekorasi: garis krem di kanan & batang kuning diagonal */}
          <div className="dhome__stripes" aria-hidden="true" />
          <span className="dhome__bar dhome__bar--1" aria-hidden="true" />
          <span className="dhome__bar dhome__bar--2" aria-hidden="true" />
          <span className="dhome__bar dhome__bar--3" aria-hidden="true" />
          <span className="dhome__bar dhome__bar--4" aria-hidden="true" />

          <div className="dhome__inner">
            <header className="dhome__header">
              <Link
                to="/"
                className="dhome__brand logo-link"
                aria-label="JAGAFasum — ke halaman utama"
              >
                <Logo className="dhome__logo" decorative />
                <span className="dhome__wordmark">{brand.name}</span>
              </Link>
              <h1 className="u-visually-hidden">Dashboard laporan</h1>
            </header>

            <div className="dhome__cta-row">
              <Link to="/dashboard/buat-laporan" className="dhome__cta">
                <PlusCircleIcon className="dhome__cta-icon" />
                {dashboardHome.cta}
              </Link>
            </div>

            <p className="dhome__banner">{dashboardHome.banner}</p>

            <ul className="dhome__stats" aria-label="Ringkasan laporan">
              {dashboardStats.map((stat, index) => (
                <DashStat
                  key={stat.id}
                  label={stat.label}
                  value={countFor(stat.status)}
                  tone={stat.id}
                  index={index}
                  active={filter === stat.status}
                  onClick={() =>
                    setFilter((current) =>
                      current === stat.status ? "all" : stat.status,
                    )
                  }
                />
              ))}
            </ul>

            <div className="dhome__toolbar">
              <ReportSearch
                value={query}
                onChange={setQuery}
                placeholder={dashboardHome.searchPlaceholder}
                label={dashboardHome.searchLabel}
              />
              <ReportFilter options={FILTERS} value={filter} onChange={setFilter} />
            </div>
          </div>
        </div>
      </section>

      <section className="dhome__list" aria-label="Daftar laporan">
        <div className="dhome__stage">
          <p className="u-visually-hidden" aria-live="polite">
            {visible.length} laporan ditampilkan
          </p>
          {visible.length ? (
            <ul key={`${filter}-${deferredQuery}`} className="dhome__grid">
              {visible.map((report, index) => (
                <li key={report.id} style={{ "--i": Math.min(index, 8) }}>
                  <ReportCard report={report} onOpen={setOpenReport} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="dhome__empty">
              <span className="dhome__empty-icon" aria-hidden="true">
                <SearchIcon />
              </span>
              <p className="dhome__empty-title">{dashboardHome.noResultTitle}</p>
              <p className="dhome__empty-body">{dashboardHome.noResultBody}</p>
              <button type="button" className="dhome__empty-btn" onClick={resetFilters}>
                {dashboardHome.noResultReset}
              </button>
            </div>
          )}
        </div>
      </section>

      <ReportDetailDialog report={openReport} onClose={() => setOpenReport(null)} />
    </div>
  )
}
