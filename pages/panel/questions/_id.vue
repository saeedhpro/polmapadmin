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
                <span class="account-form-title">پرسش و پاسخ ها</span>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <v-row>
                <v-col
                  cols="12"
                >
                  <span>متن پرسش:</span>
                  <p class="text-h5 mt-2">{{ question.question }}</p>
                </v-col>
              </v-row>
              <span>لیست پاسخ ها:</span>
              <div class="mt-2">
                <question-list-component
                  v-if="!reload"
                  child
                />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>

import CommentListComponent from "~/components/comment/CommentListComponent";

export default {
  name: "index.vue",
  components: {CommentListComponent},
  layout: "panel",
  data() {
    return {
      reload: false,
      question: {
        question: '',
        title: '',
        id: 0,
      }
    }
  },
  mounted() {
    this.getQuestion()
  },
  methods: {
    getQuestion() {
      this.$store.dispatch('question/getQuestion', this.$route.params.id)
        .then(res => {
          this.question = {
            ...res.data.data,
          }
        })
        .catch(err => {
          console.log(err, "err")
          this.$router.go(-1)
        })
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
  }
}
</script>

<style scoped>

</style>
