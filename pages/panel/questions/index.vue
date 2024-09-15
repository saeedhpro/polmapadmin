<template>
  <main class="account account-page" :class="{'mini': mini}">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
        >
          <div class="account-form">
            <div class="account-form-header">
              <div class="account-form-right-box">
                <img src="/main/account/account.svg" alt="">
                <span class="account-form-title">لیست پرسش و پاسخ ها</span>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <question-list-component
                v-if="!reload"
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>

import CommentListComponent from "~/components/comment/CommentListComponent";

export default {
  name: "index.vue",
  components: {CommentListComponent},
  layout: "panel",
  data() {
    return {
      reload: false,
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
  }
}
</script>

<style scoped>

</style>
