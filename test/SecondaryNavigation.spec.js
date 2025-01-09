import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import SecondaryNavigation from "@/components/SecondaryNavigation.vue";
import NuxtLink from "@nuxt/components/nuxt-link";

const localVue = createLocalVue();
localVue.use(Vuex);

localVue.component("NuxtLink", NuxtLink);

describe("SecondaryNavigation.vue", () => {
  let store;
  let state;

  beforeEach(() => {
    state = {
      storeSearchTerm: "exampleSearchTerm",
    };

    store = new Vuex.Store({
      state,
    });
  });

  it("renders navigation items correctly", () => {
    const wrapper = shallowMount(SecondaryNavigation, {
      localVue,
      store,
      computed: {
        navigationItems() {
          return [
            { id: 1, asset: "asset1", title: "Title 1" },
            { id: 2, asset: "asset2", title: "Title 2" },
          ];
        },
      },
    });

    const navItems = wrapper.findAll(".nav-item");
    expect(navItems.length).toBe(2);
    expect(navItems.at(0).text()).toBe("Title 1");
    expect(navItems.at(1).text()).toBe("Title 2");
  });

  it("generates correct links", () => {
    const wrapper = shallowMount(SecondaryNavigation, {
      localVue,
      store,
      computed: {
        navigationItems() {
          return [
            { id: 1, asset: "asset1", title: "Title 1" },
            { id: 2, asset: "asset2", title: "Title 2" },
          ];
        },
      },
    });

    const navLinks = wrapper.findAllComponents(NuxtLink);
    expect(navLinks.at(0).props("to")).toBe("/asset1/exampleSearchTerm");
    expect(navLinks.at(1).props("to")).toBe("/asset2/exampleSearchTerm");
  });
});
