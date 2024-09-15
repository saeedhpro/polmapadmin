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
          <span>افزودن کارت بانکی جدید</span>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="filter-content">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6"
          >
            <custom-text-field-component
              v-model="card.full_name"
              label="نام و نام خانوادگی"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
          >
            <custom-text-field-component
              v-model="card.bank_name"
              label="نام بانک"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-text-field-component
              v-model="card.number"
              label="شماره کارت"
              :dir="'ltr'"
              class="dir-ltr text-right-tel"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-text-field-component
              v-model="card.sheba"
              label="شماره شبا"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <div
                class="account-form-action-box"
              >
                <button
                  @click.prevent="createCard"
                  class="account-form-action main-btn full-width"
                >
                  ثبت کارت
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
  name: "CreateCardForm",
  components: {CustomTextFieldComponent, CustomAutoCompleteComponent},
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      card: {
        bank_name: '',
        number: '',
        sheba: '',
        full_name: '',
        user_id: null,
      },
    }
  },
  methods: {
    closeForm() {
      return this.$emit("close")
    },
    createCard() {
      const data = {
        ...this.card,
      }
      this.$store.dispatch('card/createCard', data)
        .then(res => {
          this.$toast.success('با موفقیت ثبت شد')
          this.closeForm()
        })
        .catch(err => {
          if(err.response) {
            const errors = err.response.data.errors
            for (const e in errors) {
              this.$toast.error(errors[e][0])
            }
          }
        })
    },
  },
  computed: {
    show() {
      return this.open
    },
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
  },
  watch: {
    'card.number'() {
      if(this.card.number) {
        let realNumber = this.card.number.replace(/ /gi, '')
        let dashedNumber = realNumber.match(/.{1,4}/g)
        this.card.number = dashedNumber.join(' ')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import 'assets/variables';

.create-update-modal-header {
  font-family: $font-family;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 29px;
  text-align: center;
  color: #1A1A1A;
}
</style>
