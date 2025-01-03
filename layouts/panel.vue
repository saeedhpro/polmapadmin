<template>
  <v-app
    dir="rtl"
  >
    <header-component @toggle="toggleDrawer"/>
    <right-side-bar-drawer :open="openDrawer" @toggle="openDrawer = false"/>
    <div class="account-box page" :class="{'mini': mini}">
      <div class="right-box" v-if="!mini">
        <nuxt-link to="/panel" class="right-box-header">
          <div class="right-header-icon">
            <img src="/main/header/account.svg" alt="">
          </div>
          <div class="right-name-box" v-if="loginUser">
            <div class="user-name">
              {{ loginUser.full_name }}
            </div>
            <div class="user-phone">
              {{ loginUser.phone_number }}
            </div>
          </div>
        </nuxt-link>
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
<!--            <nuxt-link class="right-box-menu" to="/panel/intros">-->
<!--              <div class="icon-box">-->
<!--                <img src="/main/account/like.svg" alt="">-->
<!--                <img src="/main/account/like-active.svg" class="active" alt="">-->
<!--              </div>-->
<!--              <span class="link-text">متن intro ها</span>-->
<!--            </nuxt-link>-->
            <nuxt-link class="right-box-menu" to="/panel/support">
              <div class="icon-box">
                <img src="/main/account/like.svg" alt="">
                <img src="/main/account/like-active.svg" class="active" alt="">
              </div>
              <span class="link-text">پشتیبانی</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/settings">
              <div class="icon-box">
                <img src="/main/account/box.svg" alt="">
                <img src="/main/account/box-active.svg" class="active" alt="">
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
      <Nuxt/>
    </div>
  </v-app>
</template>

<script>
import HeaderComponent from "~/components/global/HeaderComponent";
import RightSideBarDrawer from "~/components/drawer/RightSideBarDrawer";

export default {
  components: {RightSideBarDrawer, HeaderComponent},
  middleware: "auth",
  data() {
    return {
      open: false,
      openDrawer: false,
    }
  },
  methods: {
    exit() {
      this.$store.dispatch('login/logout')
      window.location.href = '/'
    },
    toggleDrawer() {
      this.openDrawer = !this.openDrawer
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    loginUser() {
      return this.$store.getters["login/getUser"]
    },
  },
}
</script>
