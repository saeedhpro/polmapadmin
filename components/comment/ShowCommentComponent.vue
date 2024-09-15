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
          <span>نمایش نظر</span>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="filter-content">
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <div class="show-form-text">
              <span>نام و نام خانوادگی</span>
              <span>{{ item.user.full_name | toPersianNumber }}</span>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <div class="show-form-text">
              <span>وضعیت</span>
              <span>{{ item.accept ? 'تایید شده' : 'تایید نشده' | toPersianNumber }}</span>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <div class="show-form-text">
              <span>{{ item.type === 'product' ? 'محصول' : 'مقاله'  }}</span>
              <nuxt-link v-if="item.commentable" :to="`${item.type === 'product' ? `/panel/products/${item.commentable.slug}` : `/panel/articles/${item.commentable.slug}`}`">{{ item.commentable.title | toPersianNumber }}</nuxt-link>
            </div>
          </v-col>
          <v-col
            cols="12"
          >
            <div class="show-form-text">
              <span>متن نظر</span>
              <span>{{ item.body | toPersianNumber }}</span>
            </div>
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
                  @click="closeForm"
                  class="account-form-action second-btn"
                >
                  بستن
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

export default {
  name: "ShowCommentComponent",
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      required: true,
    }
  },
  methods: {
    closeForm() {
      return this.$emit('close')
    },
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
