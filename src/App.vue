<script>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>

    <header class="row">

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <router-link to="/" class="navbar-brand">CINEMACON</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link to="/watchlist" class="nav-link">Watchlist</router-link>
              </li>
            
            </ul>
            <div class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="peliculaId">
              <button class="btn btn-outline-success" @click="$router.push('/buscador?cadena=' + peliculaId)">Buscar</button>
            </div>
          </div>
        </div>
      </nav>




      <!-- <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <img alt="Vue logo" class="logo col-2" src="./assets/movie.png" style="max-width: 50px;" />

          <a class="navbar-brand" href="#"><RouterLink to="/">CINEMACON</RouterLink></a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#"><a><RouterLink to="/watchlist">Watchlist</RouterLink></a></a>
              </li>
            </ul>
            <div class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="peliculaId">
              <button @click="$router.push('/buscador?cadena=' + peliculaId)"  class="btn-primary btn btn-outline-success">Buscador</button>
            </div>
          </div>
        </div>
      </nav> -->

<!-- 
      <nav class="col-10">
        <a><RouterLink to="/">Home</RouterLink></a>
        <a><RouterLink to="/component1">Component1</RouterLink></a>
        <a><RouterLink to="/getapi">Component2</RouterLink></a>
        <a><RouterLink to="/buscador">Buscador</RouterLink></a>
        <a><RouterLink to="/watchlist">Watchlist</RouterLink></a>
        <a><RouterLink to="/film">Film</RouterLink></a>

      </nav> -->
    </header>
  

    <main>
      <RouterView />
    </main>

</template>

<script setup>
  import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
header {
  line-height: 1.5;
}
header {
  margin: 0;
}

</style>
