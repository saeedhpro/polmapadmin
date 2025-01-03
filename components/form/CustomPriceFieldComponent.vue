<template>
  <v-text-field
    rounded
    v-model.lazy="val"
    :rules="rules"
    :label="label"
    :dir="dir"
    required
    outlined
    :height="height"
    :min-height="height"
    type="text"
    class="input-form"
  ></v-text-field>
</template>

<script>

export default {
  name: "CustomPriceFieldComponent",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    dir: {
      type: String,
      default: "rtl"
    },
    rules: {
      type: Array,
      default: () => []
    },
    height: {
      type: String,
      default: "48px"
    },
  },
  data() {
    return {
      isPassword: true,
      money: {
        decimal: '.',
        thousands: ',',
        suffix: ' تومان',
        prefix: '',
        precision: 0,
        masked: false
      }
    }
  },
  computed: {
    val: {
      get() {
        return parseFloat(this.value.toString().split(' ')[0].split(',').join(''))
      },
      set(val) {
        let value = val.toString().split(' ')[0].split(',').join('')
        this.$emit('input', value)
      }
    },
  },
}
</script>

<style scoped>
.input-form {
  border-radius: 15px;
}
</style>
