import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import TopHeaderSearch from "@/components/topHeader/TopHeaderSearch.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("TopHeaderSearch.vue", () => {
  let store;
  let mutations;
  let state;

  beforeEach(() => {
    state = {
      searchTerm: "",
    };

    mutations = {
      setSearchTerm: jest.fn(),
      performSearch: jest.fn(),
    };

    store = new Vuex.Store({
      state,
      mutations,
    });
  });

  it("renders search input and button", () => {
    const wrapper = shallowMount(TopHeaderSearch, {
      store,
      localVue,
      stubs: {
        BaseBtn: {
          template: '<button><slot name="iconLeft"></slot></button>',
        },
      },
      // data() {
      //   return {
      //     assetOptions: ["all assets", "3D illustrations"],
      //   };
      // },
    });

    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect(input.attributes("placeholder")).toBe(
      "Search from 8 Million+ assets"
    );

    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);
  });

  it("updates searchTerm when input value changes", async () => {
    const wrapper = shallowMount(TopHeaderSearch, {
      store,
      localVue,
      stubs: {
        BaseBtn: {
          template: '<button><slot name="iconLeft"></slot></button>',
        },
      },
      // data() {
      //   return {
      //     assetOptions: ["all assets", "3D illustrations"],
      //   };
      // },
    });

    const input = wrapper.find("input");
    await input.setValue("new search term");
    expect(wrapper.vm.searchTerm).toBe("new search term");
  });

  it("calls performSearch method when enter key is pressed", async () => {
    const wrapper = shallowMount(TopHeaderSearch, {
      store,
      localVue,
      stubs: {
        BaseBtn: {
          template: '<button><slot name="iconLeft"></slot></button>',
        },
      },
      // data() {
      //   return {
      //     assetOptions: ["all assets", "3D illustrations"],
      //   };
      // },
    });

    const input = wrapper.find("input");
    await input.setValue("search term");
    await input.trigger("keyup.enter");
    expect(mutations.performSearch).toHaveBeenCalled();
  });
});
