<template>
  <label for="toggle_button" class="custom-toggle-box" :class="{'active': value}">
    <input type="checkbox" id="toggle_button" v-model="toggle" hidden>
    <span class="circle"></span>
  </label>
</template>

<script>
export default {
  name: "CustomToggleComponent",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    toggle: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.custom-toggle-box {
  cursor: pointer;
  position: relative;
  background: #E4E4E4;
  border-radius: 26px;
  width: 37px;
  height: 17px;
  display: inline-flex;
  &.active {
    background: rgba(231, 109, 45, 0.15);
    .circle {
      background: #E85C2F;
    }
  }
  .circle {
    position: absolute;
    width: 19px;
    height: 19px;
    background: #8a8a8a;
    border-radius: 26px;
    top: -1px;
    right: 0;
    transition: all .3s ease-in-out;
  }
  &.active {
    .circle {
      transition: all .3s ease-in-out;
      right: 46% !important;
    }
  }
}
</style>
