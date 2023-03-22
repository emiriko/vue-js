import { defineStore } from 'pinia';

export const useMenu = defineStore({
  id: 'menu',
  state: () => ({
    _isOpen: false,
  }),
  actions: {
    toggleHamburger() {
      this._isOpen = !this._isOpen
    }
  },
  getters: {
    getCurrentState() : boolean{
      return this._isOpen;
    }
  }
});