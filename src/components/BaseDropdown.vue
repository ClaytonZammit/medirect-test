<template>
  <div class="dropdown">
    <label :for="id">{{ label }}</label>
    <select :id="id" v-model="selectedValue" @change="onChange" :disabled="disabled">
      <option v-for="option of options" :key="option.value" :value="option.value" :disabled="option.disabled">
        {{ option.name }}
      </option>
    </select>
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
      selectedValue: this.options[0]?.value
    };
  },
  computed: {
    id() {
      return this.label.replace(' ', '-').toLowerCase();
    }
  },
  methods: {
    onChange() {
      this.$emit('selected-value', this.selectedValue);
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

  select {
    border-color: $text-light-color;
    border-radius: 8px;
    color: $text-dark-color;
    cursor: pointer;
    font-size: 14px;
    padding: 10px;
    text-overflow: ellipsis;

    &:disabled {
      color: $text-dark-color;
      cursor: not-allowed;
      opacity: 1;
    }
  }

  option {
    font-size: 12px;
  }
}
</style>
