<template>
  <div class="request-list">
    <data-table-component
      :headers="headers"
      :page="filters.page"
      :last-page="comments.meta.last_page"
      :total="comments.meta.total"
      @paginate="paginate"
    >
      <template v-slot:body>
        <tr v-for="(i, n) in comments.data" :key="n">
          <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
          <td class="text-center">{{ i.user ? i.user.full_name : '-' | toPersianNumber }}</td>
          <td class="text-center">
            {{ i.commentable ? i.commentable.title : '-' | toPersianNumber }}
          </td>
          <td class="text-center">{{ i.accept ? 'تایید شده' : 'تایید نشده' | toPersianNumber }}</td>
          <td class="text-center">
            <div class="action-box">
              <v-btn
                icon
                @click="acceptComment(i, true)"
              >
                <v-icon color="green">mdi-check-circle-outline</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="acceptComment(i, false)"
              >
                <v-icon color="red">mdi-close-circle-outline</v-icon>
              </v-btn>
              <v-divider vertical color="black"/>
              <v-btn
                icon
                @click="showItem(i)"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="openShowDelete(i)"
              >
                <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </template>
      <template v-slot:notfound>
        <div v-if="comments.meta.total === 0">اطلاعاتی یافت نشد</div>
      </template>
    </data-table-component>
    <show-delete-modal
      :open="showDeleteComment"
      :title="`نظر`"
      @remove="removeComment"
      @close="cancelDeleteComment"
      v-if="item"
    />
    <show-comment-component
      :open="show"
      :item="item"
      @close="closeShowItem"
      v-if="item && show"
    />
  </div>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import ShowCommentComponent from "~/components/comment/ShowCommentComponent";

export default {
  name: "CommentListComponent",
  components: {ShowCommentComponent, ShowDeleteModal, DataTableComponent},
  props: {
    type: {
      type: String,
      required: true,
      default: "product"
    }
  },
  data() {
    return {
      filters: {
        page: 1,
        q: '',
        type: this.type,
      },
      headers: [
        '',
        'کاربر',
        `${this.type === 'article' ? 'مقاله' : 'محصول'}`,
        'وضعیت',
        'عملیات',
      ],
      item: null,
      showDeleteComment: false,
      showFilter: false,
      show: false,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    openShowDelete(item) {
      this.item = item
      this.toggleShowDelete()
    },
    toggleShowDelete() {
      this.showDeleteComment = !this.showDeleteComment
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getComments()
    },
    getComments() {
      this.$store.dispatch('comment/getComments', this.filters)
    },
    cancelDeleteComment() {
      this.item = null
      this.toggleShowDelete()
    },
    removeComment() {
      this.$store.dispatch('comment/removeComment', this.item.id)
      .then(res => {
        this.item = null
        this.toggleShowDelete()
        this.$toast.success('با موفقیت انجام شد')
      })
      .catch(err => {
        if(err.response) {
          const errors = err.response.data.errors
          const keys = Object.keys(err.response.data.errors)
          for (let i = 0; i < keys.length; i++) {
            this.$toast.error(errors[keys[i]][0])
          }
        }
      })
      .finally(() => {
        this.paginate(1)
      })
    },
    showItem(item) {
      this.item = item
      this.show = true
    },
    closeShowItem() {
      this.show = false
      this.item = null
    },
    acceptComment(i, accepted) {
      this.$store.dispatch('comment/updateComment', {
        id: i.id,
        body: i.body,
        accept: accepted
      })
        .then(res => {
          this.paginate(this.filters.page)
          this.$toast.success('با موفقیت انجام شد')
        })
        .catch(err => {
          if(err.response) {
            const errors = err.response.data.errors
            const keys = Object.keys(err.response.data.errors)
            for (let i = 0; i < keys.length; i++) {
              this.$toast.error(errors[keys[i]][0])
            }
          }
        })
    },
  },
  computed: {
    comments() {
      return this.$store.getters[`comment/${this.type}Comments`]
    }
  }
}
</script>

<style scoped>

</style>
