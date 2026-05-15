<template>
  <div class="dropdown">
    <label :for="id">{{ label }}</label>
    <v-select
      :clearable="false"
      :disabled="disabled"
      :inputId="id"
      :loading="options.length === 0 && !disabled"
      :options="options"
      :placeholder="'Select ' + label"
      :reduce="(option) => option.value"
      :value="selectedValue"
      @input="setSelectedValue($event)"
      class="base-dropdown" />
  </div>
</template>

<script>
export default {
  name: 'BaseDropdown',
  props: {
    label: { type: String, required: true },
    options: { type: Array, required: true },
    disabled: { type: Boolean, default: false }
  },
  emits: {
    'selected-value': String
  },
  data: function () {
    return {
      selectedValue: this.options[0]?.value
    };
  },
  computed: {
    id() {
      return this.label.replace(' ', '-').toLowerCase();
    }
  },
  methods: {
    setSelectedValue(value) {
      this.selectedValue = value;
      this.$emit('selected-value', value);
    }
  }
};
</script>

<style lang="scss">
@use '~@/../../assets/styles/variables' as *;

.dropdown {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    color: $text-light-color;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .base-dropdown {
    --vs-font-size: 14px;

    .vs__dropdown-menu {
      font-size: var(--vs-font-size);
    }

    .vs__selected-options {
      flex-wrap: nowrap;
      font-size: var(--vs-font-size);
    }

    .vs__spinner {
      height: 20px;
      width: 20px;
    }
  }
}
</style>
