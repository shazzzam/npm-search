<template>
  <v-row>
    <v-col class="col-12">
      <v-skeleton-loader
        v-if="loading"
        type="table"
      ></v-skeleton-loader>
      <div v-if="loading">loading</div>
      <template v-else>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Package Name
                </th>
                <th class="text-left">
                  Author
                </th>
                <th class="text-left">
                  Version
                </th>
                <th class="text-left">
                  Update Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in packages"
                :key="item.package.name"
                @click="showPackage(item)"
                class="table__row"
              >
                <td>{{item.package.name}}</td>
                <td>{{item.package.publisher.username}}</td>
                <td>{{item.package.version}}</td>
                <td>{{item.package.date.slice(0, 10)}}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div v-if="packages.length === 0" class="text-center text-h4">Nothing found</div>
        <v-pagination
          v-model="page"
          :length="pages"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          total-visible="7"
        ></v-pagination>
      </template>
    </v-col>
    <Modal v-model="showModal" v-bind:item="currentPackage"/>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import Modal from './Modal'

export default {
  name: 'Table',
  components: {
    Modal
  },
  data: () => ({
    page: 1,
    showModal: false,
    currentPackage: {}
  }),
  methods: {
    showPackage (item) {
      this.currentPackage = item
      this.showModal = true
    }
  },
  watch: {
    page (val) {
      this.$store.dispatch('fetchPackages', val)
    },
    currentPage (val) {
      this.page = val
    }
  },
  computed: mapState({
    loading: 'loading',
    packages: 'packages',
    currentPage: 'currentPage',
    pages: 'pages'
  })
}
</script>

<style lang="scss" scoped>
.table__row {
  cursor: pointer;
}
</style>
