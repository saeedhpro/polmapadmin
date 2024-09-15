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
                <span class="account-form-title">لیست سفارشات</span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                  @click="openFilterBox"
                >
                  <v-icon>mdi-filter-variant</v-icon>
                </v-btn>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <data-table-component
                :headers="headers"
                :page="filters.page"
                :last-page="orders.meta.last_page"
                :total="orders.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in orders.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.user ? i.user.full_name : '-' | toPersianNumber }}</td>
                    <td class="text-center">{{ i.fa_status | toPersianNumber }}</td>
                    <td class="text-center">{{ i.price | toPersianCurrency('تومان', 0) }}</td>
                    <td class="text-center">
                      {{ i.created_at ? `${$moment(i.created_at).format("jYYYY/jMM/jDD")}` : '-' | toPersianNumber }}
                    </td>
                    <td class="text-center">
                      <div class="action-box">
                        <nuxt-link
                          :to="`/panel/orders/${i.order_id}`"
                        >
                          <v-icon>mdi-eye</v-icon>
                        </nuxt-link>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="orders.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <order-filter-component
      :open="showFilter"
      :filters="filters"
      @search="search"
      @close="closeFilterBox"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import OrderFilterComponent from "~/components/order/OrderFilterComponent";
export default {
  name: "index.vue",
  components: {OrderFilterComponent, DataTableComponent},
  layout: "panel",
  data() {
    return {
      filters: {
        page: 1,
        user: '',
        q: '',
        status: '',
        from: '',
        to: '',
      },
      headers: [
        '',
        'نام و نام خانوادگی',
        'وضعیت',
        'مبلغ کل',
        'تاریخ',
        'عملیات',
      ],
      showFilter: false,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    openFilterBox() {
      this.showFilter = true
    },
    search(filters) {
      this.filters = {
        ...this.filters,
        ...filters
      }
      this.showFilter = false
      this.paginate()
    },
    closeFilterBox() {
      this.showFilter = false
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getOrders()
    },
    getOrders() {
      return this.$store.dispatch('order/getOrders', this.filters)
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    orders() {
      return this.$store.getters['order/getOrders']
    }
  }
}
</script>

<style scoped>

</style>
