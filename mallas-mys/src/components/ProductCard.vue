<script setup lang="ts">
import '@/styles/components/ProductCard.css'
import { computed, ref } from 'vue'
import { isFavorite, toggleFavorite } from '@/utils/favorites'

interface Product {
  id: number
  slug: string
  name: string
  priceFrom: number
  images: string[]
  category: string
}

const props = defineProps<{ product: Product; imagesMap: Record<string, string> }>()

const fav = computed(() => isFavorite(props.product.id))

const currentImageIndex = ref(0)
const hasMultipleImages = computed(() => props.product.images.length > 1)

function onToggle() {
  toggleFavorite(props.product.id)
}

function nextImage() {
  if (currentImageIndex.value < props.product.images.length - 1) {
    currentImageIndex.value++
  } else {
    currentImageIndex.value = 0
  }
}

function prevImage() {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  } else {
    currentImageIndex.value = props.product.images.length - 1
  }
}

function goToImage(index: number) {
  currentImageIndex.value = index
}

const fmt = (v: number) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(v)
</script>

<template>
  <article class="product-card">
    <div class="product-card-imgwrap">
      <!-- Imagen con carrusel -->
      <img
        class="product-card-img"
        :src="imagesMap[`/src/assets/products/${product.images[currentImageIndex]}`]"
        :alt="product.name"
        loading="lazy"
      />
      
      <!-- Controles del carrusel solo si hay múltiples imágenes -->
      <template v-if="hasMultipleImages">
        <!-- Botones de navegación -->
        <button 
          class="carousel-btn carousel-btn-prev" 
          @click="prevImage"
          aria-label="Imagen anterior"
        >
          ‹
        </button>
        <button 
          class="carousel-btn carousel-btn-next" 
          @click="nextImage"
          aria-label="Siguiente imagen"
        >
          ›
        </button>
        
        <!-- Indicadores de puntos -->
        <div class="carousel-indicators">
          <button
            v-for="(_, index) in product.images"
            :key="index"
            class="carousel-dot"
            :class="{ active: index === currentImageIndex }"
            @click="goToImage(index)"
            :aria-label="`Ir a imagen ${index + 1}`"
          />
        </div>
      </template>

      <button
        class="product-card-fav"
        @click="onToggle"
        :aria-pressed="fav"
        :aria-label="fav ? 'Quitar de favoritos' : 'Agregar a favoritos'"
      >
        <span v-if="fav">♥</span><span v-else>♡</span>
      </button>
    </div>
    <div class="product-card-body">
      <h3 class="product-card-title">{{ product.name }}</h3>
      <p class="product-card-cat">{{ product.category }}</p>
      <p class="product-card-price">Desde {{ fmt(product.priceFrom) }}</p>
      <router-link :to="`/producto/${product.slug}`" target="_blank" rel="noopener" class="product-card-cta">Ver</router-link>
    </div>
  </article>
</template>
