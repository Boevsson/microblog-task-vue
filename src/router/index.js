import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import DashboardView from '../views/DashboardView.vue'
import AuthLoginView from '@/views/auth/AuthLoginView.vue'
import guest from '@/router/middleware/guest'
import auth from '@/router/middleware/auth'
import middlewarePipeline from '@/router/middlewarePipeline'

Vue.use(VueRouter)

const routes = [
	{
		path: '',
		redirect: '/dashboard'
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: DashboardView
	},	
	{
		path: '/posts',
		name: 'posts',
		component: () => import('../views/posts/ListPostsView.vue'),
		meta: {
			middleware: [auth]
		}
	},
	{
		path: '/create-post',
		name: 'create-post',
		component: () => import('../views/posts/CreatePostView.vue'),
		meta: {
			middleware: [auth]
		}
	},
	{
		path: '/update-post/:id',
		name: 'update-post',
		component: () => import('../views/posts/UpdatePostView.vue'),
		meta: {
			middleware: [auth]
		}
	},
	{
		path: '/login',
		component: AuthLoginView,
		meta: {
			middleware: [guest],
		},
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

router.beforeEach((to, from, next) => {
	if (!to.meta.middleware) {
		return next()
	}
	
	const middleware = to.meta.middleware
	const context = {
		to,
		from,
		next,
		store
	}
	
	return middleware[0]({ ...context, nextMiddleware: middlewarePipeline(context, middleware, 1) })
})

export default router
