<template>
  <div class="user-orders-list-component">
    <data-table-component
      :headers="headers"
      :page="filter.page"
      :last-page="orders.meta.last_page"
      :total="orders.meta.total"
      @paginate="paginate"
    >
      <template v-slot:body>
        <tr v-for="(i, n) in orders.data" :key="n">
          <td class="text-center">{{ (filter.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
          <td class="text-center">{{ i.user.full_name | toPersianNumber }}</td>
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
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
export default {
  name: "UserOrdersListComponent",
  components: {DataTableComponent},
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      filter: {
        page: 1,
        q: '',
      },
      headers: [
        '',
        'نام و نام خانوادگی',
        'وضعیت',
        'مبلغ کل',
        'تاریخ',
        'عملیات',
      ],
    }
  },
  mounted() {
    this.getUserOrders()
  },
  methods: {
    getUserOrders() {
      this.$store.dispatch('order/getUserOrders', {
        id: this.userId,
        filter: this.filter,
      })
    },
    paginate(page = 1) {
      this.filter.page = page
      this.getUserOrders()
    },
  },
  computed: {
    orders() {
      return this.$store.getters['order/getOrders']
    }
  }
}
</script>

<style scoped>

</style>
