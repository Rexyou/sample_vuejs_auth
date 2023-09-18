import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from "../stores/auth";

const Setting = () => import("../views/SettingView.vue");
const Login = () => import('../views/LoginView.vue');
const PathNotFound = () => import('../views/PageNotFoundView.vue')
const About = () => import('../views/AboutView.vue')
const Register = () => import('../views/RegisterView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    { path: '/:pathMatch(.*)*', component: PathNotFound },
  ]
})

router.beforeEach(async (to, from) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['login', 'register'];
  const authRequired = !publicPages.includes(to.name);
  const authStore = useAuthStore()

  if (authRequired && (!authStore.authUser || authStore.authUser == null)) {
    return { name: 'login' }
  }
  else if(authStore.authUser && publicPages.includes(to.name)){
    return { name: from.name }
  }

});

export default router
