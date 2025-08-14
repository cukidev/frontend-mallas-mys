<script setup lang="ts">
import '@/styles/pages/Catalog.css'
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import productosData from '@/data/products.json'
import ProductCard from '@/components/ProductCard.vue'
import FiltersPanel from '@/components/FiltersPanel.vue'

const route = useRoute()
const router = useRouter()
const page = ref(1)
const pageSize = 9

const filters = ref({
  category: (route.query.category as string) || '',
  size: '',
  color: '',
  minPrice: null as number | null,
  maxPrice: null as number | null,
  sort: 'new' as 'new' | 'price-asc' | 'price-desc',
  query: '',
})

const imagesMap = import.meta.glob('/src/assets/products/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const products = computed(() => [
  ...productosData.entrenamiento,
  ...productosData.competencia,
  ...productosData.accesorios,
])

const filtered = computed(() => {
  let arr = products.value.slice()

  if (filters.value.category) {
    arr = arr.filter((p) => p.category === filters.value.category)
  }
  if (filters.value.size) {
    arr = arr.filter((p) => p.sizes.includes(filters.value.size))
  }
  if (filters.value.color) {
    arr = arr.filter((p) => p.colors.includes(filters.value.color))
  }
  if (filters.value.minPrice != null) {
    arr = arr.filter((p) => p.priceFrom >= (filters.value.minPrice as number))
  }
  if (filters.value.maxPrice != null) {
    arr = arr.filter((p) => p.priceFrom <= (filters.value.maxPrice as number))
  }
  if (filters.value.query) {
    const q = filters.value.query.toLowerCase()
    arr = arr.filter((p) => p.name.toLowerCase().includes(q) || p.slug.includes(q))
  }

  switch (filters.value.sort) {
    case 'price-asc':
      arr.sort((a, b) => a.priceFrom - b.priceFrom)
      break
    case 'price-desc':
      arr.sort((a, b) => b.priceFrom - a.priceFrom)
      break
    default:
      arr.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  }

  return arr
})

const visible = computed(() => filtered.value.slice(0, page.value * pageSize))
const canLoad = computed(() => visible.value.length < filtered.value.length)

const loadMore = () => {
  page.value++
}

watch(
  filters,
  (v) => {
    router.replace({
      query: {
        ...route.query,
        category: v.category || undefined,
      },
    })
  },
  { deep: true },
)
</script>

<template>
  <section class="catalog-page">
    <h1 class="catalog-title">Catálogo</h1>
    <p class="catalog-sub">Explora nuestras mallas y filtra por tus preferencias.</p>

    <div class="mt-4">
      <FiltersPanel v-model="filters" />
    </div>

    <div v-if="visible.length" class="catalog-grid">
      <ProductCard v-for="p in visible" :key="p.id" :product="p" :imagesMap="imagesMap" />
    </div>
    <p v-else class="catalog-empty">No encontramos resultados con esos filtros. ✨</p>

    <div v-if="canLoad" class="catalog-more">
      <button class="load-more-btn" @click="loadMore">Cargar más</button>
    </div>
  </section>
</template>
