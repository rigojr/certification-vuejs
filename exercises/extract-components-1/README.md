---
difficulty: 1
training: true
chapter: "Chapter 2: Vue.js Components"
tags: vue
---

# Extract Components

# Challenge Description

So far, so good. 💪 In this challenge, let's extract some parts of our app into components.
This is good for keeping the code clean and organized code and allows us to abstract logic for reuse.

## Requirements

- Move the current template for a movie into the `MovieItem.vue` component.
- Replace the current part of our template where the movie is displayed with the `MovieItem.vue` component
- Create a computed property `notRated` in `MovieItem.vue` that is true when the rating is NOT defined as a positive number.
- The `MovieItem.vue` component should have the following props:
  - `movie`: It should receive the movie object.
- Create `3` custom events in the `MovieItem.vue` component.
  - `edit`: Should be dispatched when the user clicks the `edit` button with the `id` as parameter
  - `remove`: Should be dispatched when the user clicks the `remove` button with the `id` as parameter
  - `update:rating`: Should be dispatched when the user updates the rating with the `id` and the new `rating` as parameter
- Change the behavior of the `updateRating` to accept the movie `id` instead of the `movieIndex`
- Change the behavior of the `removeMovie` to accept the movie `id` instead of the `movieIndex`
- Change the behavior of the `editMovie` to accept the movie `id` instead of the `movieIndex`

## Other Considerations

- If you see the `data-test` attribute anywhere in the boilerplate don't remove it.
- TailwindCSS is preinstalled with the default config. It might be helpful for you, if you want to have some styles. (Not obligatory)

## Example of Finished App

This is an example of what the functionality should look like for the completed exercise. If you’d like to mimic this style, feel free to do so, but it is not required.

![Finished app in this challenge](https://i.imgur.com/FwQdY32.gif)
