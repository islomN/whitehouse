import Vue from 'vue';
import Router from 'vue-router';
import TokenService from './services/TokenService';

import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Login from "@/pages/Login/index.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Projects from "@/pages/Projects";
import FileCategories from "@/pages/FileCategories";
import ProjectsAdmin from "@/pages/ProjectsAdmin";

Vue.use(Router);
const router = new Router({
	
	linkActiveClass: 'active',
	routes: [
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
				},
				{
					path: "file-categories",
					name: "file-categories",
					component: FileCategories
				}
			]
		},
		{
			path: '/login',
			component: Login
		}
	]
});

router.beforeEach((to, from, next) => {
	if (TokenService.getToken()) {
		if (to.path === '/login') {
			next({ path: '/' })
		}
		else {
			next()
		}
	}
	else {
		if (to.path === '/login') {
			next()
		} else {
			next(`/login`)
		}
	}
	
});

export default router;
