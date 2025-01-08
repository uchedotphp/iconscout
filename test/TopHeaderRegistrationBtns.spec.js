import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import TopHeaderRegistrationBtns from "@/components/topHeader/TopHeaderRegistrationBtns.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("TopHeaderRegistrationBtns.vue", () => {
  let store;
  let mutations;
  let state;

  beforeEach(() => {
    state = {
      isLoggedIn: false,
    };

    mutations = {
      logInUser: jest.fn(),
      registerUser: jest.fn(),
    };

    store = new Vuex.Store({
      state,
      mutations,
    });
  });

  it("renders login and signup buttons when user is not logged in", () => {
    const wrapper = shallowMount(TopHeaderRegistrationBtns, {
      store,
      localVue,
      stubs: {
        BaseBtn: {
          template: '<button><slot name="label"></slot></button>',
        },
      },
    });

    const buttons = wrapper.findAll("button");
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).text()).toBe("Login");
    expect(buttons.at(1).text()).toBe("Signup");
  });

  it("calls logInUser mutation when login button is clicked", async () => {
    const wrapper = shallowMount(TopHeaderRegistrationBtns, {
      store,
      localVue,
      stubs: {
        BaseBtn: {
          template:
            '<button @click="$emit(\'click\')"><slot name="label"></slot></button>',
        },
      },
    });

    const loginButton = wrapper.findAll("button").at(0);
    await loginButton.trigger("click");
    expect(mutations.logInUser).toHaveBeenCalled();
  });

  it("calls registerUser mutation when signup button is clicked", async () => {
    const wrapper = shallowMount(TopHeaderRegistrationBtns, {
      store,
      localVue,
      stubs: {
        BaseBtn: {
          template:
            '<button @click="$emit(\'click\')"><slot name="label"></slot></button>',
        },
      },
    });

    const registerButton = wrapper.find(".register");
    await registerButton.trigger("click");
    expect(mutations.logInUser).toHaveBeenCalled();
  });
});
