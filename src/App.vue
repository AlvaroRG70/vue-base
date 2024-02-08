<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <header class="row">
      

      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <img alt="Vue logo" class="logo col-2" src="./assets/movie.png" style="max-width: 50px;" />

          <a class="navbar-brand" href="#">CINEMACON</a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#"><RouterLink to="/">Home</RouterLink></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><a><RouterLink to="/watchlist">Watchlist</RouterLink></a></a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <RouterLink to="/film">Film</RouterLink>
                </a>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

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
  </div>
</template>

<script>

</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
