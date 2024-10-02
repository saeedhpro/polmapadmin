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
          <span>ایجاد خدمت</span>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="filter-content">
        <v-row>
          <v-col
            cols="8"
          >
            <custom-text-field-component
              v-model="service.title"
              :label="'عنوان'"
            />
          </v-col>
          <v-col
            cols="4"
          >
            <div class="d-flex flex-row justify-space-between mt-6">
              <div class="placeholder">وضعیت</div>
              <custom-toggle-component
                v-model="service.is_active"
              />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="8"
          >
            <custom-auto-complete-component
              v-model="service.parent"
              :label="'والد'"
              :items="services"
              :returnObject="true"
              :item-text="'title'"
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
                  <loading v-if="loading"/>
                  <span v-else>ثبت</span>
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
import CustomTextFieldComponent from "~/components/form/CustomTextFieldComponent";
import CustomToggleComponent from "~/components/form/CustomToggleComponent.vue";
import CustomAutoCompleteComponent from "~/components/form/CustomAutoCompleteComponent.vue";

export default {
  name: "CreateServiceComponent",
  components: {CustomAutoCompleteComponent, CustomToggleComponent, CustomTextFieldComponent},
  props: {
    open: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      loading: false,
      service: {
        title: '',
        is_active: false,
        parent: null,
      },
      services: []
    }
  },
  mounted() {
    this.getServices()
  },
  methods: {
    getServices() {
      this.$store.dispatch('service/getAllServices')
        .then(res => {
          this.services = res.data.data
        })
    },
    closeForm() {
      return this.$emit('close')
    },
    reset() {
      this.service = {
        title: '',
        is_active: false,
        parent: null,
      }
    },
    create() {
      if (this.loading) return
      this.loading = true
      const data = {
        ...this.service,
        parent_id: this.service.parent ? this.service.parent.id : null
      }
      this.$store.dispatch('service/createService', data)
        .then(res => {
          this.closeForm()
          this.reset()
        })
        .finally(() => {
          this.loading = false
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
