<template>
  <div class="container">
    <h1 class="display-4 text-center my-4">Buscando por "{{ route.query.cadena }}"</h1>
    <div class="form-group">
      <label for="scoreRange">Filtrar por puntuación:</label>
      <input type="range" class="form-range" id="scoreRange" min="1" max="10" step="1" v-model="min_vote">
      <span>Media de películas: {{ min_vote }}</span>
    </div>
    <div>
      <button class="btn" @click= "orden = (orden +1 )%3" v-if="orden == 0">🔻</button>
      <button class="btn" @click= "orden = (orden +1 )%3" v-if="orden == 1">🔺</button>
      <button class="btn" @click= "orden = (orden +1 )%3" v-if="orden == 2"> ☒ </button>

    </div>
    <div class="card mb-3" v-for="movie in filteredMovies" :key="movie.id">
      <div class="row g-0">
        
        <div class="col-md-2 d-flex align-items-center justify-content-end">
          <div class="rounded overflow-hidden border border-dark">
            <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" class="img-fluid rounded-start" alt="Movie Poster">
            <img v-else src="../assets/noexiste.png" class="img-fluid rounded-start" alt="Movie Poster">
          </div>
        </div>

        <div class="col-md-10">
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text"><strong>Fecha:</strong> {{ movie.release_date }}</p>
            <p class="card-text">{{ movie.overview.slice(0, 200) + '...' }}</p>
            <p class="card-text">Puntuación: {{ (movie.vote_average * 10).toFixed(2) }}</p>
            <button class="btn btn-primary" @click="$router.push('/film?id=' + movie.id)">Ver más</button>    
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>





  
<script setup>
import { useRoute } from 'vue-router';
import { onMounted, onUpdated, ref, computed } from 'vue';

const route = useRoute();
const movies = ref([]);
const loading = ref(false);
const error = ref(null);
const min_vote = ref(0);
const orden = ref(0);



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


const sortedMoviesByReleaseDate = computed(() => {

  if (orden.value == 0){
    return movies.value

  } else if (orden.value == 1){  
    return [...movies.value].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

  } else{
    return [...movies.value].sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

  }


});

const filteredMovies = computed(() => {
  return sortedMoviesByReleaseDate.value.filter(movie => movie.vote_average >= min_vote.value);
});


onUpdated(()=> {
  searchMovies();
})

onMounted(()=> {
  searchMovies();
})



  </script>

  
  
  
