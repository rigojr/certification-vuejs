<script setup>
import { ref } from "vue";
import { StarIcon } from "@heroicons/vue/24/solid";
import { items } from "./movies.json";
const movies = ref(items);

function updateRating(movieIndex, rating) {
  movies.value[movieIndex].rating = rating;
}

function getRating(rating) {
  if (rating === null) {
    return "-";
  }

  return rating;
}
</script>

<template>
  <div class="app">
    <div class="movie-list">
      <div
        class="movie-item"
        v-for="(movie, movieIndex) in movies"
        :key="movie.id"
      >
        <div class="movie-item-image-wrapper">
          <div
            class="movie-item-image-rating-wrapper"
            :class="{
              'movie-item-image-rating-wrapper--no-rating':
                movie.rating === null,
            }"
          >
            <StarIcon />
            <p class="movie-item-image-rating">
              {{ getRating(movie.rating) }}
            </p>
          </div>
          <img :src="movie.image" class="movie-item-image" alt="" />
        </div>

        <div class="movie-item-content-wrapper">
          <div class="movie-item-title-wrapper">
            <h3 class="movie-item-title">{{ movie.name }}</h3>
            <div class="movie-item-genres-wrapper">
              <span
                v-for="genre in movie.genres"
                :key="`${movie.id}-${genre}`"
                class="movie-item-genre-tag"
                >{{ genre }}</span
              >
            </div>
          </div>
          <div class="movie-item-description-wrapper">
            <p class="movie-item-description">{{ movie.description }}</p>
          </div>
          <div class="movie-item-rating-wrapper">
            <span class="movie-item-rating-text">
              Rating: ({{ movie.rating }}/5)
            </span>

            <div class="movie-item-star-icon-wrapper">
              <button
                v-for="star in 5"
                :key="star"
                class="movie-item-star-icon-button"
                :class="[
                  star <= movie.rating ? 'text-yellow-500' : 'text-gray-500',
                ]"
                :disabled="star === movie.rating"
                @click="updateRating(movieIndex, star)"
              >
                <StarIcon class="movie-item-star-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.movie-item-image-wrapper {
  position: relative;
}

.movie-item-image-rating-wrapper {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 36px;

  svg {
    color: yellow;
  }
}

.movie-item-image-rating-wrapper--no-rating {
  svg {
    color: gray;
  }
}

.movie-item-image-rating {
  font-size: 12px;
  position: absolute;
  top: 10px;
  right: 14px;
}
</style>
