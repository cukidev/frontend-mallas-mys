<script setup lang="ts">
import "@/styles/components/ProductCard.css";
import { computed } from "vue";
import { isFavorite, toggleFavorite } from "@/utils/favorites";
interface Product { id:number; slug:string; name:string; priceFrom:number; images:string[]; category:string; }
const props = defineProps<{ product: Product; imagesMap: Record<string, string> }>();
const fav = computed(() => isFavorite(props.product.id));
function onToggle(){ toggleFavorite(props.product.id); }
const fmt = (v:number)=> new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLP",maximumFractionDigits:0}).format(v);
</script>

<template>
  <article class="product-card">
    <div class="product-card-imgwrap">
      <img class="product-card-img" :src="imagesMap[`/src/assets/products/${product.images[0]}`]" :alt="product.name" loading="lazy"/>
      <button class="product-card-fav" @click="onToggle" :aria-pressed="fav" :aria-label="fav ? 'Quitar de favoritos' : 'Agregar a favoritos'">
        <span v-if="fav">♥</span><span v-else>♡</span>
      </button>
    </div>
    <div class="product-card-body">
      <h3 class="product-card-title">{{ product.name }}</h3>
      <p class="product-card-cat">{{ product.category }}</p>
      <p class="product-card-price">Desde {{ fmt(product.priceFrom) }}</p>
      <router-link :to="`/producto/${product.slug}`" class="product-card-cta">Ver</router-link>
    </div>
  </article>
</template>
