
// @ == src folder
import { createRouter, createWebHistory } from 'vue-router'
import Welcome from "@/views/Welcome.vue";
import Controller from "@/views/Controller.vue";
import Settings from "@/views/Settings.vue";
import Player from "@/views/Player.vue";
import Streamer from "@/views/Streamer.vue";

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
    path: '/:slug(live|vod|series)',
    name: 'Controller',
    component: Controller,
    props: true,
    children: [
      {
        path: '',
        name: "Player",
        component: Player
      },
      {
        path: 'play',
        name: "Player",
        component: Player
      }
    ]
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/streamer',
    name: 'Streamer',
    component: Streamer,
  },
  // {
  //   path: '/play',
  //   name: 'Play',
  //   component: Player,
  // },
  // {
  //   path: '/:slug(\\d+-\\d+/?)',
  //   name: 'Player',
  //   component: Player,
  //   // props: true,
  //   // children: [
  //   //   {
  //   //     path: '',
  //   //     name: 'Default',
  //   //     redirect: function (route) {
  //   //       console.log(route.path);
  //   //       return route.path + '/play';
  //   //     },
  //   //   },
  //   // ]
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
