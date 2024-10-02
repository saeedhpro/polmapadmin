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
                <span class="account-form-title">لیست خدمات</span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                  @click="toggleShowCreateService"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <data-table-component
                :headers="headers"
                :page="filters.page"
                :last-page="services.meta.last_page"
                :total="services.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in services.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.title | toPersianNumber }}</td>
                    <td class="text-center">{{ i.is_active ? 'فعال' : 'غیرفعال'}}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <v-btn
                          icon
                          @click="showServiceChildren(i)"
                        >
                          <v-icon>mdi-eye</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          @click="toggleShowUpdateService(i)"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          @click="toggleShowDeleteService(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="services.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDelete"
      :title="`خدمت`"
      @remove="removeService"
      @close="cancelDeleteService"
    />
    <create-service-component
      :open="showCreate"
      @close="cancelCreateService"
    />
    <update-service-component
      :open="showUpdate"
      :item="service"
      v-if="service"
      @close="closeUpdateService"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import CreateServiceComponent from "~/components/service/CreateServiceComponent";
import UpdateServiceComponent from "~/components/service/UpdateServiceComponent";

export default {
  name: "index.vue",
  components: {CreateServiceComponent, UpdateServiceComponent, ShowDeleteModal, DataTableComponent},
  layout: "panel",
  data() {
    return {
      filters: {
        page: 1,
        q: '',
      },
      headers: [
        '',
        'عنوان',
        'وضعیت',
        'عملیات',
      ],
      showDelete: false,
      showUpdate: false,
      showCreate: false,
      service: null,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getServices() {
      this.$store.dispatch('service/getServices', this.filters)
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getServices()
    },
    toggleShowDeleteService(service) {
      this.service = service
      this.showDelete = true
    },
    toggleShowUpdateService(service) {
      this.service = service
      this.showUpdate = true
    },
    toggleShowCreateService() {
      this.showCreate = true
    },
    cancelDeleteService() {
      this.service = null
      this.showDelete = false
    },
    cancelUpdateService() {
      this.service = null
      this.showUpdate = false
    },
    closeUpdateService() {
      this.service = null
      this.showUpdate = false
      this.paginate()
    },
    cancelCreateService() {
      this.showCreate = false
      this.paginate(this.filters.page)
    },
    removeService() {
      this.$store.dispatch('service/removeService', this.service.id)
        .then(res => {
          this.paginate()
          this.cancelDeleteService()
        })
    },
    updateService() {
      this.$store.dispatch('service/updateService', this.service)
        .then(res => {
          this.paginate()
          this.cancelUpdateService()
        })
    },
    showServiceChildren(i) {
      this.$router.push(`/panel/services/${i.id}`)
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    services() {
      return this.$store.getters['service/getServices']
    }
  }
}
</script>

<style scoped>

</style>
