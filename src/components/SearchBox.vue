<template>
  <v-row>
    <v-col class="col-12">
      <v-text-field
        label="Search NPM packages"
        prepend-inner-icon="mdi-magnify"
        v-model="query"
        @keyup.enter="loadPackages"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SearchBox',
  data: () => ({
    query: '',
    timeout: null
  }),
  watch: {
    query (val) {
      this.$store.commit('updateSearchQuery', val)
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.$store.dispatch('fetchPackages', 1)
      }, 500)
    }
  },
  methods: {
    loadPackages () {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.$store.dispatch('fetchPackages', 1)
    }
  }
}
</script>

<style scoped>

</style>
