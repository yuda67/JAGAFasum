import { createBrowserRouter } from "react-router"
import RootLayout from "./layouts/RootLayout"
import AuthLayout from "./layouts/AuthLayout"
import DashboardLayout from "./layouts/DashboardLayout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import NotFoundPage from "./pages/NotFoundPage"
import DashboardHomePage from "./pages/dashboard/DashboardHomePage"
import CreateReportPage from "./pages/dashboard/CreateReportPage"
import MyReportsPage from "./pages/dashboard/MyReportsPage"
import ProfilePage from "./pages/dashboard/ProfilePage"

// BASE_URL bisa berupa path ("/") atau URL lengkap saat deploy → ambil path-nya saja.
const basename = new URL(import.meta.env.BASE_URL, window.location.origin)
  .pathname

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: RootLayout,
      children: [
        { index: true, Component: HomePage },
        {
          Component: AuthLayout,
          children: [
            { path: "login", Component: LoginPage },
            { path: "register", Component: RegisterPage },
          ],
        },
        {
          path: "dashboard",
          Component: DashboardLayout,
          children: [
            { index: true, Component: DashboardHomePage },
            { path: "buat-laporan", Component: CreateReportPage },
            { path: "laporan", Component: MyReportsPage },
            { path: "profil", Component: ProfilePage },
          ],
        },
        { path: "*", Component: NotFoundPage },
      ],
    },
  ],
  { basename },
)
