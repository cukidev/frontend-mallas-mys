import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/pages/Home.vue");
const Catalog = () => import("@/pages/Catalog.vue");
const Product = () => import("@/pages/Product.vue");
const Sizes = () => import("@/pages/Sizes.vue");
const About = () => import("@/pages/About.vue");
const Contact = () => import("@/pages/Contact.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home, meta: { title: "Inicio — Mallas MyS" } },
    { path: "/catalogo", name: "catalog", component: Catalog, meta: { title: "Catálogo — Mallas MyS" } },
    { path: "/producto/:slug", name: "product", component: Product, meta: { title: "Producto — Mallas MyS" } },
    { path: "/tallas", name: "sizes", component: Sizes, meta: { title: "Guía de tallas — Mallas MyS" } },
    { path: "/nosotras", name: "about", component: About, meta: { title: "Nosotras — Mallas MyS" } },
    { path: "/contacto", name: "contact", component: Contact, meta: { title: "Contacto — Mallas MyS" } }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

router.afterEach((to) => {
  if (to.meta?.title) document.title = String(to.meta.title);
});

export default router;
