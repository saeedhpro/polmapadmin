<template>
  <v-navigation-drawer
    absolute
    temporary
    right
    v-model="openDrawer"
    class="sidebar-menu"
    width="100%"
  >
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img :src="loginUser && loginUser.avatar ? loginUser.avatar : '/main/header/account.svg'" alt="">
        </v-list-item-avatar>

        <v-list-item-content v-if="loginUser">
          <div class="d-flex flex-row justify-space-between">
            <div class="d-flex flex-row justify-start align-center full-width ml-2">
              <v-list-item-title>
                {{ loginUser.full_name }}
              </v-list-item-title>
              <v-list-item-subtitle  class="dir-ltr">
                {{ loginUser.phone_number }}
              </v-list-item-subtitle>
            </div>
            <button
              class="close"
              @click="openDrawer = false"
            >
              <v-icon>mdi-close</v-icon>
            </button>
          </div>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
      >
        <v-list-item-content class="account-box drawer">
          <div class="right-box">
            <div class="right-box-content">
              <div class="account-menu-item-list">
                <nuxt-link class="right-box-menu" to="/panel/users">
                  <div class="icon-box">
                    <img src="/main/account/account.svg" alt="">
                    <img src="/main/account/account-active.svg" class="active" alt="">
                  </div>
                  <span class="link-text">کاربران</span>
                </nuxt-link>
                <nuxt-link class="right-box-menu" to="/panel/services">
                  <div class="icon-box">
                    <img src="/main/account/box.svg" alt="">
                    <img src="/main/account/box-active.svg" class="active" alt="">
                  </div>
                  <span class="link-text">تخصص های بیوتی مپ</span>
                </nuxt-link>
                <nuxt-link class="right-box-menu" to="/panel/portfolios">
                  <div class="icon-box">
                    <img src="/main/account/box.svg" alt="">
                    <img src="/main/account/box-active.svg" class="active" alt="">
                  </div>
                  <span class="link-text">نمونه کارها</span>
                </nuxt-link>
                <nuxt-link class="right-box-menu" to="/panel/requests">
                  <div class="icon-box">
                    <img src="/main/account/like.svg" alt="">
                    <img src="/main/account/like-active.svg" class="active" alt="">
                  </div>
                  <span class="link-text">درخواست های برداشت</span>
                </nuxt-link>
                <nuxt-link class="right-box-menu" to="/panel/plans">
                  <div class="icon-box">
                    <img src="/main/account/like.svg" alt="">
                    <img src="/main/account/like-active.svg" class="active" alt="">
                  </div>
                  <span class="link-text">پلن ها</span>
                </nuxt-link>
                <nuxt-link class="right-box-menu" to="/panel/coins">
                  <div class="icon-box">
                    <img src="/main/account/like.svg" alt="">
                    <img src="/main/account/like-active.svg" class="active" alt="">
                  </div>
                  <span class="link-text">خرید سکه</span>
                </nuxt-link>
                <nuxt-link class="right-box-menu" to="/panel/subscriptions">
                  <div class="icon-box">
                    <img src="/main/account/like.svg" alt="">
                    <img src="/main/account/like-active.svg" class="active" alt="">
                  </div>
                  <span class="link-text">اشتراک ها</span>
                </nuxt-link>
                <nuxt-link class="right-box-menu" to="/panel/applications">
                  <div class="icon-box">
                    <img src="/main/account/like.svg" alt="">
                    <img src="/main/account/like-active.svg" class="active" alt="">
                  </div>
                  <span class="link-text">لیست برنامه ها</span>
                </nuxt-link>
                <nuxt-link class="right-box-menu" to="/panel/courses">
                  <div class="icon-box">
                    <img src="/main/account/like.svg" alt="">
                    <img src="/main/account/like-active.svg" class="active" alt="">
                  </div>
                  <span class="link-text">آموزش های پول مپ</span>
                </nuxt-link>
                <nuxt-link class="right-box-menu" to="/panel/sliders">
                  <div class="icon-box">
                    <img src="/main/account/like.svg" alt="">
                    <img src="/main/account/like-active.svg" class="active" alt="">
                  </div>
                  <span class="link-text">اسلایدر اصلی</span>
                </nuxt-link>
                <nuxt-link class="right-box-menu" to="/panel/support">
                  <div class="icon-box">
                    <img src="/main/account/like.svg" alt="">
                    <img src="/main/account/like-active.svg" class="active" alt="">
                  </div>
                  <span class="link-text">پشتیبانی</span>
                </nuxt-link>
                <nuxt-link class="right-box-menu" to="/panel/rules">
                  <div class="icon-box">
                    <img src="/main/account/like.svg" alt="">
                    <img src="/main/account/like-active.svg" class="active" alt="">
                  </div>
                  <span class="link-text">قوانین و مقررات</span>
                </nuxt-link>
                <nuxt-link class="right-box-menu" to="/panel/help">
                  <div class="icon-box">
                    <img src="/main/account/like.svg" alt="">
                    <img src="/main/account/like-active.svg" class="active" alt="">
                  </div>
                  <span class="link-text">راهنما</span>
                </nuxt-link>
                <nuxt-link class="right-box-menu" to="/panel/settings">
                  <div class="icon-box">
                    <img src="/main/account/like.svg" alt="">
                    <img src="/main/account/like-active.svg" class="active" alt="">
                  </div>
                  <span class="link-text">تنظیمات</span>
                </nuxt-link>
                <a class="right-box-menu" @click="exit">
                  <div class="icon-box">
                    <img src="/main/account/logout.svg" alt="">
                    <img src="/main/account/logout-active.svg" class="active" alt="">
                  </div>
                  <span class="link-text">خروج</span>
                </a>
              </div>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "RightSideBarDrawer",
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    }
  },
  methods: {
    exit() {
      this.$store.dispatch('login/logout')
      window.location.href = '/'
    },
  },
  computed: {
    openDrawer: {
      get() {
        return this.open
      },
      set(val) {
        if (!val) {
          this.$emit('toggle')
        }
      }
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    application() {
      return this.$store.getters['application/getApplication']
    }
  }
}
</script>

<style scoped>

</style>
