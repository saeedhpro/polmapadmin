<template>
  <v-text-field
    rounded
    v-model="val"
    :rules="rules"
    :label="label"
    :dir="type !== 'tel' ? dir : 'ltr'"
    :disabled="disabled"
    required
    outlined
    :height="height"
    :min-height="height"
    :type="getType"
    :name="name"
    class="input-form"
    :class="{'text-right-tel': type === 'tel'}"
    :append-icon="getAppendIcon"
    autocomplete="false"
    :readonly="type === 'password'"
    onfocus="this.removeAttribute('readonly');"
    @click:append="toggleIsPassword"
  ></v-text-field>
</template>

<script>
export default {
  name: "CustomTextFieldComponent",
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
    height: {
      type: String,
      default: "48px"
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
        if (this.type == 'number') {
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
