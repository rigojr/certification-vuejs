<script setup>
import { computed, ref } from "vue";
/*
These are Icons that you can use, of course you can use other ones if you prefer.
*/
import { items } from "./movies.json";
import MovieItem from "./MovieItem.vue";
import MovieForm from "./MovieForm.vue";

const movies = ref(items);
const selectedMovie = ref(undefined);
const isMovieFormVisible = ref(false);

function updateRating(id, rating) {
  const movie = movies.value.find((movie) => movie.id === id);

  if (movie === undefined) {
    return;
  }

  movie.rating = rating;
}

function removeMovie(id) {
  const movieIndex = movies.value.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return;
  }

  movies.value = movies.value.filter((movie, index) => index !== movieIndex);
}

function editMovie(id) {
  const movie = movies.value.find((movie) => movie.id === id);

  if (movie === undefined) {
    return;
  }

  selectedMovie.value = movie;

  showForm();
}

function saveMovie(effectiveMovie) {
  const isNewMovie = effectiveMovie.id === undefined;

  if (!isNewMovie) {
    updateMovie(effectiveMovie);

    return;
  }

  addMovie(effectiveMovie);
}

function updateMovie(updatedMovie) {
  movies.value = movies.value.map((movie) => {
    if (movie.id === updatedMovie.id) {
      return updatedMovie;
    }

    return movie;
  });

  hideForm();
}

function addMovie(newMovie) {
  movies.value.push({
    ...newMovie,
    id: movies.value.length + 1
  });

  hideForm();
}

function hideForm() {
  isMovieFormVisible.value = false;
  selectedMovie.value = undefined;
}

function showForm() {
  isMovieFormVisible.value = true;
}

const averageRating = computed(() => {
  const avg = movies.value
    .map((movie) => parseInt(movie.rating || 0))
    .reduce((a, b) => a + b, 0);

  return Number(avg / movies.value.length).toFixed(1);
});

const totalMovies = computed(() => {
  return movies.value.length;
});

function removeRatings() {
  movies.value = movies.value.map((movie) => {
    movie.rating = 0;
    return movie;
  });
}
</script>

<template>
  <div class="app">
    <div v-if="isMovieFormVisible" class="modal-wrapper">
      <div class="modal-wrapper-inner">
        <MovieForm
          :modelValue="selectedMovie"
          @update:modelValue="saveMovie"
          @cancel="hideForm"
        />
      </div>
    </div>
    <div class="movie-actions-list-wrapper">
      <div class="movie-actions-list-info">
        <span>Total Movies: {{ totalMovies }}</span>
        <span> / </span>
        <span>Average Rating: {{ averageRating }}</span>
      </div>
      <div class="flex-spacer"></div>
      <div class="movie-actions-list-actions">
        <button
          class="self-end movie-actions-list-action-button button-primary justify-self-end"
          @click="removeRatings"
        >
          Remove Ratings
        </button>
        <button
          class="movie-actions-list-action-button"
          :class="{
            'button-primary': !isMovieFormVisible,
            'button-disabled': isMovieFormVisible,
          }"
          @click="showForm"
          :disabled="isMovieFormVisible"
        >
          Add Movie
        </button>
      </div>
    </div>
    <div class="movie-list">
      <MovieItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @edit="editMovie"
        @remove="removeMovie"
        @update:rating="updateRating"
      />
    </div>
  </div>
</template>

<style>
.app {
  background-color: black;
}
</style>
