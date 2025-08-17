<script setup lang="ts">
import '@/styles/pages/Product.css'
import { computed, ref, watch, onMounted } from 'vue'
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
  ...productosData.accesorios
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

watch(product, (newProduct) => {
  if (newProduct && newProduct.images.length > 0) {
    activeImg.value = `/src/assets/products/${newProduct.images[0]}`
  }
}, { immediate: true })

onMounted(() => {
  if (!product.value) {
    router.replace('/catalogo')
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
        <div class="gallery-thumbs">
          <button
            v-for="img in product.images"
            :key="img"
            class="thumb"
            :class="{ active: activeImg === `/src/assets/products/${img}` }"
            @click="activeImg = `/src/assets/products/${img}`"
          >
            <img
              :src="imagesMap[`/src/assets/products/${img}`]"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      <div>
        <h1 class="info-title">{{ product.name }}</h1>
        <p class="info-meta">Categoría: {{ product.category }}</p>
        <p class="info-price">Desde {{ fmt(product.priceFrom) }}</p>
        <p class="info-text"> {{ product.description }} </p>

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
          <!--
          <button class="btn-secondary" @click="addFav">
            <span v-if="fav">♥</span><span v-else>♡</span>&nbsp; Favoritos
          </button> -->
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
