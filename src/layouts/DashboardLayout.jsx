import { useState } from "react"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router"
import Sidebar from "../components/dashboard/Sidebar/Sidebar"
import LogoutDialog from "../components/dashboard/LogoutDialog/LogoutDialog"
import useAuth from "../hooks/useAuth"
import useToast from "../hooks/useToast"
import { logoutDialog } from "../data/content"
import "./DashboardLayout.css"

/** Kerangka area dashboard: hanya untuk pengguna yang sudah login. */
export default function DashboardLayout() {
  const { user, isAuthenticated, logout } = useAuth()
  const { show } = useToast()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  if (!isAuthenticated) {
    // Saat logout lewat pop-up, biarkan navigasi ke beranda yang berjalan.
    if (signingOut) return null
    return <Navigate to="/login" replace state={{ from: pathname }} />
  }

  const handleLogout = () => {
    setSigningOut(true)
    navigate("/", { replace: true })
    logout()
    show(logoutDialog.toast, { tone: "info" })
  }

  return (
    <div className="dash">
      <Sidebar onLogout={() => setLogoutOpen(true)} />
      <main className="dash__main" id="main">
        <div key={pathname} className="dash__page">
          <Outlet context={{ user }} />
        </div>
      </main>
      <LogoutDialog
        open={logoutOpen}
        onCancel={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  )
}
