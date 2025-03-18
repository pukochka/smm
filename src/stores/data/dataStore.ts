import { defineStore } from 'pinia';
import { DataStore, OrderPanels } from './model';
import { Ref } from 'vue';
import {
  defaultOrder,
  defaultSystemUser,
  defaultUser,
} from 'stores/content/defaults';

import { fields } from 'stores/content/fields';
import { LocalStorage } from 'quasar';
import { useNotify } from 'src/utils/use/useNotify';
import { useLang } from 'src/utils/use/useLang';

export const useDataStore = defineStore('data', {
  state: () =>
    ({
      user: defaultUser,
      systemUser: defaultSystemUser,

      staticSelected: {
        social: null,
        category: null,
        type: null,

        favorite: null,
        favoriteArrange: null,
        repeat: null,
      },
      fieldsValues: {},
      ordersPanel: 'new_order',

      _social: [],
      _categories: {},
      _types: [],

      _orders: [],
      _selectedOrder: defaultOrder,

      favorites: LocalStorage.getItem('favorites') ?? [],
      unFavorites: [],
      isSaved: false,
    } as DataStore),
  getters: {
    social: (state): SMMSocial[] => state._social,

    categories: (state): SMMCategory[] => Object.values(state._categories),

    types: (state): SMMType[] => state._types,

    selectedType: (state): Partial<Record<OrderPanels, SMMType | null>> => {
      return {
        new_order: state.staticSelected.type,
        favorites: state.staticSelected.favorite,
      };
    },

    schema(state): SMMFieldsSchema[] {
      return fields.value[this.selectedType[state.ordersPanel]?.type ?? ''];
    },

    orders: (state): SMMOrder[] => state._orders.reverse(),

    selectedOrder: (state): SMMOrder => state._selectedOrder,
  },

  actions: {
    updateSchema(param?: string, value?: Ref<string | number>) {
      this.fieldsValues[param ?? ''] = value ?? '';
    },
    deleteParam(param?: string) {
      delete this.fieldsValues?.[param ?? ''];
    },

    addFavorite() {
      if (!this.staticSelected.type) return;

      this.favorites.push(this.staticSelected.type);

      LocalStorage.set('favorites', this.favorites);

      useNotify(
        `${useLang().type} <b>${this.staticSelected.type?.name}</b> ${
          useLang().add_fav
        }`
      );
    },
    deleteFavorite() {
      this.favorites = this.favorites.filter(
        (item) => item.type_id !== this.staticSelected.type?.type_id
      );

      LocalStorage.set('favorites', this.favorites);

      useNotify(
        `${useLang().type} <b>${this.staticSelected.type?.name}</b> ${
          useLang().del_fav
        }`
      );
    },
    unFavoriteItem(id: string) {
      this.favorites = this.favorites.filter((item) => item.type_id !== id);

      LocalStorage.set('favorites', this.favorites);
    },

    checkFavorites(black: string | null, white: string | null) {
      if (!black && !white) return;

      const blackList =
        black?.split(',').map((item) => Math.floor(Number(item))?.toString()) ??
        [];

      blackList.forEach((item) => {
        this.favorites = this.favorites.filter((num) => num.type_id !== item);
      });

      LocalStorage.set('favorites', this.favorites);

      if (blackList.length) return;

      const whiteList =
        white?.split(',').map((item) => Math.floor(Number(item))?.toString()) ??
        [];

      this.favorites = this.favorites.filter((item) =>
        whiteList.includes(item.type_id)
      );

      LocalStorage.set('favorites', this.favorites);
    },
  },
});
