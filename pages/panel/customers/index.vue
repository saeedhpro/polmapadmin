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
                <span class="account-form-title">لیست مشتری ها</span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                  @click="toggleShowCreateCustomer"
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
                :last-page="customers.meta.last_page"
                :total="customers.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in customers.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center d-flex flex-row align-center justify-center py-1">
                      <img v-if="i.image" :src="i.image" alt="" class="list-item-avatar">
                      <span v-else>-</span>
                    </td>
                    <td class="text-center">{{ i.name | toPersianNumber }}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <v-btn
                          icon
                          @click="toggleShowUpdateCustomer(i)"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          @click="toggleShowDeleteCustomer(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
<!--                  <div v-if="customers.meta.total === 0">اطلاعاتی یافت نشد</div>-->
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDelete"
      :title="`مشتری`"
      @remove="removeCustomer"
      @close="cancelDeleteCustomer"
    />
    <create-customer-component
      :open="showCreate"
      v-if="showCreate"
      @close="cancelCreateCustomer"
    />
    <update-customer-component
      :open="showUpdate"
      :item="customer"
      @close="closeShowUpdate"
      v-if="customer"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import CreateCustomerComponent from "~/components/customer/CreateCustomerComponent";
import UpdateCustomerComponent from "~/components/customer/UpdateCustomerComponent";

export default {
  name: "index.vue",
  components: {CreateCustomerComponent, UpdateCustomerComponent, ShowDeleteModal, DataTableComponent},
  layout: "panel",
  data() {
    return {
      filters: {
        page: 1,
        q: '',
      },
      headers: [
        '',
        'لوگو',
        'عنوان',
        'عملیات',
      ],
      showDelete: false,
      showUpdate: false,
      showCreate: false,
      customer: null,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getCustomers() {
      this.$store.dispatch('customer/getCustomers', this.filters)
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getCustomers()
    },
    toggleShowDeleteCustomer(customer) {
      this.customer = customer
      this.showDelete = true
    },
    toggleShowUpdateCustomer(customer) {
      this.customer = customer
      this.showUpdate = true
    },
    toggleShowCreateCustomer() {
      this.showCreate = true
    },
    cancelDeleteCustomer() {
      this.customer = null
      this.showDelete = false
    },
    closeShowUpdate() {
      this.showUpdate = false
      this.customer = null
      this.paginate(this.filters.page)
    },
    cancelUpdateCustomer() {
      this.showUpdate = false
      this.customer = null
    },
    cancelCreateCustomer() {
      this.showCreate = false
      this.paginate(this.filters.page)
    },
    removeCustomer() {
      this.$store.dispatch('customer/removeCustomer', this.customer.id)
        .then(res => {
          this.paginate()
          this.cancelDeleteCustomer()
        })
    },
    updateCustomer() {
      this.$store.dispatch('customer/updateCustomer', this.customer)
        .then(res => {
          this.paginate()
          this.cancelUpdateCustomer()
        })
    },
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    customers() {
      return this.$store.getters['customer/getCustomers']
    }
  }
}
</script>

<style scoped>

</style>
