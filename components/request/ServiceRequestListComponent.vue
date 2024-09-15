<template>
  <div class="request-list">
    <div class="list-header">

    </div>
    <data-table-component
      :headers="headers"
      :page="filters.page"
      :last-page="requests.meta.last_page"
      :total="requests.meta.total"
      @paginate="paginate"
    >
      <template v-slot:body>
        <tr v-for="(i, n) in requests.data" :key="n">
          <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
          <td class="text-center">{{ i.full_name | toPersianNumber }}</td>
          <td class="text-center">{{ i.service ? i.service.title : '-' | toPersianNumber }}</td>
          <td class="text-center dir-ltr">{{ i.phone_number | toPersianNumber }}</td>
          <td class="text-center">{{ i.city ? i.city.province.name : '-' | toPersianNumber }}</td>
          <td class="text-center">{{ i.city ? i.city.name : '-' | toPersianNumber }}</td>
          <td class="text-center">
            {{ i.time ? `${$moment(i.time).format("jYYYY/jMM/jDD")}` : '-' | toPersianNumber }}
          </td>
          <td class="text-center">
            <div class="action-box">
              <v-btn
                icon
                @click="showItem(i)"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="toggleShowDelete(i)"
              >
                <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </template>
      <template v-slot:notfound>
        <div v-if="requests.meta.total === 0">اطلاعاتی یافت نشد</div>
      </template>
    </data-table-component>
    <show-service-component
      :open="show"
      :item="item"
      @close="closeShowItem"
      v-if="item"
    />
    <show-delete-modal
      :open="showDelete"
      :title="`درخواست خدمات`"
      @remove="remove"
      @close="cancelDelete"
    />
  </div>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowServiceComponent from "~/components/request/ShowServiceComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";

export default {
  name: "ServiceRequestListComponent",
  components: {ShowDeleteModal, ShowServiceComponent, DataTableComponent},
  data() {
    return {
      filters: {
        page: 1,
        service: '',
        city: '',
        from: '',
        to: '',
      },
      headers: [
        '',
        'نام و نام خانوادگی',
        'خدمت مورد نیاز',
        'شماره تماس',
        'استان',
        'شهر',
        'زمان',
        'عملیات',
      ],
      show: false,
      showDelete: false,
      item: null,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    paginate(page = 1) {
      this.filters.page = page
      this.getServices()
    },
    getServices() {
      this.$store.dispatch('request/getServices', this.filters)
    },
    remove() {
      this.$store.dispatch('request/removeService', this.item.id)
        .then(res => {
          this.cancelDelete()
        })
      .finally(() => {
        this.paginate()
      })
    },
    toggleShowDelete(item) {
      this.item = item
      this.showDelete = true
    },
    cancelDelete() {
      this.showDelete = false
      this.item = null
    },
    showItem(item) {
      this.item = item
      this.show = true
    },
    closeShowItem() {
      this.show = false
      this.item = null
    }
  },
  computed: {
    requests() {
      return this.$store.getters['request/getServices']
    },
  }
}
</script>

<style scoped>

</style>
