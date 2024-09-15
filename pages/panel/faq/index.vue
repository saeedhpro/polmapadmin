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
                <span class="account-form-title">لیست سوالات متداول</span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                  @click="toggleShowCreateFaq"
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
                :last-page="faqs.meta.last_page"
                :total="faqs.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in faqs.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.question | toPersianNumber }}</td>
                    <td class="text-center">{{ i.answer | toPersianNumber }}</td>
                    <td class="text-center">{{ i.category ? i.category.name : '-' | toPersianNumber }}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <v-btn
                          icon
                          @click="toggleShowUpdateFaq(i)"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          @click="toggleShowDeleteFaq(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="faqs.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDelete"
      :title="`سوال`"
      @remove="removeFaq"
      @close="cancelDeleteFaq"
    />
    <create-faq-component
      :open="showCreate"
      @close="cancelCreateFaq"
    />
    <update-faq-component
      :open="showUpdate"
      :item="faq"
      @close="closeShowUpdate"
      v-if="faq"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import CreateFaqComponent from "~/components/faq/CreateFaqComponent";
import UpdateFaqComponent from "~/components/faq/UpdateFaqComponent";

export default {
  name: "index.vue",
  components: {CreateFaqComponent, UpdateFaqComponent, ShowDeleteModal, DataTableComponent},
  layout: "panel",
  data() {
    return {
      filters: {
        page: 1,
        q: '',
      },
      headers: [
        '',
        'دسته بندی',
        'سوال',
        'پاسخ',
        'عملیات',
      ],
      showDelete: false,
      showUpdate: false,
      showCreate: false,
      faq: null,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getFaqs() {
      this.$store.dispatch('faq/getFaqs', this.filters)
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getFaqs()
    },
    toggleShowDeleteFaq(faq) {
      this.faq = faq
      this.showDelete = true
    },
    toggleShowUpdateFaq(faq) {
      this.faq = faq
      this.showUpdate = true
    },
    toggleShowCreateFaq() {
      this.showCreate = true
    },
    cancelDeleteFaq() {
      this.faq = null
      this.showDelete = false
    },
    closeShowUpdate() {
      this.showUpdate = false
      this.faq = null
      this.paginate(this.filters.page)
    },
    cancelUpdateFaq() {
      this.showUpdate = false
      this.faq = null
    },
    cancelCreateFaq() {
      this.showCreate = false
      this.paginate(this.filters.page)
    },
    removeFaq() {
      this.$store.dispatch('faq/removeFaq', this.faq.id)
        .then(res => {
          this.paginate()
          this.cancelDeleteFaq()
        })
    },
    updateFaq() {
      this.$store.dispatch('faq/updateFaq', this.faq)
        .then(res => {
          this.paginate()
          this.cancelUpdateFaq()
        })
    },
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    faqs() {
      return this.$store.getters['faq/getFaqs']
    }
  }
}
</script>

<style scoped>

</style>
