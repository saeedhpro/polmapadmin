<template>
  <v-app light>
    <v-main class="login-page">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main >
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: "guest",
}
</script>
