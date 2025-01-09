import { mount } from "@vue/test-utils";
import ErrorPage from "@/layouts/error.vue";

describe("ErrorPage", () => {
  it("renders error message", () => {
    const error = { statusCode: 404, message: "Page not found" };
    const wrapper = mount(ErrorPage, {
      propsData: { error },
    });

    expect(wrapper.text()).toContain("Page not found");
  });

  it("sets the correct title", () => {
    const error = { statusCode: 404, message: "Page not found" };
    const wrapper = mount(ErrorPage, {
      propsData: { error },
    });

    expect(wrapper.vm.$options.head.call(wrapper.vm).title).toBe("404 Error");
  });

  it("renders the correct image", () => {
    const error = { statusCode: 404, message: "Page not found" };
    const wrapper = mount(ErrorPage, {
      propsData: { error },
    });

    const img = wrapper.find("img");
    expect(img.attributes("src")).toBe("~/assets/images/2079322.jpg");
    expect(img.attributes("height")).toBe("404px");
    expect(img.attributes("alt")).toBe("404 page");
  });

  it("displays the correct status code", () => {
    const error = { statusCode: 500, message: "Internal Server Error" };
    const wrapper = mount(ErrorPage, {
      propsData: { error },
    });

    const statusCodeElement = wrapper.find(".status-code");
    expect(statusCodeElement.text()).toBe("500");
  });

  it("renders default message if error message is not provided", () => {
    const error = { statusCode: 500 };
    const wrapper = mount(ErrorPage, {
      propsData: { error },
    });

    expect(wrapper.text()).toContain("An error occurred");
  });
});
