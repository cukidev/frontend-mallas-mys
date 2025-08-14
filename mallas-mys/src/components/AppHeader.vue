<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import '@/styles/components/AppHeader.css'

const open = ref(false)
const catalogoDropdownOpen = ref(false)

const closeCatalogoDropdown = () => {
  catalogoDropdownOpen.value = false
}

const handleCategoryClick = (category: string) => {
  const targetPath = `/catalogo?category=${category}`
  const currentPath = window.location.pathname + window.location.search

  // Si ya estamos en la misma ruta, forzamos un refresh
  if (
    currentPath === targetPath ||
    (window.location.pathname === '/catalogo' &&
      new URLSearchParams(window.location.search).get('category') === category)
  ) {
    window.location.href = targetPath
  } else {
    // Si es una ruta diferente, navegamos usando window.location
    window.location.href = targetPath
  }

  closeCatalogoDropdown()
  open.value = false
}
</script>

<template>
  <header class="app-header">
    <div class="app-header-inner">
      <RouterLink to="/" class="flex items-center gap-3">
        <img src="@/assets/logo.jpeg" alt="Mallas MyS" class="h-8 w-auto" />
        <span class="font-semibold text-gray-800">Mallas MyS</span>
      </RouterLink>

      <nav class="app-nav">
        <RouterLink to="/" class="app-nav-link">Inicio</RouterLink>

        <div
          class="catalogo-dropdown"
          @mouseenter="catalogoDropdownOpen = true"
          @mouseleave="catalogoDropdownOpen = false"
        >
          <button
            class="app-nav-link catalogo-btn"
            @click="catalogoDropdownOpen = !catalogoDropdownOpen"
          >
            Catálogo
            <svg
              class="dropdown-arrow"
              :class="{ 'rotate-180': catalogoDropdownOpen }"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M6 8L2 4h8L6 8z" />
            </svg>
          </button>

          <div v-if="catalogoDropdownOpen" class="dropdown-menu">
            <button @click="handleCategoryClick('entrenamiento')" class="dropdown-item">
              Mallas de entrenamiento
            </button>
            <button @click="handleCategoryClick('competencia')" class="dropdown-item">
              Mallas de competencia
            </button>
            <button @click="handleCategoryClick('accesorios')" class="dropdown-item">
              Accesorios de patinaje
            </button>
          </div>
        </div>

        <RouterLink to="/tallas" class="app-nav-link">Guía de tallas</RouterLink>
        <RouterLink to="/nosotras" class="app-nav-link">Nosotras</RouterLink>
        <RouterLink to="/contacto" class="app-nav-link">Contacto</RouterLink>
      </nav>

      <button class="app-menu-btn" @click="open = !open" aria-label="Abrir menú">☰</button>
    </div>

    <div v-if="open" class="app-mobile">
      <div class="app-mobile-list">
        <RouterLink @click="open = false" to="/">Inicio</RouterLink>

        <div class="mobile-catalogo-section">
          <button class="mobile-catalogo-btn" @click="catalogoDropdownOpen = !catalogoDropdownOpen">
            Catálogo
            <svg
              class="dropdown-arrow"
              :class="{ 'rotate-180': catalogoDropdownOpen }"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M6 8L2 4h8L6 8z" />
            </svg>
          </button>

          <div v-if="catalogoDropdownOpen" class="mobile-dropdown-menu">
            <button @click="handleCategoryClick('entrenamiento')" class="mobile-dropdown-item">
              Mallas de entrenamiento
            </button>
            <button @click="handleCategoryClick('competencia')" class="mobile-dropdown-item">
              Mallas de competencia
            </button>
            <button @click="handleCategoryClick('accesorios')" class="mobile-dropdown-item">
              Accesorios
            </button>
          </div>
        </div>

        <RouterLink @click="open = false" to="/tallas">Guía de tallas</RouterLink>
        <RouterLink @click="open = false" to="/contacto">Contacto</RouterLink>
      </div>
    </div>
  </header>
</template>
