<template>
  <div class="loader">
    <!-- Lorem, ipsum dolor sit amet consectetur adipisicing elit. A modi est veniam dicta at quas! Autem cupiditate obcaecati recusandae voluptates dolore reprehenderit laboriosam quam sit voluptatem accusamus eos, esse nostrum. -->
  </div>
</template>

<script>
export default {
  name: "ImageLoader",
};
</script>

<style lang="scss" scoped>
.loader {
  border: 10px solid #f3f3f3;
  border-radius: 50%;
  border-top: 10px solid #3498db;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
