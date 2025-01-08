import { shallowMount } from "@vue/test-utils";
import TopHeaderLinks from "@/components/topHeader/TopHeaderLinks.vue";

describe("TopHeaderLinks.vue", () => {
  it("renders navigation links correctly", () => {
    const navigationLinks = [
      { id: 1, title: "Home", isDropDown: false, img: "home.svg" },
      { id: 2, title: "About", isDropDown: true, img: "about.svg" },
      { id: 3, title: "Free Asset", isDropDown: false, img: "free-asset.svg" },
    ];

    const wrapper = shallowMount(TopHeaderLinks, {
      data() {
        return {
          navigationLinks,
        };
      },
      stubs: {
        BaseBtn: {
          template:
            '<button><slot name="label"></slot><slot name="iconRight"></slot><slot name="iconLeft"></slot></button>',
        },
      },
    });

    const links = wrapper.findAll("ul.header-links > li");
    expect(links.length).toBe(navigationLinks.length);

    navigationLinks.forEach((link, index) => {
      const linkElement = links.at(index);
      expect(linkElement.text()).toContain(link.title);
      if (link.isDropDown) {
        expect(linkElement.find("svg").exists()).toBe(true);
      }
      if (link.title.toLocaleLowerCase() === "free asset") {
        expect(linkElement.find("img").exists()).toBe(true);
      }
    });
  });
});
