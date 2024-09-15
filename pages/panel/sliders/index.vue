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
                <span class="account-form-title">اسلایدر اصلی</span>
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
                :last-page="sliders.meta.last_page"
                :total="sliders.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in sliders.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">
                      <v-img :src="i.image" width="60px" height="60px" class="rounded" alt="" />
                    </td>
                    <td class="text-center">
                      {{ i.title }}
                    </td>
                    <td class="text-center">
                      <a :href="i.link" target="_blank">لینک</a>
                    </td>
                    <td class="text-center">{{ i.is_active ? 'فعال' : 'غیرفعال' }}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <v-btn
                          icon
                          @click="toggleShowUpdateSlider(i)"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                          </v-btn>
                        <v-btn
                          icon
                          @click="toggleShowDeleteSlider(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="sliders.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDeleteSlider"
      :title="`اسلایدر`"
      @remove="removeSlider"
      @close="cancelDeleteSlider"
    />
    <create-slider-component
      :open="showCreate"
      @close="closeCreateModal"
    />
    <update-slider-component
      :open="showUpdate"
      @close="closeUpdateModal"
      :item="slider"
      v-if="slider"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import CreateSliderComponent from "~/components/slider/CreateSliderComponent";
import UpdateSliderComponent from "~/components/slider/UpdateSliderComponent";

export default {
  name: "index.vue",
  components: {UpdateSliderComponent, CreateSliderComponent, ShowDeleteModal, DataTableComponent},
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
        'تصویر',
        'عنوان',
        'لینک',
        'وضعیت',
        'عملیات',
      ],
      slider: null,
      showDeleteSlider: false,
      showCreate: false,
      showUpdate: false,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getSliders() {
      this.$store.dispatch('slider/getSliders', this.filters)
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getSliders()
    },
    toggleShowUpdateSlider(slider) {
      this.slider = slider
      this.showUpdate = true
    },
    closeUpdateModal() {
      this.showUpdate = false
      this.slider = null
      this.paginate()
    },
    toggleShowDeleteSlider(slider) {
      this.slider = slider
      this.showDeleteSlider = true
    },
    cancelDeleteSlider() {
      this.slider = null
      this.showDeleteSlider = false
    },
    toggleCreateModal() {
      this.showCreate = !this.showCreate
    },
    closeCreateModal() {
      this.toggleCreateModal()
      this.paginate()
    },
    removeSlider() {
      this.$store.dispatch('slider/removeSlider', this.slider.id)
        .then(res => {
          this.getSliders()
          this.cancelDeleteSlider()
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
    sliders() {
      return this.$store.getters['slider/getSliders']
    }
  }
}
</script>

<style scoped>

</style>
