<script setup lang="ts">
import { nextTick, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { Analytics } from '@vercel/analytics/vue'
</script>

<template>
  <main>
    <Analytics />
    <RouterView class="font-poppins" />
  </main>
</template>
