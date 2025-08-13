<script setup lang="ts">
import "@/styles/components/AppFooter.css";
</script>

<template>
  <footer class="footer">
    <div class="footer-grid">
      <div>
        <p class="footer-title">Mallas MyS</p>
        <p>Diseños para patinaje artístico, hechos a medida.</p>
        <p class="mt-2 text-xs text-gray-500">No realizamos pagos en línea. Coordinamos por WhatsApp.</p>
      </div>
      <div>
        <p class="footer-title">Navegación</p>
        <ul class="mt-2 space-y-1">
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/catalogo">Catálogo</router-link></li>
          <li><router-link to="/tallas">Guía de tallas</router-link></li>
          <li><router-link to="/nosotras">Nosotras</router-link></li>
          <li><router-link to="/contacto">Contacto</router-link></li>
        </ul>
      </div>
      <div>
        <p class="footer-title">Redes</p>
        <ul class="mt-2 space-y-1">
          <li><a href="#" aria-label="Instagram">Instagram</a></li>
          <li><a href="#" aria-label="TikTok">TikTok</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">© 2025 Mallas MyS</div>
  </footer>
</template>
