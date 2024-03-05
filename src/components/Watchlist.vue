<template>
  <div class="container">
    <h1 class="display-2 text-center my-4">WATCHLIST</h1>
  
    <div v-if="movies.length === 0">
      <p>No hay películas en la lista.</p>
    </div>
    <div class="card mb-3" v-for="movie in movies.results" :key="movie.id">
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
            <p class="card-text">{{ movie.overview.slice(0, 200) + '...'}}</p>
            <p class="card-text">Puntuación: {{ (movie.vote_average * 10).toFixed(2) }}</p>
            <button class="btn btn-primary bg-dark" @click="$router.push('/film?id=' + movie.id)">Ver más</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script setup>
  import { ref, onMounted } from 'vue';
  const movies = ref([]);
 
  const getMovieCuenta = async () => {
    
    const usuarioId = ref(20862103)

    try {

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjVlZGRjMjk1MzZkMWZmYzRlNWZkYWNlNDdhZThjNyIsInN1YiI6IjY1OGFiMzFiYjdiNjlkMDk2MjZkZTczOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rufsppd2z4JY3JZaxJZDpC3FBWVswXCeqYoRkFl09ss'
        }
      };

      const respuesta = await fetch(`https://api.themoviedb.org/3/account/${usuarioId}/watchlist/movies`, options);
      const datos = await respuesta.json();
      movies.value = datos;

    }

    catch(error) {
      console.error('Error fetching movie:', error)
    }
  };

  

  onMounted(() => {
    getMovieCuenta();
  });

</script>

  
  <style lang="scss" scoped>
  </style>
  
  