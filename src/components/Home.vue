<template>
  
  <div class="container">
    <h1 class="display-2 text-center my-4">CINEMACON</h1>
    <h1 class="display-8 text-center my-4">EL MEJOR PORTAL DE CINE DE TODOS LOS TIEMPOS</h1>
  

  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div v-for="(movie, index) in movies" :key="index" :class="{ 'carousel-item': true, 'active': index === 0 }" data-bs-interval="4000">
        <img :src="'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path" class="d-block w-100" alt="Movie Poster">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>



  <h1 class="display-4 text-center my-4">PELÍCULAS TOP RATED</h1>

   



  <div class="row">
    <div class="col-md-4" v-for="(movie, index) in top_rated" :key="index">
      <div class="card mb-4">
        <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" class="card-img-top" alt="Movie Poster">
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill "  :class="{'bg-warning text-dark': movie.vote_average >= 8.55, 'bg-success': movie.vote_average < 8.55 }">
            {{ (movie.vote_average * 10 ).toFixed(2)}}
            <span class="visually-hidden">unread messages</span>
        </span>

        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
          <p class="card-text">{{ movie.overview.slice(0, 200) + '...' }}</p>
          <button class="btn btn-primary" @click="$router.push('/film?id=' + movie.id)">Ver más</button>
        </div>
      </div>
    </div>
  </div>  
</div>





<main>
  <RouterView />
</main>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import {RouterView, useRoute} from 'vue-router'


const apiKey = ref('4431fed8390b02d6c28655feb536156a')
const bearerToken = ref('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDMxZmVkODM5MGIwMmQ2YzI4NjU1ZmViNTM2MTU2YSIsInN1YiI6IjY1YThmOTNlYzRmNTUyMDEyNzhlNjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nArKWLxihtW5aycNC-GAqUwF7JGeo_Rj13o_5ZA7K3w')
const movies = ref([])
const top_rated = ref([])


const getMoviesUrlApi = () => {
   fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey.value)
       .then(response => response.json())
       .then(data => movies.value = data.results.slice(0,3))  
}

const getMoviesUrlApi2 = () => {
   fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey.value)
       .then(response => response.json())
       .then(data => top_rated.value = data.results.slice(0,18))  
}

const getMoviesHeaderApi = () => {
   fetch('https://api.themoviedb.org/3/movie/popular', {
       headers: {
           'Authorization': 'Bearer ' + bearerToken.value
       }
   })
       .then(response => response.json())
       .then(data => movies.value = data.results)
}



onMounted(() => {
 getMoviesUrlApi()
 getMoviesUrlApi2()
})





</script>

<style lang="scss" scoped>
</style>

