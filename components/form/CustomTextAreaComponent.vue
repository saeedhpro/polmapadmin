<template>
  <v-textarea
    rounded
    v-model="val"
    :rules="rules"
    :label="label"
    :dir="dir"
    :disabled="disabled"
    required
    outlined
    :type="getType"
    :name="name"
    class="input-form"
    autocomplete="false"
    :rows="rows"
  ></v-textarea>
</template>

<script>
export default {
  name: "CustomTextAreaComponent",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    dir: {
      type: String,
      default: "rtl"
    },
    name: {
      type: String,
      default: ""
    },
    rules: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Number,
      default: 5
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isPassword: true
    }
  },
  methods: {
    toggleIsPassword() {
      this.isPassword = !this.isPassword
    }
  },
  computed: {
    val: {
      get() {
        if (this.type === 'number') {
          return parseFloat(this.value)
        }
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    getType() {
      if (this.type !== 'password') {
        return this.type
      } else {
        return this.isPassword ? 'password' : 'text'
      }
    },
    getAppendIcon() {
      if (this.type === 'password') {
        return this.isPassword ? 'mdi-eye' : 'mdi-eye-off'
      }
      return ''
    }
  }
}
</script>

<style scoped lang="scss">
.input-form {
  border-radius: 15px;
}
</style>
