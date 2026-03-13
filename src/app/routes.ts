import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { Milestones } from "./pages/Milestones";
import { Feedback } from "./pages/Feedback";
import { Reports } from "./pages/Reports";
import { UserManagement } from "./pages/UserManagement";
import Login from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "projects", Component: Projects },
      { path: "milestones", Component: Milestones },
      { path: "feedback", Component: Feedback },
      { path: "reports", Component: Reports },
      { path: "users", Component: UserManagement },
    ],
  },
]);
