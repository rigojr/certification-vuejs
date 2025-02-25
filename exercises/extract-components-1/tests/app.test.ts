import { describe, it, expect, beforeEach, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import App from "../src/App.vue";

let wrapper = null;
beforeEach(() => {
  wrapper = shallowMount(App);
});

describe("App", () => {});
