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
          <span>ویرایش آدرس</span>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="filter-content">
        <v-row>
          <v-col
            cols="12"
          >
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <custom-auto-complete-component
                  label="استان"
                  :items="provinces"
                  item-text="name"
                  item-value="id"
                  v-model="province"
                  :returnObject="true"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <custom-auto-complete-component
                  label="شهر"
                  :items="cities"
                  item-text="name"
                  item-value="id"
                  v-model="city"
                  :disabled="!address.province_id"
                  :returnObject="true"
                />
              </v-col>
              <v-col
                cols="12"
              >
                <custom-text-field-component
                  v-model="address.address"
                  label="آدرس پستی"
                  rows="1"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <custom-text-field-component
                  v-model="address.plate"
                  label="پلاک"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <custom-text-field-component
                  v-model="address.unit"
                  label="واحد"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <custom-text-field-component
                  v-model="address.postal_code"
                  label="کد پستی"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
          >
            <div class="create-update-modal-header text-center mt-2 mb-4">
              اطلاعات گیرنده
            </div>
            <v-divider class="mb-6"/>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <custom-text-field-component
                  v-model="address.recipient_full_name"
                  label="نام و نام خانوادگی"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <custom-text-field-component
                  v-model="address.recipient_phone_number"
                  label="شماره تماس"
                  type="tel"
                />
              </v-col>
            </v-row>
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
                  @click.prevent="updateAddress"
                  class="account-form-action main-btn full-width"
                >
                  ویرایش آدرس
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
  name: "ShowAddressForm",
  components: {CustomTextFieldComponent, CustomAutoCompleteComponent},
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "storage"
    },
    item: {
      type: Object,
      required: true,
    }
  },
  mounted() {
    this.getProvinces()
    this.setItem()
  },
  data() {
    return {
      address: {
        id: null,
        province_id: null,
        city_id: null,
        address: '',
        plate: '',
        unit: '',
        postal_code: '',
        recipient_full_name: '',
        recipient_phone_number: '',
      },
      province: null,
      city: null,
    }
  },
  methods: {
    setItem() {
      this.address = {
        province_id: this.item.city ? this.item.city.province ? this.item.city.province.id : null : null,
        city_id: this.item.city ? this.item.city.id : null,
        id: this.item.id,
        address: this.item.address,
        plate: this.item.plate,
        unit: this.item.unit,
        postal_code: this.item.postal_code,
        recipient_full_name: this.item.recipient_full_name,
        recipient_phone_number: this.item.recipient_phone_number,
      }
      this.province = this.item.city ? this.item.city.province : null
      this.city = this.item.city
    },
    closeForm() {
      return this.$emit("close")
    },
    updateAddress() {
      const data = {
        ...this.address,
      }
      this.$store.dispatch('address/updateAddress', data)
      this.closeForm()
    },
    getProvinces() {
      this.$store.dispatch('province/getProvinces', {})
    },
  },
  computed: {
    show() {
      return this.open
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    provinces() {
      return this.$store.getters['province/getList']
    },
    cities() {
      if (this.province) {
        const province = this.provinces.find(i => i.id === this.province.id)
        return province.cities
      } else {
        return []
      }
    },
  },
  watch: {
    province(value) {
      if (value) {
        this.address.province_id = value.id
      } else {
        this.address.province_id = null
      }
    },
    city(value) {
      if (value) {
        this.address.city_id = value.id
      } else {
        this.address.city_id = null
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
