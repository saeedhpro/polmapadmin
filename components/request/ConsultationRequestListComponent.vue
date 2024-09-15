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
          <td class="text-center dir-ltr">{{ i.phone_number | toPersianNumber }}</td>
          <td class="text-center dir-ltr">{{ i.tel | toPersianNumber }}</td>
          <td class="text-center">
            <div class="action-box">
              <v-btn
                icon
                @click="openShowConsultation(i)"
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
    <show-cosultation-component
      :open="show"
      :item="item"
      @close="closeShowConsultation"
      v-if="item"
    />
    <show-delete-modal
      :open="showDelete"
      :title="`درخواست مشاوره`"
      @remove="remove"
      @close="cancelDelete"
    />
  </div>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowCosultationComponent from "~/components/request/ShowCosultationComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
export default {
  name: "ConsultationRequestListComponent",
  components: {ShowDeleteModal, DataTableComponent, ShowCosultationComponent},
  data() {
    return {
      filters: {
        page: 1,
        from: '',
        to: '',
      },
      headers: [
        '',
        'نام و نام خانوادگی',
        'شماره همراه',
        'شماره تماس',
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
      this.getConsultations()
    },
    getConsultations() {
      this.$store.dispatch('request/getConsultations', this.filters)
    },
    remove() {
      this.$store.dispatch('request/removeConsultation', this.item.id)
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
    openShowConsultation(item) {
      this.item = item
      this.show = true
    },
    closeShowConsultation() {
      this.show = false
      this.item = null
    }
  },
  computed: {
    requests() {
      return this.$store.getters['request/getConsultations']
    },
  }
}
</script>

<style scoped>

</style>
