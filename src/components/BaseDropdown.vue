<template>
  <div class="dropdown">
    <label :for="id">{{ label }}</label>
    <v-select
      @input="setSelectedValue($event)"
      :clearable="false"
      :disabled="disabled"
      :inputId="id"
      :loading="options.length === 0"
      :options="options"
      :placeholder="'Select ' + label"
      :value="selectedOption"
      class="base-dropdown" />
  </div>
</template>

<script>
export default {
  name: 'BaseDropdown',
  props: {
    label: { type: String, required: true },
    options: { type: Array, required: true },
    disabled: Boolean
  },
  emits: {
    'selected-value': String
  },
  data: function () {
    return {
      selectedOption: this.options[0]
    };
  },
  computed: {
    id() {
      return this.label.replace(' ', '-').toLowerCase();
    }
  },
  methods: {
    setSelectedValue(option) {
      this.$emit('selected-value', option.value);
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
    --vs-disabled-bg: #{$white-color};
    --vs-font-size: 14px;

    .vs__dropdown-menu {
      font-size: var(--vs-font-size);
    }

    .vs__selected-options {
      font-size: var(--vs-font-size);
    }

    .vs__spinner {
      height: 20px;
      width: 20px;
    }
  }
}
</style>
