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
                <span class="account-form-title">ایجاد مقاله</span>
              </div>
              <div class="account-form-action-box">
                <button class="account-form-action main-btn" @click="createArticle">انتشار</button>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <v-row>
                <v-col
                  cols="12"
                  md="9"
                >
                  <v-row>
                    <v-col
                      cols="12"
                      md="12"
                    >
                      <custom-text-field-component
                        v-model="article.title"
                        :rules="article.rules.title"
                        label="عنوان مقاله"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="12"
                    >
                      <div></div>
                      <editor-component
                        v-model="article.summary"
                        class="small"
                        placeholder="خلاصه مقاله"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <editor-component
                        placeholder="متن مقاله"
                        v-model="article.body"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <custom-auto-complete-component
                        v-model="article.category_id"
                        :label="'دسته بندی مقاله'"
                        :items="categories"
                        :returnObject="false"
                        :item-text="'name'"
                        :item-value="'id'"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <div class="placeholder">تصویر شاخص</div>
                      <custom-image-select-component
                        @uploaded="uploaded"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import CustomTextFieldComponent from "~/components/form/CustomTextFieldComponent";
import EditorComponent from "~/components/editor/EditorComponent";
import CustomAutoCompleteComponent from "~/components/form/CustomAutoCompleteComponent";
import CustomImageSelectComponent from "~/components/form/CustomImageSelectComponent";

export default {
  name: "index.vue",
  components: {
    CustomImageSelectComponent,
    CustomAutoCompleteComponent, EditorComponent, DataTableComponent, CustomTextFieldComponent
  },
  layout: "panel",
  data() {
    return {
      article: {
        title: '',
        summary: '',
        thumbnail: '',
        body: '',
        category_id: null,
        rules: {
          title: [val => (val || '').length > 0 || 'لطفا عنوان مقاله را وارد کنید'],
          body: [val => (val || '').length > 0 || 'لطفا متن مقاله را وارد کنید'],
          category_id: [val => val !== null || 'لطفا دسته بندی مقاله را وارد کنید'],
        }
      }
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    getCategories() {
      this.$store.dispatch('category/getCategories', {
        type: 'article',
      })
    },
    createArticle() {
      if (this.validateArticle()) {
        this.$store.dispatch('article/createArticle', this.article)
        .then(res => {
          setTimeout(() => {
            this.$router.push({
              path: '/panel/articles'
            })
          }, 200)
        })
      }
    },
    uploaded(res) {
      this.article.thumbnail = res.url
    },
    validateArticle() {
      let validated = true
      if (!this.article.title) {
        validated = false
      }
      if (!this.article.thumbnail) {
        validated = false
      }
      if (!this.article.body) {
        validated = false
      }
      if (!this.article.category_id) {
        validated = false
      }
      return validated
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    categories() {
      return this.$store.getters['category/getList']
    }
  }
}
</script>

<style scoped>
.placeholder {
  margin-bottom: 10px;
  font-weight: 700 !important;
}
</style>
