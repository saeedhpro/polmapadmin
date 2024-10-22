<template>
  <main class="account account-page" :class="{'mini': mini}">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          md="6"
          v-for="(a, i) in applications" :key="i" @click="setApplication(a)"
        >
          <div class="account-form">
            <div class="account-form-header" >
              <div class="account-form-right-box">
                <img src="/main/account/account.svg" alt="">
                <span class="account-form-title">
                  {{ a.app_name }}
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
  data() {
    return {
      applications: []
    }
  },
  mounted() {
    this.getApplications()
  },
  methods: {
    getApplications() {
      this.$store.dispatch('application/getApplications', {})
        .then(res => {
          this.applications = res.data.data
          if (this.applications.length > 0) {
           this.setApplication(this.applications[0])
          }
        })
    },
    setApplication(app) {
      this.$store.commit('application/setApplication', app)
      this.$cookies.set('application', app)
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    }
  }
}
</script>

<style scoped>

</style>
