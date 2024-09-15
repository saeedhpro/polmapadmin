<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="1056px"
  >
    <v-card
      class="create-update-modal"
    >
      <v-card-title
        class="create-update-modal-title-box"
      >
        <div class="create-update-modal-title">
          <button
            @click="closeForm"
            class="create-update-modal-close"
          >
            <v-icon>mdi-close</v-icon>
          </button>
          <span>جستجو پیشرفته</span>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="filter-content">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <custom-text-field-component
              v-model="filter.q"
              :label="'عبارت جستجو'"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <custom-auto-complete-component
              v-model="filter.category"
              :label="'دسته بندی'"
              :items="allCategories"
              :returnObject="false"
              :item-text="'name'"
              :item-value="'id'"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <custom-auto-complete-component
              v-model="filter.status"
              :label="'وضعیت'"
              :items="statusList"
              :returnObject="false"
              :item-text="'name'"
              :item-value="'id'"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <div class="placeholder"></div>
            <custom-price-field-component
              :label="`مبلغ از`"
              :initial-value="filter.from"
              :disable-past="false"
              v-model="filter.from"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <div class="placeholder"></div>
            <custom-price-field-component
              :label="`مبلغ تا`"
              :initial-value="filter.to"
              :disable-past="false"
              v-model="filter.to"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-spacer/>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <div
                class="account-form-action-box"
              >
                <button
                  @click="reset"
                  class="account-form-action second-btn"
                >
                  پاک کردن
                </button>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <div
                class="account-form-action-box"
              >
                <button
                  @click="search"
                  class="account-form-action main-btn"
                >
                  جستجو
                </button>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CustomAutoCompleteComponent from "~/components/form/CustomAutoCompleteComponent";
import CustomTextFieldComponent from "~/components/form/CustomTextFieldComponent";
import CustomPriceFieldComponent from "~/components/form/CustomPriceFieldComponent";

export default {
  name: "ProductFilterComponent",
  components: {CustomPriceFieldComponent, CustomTextFieldComponent, CustomAutoCompleteComponent},
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    filters: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      statusList: [
        {
          id: '',
          name: 'همه',
        },
        {
          id: 'unavailable',
          name: 'ناموجود',
        },
        {
          id: 'available',
          name: 'موجود',
        },
      ],
      filter: {
        category: this.filters.category,
        status: this.filters.status,
        q: this.filters.q,
        from: this.filters.from,
        to: this.filters.to,
      }
    }
  },
  mounted() {
    this.getAllCategories()
  },
  methods: {
    getAllCategories() {
      this.$store.dispatch('category/getCategories', {
        type: 'product'
      })
    },
    closeForm() {
      return this.$emit('close')
    },
    reset() {
      this.filter = {
        category: this.filters.category,
        status: this.filters.status,
        q: this.filters.q,
        from: this.filters.from,
        to: this.filters.to,
      }
    },
    search() {
      this.$emit('search', this.filter)
    }
  },
  computed: {
    show() {
      return this.open;
    },
    allCategories() {
      return [
        {
          id: '',
          name: 'همه',
        },
        ...this.$store.getters['category/getList']
      ]
    }
  }
}
</script>

<style scoped>

</style>
