<template>
  <div class="flag">
    <img :src="srcUrl" />
  </div>
</template>

<script>
export default {
  name: 'FxFlag',
  props: ['srcUrl']
};
</script>

<style lang="scss">
.flag {
  align-items: center;
  border-radius: 5px;
  display: flex;
  height: 20px;
  justify-content: center;
  overflow: hidden;
  width: 30px;

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
}
</style>
