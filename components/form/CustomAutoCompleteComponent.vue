<template>
  <v-autocomplete
    rounded
    v-model="val"
    :items="items"
    :rules="rules"
    :label="label"
    :dir="dir"
    :disabled="disabled"
    required
    outlined
    single-line
    :multiple="multiple"
    :height="height"
    :min-height="height"
    class="input-form"
    :chips="chips"
    :small-chips="smallChips"
    :return-object="returnObject"
    :item-text="itemText"
    :item-value="itemValue"
    @change="onChange"
  ></v-autocomplete>
</template>

<script>
export default {
  name: "CustomAutoCompleteComponent",
  props: {
    value: {
      type: [ Number , Array , Object , String, Boolean],
      default: ""
    },
    items: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    returnObject: {
      type: Boolean,
      default: false
    },
    smallChips: {
      type: Boolean,
      default: false
    },
    chips: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    itemText: {
      type: String,
      default: "name"
    },
    itemValue: {
      type: String,
      default: "name"
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
      default: "54px"
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
    },
    onChange() {
      this.$emit('change', this.value)
    }
  },
  computed: {
    val: {
      get() {
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

<style scoped>
.input-form {
  border-radius: 15px;
}
</style>
