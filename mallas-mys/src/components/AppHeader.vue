<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import "@/styles/components/AppHeader.css";
const open = ref(false);
</script>

<template>
  <header class="app-header">
    <div class="app-header-inner">
      <RouterLink to="/" class="flex items-center gap-3">
        <img src="@/assets/logo.svg" alt="Mallas MyS" class="h-8 w-auto" />
        <span class="font-semibold text-gray-800">Mallas MyS</span>
      </RouterLink>

      <nav class="app-nav">
        <RouterLink to="/" class="app-nav-link">Inicio</RouterLink>
        <RouterLink to="/catalogo" class="app-nav-link">Catálogo</RouterLink>
        <RouterLink to="/tallas" class="app-nav-link">Guía de tallas</RouterLink>
        <RouterLink to="/contacto" class="app-nav-link">Contacto</RouterLink>
      </nav>

      <button class="app-menu-btn" @click="open = !open" aria-label="Abrir menú">☰</button>
    </div>

    <div v-if="open" class="app-mobile">
      <div class="app-mobile-list">
        <RouterLink @click="open=false" to="/">Inicio</RouterLink>
        <RouterLink @click="open=false" to="/catalogo">Catálogo</RouterLink>
        <RouterLink @click="open=false" to="/tallas">Guía de tallas</RouterLink>
        <RouterLink @click="open=false" to="/contacto">Contacto</RouterLink>
      </div>
    </div>
  </header>
</template>
