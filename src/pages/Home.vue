<template>
    <div class="min-h-screen transition-colors duration-300 bg-gradient-to-b from-white via-blue-50/30 to-green-50/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-green-900/30">
      <div class="container flex flex-col items-center pt-28 px-4">
        <TransitionRoot appear :show="isVisible" as="template">
          <div class="w-full md:w-[80%] lg:w-[60%] text-center space-y-8">
            <!-- Hero Title -->
            <TransitionChild
              as="template"
              enter="transform transition duration-1000"
              enter-from="opacity-0 translate-y-4"
              enter-to="opacity-100 translate-y-0"
              leave="transform duration-300 transition ease-in-out"
              leave-from="opacity-100 translate-y-0"
              leave-to="opacity-0 translate-y-4"
            >
              <div class="relative">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-wide capitalize mb-3 text-gray-800 dark:text-gray-100">
                  Dapatkan Cahaya Islam Dalam Genggaman Dengan
                  <span class="relative inline-block">
                    <span class="relative z-10 font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-300">
                      Muslim Hub
                    </span>
                  </span>
                </h1>
              </div>
            </TransitionChild>
  
            <!-- Subtitle -->
            <TransitionChild
              as="template"
              enter="transform transition duration-1000 delay-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transform duration-300 transition ease-in-out"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="space-y-6">
                <p class="font-medium text-xl md:text-2xl capitalize text-gray-700 dark:text-gray-200">
                  Penuhi Kebutuhan Islamimu Dengan Muslim Hub
                </p>
                <p class="font-medium text-xl md:text-2xl capitalize text-gray-600 dark:text-gray-300">
                  Akses Kapan Saja dan Dimana Saja
                </p>
              </div>
            </TransitionChild>
  
            <!-- Buttons -->
            <TransitionChild
              as="template"
              enter="transform transition duration-1000 delay-500"
              enter-from="opacity-0 translate-y-4"
              enter-to="opacity-100 translate-y-0"
              leave="transform duration-300 transition ease-in-out"
              leave-from="opacity-100 translate-y-0"
              leave-to="opacity-0 translate-y-4"
            >
              <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <a href="#" class="px-8 py-3 bg-emerald-600 dark:bg-emerald-500 text-white rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors duration-300 shadow-lg hover:shadow-xl dark:shadow-emerald-700/20">
                  Mulai Sekarang
                </a>
              </div>
            </TransitionChild>
  
          </div>
        </TransitionRoot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { TransitionRoot, TransitionChild } from '@headlessui/vue'
  
  const isVisible = ref(false)
  
  onMounted(() => {
    isVisible.value = true
  })
  </script>