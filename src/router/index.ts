import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner : false })

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
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
        {
          path: '/hadith',
          name: 'hadith',
          component: () => import('@/pages/Hadith.vue')
        },
        {
          path: '/hadith/list',
          name: 'hadith.list',
          component: () => import("@/pages/HadithList.vue")
        },
        {
          path: '/doa_harian',
          name: 'doa_harian',
          component: () => import("@/pages/Doa_Harian.vue")
        },
        {
          path: '/shalawat_nabi',
          name: 'shalawat_nabi',
          component: () => import("@/pages/Shalawat_Nabi.vue")
        },
      ]
    },
    {
      path: '/404',
      name: '/404',
      component: () => import('@/pages/NotFound.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if(to.name){
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
