import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import FiltersMenu from "@/components/FiltersMenu.vue";
import BaseBtn from "~/components/base/BaseBtn.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("FiltersMenu.vue", () => {
  let state;
  let mutations;
  let store;

  beforeEach(() => {
    state = {
      isFilterPanelExpanded: false,
    };

    mutations = {
      toggleFilterPanel: jest.fn((state) => {
        state.isFilterPanelExpanded = !state.isFilterPanelExpanded;
      }),
    };

    store = new Vuex.Store({
      state,
      mutations,
    });
  });

  it("renders correctly", () => {
    const wrapper = shallowMount(FiltersMenu, { store, localVue });
    expect(wrapper.exists()).toBe(true);
  });

  it("calls toggleFilterPanel mutation when button is clicked", async () => {
    const wrapper = shallowMount(FiltersMenu, { store, localVue });
    const button = wrapper.findComponent({ name: BaseBtn });
    await button.trigger("click");
    expect(mutations.toggleFilterPanel).toHaveBeenCalled();
  });

  it("changes isExpanded state when togglePanel is called", async () => {
    const wrapper = shallowMount(FiltersMenu, { store, localVue });
    expect(wrapper.vm.isExpanded).toBe(false);
    await wrapper.vm.togglePanel();
    expect(wrapper.vm.isExpanded).toBe(true);
  });
});
