<script setup>
import { computed, reactive, ref } from "vue";
/*
These are Icons that you can use, of course you can use other ones if you prefer.
*/
import { items } from "./movies.json";
import MovieItem from "./MovieItem.vue";

const movies = ref(items);

function updateRating(id, rating) {
  console.log(id, rating);
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

  form.id = movie.id;
  form.name = movie.name;
  form.description = movie.description;
  form.image = movie.image;
  form.inTheaters = movie.inTheaters;
  form.genres = movie.genres;

  showForm();
}

const errors = reactive({
  name: null,
  description: null,
  image: null,
  inTheaters: null,
  genres: null,
});
const form = reactive({
  id: null,
  name: null,
  description: null,
  image: null,
  inTheaters: false,
  genres: null,
});
const validations = reactive({
  name: "required",
  genres: "required",
});

const genres = reactive([
  { text: "Drama", value: "Drama" },
  { text: "Crime", value: "Crime" },
  { text: "Action", value: "Action" },
  { text: "Comedy", value: "Comedy" },
]);

const validationRules = (rule) => {
  if (rule === "required") return /^ *$/;

  return null;
};

function validate() {
  let valid = true;
  clearErrors();
  for (const [field, rule] of Object.entries(validations)) {
    const validation = validationRules(rule);
    if (validation) {
      if (validation.test(form[field] || "")) {
        errors[field] = `${field} is ${rule}`;
        valid = false;
      }
    }
  }

  return valid;
}

function saveMovie() {
  if (form.id) {
    updateMovie();
  } else {
    addMovie();
  }
}

function updateMovie() {
  if (validate()) {
    const movie = {
      id: form.id,
      name: form.name,
      description: form.description,
      image: form.image,
      genres: form.genres,
      inTheaters: form.inTheaters,
      rating: 0,
    };

    movies.value = movies.value.map((m) => {
      if (m.id === movie.id) {
        movie.rating = m.rating;
        return movie;
      }
      return m;
    });

    hideForm();
  }
}

function addMovie() {
  if (validate()) {
    const movie = {
      id: Number(Date.now()),
      name: form.name,
      description: form.description,
      image: form.image,
      genres: form.genres,
      inTheaters: form.inTheaters,
      rating: 0,
    };
    movies.value.push(movie);
    hideForm();
  }
}

function cleanUpForm() {
  form.id = null;
  form.name = null;
  form.description = null;
  form.image = null;
  form.genres = null;
  form.inTheaters = false;
  clearErrors();
}

function clearErrors() {
  errors.name = null;
  errors.description = null;
  errors.image = null;
  errors.genres = null;
  errors.inTheaters = null;
}

const showMovieForm = ref(false);
function hideForm() {
  showMovieForm.value = false;
  cleanUpForm();
}

function showForm() {
  showMovieForm.value = true;
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
    <div v-if="showMovieForm" class="modal-wrapper">
      <div class="modal-wrapper-inner">
        <form @submit.prevent="saveMovie">
          <div class="movie-form-input-wrapper">
            <label for="name">Name</label>
            <input
              type="text"
              name="name"
              v-model="form.name"
              class="movie-form-input"
            />
            <span class="movie-form-error">{{ errors.name }}</span>
          </div>
          <div class="movie-form-input-wrapper">
            <label for="description">Description</label>
            <textarea
              type="text"
              name="description"
              v-model="form.description"
              class="movie-form-textarea"
            />
            <span class="movie-form-error">{{ errors.description }}</span>
          </div>
          <div class="movie-form-input-wrapper">
            <label for="image">Image</label>
            <input
              type="text"
              name="image"
              v-model="form.image"
              class="movie-form-input"
            />
            <span class="movie-form-error">{{ errors.image }}</span>
          </div>
          <div class="movie-form-input-wrapper">
            <label for="genre">Genres</label>
            <select
              name="genre"
              v-model="form.genres"
              class="movie-form-input"
              multiple
            >
              <option
                v-for="option in genres"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
            <span class="movie-form-error">
              {{ errors.genres }}
            </span>
          </div>
          <div class="movie-form-input-wrapper">
            <label for="genre" class="movie-form-checkbox-label">
              <input
                type="checkbox"
                v-model="form.inTheaters"
                :true-value="true"
                :false-value="false"
                class="movie-form-checkbox"
              />
              <span>In theaters</span>
            </label>
            <span class="movie-form-error">
              {{ errors.inTheaters }}
            </span>
          </div>
          <div class="movie-form-actions-wrapper">
            <button type="button" class="button" @click="hideForm">
              Cancel
            </button>

            <button type="submit" class="button-primary">
              <span v-if="form.id">Update</span>
              <span v-else>Create</span>
            </button>
          </div>
        </form>
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
            'button-primary': !showMovieForm,
            'button-disabled': showMovieForm,
          }"
          @click="showForm"
          :disabled="showMovieForm"
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
