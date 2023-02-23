
// @ == src folder
import { createRouter, createWebHistory } from 'vue-router'
import Welcome from "@/views/Welcome.vue";
import Settings from "@/views/Settings.vue";
import Player from "@/views/Player.vue";

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
 {
    path: '/:slug(\\d+-\\d+/?)',
    name: 'Player',
    component: Player,
    // props: true,
    // children: [
    //   {
    //     path: '',
    //     name: 'Default',
    //     redirect: function (route) {
    //       console.log(route.path);
    //       return route.path + '/play';
    //     },
    //   },
    // ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
