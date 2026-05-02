<template>
  <div class="dropdown">
    <label :for="id">{{ label }}</label>
    <select :id="id" v-model="selected" @change="onChange">
      <option v-for="option of options" :key="option.value" :value="option.value">{{ option.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'BaseDropdown',
  props: ['label', 'options'],
  data: function () {
    return {
      selected: this.options[0]?.value
    };
  },
  computed: {
    id() {
      return this.label.replace(' ', '-').toLowerCase();
    }
  },
  methods: {
    onChange() {
      this.$emit('selected-option', this.selected);
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
    cursor: pointer;
    font-size: 14px;
    padding: 10px;
    text-overflow: ellipsis;
  }

  option {
    font-size: 12px;
  }
}
</style>
