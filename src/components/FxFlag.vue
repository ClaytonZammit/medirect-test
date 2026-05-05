<template>
  <div class="flag">
    <img :src="srcUrl" :class="{ hide: !srcUrl }" />
  </div>
</template>

<script>
export default {
  name: 'FxFlag',
  props: {
    srcUrl: String
  }
};
</script>

<style lang="scss">
.flag {
  align-items: center;
  border-radius: 4px;
  display: flex;
  height: 20px;
  justify-content: center;
  overflow: hidden;
  width: 30px;

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;

    &.hide {
      visibility: hidden;
    }
  }
}
</style>
