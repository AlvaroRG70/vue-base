<template>
  <div class="container">
    <div class="row">
      <header class="col-12">
        <h1>CINEMACON</h1>
        <p>El mejor portal de cine que podrás encontrar.</p>
      </header>
    </div>
  </div>

  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div v-for="(movie, index) in movies" :key="index" :class="{ 'carousel-item': true, 'active': index === 0 }" data-bs-interval="4000">
        <img :src="getMovieImageUrl(movie.backdrop_path)" class="d-block w-100" alt="Movie Poster">
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


    



  <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen-1200x675.jpg" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>

  <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen-1200x675.jpg" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>  
</template>

<script setup>
import { ref, onMounted } from 'vue'


const apiKey = ref('4431fed8390b02d6c28655feb536156a')
const bearerToken = ref('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDMxZmVkODM5MGIwMmQ2YzI4NjU1ZmViNTM2MTU2YSIsInN1YiI6IjY1YThmOTNlYzRmNTUyMDEyNzhlNjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nArKWLxihtW5aycNC-GAqUwF7JGeo_Rj13o_5ZA7K3w')
const movies = ref([])


const getMoviesUrlApi = () => {
   fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey.value)
       .then(response => response.json())
       .then(data => movies.value = data.results.slice(0,3))
      
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
})




const getMovieImageUrl = (posterPath) => {
   if (posterPath) {
       return 'https://image.tmdb.org/t/p/w500/' + posterPath;
   }
}



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

