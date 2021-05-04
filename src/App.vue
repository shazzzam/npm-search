<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col class="col-12">
            <h3 class="text-h3 text-center">NPM Search</h3>
          </v-col>
        </v-row>
        <SearchBox />
        <Table />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import SearchBox from './components/SearchBox'
import Table from './components/Table'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    SearchBox,
    Table,
    Footer
  }
}
</script>
