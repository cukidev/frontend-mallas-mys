<script setup lang="ts">
import "@/styles/components/WaButton.css";

const WA_NUMBER = "56986822895";
const msg = encodeURIComponent("Hola, quiero cotizar una malla de patinaje artístico 😊");
const href = `https://wa.me/${WA_NUMBER}?text=${msg}`;
</script>

<template>
  <a :href="href" target="_blank" rel="noopener" class="wa-btn" aria-label="Escríbenos por WhatsApp">
    WhatsApp
  </a>
</template>
