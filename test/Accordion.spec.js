import { shallowMount } from "@vue/test-utils";
import Accordion from "~/components/base/Accordion.vue";

describe("Accordion.vue", () => {
  it("renders accordion title", () => {
    const wrapper = shallowMount(Accordion, {
      slots: {
        title: '<div class="title-content">Accordion Title</div>',
      },
    });
    expect(wrapper.find(".title-content").exists()).toBe(true);
    expect(wrapper.find(".title-content").text()).toBe("Accordion Title");
  });

  it("renders slot content", () => {
    const wrapper = shallowMount(Accordion, {
      slots: {
        content: '<div class="content">Accordion Content</div>',
      },
    });
    expect(wrapper.find(".content").exists()).toBe(true);
    expect(wrapper.find(".content").text()).toBe("Accordion Content");
  });

  it('applies the "show" class when expanded prop is true', async () => {
    const wrapper = shallowMount(Accordion, {
      propsData: {
        expanded: true,
      },
    });
    expect(wrapper.find(".collapse").classes()).toContain("show");
  });

  it('does not apply the "show" class when expanded prop is false', async () => {
    const wrapper = shallowMount(Accordion, {
      propsData: {
        expanded: false,
      },
    });
    expect(wrapper.find(".collapse").classes()).not.toContain("show");
  });

  it('toggles the "show" class when the expanded prop is updated', async () => {
    const wrapper = shallowMount(Accordion, {
      propsData: {
        expanded: false,
      },
    });
    expect(wrapper.find(".collapse").classes()).not.toContain("show");
    await wrapper.setProps({ expanded: true });
    await wrapper.vm.$nextTick(); // Wait for the DOM update
    expect(wrapper.find(".collapse").classes()).toContain("show");
    await wrapper.setProps({ expanded: false });
    await wrapper.vm.$nextTick(); // Wait for the DOM update
    expect(wrapper.find(".collapse").classes()).not.toContain("show");
  });

  it("rotates the SVG icon when expanded prop is true", async () => {
    const wrapper = shallowMount(Accordion, {
      propsData: {
        expanded: false,
      },
    });
    expect(wrapper.find("svg").classes()).not.toContain("rotated");
    await wrapper.setProps({ expanded: true });
    await wrapper.vm.$nextTick(); // Wait for the DOM update
    expect(wrapper.find("svg").classes()).toContain("rotated");
    await wrapper.setProps({ expanded: false });
    await wrapper.vm.$nextTick(); // Wait for the DOM update
    expect(wrapper.find("svg").classes()).not.toContain("rotated");
  });

  it("emits a toggle event when the button is clicked", async () => {
    const wrapper = shallowMount(Accordion, {
      propsData: {
        expanded: false,
      },
    });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted().toggle).toBeTruthy();
  });
});
