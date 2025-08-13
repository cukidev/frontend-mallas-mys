<script setup lang="ts">

import "@/styles/pages/Contact.css";

const WA_NUMBER = "56986822895";
const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola, quiero cotizar una malla 😊")}`;
</script>

<template>
  <section class="contact-page">
    <h1 class="contact-title">Contacto</h1>
    <div class="contact-grid">
      <form class="contact-form">
        <label class="contact-label" for="name">Nombre</label>
        <input id="name" type="text" class="contact-input" placeholder="Tu nombre" />

        <label class="contact-label mt-3" for="email">Email</label>
        <input id="email" type="email" class="contact-input" placeholder="tu@correo.com" />

        <label class="contact-label mt-3" for="msg">Mensaje</label>
        <textarea id="msg" class="contact-textarea" rows="4" placeholder="Cuéntanos tu idea"></textarea>

        <p class="contact-note">* Formulario de ejemplo, sin envío automático.</p>
        <a :href="href" target="_blank" rel="noopener" class="contact-whats">Escríbenos por WhatsApp</a>
      </form>

      <div class="contact-info">
        <h2 class="contact-info-title">¿Cómo trabajamos?</h2>
        <ul class="contact-info-list">
          <li>Definimos modelo, colores y talla.</li>
          <li>Te enviamos una cotización por WhatsApp.</li>
          <li>Coordinamos fechas y detalles.</li>
        </ul>
        <p class="contact-info-note">No realizamos pagos en línea.</p>
      </div>
    </div>
  </section>
</template>
