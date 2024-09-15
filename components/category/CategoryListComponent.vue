<template>
  <div class="request-list">
    <data-table-component
      :headers="headers"
      :page="filters.page"
      :last-page="categories.meta.last_page"
      :total="categories.meta.total"
      @paginate="paginate"
    >
      <template v-slot:body>
        <tr v-for="(i, n) in categories.data" :key="n">
          <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
          <td class="text-right d-flex flex-row align-center justify-start py-1">
            <img v-if="i.thumbnail" :src="i.thumbnail" alt="" class="list-item-avatar">
            <span class="mr-2">{{ i.name | toPersianNumber }}</span>
          </td>
          <td class="text-center">{{ i.parent ? i.parent.name : '-' | toPersianNumber }}</td>
          <td class="text-center">
            <div class="action-box">
              <v-btn
                icon
                @click="openShowUpdate(i)"
              >
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="openShowDelete(i)"
              >
                <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </template>
      <template v-slot:notfound>
        <div v-if="categories.meta.total === 0">اطلاعاتی یافت نشد</div>
      </template>
    </data-table-component>
    <show-delete-modal
      :open="showDeleteCategory"
      :title="`دسته بندی`"
      @remove="removeCategory"
      @close="cancelDeleteCategory"
    />
    <update-category-component
      :open="showUpdate"
      @close="closeUpdateModal"
      :item="item"
      v-if="item"
    />
  </div>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import UpdateCategoryComponent from "~/components/category/UpdateCategoryComponent";
export default {
  name: "CategoryListComponent",
  components: {UpdateCategoryComponent, ShowDeleteModal, DataTableComponent},
  props: {
    type: {
      type: String,
      required: true,
      default: "product"
    }
  },
  data() {
    return {
      filters: {
        page: 1,
        q: '',
        type: this.type,
        all: true,
      },
      headers: [
        '',
        'نام',
        'دسته بندی والد',
        'عملیات',
      ],
      item: null,
      showDeleteCategory: false,
      showFilter: false,
      showUpdate: false,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    toggleShowDelete() {
      this.showDeleteCategory = !this.showDeleteCategory
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getCategories()
    },
    getCategories() {
      this.$store.dispatch('category/getCategories', this.filters)
    },
    cancelDeleteCategory() {
      this.item = null
      this.toggleShowDelete()
    },
    openShowDelete(item) {
      this.item = item
      this.toggleShowDelete()
    },
    removeCategory() {
      this.$store.dispatch('category/removeCategory', this.item.id)
      .then(res => {
        this.item = null
        this.toggleShowDelete()
      })
      .finally(() => {
        this.paginate(1)
      })
    },
    openShowUpdate(item) {
      this.item = item
      this.toggleShowUpdate()
    },
    toggleShowUpdate() {
      this.showUpdate = !this.showUpdate
    },
    closeUpdateModal() {
      this.toggleShowUpdate()
      this.item = null
      this.paginate(this.filters.page)
    }
  },
  computed: {
    categories() {
      return this.$store.getters[`category/${this.type}Categories`]
    }
  }
}
</script>

<style scoped>

</style>
