<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="768px"
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
          <span>ایجاد ویژگی محصول</span>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="filter-content">
        <v-row>
          <v-col
            cols="12"
          >
            <custom-text-field-component
              v-model="attribute.name"
              :label="'عنوان'"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <custom-auto-complete-component
              v-model="attribute.type"
              :label="'نوع'"
              :items="types"
              :returnObject="false"
              :item-text="'name'"
              :item-value="'id'"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <custom-auto-complete-component
              v-model="attribute.category"
              :label="'دسته بندی'"
              :items="categories"
              :returnObject="false"
              :item-text="'name'"
              :item-value="'id'"
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
                  @click="create"
                  class="account-form-action main-btn"
                >
                  ایجاد
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

export default {
  name: "CreateAttributeComponent",
  components: {CustomTextFieldComponent, CustomAutoCompleteComponent},
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      types: [
        {
          id: '0',
          name: 'ساده',
        },
        {
          id: '1',
          name: 'متغیر',
        },
      ],
      categories: [
        {
          id: 'string',
          name: 'رشته',
        },
        {
          id: 'integer',
          name: 'عدد',
        },
        {
          id: 'color',
          name: 'رنگ',
        },
      ],
      attribute: {
        name: '',
        type: '0',
        category: 'string',
      }
    }
  },
  methods: {
    closeForm() {
      return this.$emit('close')
    },
    reset() {
      this.attribute = {
        name: '',
        type: '0',
        category: 'string',
      }
    },
    create() {
      this.$store.dispatch('attribute/createAttribute', this.attribute)
        .then(res => {
          this.closeForm()
          this.reset()
        })
    }
  },
  computed: {
    show() {
      return this.open;
    },
  },
}
</script>

<style scoped>

</style>
