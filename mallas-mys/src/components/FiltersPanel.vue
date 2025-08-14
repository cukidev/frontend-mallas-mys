<script setup lang="ts">
import '@/styles/components/FiltersPanel.css'

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
      <option value="basica">Entrenamiento</option>
      <option value="intermedia">Competencia</option>
      <option value="premium">Accesorios</option>
    </select>
    <select
      class="filters-select"
      :value="modelValue.size"
      @change="update('size', ($event.target as HTMLSelectElement).value)"
    >
      <option value="">Talla</option>
      <option
        v-for="t in ['4', '6', '8', '10', '12', '14', '16', 'S', 'M', 'L']"
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
