<template>
  <v-dialog
    v-model="show"
    max-width="680"
  >
    <v-card
      class="accept-file-remove-model"
    >
      <button
        class="close"
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </button>
      <v-card-title class="accept-file-remove-title">
        <span>حذف {{ title }}</span>
      </v-card-title>

      <v-card-text
        class="accept-file-remove-text"
      >
        آیا از حذف کردن {{ title }} اطمینان دارید؟<br/>
        لطفا دقت کنید که پس از حذف، اطلاعات {{ title }} قابل بازگشت نیست
      </v-card-text>

      <v-card-actions>
        <button
          class="action-button accept-button"
          @click="close"

        >
          خیر
        </button>
        <v-spacer></v-spacer>
        <button
          class="action-button red-button"
          @click="remove"
        >
          بله، حذف کن
        </button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ShowDeleteModal",
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true
    },
    title: {
      type: String,
      default: "کاربران"
    }
  },
  methods: {
    remove() {
      this.$emit('remove')
    },
    close() {
      this.$emit('close')
    },
  },
  computed: {
    show: {
      get() {
        return this.open
      },
      set(val) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.accept-file-remove-model {
  text-align: center;
  position: relative;
  min-height: 253px;
  display: flex !important;
  flex-direction: column;
  justify-content: space-evenly;

  .accept-file-remove-title {
    text-align: center !important;
    font: normal normal 800 21px/41px IRANSansX !important;
    letter-spacing: 0;
    color: #212945;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
  }

  .accept-file-remove-text {
    text-align: center;
    font: normal normal bold 14px/28px IRANSansX !important;
    letter-spacing: 0;
    color: #212945;
  }

  .close {
    background: #FAFAFA 0 0 no-repeat padding-box;
    border: 1px solid #141432;
    border-radius: 6px;
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .accept-button {
    background: #EBEBEB 0 0 no-repeat padding-box;
    color: #424242;
  }

  .cancel-button {
    background: #5063FF 0 0 no-repeat padding-box;
    color: #FFFFFF;
  }

  .red-button {
    background: #F44336 0 0 no-repeat padding-box;
    color: #FFFFFF;
  }

  .action-button {
    border-radius: 8px;
    max-width: 288px;
    width: 100%;
    height: 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font: normal normal bold 14px/28px IRANSansX !important;
    letter-spacing: 0;
  }
}
</style>
