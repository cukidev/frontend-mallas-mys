<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import WaButton from "@/components/WaButton.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col bg-brand-pinkBg/40">
    <AppHeader />
    <main class="flex-1">
      <router-view />
    </main>
    <AppFooter />
    <WaButton />
  </div>
</template>
