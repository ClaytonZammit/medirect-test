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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
