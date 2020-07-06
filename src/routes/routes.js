import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Projects from "../pages/Projects";
import ProjectsAdmin from "../pages/ProjectsAdmin";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "project-admin",
        name: "Admin",
        component: ProjectsAdmin
      },
        {
            path: "project",
            name: "User",
            component: Projects
        }
    ]
  }
];

export default routes;
