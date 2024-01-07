import { defineStore } from 'pinia'

export const useAccountStore = defineStore('accountStore', {
  state: () => ({
    _accessToken: null as string | null,
  }),
  getters: {
    accessToken: state => {
      state._accessToken = localStorage.getItem('access_token')
      return state._accessToken
    },
  },
})
