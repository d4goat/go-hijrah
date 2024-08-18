import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/Home.vue")
    },
    {
      path: '/quran',
      name: 'quran',
      component: () => import("@/pages/Quran.vue")
    },
    {
      path: '/quran/surah',
      name: 'quran.surah',
      component: () => import("@/pages/DetailQuran.vue")
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
