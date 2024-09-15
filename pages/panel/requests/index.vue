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
                <span class="account-form-title">لیست درخواست ها</span>
              </div>
              <div class="action-box">
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <v-tabs
                color="#E85C2F"
                left
                v-model="tab"
              >
                <v-tab><span class="v-tab-title">لیست درخواست خدمات</span></v-tab>
                <v-tab><span class="v-tab-title">لیست درخواست همکاری</span></v-tab>
                <v-tab><span class="v-tab-title">لیست درخواست مشاوره</span></v-tab>
              </v-tabs>
              <v-tabs-items
                v-model="tab"
                touchless
              >
                <v-tab-item>
                  <service-request-list-component/>
                </v-tab-item>
                <v-tab-item>
                  <cooperate-request-list-component/>
                </v-tab-item>
                <v-tab-item>
                  <consultation-request-list-component/>
                </v-tab-item>
              </v-tabs-items>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import ServiceRequestListComponent from "~/components/request/ServiceRequestListComponent";
import CooperateRequestListComponent from "~/components/request/CooperateRequestListComponent";
import ConsultationRequestListComponent from "~/components/request/ConsultationRequestListComponent";

export default {
  name: "index.vue",
  components: {
    ConsultationRequestListComponent,
    CooperateRequestListComponent,
    ServiceRequestListComponent, ShowDeleteModal, DataTableComponent
  },
  layout: "panel",
  data() {
    return {
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
