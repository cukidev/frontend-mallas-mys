# 🩰 Mallas MyS - E-commerce de Mallas de Patinaje Artístico

Proyecto de e-commerce sencillo, sin pasarela de pago, para la marca **Mallas MyS**.  
Diseñado para mostrar productos, permitir a los usuarios agregar a favoritos y enviar cotizaciones por **WhatsApp**.

---

## 🚀 Tecnologías usadas
- [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- LocalStorage para favoritos (sin backend)
- Archivos de estilos `.css` externos por componente/página
- Iconos [Heroicons](https://heroicons.com/) / [Lucide](https://lucide.dev/) (opcional)

---

## 🎨 Branding
- Colores principales:
  - Rosa claro: `#F9A8D4`
  - Fucsia: `#E879F9`
  - Morado: `#A78BFA`
  - Acentos: `#FCE7F3` y `#F5D0FE`
- Estilo: femenino, deportivo y limpio
- Tipografía: Inter / sistema (`ui-sans-serif`)

---

## 📂 Estructura de carpetas
```
src/
 ├─ assets/           # Imágenes y estilos base
 │   ├─ products/     # Imágenes de productos
 │   └─ styles/
 │       ├─ tailwind.css
 │       └─ globals.css
 ├─ components/       # Componentes reutilizables
 │   ├─ AppHeader.vue
 │   ├─ AppHeader.css
 │   ├─ ProductCard.vue
 │   ├─ ProductCard.css
 │   └─ ...
 ├─ data/
 │   └─ products.json # Datos de ejemplo
 ├─ pages/            # Páginas principales
 │   ├─ Home.vue
 │   ├─ Home.css
 │   ├─ Catalog.vue
 │   ├─ Catalog.css
 │   └─ ...
 ├─ router/
 │   └─ index.ts
 ├─ App.vue
 └─ main.ts
```
