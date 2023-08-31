import { defineStore } from 'pinia';
import { DialogsNames, StatesStore } from './model';

export const useStatesStore = defineStore('states', {
  state: () =>
    ({
      dialogs: {
        count: false,
        desc: false,
        range: false,
        order: false,
        clear: false,
      },
      loadings: {
        getTypes: false,
        getSocial: false,
        getCategories: false,
        start: true,

        whiteList: false,
      },
      tabs: 'newOrder',
    } as StatesStore),

  getters: {},

  actions: {
    toggleTab(value: any) {
      this.tabs = value;
    },
    openDialog(name: DialogsNames) {
      this.dialogs[name] = true;
    },
    closeDialog(name: DialogsNames) {
      this.dialogs[name] = false;
    },
  },
});
