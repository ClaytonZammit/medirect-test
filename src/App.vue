<template>
  <div id="app">
    <FxContent />
  </div>
</template>

<script>
import FxContent from './components/FxContent.vue';

export default {
  name: 'App',
  components: {
    FxContent
  }
};
</script>

<style lang="scss">
@use '~@/./assets/styles/variables' as *;

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-default-color;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
