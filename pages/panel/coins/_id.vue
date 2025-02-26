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
                <span class="account-form-title">خرید سکه</span>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <custom-text-field-component
                      v-model="option.coins"
                      label="تعداد سکه"
                      type="number"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <custom-text-field-component
                      v-model="option.gift"
                      label="تعداد سکه هدیه"
                      type="number"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <custom-price-field-component
                      v-model="option.price"
                      label="قیمت"
                      type="number"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <custom-price-field-component
                      v-model="option.discount_price"
                      label="قیمت با تخفیف"
                      type="number"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <div class="account-form-action-box">
                      <button class="account-form-action main-btn" @click="updateOption">
                        <loading v-if="loading"/>
                        <span v-else>ویرایش</span>
                      </button>
                    </div>
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
import CustomTextFieldComponent from "~/components/form/CustomTextFieldComponent";
import CustomAutoCompleteComponent from "~/components/form/CustomAutoCompleteComponent";
import CustomDatePicker from "~/components/form/CustomDatePicker";
import CustomToggleComponent from "~/components/form/CustomToggleComponent.vue";
import CustomPriceFieldComponent from "~/components/form/CustomPriceFieldComponent.vue";

export default {
  name: "index",
  components: {
    CustomPriceFieldComponent,
    CustomToggleComponent, CustomDatePicker, CustomAutoCompleteComponent, CustomTextFieldComponent},
  layout: "panel",
  data() {
    return {
      loading: false,
      tab: 0,
      option: {
        id: 0,
        coins: 0,
        gift: 0,
        price: 0,
        discount_price: 0,
      },
    }
  },
  mounted() {
    this.getOption()
  },
  methods: {
    getOption() {
      this.$store.dispatch('options/getOption', this.$route.params.id)
        .then(res => {
          const option = res.data.data
          this.setOption(option)
        })
    },
    setOption(option) {
      this.option = {
        id: option.id,
        coins: option.coins,
        gift: option.gift,
        price: option.price,
        discount_price: option.discount_price,
      }
    },
    updateOption() {
      this.loading = true
      const data = {
        ...this.option,
      }
      this.$store.dispatch('options/updateOption', data)
        .then(res => {
          this.$toast.success('با موفقیت ثبت شد')
          this.$router.push('/panel/coins')
        })
        .catch(err => {
          if(err.response) {
            const errors = err.response.data.errors
            for (const e in errors) {
              this.$toast.error(errors[e][0])
            }
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    }
  }
}
</script>

<style scoped>

</style>
