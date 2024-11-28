<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next';
import { useDeviceSet } from '@/stores/device';

const isMobileMenuOpen = ref(false)

const route = useRoute()

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

watch(() => route.fullPath, () => {
  isMobileMenuOpen.value = false
})

const navLinks = [
  { to: '/quran', label: 'Al Quran' },
  { to: '/hadith', label: 'Hadits' },
  { to: '/asmaul_husna', label: 'Asmaul Husna' },
  { to: '/jadwal_sholat', label: 'Jadwal Sholat' }
]
</script>

<template>
  <div class="contents sm:p-5">
    <Popover v-slot="{ open, close }" class="relative">
      <div class="p-5 flex flex-row justify-between items-center bg-green-800 text-white border-b-2 border-gray-300">
        <div class="flex items-center text-3xl">
          <router-link :to="'/'" class="font-semibold hover:text-green-300 transition duration-300">
            Muslim Hub
          </router-link>
        </div>

        <div class="flex md:hidden gap-8 items-center">
          <router-link 
            v-for="link in navLinks" 
            :key="link.to" 
            :to="link.to" 
            class="relative group"
            @click="close" 
          >
            <span class="text-lg hover:text-green-300 transition duration-300">{{ link.label }}</span>
            <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-300"></span>
          </router-link>
        </div>

        <div class="lg:flex hidden items-center">
          <PopoverButton
            class="text-white focus:outline-none focus:border-none transition-transform duration-300"
            @click="toggleMobileMenu" 
          >
            <X v-if="open" class="w-6 h-6 transition-transform duration-300" />
            <Menu v-else class="w-6 h-6 transition-transform duration-300" />
          </PopoverButton>
        </div>
      </div>

      <transition 
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="-translate-y-10 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-10 opacity-0"
      >
        <PopoverPanel 
          v-if="open" 
          class="lg:flex hidden absolute z-50 w-full bg-green-800 shadow-lg"
        >
          <div class="flex flex-col p-4 w-full space-y-2">
            <router-link 
              v-for="link in navLinks" 
              :key="link.to" 
              :to="link.to" 
              @click="close"
              class="text-white text-lg py-2 border-b border-gray-300 transition duration-300 hover:bg-green-700"
            >
              {{ link.label }}
            </router-link>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>

    <RouterView class="min-h-screen p-5 transition-colors duration-300 bg-emerald-50/90 text-text" />
  </div>
</template>