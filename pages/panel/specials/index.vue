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
                <span class="account-form-title">فروش ویژه</span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                  @click="toggleCreateModal"
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
                :last-page="specials.meta.last_page"
                :total="specials.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in specials.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.title }}</td>
                    <td class="text-center">{{ i.type == 'main' ? 'اسلایدر اصلی' : 'فروش ویژه' }}</td>
                    <td class="text-center">{{ i.status ? 'فعال' : 'غیرفعال' }}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <v-btn
                          icon
                          @click="toggleShowUpdateSpecial(i)"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                          </v-btn>
                        <v-btn
                          icon
                          @click="toggleShowDeleteSpecial(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="specials.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDeleteSpecial"
      :title="`فروش ویژه`"
      @remove="removeSpecial"
      @close="cancelDeleteSpecial"
    />
    <create-special-component
      :open="showCreate"
      @close="closeCreateModal"
    />
    <update-special-component
      :open="showUpdate"
      @close="closeUpdateModal"
      :item="special"
      v-if="special"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import CreateSpecialComponent from "~/components/special/CreateSpecialComponent";
import UpdateSpecialComponent from "~/components/special/UpdateSpecialComponent";

export default {
  name: "index.vue",
  components: {UpdateSpecialComponent, CreateSpecialComponent, ShowDeleteModal, DataTableComponent},
  layout: "panel",
  data() {
    return {
      filters: {
        page: 1,
        q: '',
        category: '',
        type: '',
      },
      headers: [
        '',
        'عنوان',
        'نوع',
        'دسته بندی',
        'عملیات',
      ],
      special: null,
      showDeleteSpecial: false,
      showCreate: false,
      showUpdate: false,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getSpecials() {
      this.$store.dispatch('special/getSpecials', this.filters)
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getSpecials()
    },
    toggleShowUpdateSpecial(special) {
      this.special = special
      this.showUpdate = true
    },
    closeUpdateModal() {
      this.showUpdate = false
      this.special = null
      this.paginate()
    },
    toggleShowDeleteSpecial(special) {
      this.special = special
      this.showDeleteSpecial = true
    },
    cancelDeleteSpecial() {
      this.special = null
      this.showDeleteSpecial = false
    },
    toggleCreateModal() {
      this.showCreate = !this.showCreate
    },
    closeCreateModal() {
      this.toggleCreateModal()
      this.paginate()
    },
    removeSpecial() {
      this.$store.dispatch('special/removeSpecial', this.special.id)
        .then(res => {
          this.getSpecials()
          this.cancelDeleteSpecial()
        })
    },
    getCategory(category) {
      switch (category) {
        case 'string':
          return 'رشته'
        case 'integer':
          return 'عدد'
        case 'color':
          return 'رنگ'
      }
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    specials() {
      return this.$store.getters['special/getSpecials']
    }
  }
}
</script>

<style scoped>

</style>
