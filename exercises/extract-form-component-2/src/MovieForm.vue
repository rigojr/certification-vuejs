<script setup>
import { reactive } from "vue";

const emit = defineEmits(["update:modelValue", "cancel"]);
const props = defineProps({
  modelValue: { type: Object, default: null },
});

const genres = reactive([
  { text: "Drama", value: "Drama" },
  { text: "Crime", value: "Crime" },
  { text: "Action", value: "Action" },
  { text: "Comedy", value: "Comedy" },
]);
const errors = reactive({
  name: null,
  description: null,
  image: null,
  inTheaters: null,
  genres: null,
  rating: null,
});

const form = reactive({
  id: props.modelValue?.id,
  name: props.modelValue?.name,
  description: props.modelValue?.description,
  image: props.modelValue?.image,
  inTheaters: props.modelValue?.inTheaters || false,
  genres: props.modelValue?.genres || [],
  rating: props.modelValue?.rating || null,
});

const validations = reactive({
  name: "required",
  genres: "required",
});

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
function cancelForm() {
  cleanUpForm();
  emit("cancel");
}

function saveMovie() {
  if (validate()) {
    const data = {
      id: form.id || Number(Date.now()),
      name: form.name,
      description: form.description,
      image: form.image,
      genres: form.genres,
      inTheaters: form.inTheaters,
      rating: form.rating,
    };
    emit("update:modelValue", data);
  }
}

function cleanUpForm() {
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
</script>

<template>
  <form @submit.prevent="saveMovie">
    <input type="hidden" name="id" v-model="form.id" />
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
      <button type="button" class="button" @click="cancelForm">Cancel</button>

      <button type="submit" class="button-primary">
        <span v-if="form.id">Save</span>
        <span v-else>Create</span>
      </button>
    </div>
  </form>
</template>
