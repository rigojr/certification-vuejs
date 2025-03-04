<script setup>
import { computed } from "vue";
/*
These are Icons that you can use, of course you can use other ones if you prefer.
*/
import { PencilIcon, StarIcon, TrashIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  movie: { type: Object, default: null },
});

const emit = defineEmits(["edit", "remove", "update:rating"]);

const notRated = computed(() => {
  return Boolean(!props.movie?.rating);
});

function updateRating(rating) {
  emit("update:rating", props.movie.id, rating);
}

function removeMovie() {
  emit("remove", props.movie.id);
}

function editMovie() {
  emit("edit", props.movie.id);
}
</script>

<template>
  <div class="movie-item group">
    <div class="movie-item-image-wrapper">
      <div class="movie-item-star-wrapper">
        <StarIcon
          id="rating"
          class="movie-item-star-rating-icon"
          :class="{
            'text-yellow-500': !notRated,
            'text-gray-500': notRated,
          }"
        />
        <div class="movie-item-star-content-wrapper">
          <span
            v-if="!notRated"
            id="rating-stars"
            class="movie-item-star-content-rating-rated"
          >
            {{ movie.rating }}
          </span>
          <span v-else class="movie-item-star-content-rating-not-rated">
            -
          </span>
        </div>
      </div>
      <img
        v-if="movie?.image"
        :src="movie.image"
        class="movie-item-image"
        :alt="movie.name"
      />
      <span v-else class="movie-item-no-image">
        <span class="text-4xl text-white">No image</span>
      </span>
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
            @click="updateRating(star)"
          >
            <StarIcon class="movie-item-star-icon" />
          </button>
        </div>

        <div
          class="items-center justify-end hidden space-x-2 group-hover:flex shrink-0"
        >
          <div class="movie-item-actions-list-wrapper">
            <button class="movie-item-action-edit-button" @click="editMovie()">
              <PencilIcon class="w-4 h-4" />
            </button>
            <button
              class="movie-item-action-remove-button"
              @click="removeMovie()"
            >
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
