<script setup lang="ts">
import '@/styles/components/AppFooter.css'
import instagramIcon from '@/assets/logos/instagram.webp'
import tiktokIcon from '@/assets/logos/tiktok.webp'
</script>

<template>
  <footer class="footer">
    <div class="footer-grid">
      <div>
        <p class="footer-title">Mallas MyS</p>
        <p>Diseños para patinaje artístico, hechos a medida.</p>
        <p class="mt-2 text-xs text-gray-500">
          No realizamos pagos en línea. Coordinamos por WhatsApp.
        </p>
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
        <div class="social-links">
          <a
            href="https://www.instagram.com/mys.mallas/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Síguenos en Instagram"
            class="social-link"
          >
            <img :src="instagramIcon" alt="Instagram" class="social-icon-img" />
          </a>
          <a
            href="https://www.tiktok.com/@mys.mallas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Síguenos en TikTok"
            class="social-link"
          >
            <img :src="tiktokIcon" alt="TikTok" class="social-icon-img" />
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      © 2025 Mallas MyS | Página creada por:
      <a
        href="https://github.com/cukidev"
        target="_blank"
        rel="noopener noreferrer"
        class="developer-link"
      >
        Cukidev
      </a>
    </div>
  </footer>
</template>
