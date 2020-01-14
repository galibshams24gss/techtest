<template>
  <v-app dark>
    <v-layout row wrap align-center>
      <v-flex xs12 id="prlx">
    <v-layout
      align-center
      column
    >
      <main>
            <router-view></router-view>
      </main>
    </v-layout>
  </v-flex>
  </v-layout>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  name: 'App',
}
</script>

<style scoped>
html { 
  overflow-y: auto;
}

#prlx{
  overflow-y: auto;
  height: 100%;
  min-height: 100% !important;
}
</style>