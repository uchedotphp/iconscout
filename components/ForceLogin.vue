<template>
  <div class="overlay">
    <div class="content">
      <h5>
        <slot name="message" />
      </h5>
      <BaseBtn @click="login" class="mx-auto login">
        <template #label>
          Get Started - It's Free
        </template>
      </BaseBtn>
      <p>
        Already have an account?
        <span> Log In </span>
      </p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapMutations } from 'vuex'

export default Vue.extend({
  methods: {
    ...mapMutations(['toggleLogin']),
    login() {
      this.toggleLogin('login');
    },
  },
});
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, white, rgba(255, 255, 255, 0));
  display: flex;
  justify-content: center;
  z-index: 10;
  text-align: center;
}

.content {
  position: absolute;
  bottom: 75px;

  h5 {
    font-family: Averta Std;
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    color: var(--ics-black);
  }

  span {
    color: var(--ics-blue);
    cursor: pointer;
  }
}

button.login {
  margin-block: 20px 12px;
  padding: 13px 48px;
  font-size: 16px;
  background-color: var(--ics-blue);
  color: var(--ics-white);
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  border-radius: 12px;
}
</style>
