<template>

  <div class="container">

    <div class="row" v-if="movie">
      <div class="col-md-12">
        <div class="row mb-3 border-top border-bottom mt-5">
          <div class="col-md-4 mb-3">

            <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" alt="Imagen de la película"
              class="img-fluid">
          </div>
          <div class="col-md-8">

            <h3 class="display-1 my-4">{{ movie.title }}</h3>
            <p>{{ movie.overview }}</p>
            <p>Puntuación: {{ (movie.vote_average * 10).toFixed(2) }}</p>
            <p>Fecha de lanzamiento: {{ movie.release_date }}</p>

            <p>Género:</p>
            <ul>
              <li v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</li>
            </ul>

            <p>Título original: {{ movie.original_language }}</p>

            <button @click="addToWatchlist" class="btn btn-primary bg-dark">Añadir a la lista de seguimiento</button>
            <button @click="deleteToWatchlist" class="btn btn-primary bg-dark">Eliminar de la lista de
              seguimiento</button>
            <router-link to="/" class="btn btn-primary bg-dark">Volver</router-link>



          </div>
        </div>
      </div>

      <h3 class="accordion-header" data-bs-toggle="collapse" data-bs-target="#providersCollapse" aria-expanded="false"
        aria-controls="providersCollapse">
        Proveedores de transmisión
      </h3>
      <div id="providersCollapse" class="accordion-collapse collapse" aria-labelledby="providersHeading"
        data-bs-parent="#accordionExample">
        <div class="row mb-5 mt-5">
          <div class="col-md-12">
            <div class="text-center" v-if="streamingProviders">
              <div v-if="streamingProviders.rent">
                <div v-for="provider in streamingProviders.rent" :key="provider.id" class="d-inline-block mx-2">
                  <img :src="'https://image.tmdb.org/t/p/w200' + provider.logo_path"
                    class="img-thumbnail rounded-circle" alt="Provider Logo" style="width: 100px; height: 100px;">
                </div>
              </div>
              <div v-else-if="streamingProviders.buy">
                <div>
                  <div v-for="provider in streamingProviders.buy" :key="provider.id" class="d-inline-block mx-2">
                    <img :src="'https://image.tmdb.org/t/p/w200' + provider.logo_path"
                      class="img-thumbnail rounded-circle" alt="Provider Logo" style="width: 100px; height: 100px;">
                  </div>
                </div>
              </div>
              
            </div>
            <div v-else>
              <p>No hay proveedores en España</p>
            </div>
          </div>
        </div>
      </div>


      <h3 class="accordion-header" data-bs-toggle="collapse" data-bs-target="#trailerCollapse" aria-expanded="false"
        aria-controls="trailerCollapse">
        Trailer
      </h3>
      <div id="trailerCollapse" class="accordion-collapse collapse" aria-labelledby="trailerHeading"
        data-bs-parent="#accordionExample">
        <div v-if="trailerVideo" class="text-center mb-5 mt-5">
          <iframe width="560" height="315" :src="'https://www.youtube.com/embed/' + trailerVideo.key" frameborder="0"
            allowfullscreen class="mx-auto d-block"></iframe>
        </div>
      </div>


      <h3 class="accordion-header" data-bs-toggle="collapse" data-bs-target="#similarCollapse" aria-expanded="false"
        aria-controls="similarCollapse">
        Similares
      </h3>
      <div id="similarCollapse" class="accordion-collapse collapse" aria-labelledby="similarHeading"
        data-bs-parent="#accordionExample">
        <div class="row mb-5 mt-5">
          <div class="col-md-3 mb-4" v-for="recommendation in movieRecommendations.results.slice(0,8)"
            :key="recommendation.id" @click="$router.push('/film?id=' + recommendation.id)">
            <div class="text-center">
              <img :src="'https://image.tmdb.org/t/p/w200/' + recommendation.poster_path" class="img-fluid rounded"
                alt="Recomendación Image">
            </div>
          </div>
        </div>
      </div>


      <h3 class="accordion-header" data-bs-toggle="collapse" data-bs-target="#commentsCollapse" aria-expanded="false"
        aria-controls="commentsCollapse">
        Comentarios 
      </h3>
      <div id="commentsCollapse" class="accordion-collapse collapse" aria-labelledby="commentsHeading"
        data-bs-parent="#accordionExample">
        <div class="row mb-5 mt-5">
          <div class="col-md-12">
            <div class="row" v-if="movieReviews">
              <div class="flex" v-for="(review, index) in movieReviews.results.slice(0, 8)" :key="index">
                <strong>Autor: {{ review.author }}</strong>
                <p>{{ review.content }}</p>
              </div>
            </div>
            <div v-else>
              <p>Lo sentimos, no hay comentarios</p>
            </div>
          </div>
        </div>
      </div>
      


      <h3 class="accordion-header" data-bs-toggle="collapse" data-bs-target="#castCollapse" aria-expanded="false"
        aria-controls="castCollapse">
        Elenco
      </h3>
      <div id="castCollapse" class="accordion-collapse collapse" aria-labelledby="castHeading"
        data-bs-parent="#accordionExample">
        <div class="row mb-5 mt-5">
          <div class="col-md-3" v-for="castMember in movie_cast.slice(0,8)" :key="castMember.id"
            @click="showActorDetails(castMember.id)">
            <div class="text-center mb-5">
              <img :src="'https://image.tmdb.org/t/p/w200/' + castMember.profile_path" class="img-fluid rounded-circle"
                alt="Actor Image">
              
            </div>
          </div>
        </div>
      </div>

      


      <div class="col-md-12">
        <div class="row mb-3 border-top border-bottom" v-if="selectedActor">
          <div class="col-md-4">
            <img :src="'https://image.tmdb.org/t/p/w200/' + selectedActor.profile_path" alt="imahen"
              class="img-fluid m-3 ">
          </div>
          <div class="col-md-8">
            <h3 class="display-1 my-4">{{ selectedActor.name }}</h3>
            <div>
              <p>Biografía: {{ selectedActor.biography }}</p>
              <p>Fecha de Nacimiento: {{ selectedActor.birthday }}</p>
              <p v-if="selectedActor.deathday">Fallecimiento: {{ selectedActor.deathday }}</p>
            </div>
          </div>
          <h3>Películas en las que ha participado</h3>
          <div class="row mb-5 mt-5">
            <div class="col-md-3 mb-4" v-for="movies in moviesActor.slice(0,8)"
              :key="movies.id">
              <div class="text-center">
                <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w200/' + movies.poster_path" class="img-fluid rounded"
                  alt="Recomendación Image">
                <img v-else src="../assets/noexiste.png" class="img-fluid rounded-start" alt="Movie Poster">
                
              </div>
            </div>
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
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  const apiKey = '4431fed8390b02d6c28655feb536156a';

  const movie = ref();
  const route = useRoute()
  const streamingProviders = ref([]);
  const movieCredits = ref([]);
  const movieReviews = ref();
  const movieVideos = ref();
  const movieRecommendations = ref([]);
  const movie_cast = ref([])
  const selectedActor = ref()
  const trailerVideo = ref()
  const moviesActor = ref()

  const getMovieDetails = async () => {

    const peliculaId = route.query.id

    try {

      const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${peliculaId}?api_key=${apiKey}&append_to_response=watch/providers,credits,reviews,videos,recommendations`);
      const datos = await respuesta.json();
      movie.value = datos;
      streamingProviders.value = datos['watch/providers'].results.ES;
      movieCredits.value = datos.credits;
      movie_cast.value = datos.credits.cast
      console.log(movie_cast.value)
      movieReviews.value = datos.reviews;
      movieVideos.value = datos.videos;
      movieRecommendations.value = datos.recommendations;

      const trailer = datos.videos.results.find(video => video.type === 'Trailer');
      if (trailer) {

        trailerVideo.value = trailer;
      }

    }

    catch (error) {
      console.error('Error fetching movie:', error)
    }
  };

  const showActorDetails = async (actorId) => {
    if (selectedActor.value && selectedActor.value.id === actorId) {

      selectedActor.value = null;
    } else {

      try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}&append_to_response=movie_credits`);
        const actorData = await response.json();
        selectedActor.value = actorData;
        moviesActor.value = actorData.movie_credits.cast
      } catch (error) {
        console.error('Error fetching actor details:', error);
      }
    }
  };

  const addToWatchlist = () => {
    const peliculaId = route.query.id
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjVlZGRjMjk1MzZkMWZmYzRlNWZkYWNlNDdhZThjNyIsInN1YiI6IjY1OGFiMzFiYjdiNjlkMDk2MjZkZTczOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rufsppd2z4JY3JZaxJZDpC3FBWVswXCeqYoRkFl09ss'
      },
      body: JSON.stringify({ media_type: 'movie', media_id: peliculaId, watchlist: true })
    };

    fetch('https://api.themoviedb.org/3/account/20862103/watchlist', options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar a la lista de seguimiento');
        }
        return response.json();
      })
      .then(data => {
        console.log('Película añadida a la lista de seguimiento:', data);
        alert('Película añadida a la lista de seguimiento');
      })
      .catch(error => {
        console.error('Error al agregar a la lista de seguimiento:', error);
      });
  };

  const deleteToWatchlist = () => {
    const peliculaId = route.query.id
    const options2 = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjVlZGRjMjk1MzZkMWZmYzRlNWZkYWNlNDdhZThjNyIsInN1YiI6IjY1OGFiMzFiYjdiNjlkMDk2MjZkZTczOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rufsppd2z4JY3JZaxJZDpC3FBWVswXCeqYoRkFl09ss'
      },
      body: JSON.stringify({ media_type: 'movie', media_id: peliculaId, watchlist: false })
    };

    fetch('https://api.themoviedb.org/3/account/20862103/watchlist', options2)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar a la lista de seguimiento');
        }
        return response.json();
      })
      .then(data => {
        console.log('Película eliminada a la lista de seguimiento:', data);
        alert('Película eliminada a la lista de seguimiento');
      })
      .catch(error => {
        console.error('Error al eliminar a la lista de seguimiento:', error);
      });
  };



  onMounted(() => {
    getMovieDetails();
  });

</script>

<style>
  .accordion-header {
    border-bottom: 1px solid #dee2e6;
    position: relative;
    cursor: pointer;
  }

  .accordion-header:after {
    content: "\eab2";
    /* flecha hacia abajo */
    font-family: "bootstrap-icons";
    /* usa las iconos de Bootstrap */
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    transition: transform 0.3s ease;
  }

  .accordion-header[aria-expanded="true"]:after {
    content: "\eab3";
    /* flecha hacia arriba */
  }
</style>