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
                <span class="account-form-title">لیست مقالات</span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                  @click="openFilterBox"
                >
                  <v-icon>mdi-filter-variant</v-icon>
                </v-btn>
                <nuxt-link
                  to="/panel/articles/create"
                >
                  <v-icon>mdi-plus</v-icon>
                </nuxt-link>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <data-table-component
                :headers="headers"
                :page="filters.page"
                :last-page="articles.meta.last_page"
                :total="articles.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in articles.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.title }}</td>
                    <td class="text-center">{{ i.author.full_name }}</td>
                    <td class="text-center">{{ i.category.name }}</td>
                    <td class="text-center">
                      {{ i.created_at ? $moment(i.created_at) : '-' | toRelativeDate }}
                    </td>
                    <td class="text-center">
                      <div class="action-box">
                        <nuxt-link
                          :to="`/panel/articles/${i.slug}`"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                        </nuxt-link>
                        <v-btn
                          icon
                          @click="toggleShowDeleteArticle(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="articles.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDeleteArticle"
      :title="`مقاله`"
      @remove="removeArticle"
      @close="cancelDeleteArticle"
    />
    <article-filter-component
      :open="showFilter"
      :filters="filters"
      @search="search"
      @close="closeFilterBox"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import ArticleFilterComponent from "~/components/article/ArticleFilterComponent";

export default {
  name: "index.vue",
  components: {ArticleFilterComponent, ShowDeleteModal, DataTableComponent},
  layout: "panel",
  data() {
    return {
      filters: {
        page: 1,
        q: '',
        category: '',
        from: '',
        to: '',
      },
      headers: [
        '',
        'عنوان',
        'نویسنده',
        'دسته بندی',
        'تاریخ انتشار',
        'عملیات',
      ],
      article: null,
      showDeleteArticle: false,
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
    getArticles() {
      this.$store.dispatch('article/getArticles', this.filters)
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getArticles()
    },
    toggleShowDeleteArticle(article) {
      this.article = article
      this.showDeleteArticle = true
    },
    cancelDeleteArticle() {
      this.article = null
      this.showDeleteArticle = false
    },
    removeArticle() {
      this.$store.dispatch('article/removeArticle', this.article.id)
        .then(res => {
          this.getArticles()
          this.cancelDeleteArticle()
        })
    },
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    articles() {
      return this.$store.getters['article/getArticles']
    }
  }
}
</script>

<style scoped>

</style>
