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
                <span class="account-form-title">لیست نظرات</span>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <v-tabs
                color="#E85C2F"
                left
                v-model="tab"
              >
                <v-tab><span class="v-tab-title">نظرات محصولات</span></v-tab>
                <v-tab><span class="v-tab-title">نظرات مقالات</span></v-tab>
              <v-tabs-items
                v-model="tab"
                touchless
              >
                <v-tab-item>
                  <comment-list-component
                    type="product"
                    v-if="!reload && tab == 0"
                  />
                </v-tab-item>
                <v-tab-item>
                  <comment-list-component
                    type="article"
                    v-if="!reload && tab == 1"
                  />
                </v-tab-item>
              </v-tabs-items>
              </v-tabs>
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
      tab: 0,
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
