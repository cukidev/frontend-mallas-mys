<script setup lang="ts">
import '@/styles/components/FiltersPanel.css'
import { computed } from 'vue'
import productsData from '@/data/products.json'

const props = defineProps<{
  modelValue: {
    category: string
    size: string
    color: string
    minPrice: number | null
    maxPrice: number | null
    sort: 'new' | 'price-asc' | 'price-desc'
    query: string
  }
}>()
const emit = defineEmits<{ 'update:modelValue': [typeof props.modelValue] }>()

function update<K extends keyof typeof props.modelValue>(k: K, v: (typeof props.modelValue)[K]) {
  emit('update:modelValue', { ...props.modelValue, [k]: v })
}

const availableSizes = computed(() => {
  let products = []
  
  // Obtener productos según la categoría seleccionada
  if (props.modelValue.category === 'entrenamiento') {
    products = productsData.entrenamiento
  } else if (props.modelValue.category === 'competencia') {
    products = productsData.competencia
  } else if (props.modelValue.category === 'accesorios') {
    products = productsData.accesorios
  } else {
    // Si no hay categoría seleccionada, combinar todos los productos
    products = [
      ...productsData.entrenamiento,
      ...productsData.competencia,
      ...productsData.accesorios
    ]
  }
  
  // Extraer todas las tallas únicas de los productos
  const allSizes = new Set<string>()
  products.forEach(product => {
    if (product.sizes && Array.isArray(product.sizes)) {
      product.sizes.forEach(size => allSizes.add(size))
    }
  })
  
  // Convertir a array y ordenar de manera inteligente
  const sizesArray = Array.from(allSizes)
  return sizesArray.sort((a, b) => {
    // Números primero
    const aIsNumber = !isNaN(Number(a))
    const bIsNumber = !isNaN(Number(b))
    
    if (aIsNumber && bIsNumber) {
      return Number(a) - Number(b)
    }
    if (aIsNumber && !bIsNumber) return -1
    if (!aIsNumber && bIsNumber) return 1
    
    // Letras simples antes que rangos
    const aIsRange = a.includes('-')
    const bIsRange = b.includes('-')
    
    if (!aIsRange && bIsRange) return -1
    if (aIsRange && !bIsRange) return 1
    
    // Orden alfabético para el resto
    return a.localeCompare(b)
  })
})
</script>

<template>
  <div class="filters">
    <input
      type="text"
      class="filters-input"
      placeholder="Buscar..."
      :value="modelValue.query"
      @input="update('query', ($event.target as HTMLInputElement).value)"
    />
    <select
      class="filters-select"
      :value="modelValue.category"
      @change="update('category', ($event.target as HTMLSelectElement).value)"
    >
      <option value="">Categoría</option>
      <option value="entrenamiento">Entrenamiento</option>
      <option value="competencia">Competencia</option>
      <option value="accesorios">Accesorios</option>
    </select>
    <select
      class="filters-select"
      :value="modelValue.size"
      @change="update('size', ($event.target as HTMLSelectElement).value)"
    >
      <option value="">Talla</option>
      <!-- Usar tallas dinámicas de productos disponibles -->
      <option
        v-for="t in availableSizes"
        :key="t"
        :value="t"
      >
        {{ t }}
      </option>
    </select>
    <select
      class="filters-select"
      :value="modelValue.color"
      @change="update('color', ($event.target as HTMLSelectElement).value)"
    >
      <option value="">Color</option>
      <option value="rosa">Rosa</option>
      <option value="morado">Morado</option>
      <option value="negro">Negro</option>
    </select>
    <select
      class="filters-sort"
      :value="modelValue.sort"
      @change="update('sort', ($event.target as HTMLSelectElement).value as any)"
    >
      <option value="new">Más nuevo</option>
      <option value="price-asc">Precio ↑</option>
      <option value="price-desc">Precio ↓</option>
    </select>
    <div class="filters-range">
      <input
        class="filters-range-input"
        type="number"
        min="0"
        placeholder="Precio mín"
        :value="modelValue.minPrice ?? ''"
        @input="update('minPrice', Number(($event.target as HTMLInputElement).value) || null)"
      />
      <input
        class="filters-range-input"
        type="number"
        min="0"
        placeholder="Precio máx"
        :value="modelValue.maxPrice ?? ''"
        @input="update('maxPrice', Number(($event.target as HTMLInputElement).value) || null)"
      />
    </div>
  </div>
</template>
