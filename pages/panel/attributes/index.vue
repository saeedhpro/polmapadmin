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
                <span class="account-form-title">لیست ویژگی های محصول</span>
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
                :last-page="attributes.meta.last_page"
                :total="attributes.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in attributes.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.name }}</td>
                    <td class="text-center">{{ i.type == 0 ? 'ساده' : 'متغیر' }}</td>
                    <td class="text-center">{{ getCategory(i.category) }}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <v-btn
                          icon
                          @click="toggleShowUpdateAttribute(i)"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                          </v-btn>
                        <v-btn
                          icon
                          @click="toggleShowDeleteAttribute(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="attributes.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDeleteAttribute"
      :title="`ویژگی محصول`"
      @remove="removeAttribute"
      @close="cancelDeleteAttribute"
    />
    <create-attribute-component
      :open="showCreate"
      @close="closeCreateModal"
    />
    <update-attribute-component
      :open="showUpdate"
      @close="closeUpdateModal"
      :item="attribute"
      v-if="attribute"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import CreateAttributeComponent from "~/components/attribute/CreateAttributeComponent";
import UpdateAttributeComponent from "~/components/attribute/UpdateAttributeComponent";

export default {
  name: "index.vue",
  components: {UpdateAttributeComponent, CreateAttributeComponent, ShowDeleteModal, DataTableComponent},
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
      attribute: null,
      showDeleteAttribute: false,
      showCreate: false,
      showUpdate: false,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getAttributes() {
      this.$store.dispatch('attribute/getAttributes', this.filters)
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getAttributes()
    },
    toggleShowUpdateAttribute(attribute) {
      this.attribute = attribute
      this.showUpdate = true
    },
    closeUpdateModal() {
      this.showUpdate = false
      this.attribute = null
      this.paginate()
    },
    toggleShowDeleteAttribute(attribute) {
      this.attribute = attribute
      this.showDeleteAttribute = true
    },
    cancelDeleteAttribute() {
      this.attribute = null
      this.showDeleteAttribute = false
    },
    toggleCreateModal() {
      this.showCreate = !this.showCreate
    },
    closeCreateModal() {
      this.toggleCreateModal()
      this.paginate()
    },
    removeAttribute() {
      this.$store.dispatch('attribute/removeAttribute', this.attribute.id)
        .then(res => {
          this.getAttributes()
          this.cancelDeleteAttribute()
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
    attributes() {
      return this.$store.getters['attribute/getAttributes']
    }
  }
}
</script>

<style scoped>

</style>
