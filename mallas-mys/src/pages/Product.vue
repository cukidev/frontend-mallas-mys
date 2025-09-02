<script setup lang="ts">
import '@/styles/pages/Product.css'
import { computed, ref, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import productosData from '@/data/products.json'
import { isFavorite, toggleFavorite } from '@/utils/favorites'

const WA_NUMBER = '56986822895'
const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string

const products = [
  ...productosData.entrenamiento,
  ...productosData.competencia,
  ...productosData.accesorios,
]

const product = computed(() => products.find((p) => p.slug === slug))
const imagesMap = import.meta.glob('/src/assets/products/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const activeImg = ref('')
const chosenSize = ref<string>('')
const chosenColor = ref<string>('')
const fav = computed(() => (product.value ? isFavorite(product.value.id) : false))

// Referencias para el scroll de thumbnails
const thumbsContainer = ref<HTMLElement>()
const showLeftArrow = ref(false)
const showRightArrow = ref(false)
const currentIndex = ref(0)

// Calcular max visible thumbs según el viewport
const getMaxVisibleThumbs = () => {
  return window.innerWidth <= 640 ? 3 : 4 // 3 en móvil, 4 en desktop
}

const fmt = (v: number) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(v)

function addFav() {
  if (product.value) toggleFavorite(product.value.id)
}

function waHref() {
  const name = product.value?.name ?? ''
  const t = encodeURIComponent(
    `Hola, quiero cotizar ${name} talla ${chosenSize.value || '(por definir)'} color ${chosenColor.value || '(por definir)'}.`,
  )
  return `https://wa.me/${WA_NUMBER}?text=${t}`
}

function selectImage(imgPath: string) {
  activeImg.value = imgPath
}

function scrollThumbs(direction: 'left' | 'right') {
  if (!thumbsContainer.value || !product.value) return

  const totalThumbs = product.value.images.length
  const maxVisibleThumbs = getMaxVisibleThumbs()
  const thumbWidth = 72 // 64px width + 8px gap

  if (direction === 'left' && currentIndex.value > 0) {
    currentIndex.value--
  } else if (direction === 'right' && currentIndex.value < totalThumbs - maxVisibleThumbs) {
    currentIndex.value++
  }

  const newScrollPosition = currentIndex.value * thumbWidth
  thumbsContainer.value.style.transform = `translateX(-${newScrollPosition}px)`
  updateArrowsVisibility()
}

function updateArrowsVisibility() {
  if (!product.value) return

  const totalThumbs = product.value.images.length
  const maxVisibleThumbs = getMaxVisibleThumbs()
  showLeftArrow.value = currentIndex.value > 0
  showRightArrow.value = currentIndex.value < totalThumbs - maxVisibleThumbs
}

watch(
  product,
  (newProduct) => {
    if (newProduct && newProduct.images.length > 0) {
      activeImg.value = `/src/assets/products/${newProduct.images[0]}`
      // Resetear índice y actualizar flechas cuando cambie el producto
      currentIndex.value = 0
      nextTick(() => {
        if (thumbsContainer.value) {
          thumbsContainer.value.style.transform = 'translateX(0px)'
        }
        setTimeout(updateArrowsVisibility, 100)
      })
    }
  },
  { immediate: true },
)

onMounted(() => {
  if (!product.value) {
    router.replace('/catalogo')
  } else {
    // Verificar visibilidad de flechas después de que se monte el componente
    setTimeout(updateArrowsVisibility, 100)
  }
})
</script>

<template>
  <section v-if="product" class="product-page">
    <div class="product-grid">
      <div class="gallery">
        <div class="gallery-main">
          <img :src="imagesMap[activeImg]" :alt="product.name" class="w-full h-full object-cover" />
        </div>

        <div class="gallery-thumbs-container">
          <button v-show="showLeftArrow" class="nav-arrow left" @click="scrollThumbs('left')">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>

          <div class="gallery-thumbs-viewport">
            <div ref="thumbsContainer" class="gallery-thumbs">
              <button
                v-for="img in product.images"
                :key="img"
                class="thumb"
                :class="{ active: activeImg === `/src/assets/products/${img}` }"
                @click="selectImage(`/src/assets/products/${img}`)"
              >
                <img
                  :src="imagesMap[`/src/assets/products/${img}`]"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>

          <button v-show="showRightArrow" class="nav-arrow right" @click="scrollThumbs('right')">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div>
        <h1 class="info-title">{{ product.name }}</h1>
        <p class="info-meta">Categoría: {{ product.category }}</p>

        <!-- Precios con oferta especial -->
        <div class="pricing">
          <p class="info-price">{{ fmt(product.priceFrom) }} c/u</p>
          <div v-if="product.id === 5" class="offer-badge">
            <span class="offer-text">🔥 Oferta especial: 2x{{ fmt(5000) }}</span>
            <span class="savings">¡Ahorra {{ fmt(1000) }}!</span>
          </div>
        </div>

        <p class="info-text">{{ product.description }}</p>

        <div class="selects">
          <div>
            <label class="label">Talla</label>
            <select v-model="chosenSize" class="select">
              <option value="">Selecciona</option>
              <option v-for="s in product.sizes" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
          <div>
            <label class="label">Color</label>
            <select v-model="chosenColor" class="select">
              <option value="">Selecciona</option>
              <option v-for="c in product.colors" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
        </div>

        <div class="actions">
          <a :href="waHref()" target="_blank" rel="noopener" class="btn-primary"
            >Cotizar por WhatsApp</a
          >
          <router-link to="/tallas" class="btn-ghost">Ver guía de tallas</router-link>
        </div>

        <p class="note">No realizamos pagos en línea. Coordinamos por WhatsApp.</p>
      </div>
    </div>
  </section>
</template>
