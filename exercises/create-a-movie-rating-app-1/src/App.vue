<script setup>
import { StarIcon } from "@heroicons/vue/24/solid";

import { reactive } from "vue";
import { items } from "./movies.json";

const movies = reactive(items);

/*
  This is an Icon that you can use to represent the stars if you like
  otherwise you could just use a simple ⭐️ emoji, or * character.
*/
</script>

<template>
  <div class="flex justify-center m-14">
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
          <span v-for="_ in movie.rating">
          ⭐️
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
