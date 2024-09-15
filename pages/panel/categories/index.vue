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
                <span class="account-form-title">لیست دسته بندی ها</span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                  @click="openCreateModal"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <v-tabs
                color="#E85C2F"
                left
                v-model="tab"
              >
                <v-tab><span class="v-tab-title">دسته بندی محصولات</span></v-tab>
                <v-tab><span class="v-tab-title">دسته بندی مقالات</span></v-tab>
                <v-tab><span class="v-tab-title">دسته بندی سوالات متداول</span></v-tab>
              </v-tabs>
              <v-tabs-items
                v-model="tab"
                touchless
              >
                <v-tab-item>
                  <category-list-component
                    type="product"
                    v-if="!reload && tab == 0"
                  />
                </v-tab-item>
                <v-tab-item>
                  <category-list-component
                    type="article"
                    v-if="!reload && tab == 1"
                  />
                </v-tab-item>
                <v-tab-item>
                  <category-list-component
                    type="faq"
                    v-if="!reload && tab == 2"
                  />
                </v-tab-item>
              </v-tabs-items>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <create-category-component
      :open="show"
      @close="closeCreateModal"
    />
  </main>
</template>

<script>

import CategoryListComponent from "~/components/category/CategoryListComponent";
import CreateCategoryComponent from "~/components/category/CreateCategoryComponent";

export default {
  name: "index.vue",
  components: {CreateCategoryComponent, CategoryListComponent},
  layout: "panel",
  data() {
    return {
      reload: false,
      show: false,
      tab: 0,
    }
  },
  methods: {
    openCreateModal() {
      this.show = true
    },
    closeCreateModal() {
      this.reload = true
      this.show = false
      setTimeout(() => {
        this.reload = false
      }, 10)
    },
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
