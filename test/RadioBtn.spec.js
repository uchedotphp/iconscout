import { shallowMount } from "@vue/test-utils";
import RadioBtn from "@/components/base/RadioBtn.vue";

describe("RadioBtn.vue", () => {
  it("renders the label correctly", () => {
    const wrapper = shallowMount(RadioBtn, {
      propsData: {
        id: "option1",
        name: "example",
        value: "1",
        modelValue: "1",
        label: "Option 1",
      },
    });
    expect(wrapper.find("label").text()).toBe("Option 1");
  });

  it("sets the correct id, name, and value attributes on the input", () => {
    const wrapper = shallowMount(RadioBtn, {
      propsData: {
        id: "option1",
        name: "example",
        value: "1",
        modelValue: "1",
        label: "Option 1",
      },
    });
    const input = wrapper.find("input");
    expect(input.attributes("id")).toBe("option1");
    expect(input.attributes("name")).toBe("example");
    expect(input.attributes("value")).toBe("1");
  });

  it("binds the modelValue correctly", async () => {
    const wrapper = shallowMount(RadioBtn, {
      propsData: {
        id: "option1",
        name: "example",
        value: "1",
        modelValue: "1",
        label: "Option 1",
      },
    });
    const input = wrapper.find("input");
    expect(input.element.checked).toBe(true);

    await wrapper.setProps({ modelValue: "2" });
    expect(input.element.checked).toBe(false);
  });

  it("emits an update:modelValue event when the input is changed", async () => {
    const wrapper = shallowMount(RadioBtn, {
      propsData: {
        id: "option1",
        name: "example",
        value: "1",
        modelValue: "2",
        label: "Option 1",
      },
    });
    const input = wrapper.find("input");
    await input.setChecked();
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["1"]);
  });
});
