import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    searchQuery: '',
    currentPage: 1,
    pages: 0,
    packages: []
  },
  mutations: {
    updateSearchQuery (state, data) {
      state.searchQuery = data
    },
    updatePackages (state, data) {
      state.packages = data
    },
    updatePages (state, data) {
      state.pages = data
    },
    updateCurrentPage (state, data) {
      state.currentPage = data
    },
    updateLoading (state, data) {
      state.loading = data
    }
  },
  actions: {
    async fetchPackages (store, pageNumber = 1) {
      store.commit('updateLoading', true)
      const { pages, searchQuery } = store.state
      if (pages < pageNumber && pageNumber !== 1) {
        store.commit('updateLoading', false)
        return
      }
      const offest = (pageNumber - 1) * 10
      try {
        const res = await fetch(
          `https://registry.npmjs.org/-/v1/search?text=${searchQuery}&size=10&from=${offest}`
        )
        const data = await res.json()
        store.commit('updatePackages', data.objects)
        store.commit('updatePages', Math.ceil(data.total / 10))
        store.commit('updateCurrentPage', pageNumber)
      } catch (e) {
        console.log(e)
      } finally {
        store.commit('updateLoading', false)
      }
    }
  },
  modules: {}
})
