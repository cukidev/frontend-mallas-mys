<script setup lang="ts">
import '@/styles/pages/About.css'
</script>

<template>
  <section class="about-page">
    <h1 class="about-title">Nosotras</h1>
    
    <div class="about-card">
      <p class="about-text">
        En <strong>Mallas MyS</strong> diseñamos mallas de patinaje artístico con cariño y detalle.
        Trabajamos por encargo para que tu malla refleje tu estilo y tu rutina.
      </p>
    </div>

    <!-- Nueva sección del equipo -->
    <div class="team-section">
      <h2 class="team-title">Nuestro Equipo</h2>
      
      <div class="team-grid">
        <div class="team-member">
          <div class="member-photo">
            <img 
              src="@/assets/logo.jpeg"
              alt="Macarena - Diseñadora"
              class="member-image"
            />
          </div>
          <div class="member-info">
            <h3 class="member-name">Macarena</h3>
            <p class="member-role">Ex-Patinadora y Diseñadora</p>
            <p class="member-description">
              Apasionada por el patinaje artístico y el diseño, Macarena crea cada malla 
              pensando en la comodidad y elegancia de las patinadoras.
            </p>
          </div>
        </div>

        <div class="team-member">
          <div class="member-photo">
            <img 
              img src="@/assets/logo.jpeg"
              alt="Susy - Confeccionista"
              class="member-image"
            />
          </div>
          <div class="member-info">
            <h3 class="member-name">Susy</h3>
            <p class="member-role">Confeccionista</p>
            <p class="member-description">
              Con años de experiencia en confección, Susy se encarga de dar vida 
              a cada diseño con precisión y cuidado en cada detalle.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
