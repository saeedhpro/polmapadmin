<template>
  <div class="request-list">
    <data-table-component
      :headers="headers"
      :page="filters.page"
      :last-page="questions.meta.last_page"
      :total="questions.meta.total"
      @paginate="paginate"
    >
      <template v-slot:body>
        <tr v-for="(i, n) in questions.data" :key="n">
          <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
          <td class="text-center">{{ i.user ? i.user.full_name : '-' | toPersianNumber }}</td>
          <td class="text-center">{{ i.product ? i.product.title : '-' | toPersianNumber }}</td>
          <td class="text-center">{{ i.question ? i.question : '-' | toPersianNumber }}</td>
          <td class="text-center">{{ i.accept ? 'تایید شده' : 'تایید نشده' | toPersianNumber }}</td>
          <td class="text-center">
            <div class="action-box">
              <v-btn
                icon
                @click="acceptQuestion(i, 1)"
              >
                <v-icon color="green">mdi-check-circle-outline</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="acceptQuestion(i, 0)"
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
        <div v-if="questions.meta.total === 0">اطلاعاتی یافت نشد</div>
      </template>
    </data-table-component>
    <show-delete-modal
      :open="showDeleteQuestion"
      :title="`پرسش`"
      @remove="removeQuestion"
      @close="cancelDeleteQuestion"
      v-if="item"
    />
  </div>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import ShowQuestionComponent from "~/components/question/ShowQuestionComponent";

export default {
  name: "QuestionListComponent",
  components: {ShowQuestionComponent, ShowDeleteModal, DataTableComponent},
  props: {
    child: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      filters: {
        page: 1,
        q: '',
        parent_id: null,
      },
      headers: [
        '',
        'کاربر',
        'محصول',
        'متن',
        'وضعیت',
        'عملیات',
      ],
      item: null,
      showDeleteQuestion: false,
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
      this.showDeleteQuestion = !this.showDeleteQuestion
    },
    paginate(page = 1) {
      this.filters.page = page
      if (this.child) {
        this.filters.parent_id = this.$route.params.id
      }
      this.getQuestions()
    },
    getQuestions() {
      this.$store.dispatch('question/getQuestions', this.filters)
    },
    cancelDeleteQuestion() {
      this.item = null
      this.toggleShowDelete()
    },
    removeQuestion() {
      this.$store.dispatch('question/removeQuestion', this.item.id)
      .then(res => {
        this.item = null
        this.toggleShowDelete()
      })
      .finally(() => {
        this.paginate(1)
      })
    },
    showItem(item) {
      return this.$router.push(`/panel/questions/${item.id}`)
    },
    acceptQuestion(i, accepted) {
      this.$store.dispatch('question/updateQuestion', {
        id: i.id,
        question: i.question,
        accept: accepted
      })
        .then(res => {
          this.$toast.success('با موفقیت انجام شد')
          this.paginate(this.filters.page)
        })
    }
  },
  computed: {
    questions() {
      return this.$store.getters[`question/questions`]
    }
  }
}
</script>

<style scoped>

</style>
