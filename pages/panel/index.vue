<template>
  <main class="account account-page" :class="{'mini': mini}">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <div class="account-form">
            <div class="account-form-header">
              <div class="account-form-right-box">
                <img src="/main/account/account.svg" alt="">
                <span class="account-form-title">
            اطلاعات محصولات
          </span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                >
                  <img src="/main/account/edit.svg" alt="">
                </v-btn>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <div class="account-form">
            <div class="account-form-header">
              <div class="account-form-right-box">
                <img src="/main/account/account.svg" alt="">
                <span class="account-form-title">
            اطلاعات محصولات
          </span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                >
                  <img src="/main/account/edit.svg" alt="">
                </v-btn>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <div class="account-form">
            <div class="account-form-header">
              <div class="account-form-right-box">
                <img src="/main/account/account.svg" alt="">
                <span class="account-form-title">
            اطلاعات محصولات
          </span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                >
                  <img src="/main/account/edit.svg" alt="">
                </v-btn>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <div class="account-form">
            <div class="account-form-header">
              <div class="account-form-right-box">
                <img src="/main/account/account.svg" alt="">
                <span class="account-form-title">
            اطلاعات محصولات
          </span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                >
                  <img src="/main/account/edit.svg" alt="">
                </v-btn>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
export default {
  name: "index.vue",
  layout: "panel",
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    }
  }
}
</script>

<style scoped>

</style>
