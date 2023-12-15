<script setup>
import { reactive } from "vue";

import { items } from "./movies.json";
import StartButton from './components/StartButton/StartButton.vue';

const movies = reactive(getMovies(items));

function getMovies(rawMovies) {
  rawMovies.forEach((movie) => {
    const rating = getMovieRating(movie.rating);

    movie.rating = rating;
  });

  return rawMovies;
}

function getMovieRating(rating) {
  const newRating = new Array(5).fill(undefined).map((_, index) => ({
    'isDisabled': index >= rating,
    'isClickable': index !== (rating - 1)
  }));

  return newRating;
}

function onRatingClicked(id, ratingIndex) {
  const movie = movies.find((movie) => movie.id === id);

  if (movie === undefined) {
    return;
  }

  movie.rating.forEach((rating, index) => {
    rating.isDisabled = index > ratingIndex;
    rating.isClickable = true;
  });

  movie.rating[ratingIndex].isClickable = false;
}

</script>

<template>
  <div class="flex justify-center">
    <div
      class="flex flex-col w-1/5 m-4 text-white"
      v-for="movie in movies"
    >
      <div class="h-96 rounded-t-md">
        <img
          class="object-fill"
          :src="movie.image"
          :alt="movie.name"
        />
      </div>
      <div class="flex flex-col flex-grow p-3 bg-white rounded-b-md">
        <p class="mb-1 text-lg text-black">{{ movie.name }}</p>
        <div>
          <span
            class="p-1 px-2 mr-1 text-sm text-white bg-purple-500 rounded-full"
            v-for="genre in movie.genres"
          >
            {{ genre }}
          </span>
        </div>
        <p class="m-1 text-base text-black">{{ movie.description }}</p>
        <p class="flex items-end flex-grow m-1 text-sm text-black">
          Rating:
          <div
            v-for="rating, index in movie.rating"
            class="flex"
          >
            <StartButton
              @click="onRatingClicked(movie.id, index)"
              v-bind="rating"
            />
          </div>
        </p>
      </div>
    </div>
  </div>
</template>
