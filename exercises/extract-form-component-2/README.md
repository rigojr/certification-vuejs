---
difficulty: 1
training: true
chapter: "Chapter 2: Vue.js Components"
tags: vue
---



# Extract Form Component

# Challenge Description

Now that we know how to extract a component, let's go a little bit further and extract the form to its own component. 
We will do similar to the last coding challenge, extracting the template and the logic for creating and editing a movie.

- Create a `MovieForm.vue` component.
- Move the template for a movie form into the `MovieForm.vue` component.
- Move the logic for validation into the `MovieForm.vue` component.
- Listen to custom events for that component.

## Requirements

- Move the current template for the form into the `MovieForm.vue` component.
- Replace the current part of our template where the form is displayed, with the `MovieForm.vue` component
- The `MovieForm.vue` component should have the following props:
  - `modelValue`: It should receive the movie object, it should be optional.
- Create `2` custom events in the `MovieForm.vue` component.
  - `update:modelValue`: Should be dispatched when the user clicks the `save` button and include the `form` as the payload
  - `cancel`: Should be dispatched when the user clicks the `cancel` button and requires no payload.
- The rest of our application functionality should still work as expected.


## Other Considerations

- If you see the `data-test` attribute anywhere in the boilerplate don't remove it.
- TailwindCSS is preinstalled with the default config. It might be helpful for you, if you want to have some styles. (Not obligatory)

## Example of finished App
This is an example of what the functionality should look like for the completed exercise. If you’d like to mimic this style, feel free to do so, but it is not required.
 
![Finished app in this challenge](https://i.imgur.com/FwQdY32.gif)


