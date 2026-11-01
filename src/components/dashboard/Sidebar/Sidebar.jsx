import { Link, NavLink } from "react-router"
import Logo from "../../ui/Logo/Logo"
import { NAV_ICONS } from "../../icons/DashboardIcons"
import { dashboardNav, logoutNav } from "../../../data/content"
import "./Sidebar.css"

/** Sidebar hijau: logo + 4 menu navigasi + tombol Keluar (membuka pop-up). */
export default function Sidebar({ onLogout }) {
  const LogoutIcon = NAV_ICONS[logoutNav.icon]

  return (
    <aside className="sidebar">
      <Link
        to="/"
        className="sidebar__brand logo-link"
        aria-label="JAGAFasum — ke halaman utama"
      >
        <Logo decorative />
      </Link>

      <nav className="sidebar__nav" aria-label="Menu dashboard">
        <ul className="sidebar__list">
          {dashboardNav.map((item, index) => {
            const Icon = NAV_ICONS[item.icon]
            return (
              <li
                key={item.id}
                className="sidebar__item"
                style={{ "--i": index }}
              >
                <NavLink
                  to={item.to}
                  end={item.end}
                  className="sidebar__btn"
                  aria-label={item.label}
                >
                  <Icon className="sidebar__icon" />
                  <span className="sidebar__label">{item.label}</span>
                </NavLink>
              </li>
            )
          })}
          <li
            className="sidebar__item sidebar__item--logout"
            style={{ "--i": dashboardNav.length }}
          >
            <button
              type="button"
              className="sidebar__btn sidebar__btn--logout"
              onClick={onLogout}
              aria-label={logoutNav.label}
              aria-haspopup="dialog"
            >
              <LogoutIcon className="sidebar__icon" />
              <span className="sidebar__label">{logoutNav.label}</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
