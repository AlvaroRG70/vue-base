// router/router.js

import { createRouter, createWebHistory } from 'vue-router'
// Import your components
import Home from '@/components/Home.vue';
import Component1 from '@/components/Component1.vue';
import GetApi from '@/components/GetApi.vue';
import Buscador from '@/components/Buscador.vue';
import Watchlist from '@/components/Watchlist.vue';
import Film from '@/components/Film.vue';


// Define your routes
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/component1',
      name: 'component1',
      component: Component1
    },
    {
      path: '/getapi',
      name: 'getapi',
      component: GetApi
    },
    {
      path: '/buscador',
      name: 'buscador',
      component: Buscador
    },
    {
      path: '/watchlist',
      name: 'watchlist',
      component: Watchlist
    },
    {
      path: '/film',
      name: 'film',
      component: Film
    }
  ]
})
// Create the router instance

export default router;
