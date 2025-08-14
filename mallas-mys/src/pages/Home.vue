<script setup lang="ts">

import "@/styles/pages/Home.css";
import Hero from "@/components/Hero.vue";
import ProductCard from "@/components/ProductCard.vue";
import productosData from '@/data/products.json'
import { computed } from "vue";

const featured = computed(() => {
  const allProducts = [
    ...productosData.entrenamiento,
    ...productosData.competencia,
    ...productosData.accesorios
  ];
  return allProducts.filter(p => p.featured).slice(0, 3);
});

const imagesMap = import.meta.glob("/src/assets/products/*", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
</script>

<template>
  <Hero />
  <section class="home-section">
    <h2 class="home-title">Categorías</h2>
    <div class="home-categories">
      <router-link to="/catalogo?category=entrenamiento" class="home-card bg-brand-pinkBg/60">
        <h3 class="font-semibold text-gray-800">Mallas de entrenamiento</h3>
        <p class="text-sm text-gray-600 mt-1">Modelos sencillos.</p>
      </router-link>
      <router-link to="/catalogo?category=competencia" class="home-card bg-brand-lilacBg/60">
        <h3 class="font-semibold text-gray-800">Mallas de competencia</h3>
        <p class="text-sm text-gray-600 mt-1">Más tonos y detalles, con cristalería.</p>
      </router-link>
      <router-link to="/catalogo?category=accesorios" class="home-card bg-brand-yellowBg/60">
        <h3 class="font-semibold text-gray-800">Accesorios</h3>
        <p class="text-sm text-gray-600 mt-1">Complementos para el patinaje.</p>
      </router-link>
    </div>
  </section>

  <section class="home-section">
    <h2 class="home-title">Destacados</h2>
    <div class="home-grid">
      <ProductCard v-for="p in featured" :key="p.id" :product="p" :imagesMap="imagesMap" />
    </div>
  </section>
</template>
