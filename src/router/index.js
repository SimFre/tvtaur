
// @ == src folder
import { createRouter, createWebHistory } from 'vue-router'
import Start from "@/views/Start.vue";

const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
