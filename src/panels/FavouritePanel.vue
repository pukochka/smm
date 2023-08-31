<template>
  <div class="q-gutter-y-md">
    <div class=""></div>

    <transition name="q-transition--fade">
      <div
        class="bg-page q-ma-none q-pa-lg column flex-center bordered rounded"
        v-if="!data.favorites.length"
      >
        <q-icon :name="mdiInformation" color="primary" size="32px" />

        <div class="text-body1 q-pt-md">{{ lang.fav_notify }}</div>
      </div>
    </transition>

    <div
      class="row no-wrap items-center q-col-gutter-x-sm"
      v-if="data.favorites.length && !data.staticSelected.favorite"
    >
      <div class="col-8">
        <q-input
          dense
          outlined
          class="smm-input fit"
          :placeholder="lang.search"
          v-model="text"
        >
          <template v-if="text" v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="text = ''"
              class="cursor-pointer"
            />
          </template>
        </q-input>
      </div>

      <div class="col-4">
        <q-btn
          outline
          no-caps
          padding="0"
          size="13px"
          color="primary"
          class="rounded fit"
          @click="openClear"
        >
          <div class="line-height-100">
            <div class="">{{ lang.delete }}</div>

            <div class="">{{ lang.deleteF }}</div>
          </div>
        </q-btn>
      </div>
    </div>

    <div class="" v-if="data.favorites.length">
      <favorite-item
        clearable
        class="rounded bordered"
        :item="data.staticSelected.favorite"
        v-if="data.staticSelected.favorite"
      ></favorite-item>

      <pagination-list
        v-if="!data.staticSelected.favorite"
        stable-height
        :search="text"
        :current-items="filteredFavorites"
        :el-height="54"
        :visible-items="4"
      >
        <template v-slot="{ item }">
          <favorite-item :item="item" clickable></favorite-item>
        </template>
      </pagination-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref } from 'vue';

import { useDataStore } from 'stores/data/dataStore';
import { useStatesStore } from 'stores/states/statesStore';
import { useLang } from 'src/utils/use/useLang';

import PaginationList from 'components/services/PaginationList.vue';
import FavoriteItem from 'components/services/FavoriteItem.vue';

import { mdiInformation } from '@quasar/extras/mdi-v7';

const data = useDataStore();
const states = useStatesStore();
const lang = computed(() => useLang());

const text = ref('');

const filteredFavorites = computed(() =>
  data.favorites.filter((item) =>
    item.name.trim().toLowerCase().includes(text.value.trim().toLowerCase())
  )
);

const openClear = () => {
  states.openDialog('clear');
};

onUnmounted(() => {
  data.unFavorites.forEach((item) => data.unFavoriteItem(item.type_id));
  data.unFavorites = [];
});
</script>

<style lang="scss" scoped>
.line-height-100 {
  line-height: 1.55;
}
</style>
