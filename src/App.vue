<template>
  <v-app>
    <v-app-bar
      app
      dark
      color="primary"
    >
      <h2>Frontend test</h2>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <v-container class="fill-width">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
