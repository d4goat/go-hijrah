import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner : false })

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
    },
    {
      path: '/asmaul_husna',
      name: 'asmaul_husna',
      component: () => import("@/pages/Asmaul_Husna.vue")
    },
    {
      path: '/jadwal_sholat',
      name: 'jadwal_sholat',
      component: () => import("@/pages/JadwalSholat.vue")
    },
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
