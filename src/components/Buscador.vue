<template>
  <div class="container">
    <h1 class="display-4 text-center my-4">Buscando por {{ route.query.cadena }} ...</h1>
  </div>
  <div class="card mb-3">
    <div class="row g-0" v-for="movie in movies" :key="movie.id">
      <div class="col-md-4">
        <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" class="img-fluid rounded-start" alt="Movie Poster">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
          <p class="card-text"><strong>Fecha:</strong> {{ movie.release_date }}</p>
          <p class="card-text">{{ movie.overview.slice(0, 200) + '...' }}</p>
          <p class="card-text">Puntuación: {{ movie.vote_average *10 }} </p>


        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const movies = ref([]);
const loading = ref(false);
const error = ref(null);

const apiKey = '4431fed8390b02d6c28655feb536156a';

function searchMovies() {
  const searchQuery = route.query.cadena;
  if (!searchQuery) return; 

  loading.value = true;
  error.value = null;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&include_adult=false&language=en-US&page=1`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      movies.value = data.results;
      loading.value = false;
    })
    .catch(error => {
      console.error('Error al buscar películas:', error);
      loading.value = false;
      error.value = 'Error al buscar películas';
    });
}

searchMovies();
  </script>

  
  
  <style lang="scss" scoped>
  $color-primario: #183b31;
  $color-secundario: #C69774;
  $color-terciario: #F8DFD4;
  $color-cuarto: #FFEFE8;
  header {
    background-color: $color-primario;
    h1 {
      text-decoration: underline;
      color: $color-terciario;
    }
    p {
      color: $color-cuarto;
    }
  }
  </style>
  
  