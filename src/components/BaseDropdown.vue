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
.dropdown {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    color: #616161;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>
