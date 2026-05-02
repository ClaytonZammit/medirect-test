<template>
  <div class="field">
    <span class="label">{{ label }}</span>
    <span class="value">{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: 'BaseField',
  props: ['label', 'value']
};
</script>

<style lang="scss">
@use '~@/../../assets/styles/variables' as *;

.field {
  display: flex;
  flex-direction: column;
  row-gap: 5px;

  .label {
    color: $text-light-color;
    font-size: 14px;
    letter-spacing: -0.2px;
    text-transform: uppercase;
  }

  .value {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
