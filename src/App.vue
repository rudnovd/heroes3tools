<template>
  <router-link v-if="route.path !== '/'" class="return-home" to="/">
    <img src="~@/assets/icons/arrow_back.svg" width="16" height="16" />
    Home page
  </router-link>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    return {
      route: useRoute(),
    }
  },
})
</script>

<style lang="scss">
@import '@/styles/main.scss';
</style>

<style lang="scss" scoped>
.return-home {
  padding-left: 5px;
  font-size: 0.8rem;
  opacity: 0.3;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: rgb(0, 0, 0);
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }

  &::before {
    background: url('~@/assets/icons/arrow_back.svg');
    width: 2rem;
    height: 2rem;
  }
}
</style>
