<template>
  <ul class="d-flex align-items-center header-links">
    <li v-for="{ title, id, isDropDown, img } in navigationLinks" :key="id">
      <BaseBtn>
        <template #label> {{ title }} </template>
        <template v-if="isDropDown" #iconRight>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2665 6.13359C10.9999 5.86693 10.5999 5.86693 10.3332 6.13359L7.99987 8.46693L5.66654 6.13359C5.39987 5.86693 4.99987 5.86693 4.7332 6.13359C4.46654 6.40026 4.46654 6.80026 4.7332 7.06693L7.5332 9.86693C7.66654 10.0003 7.79987 10.0669 7.99987 10.0669C8.19987 10.0669 8.3332 10.0003 8.46654 9.86693L11.2665 7.06693C11.5332 6.80026 11.5332 6.40026 11.2665 6.13359Z"
              fill="#2E334C"
            />
          </svg>
        </template>
        <template v-if="title.toLocaleLowerCase() === 'free asset'" #iconLeft>
          <img
            src="~/assets/images/gift.svg"
            :alt="formatAltText(img)"
          />
        </template>
      </BaseBtn>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface NavigationLinks {
  id: number;
  title: string;
  isDropDown: boolean;
  img?: string;
  link: string;
}

export default defineComponent({
  name: "TopHeaderLinks",
  data() {
    return {
      navigationLinks: [
        {
          id: 1,
          title: "explore",
          isDropDown: true,
          link: "#",
          img: "",
        },
        {
          id: 2,
          title: "tools",
          isDropDown: true,
          link: "#",
          img: "",
        },
        { id: 3, title: "all features", isDropDown: false, link: "#", img: "" },
        {
          id: 4,
          title: "free asset",
          isDropDown: false,
          img: "gift.svg",
          link: "#",
        },
        {
          id: 5,
          title: "learn",
          isDropDown: true,
          link: "#",
          img: "",
        },
      ] as NavigationLinks[],
    };
  },
  methods: {
    formatAltText(img: string = ""): string {
      // format this for the alt text displays
      return img.replace(/-/g, " ").replace(/\.\w+$/, "");
    },
  },
});
</script>

<style lang="scss" scoped>
ul.header-links {
  list-style: none;
  li {
    margin-right: 16px;
    &:last-child {
      margin-right: 0;
    }

    button {
      font-family: "Averta Std", sans-serif;
      font-size: 16px;
      font-weight: 600;
      line-height: 19.78px;
      text-transform: capitalize;
      padding: 0;
      &:hover {
        color: var(--ics-blue);
        svg {
          path {
            fill: var(--ics-blue);
          }
        }
      }
    }
  }
}
</style>
