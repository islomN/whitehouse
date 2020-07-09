import Vue from 'vue';
import Router from 'vue-router';
import TokenService from './services/TokenService';
import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Login from "@/pages/Login/index.vue";
import FileCategories from "@/pages/FileCategories";
import ProjectsAdmin from "@/pages/ProjectsAdmin";
import Users from "./pages/Users";

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
					name: "Объекты",
					component: ProjectsAdmin
				},
				{
					path: "user",
					name: "Пользователи",
					component: Users
				},
				{
					path: "file-categories",
					name: "Категории Файлов",
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
