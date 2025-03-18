<template>
  <div class="">
    <div class="text-body1 text-weight-bold q-pb-sm">{{ lang.service }}</div>

    <div class="">
      <div class="row q-col-gutter-sm">
        <social-item
          v-for="(social, index) of data.social"
          :key="index"
          :item="social"
        ></social-item>
      </div>
    </div>
  </div>

  <div class="relative-position q-gutter-y-md">
    <div class="">
      <div class="text-body1 q-pb-sm text-weight-bold">{{ lang.category }}</div>

      <q-select
        dense
        outlined
        emit-value
        options-html
        behavior="dialog"
        class="smm-input"
        input-debounce="0"
        transition-hide="slide-up"
        transition-show="slide-down"
        :option-label="
          (item: any) => (item === null ? 'Empty' : replaceLettersWithNumbers(item.name_category))
        "
        :options="options"
        :loading="loading.select"
        :use-input="menu.category"
        @filter="filterCategory"
        @popup-hide="updateHide('category')"
        @popup-show="updateShow('category')"
        @update:model-value="updateTypes"
        v-model="data.staticSelected.category"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              {{ lang.no_results }}
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <div class="">
      <div class="text-body1 text-weight-bold q-pb-sm">{{ lang.type }}</div>

      <div class="row q-gutter-x-sm no-wrap items-center">
        <q-btn
          flat
          dense
          round
          size="md"
          color="red"
          :icon="favorite ? mdiHeart : mdiHeartOutline"
          @click="changeFavorite"
        />

        <q-select
          dense
          outlined
          options-html
          behavior="dialog"
          input-debounce="0"
          option-label="name"
          transition-hide="slide-up"
          transition-show="slide-down"
          class="smm-input smm-input__favorite"
          :options="options"
          :use-input="menu.type"
          :disable="loading.select"
          @filter="filterType"
          @popup-hide="updateHide('type')"
          @popup-show="updateShow('type')"
          v-model="data.staticSelected.type"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                {{ lang.no_results }}
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>

    <transition name="q-transition--fade">
      <div
        class="bg-page absolute-full q-ma-none column flex-center bordered rounded"
        v-if="!data.staticSelected.type"
      >
        <q-icon :name="mdiInformation" color="primary" size="32px" />

        <div class="text-body1 q-pt-md">{{ whiteList }}</div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import config from 'src/config';
import { computed, ref } from 'vue';

import { useDataStore } from 'stores/data/dataStore';
import { useStatesStore } from 'stores/states/statesStore';
import { useLang } from 'src/utils/use/useLang';

import { fetchSMM } from 'boot/queries';

import SocialItem from 'components/services/SocialItem.vue';

import {
  mdiInformation,
  mdiHeart,
  mdiHeartOutline,
} from '@quasar/extras/mdi-v7';
import { replaceLettersWithNumbers } from 'src/utils/common';

const data = useDataStore();
const states = useStatesStore();
const lang = computed(() => useLang());

const loading = ref({
  select: false,
  create: false,
});
const options = ref<any>([]);

const menu = ref({ category: false, type: false });
const rawValues = ref<any>({
  category: null,
  type: null,
});

const whiteList = computed(() =>
  states.loadings.whiteList ? lang.value.whiteList : lang.value.service_notify
);

const favorite = computed(() =>
  data.favorites
    .map((item) => item.type_id)
    .includes(data.staticSelected.type?.type_id ?? '-1')
);

const changeFavorite = () => {
  if (favorite.value) {
    data.deleteFavorite();
  } else {
    data.addFavorite();
  }
};

const updateHide = (name: 'category' | 'type') => {
  menu.value[name] = false;

  if (!data.staticSelected[name])
    data.staticSelected[name] = rawValues.value[name];
};

const updateShow = (name: 'category' | 'type') => {
  menu.value[name] = true;

  rawValues.value[name] = data.staticSelected[name];
};

const updateTypes = (value: any) => {
  if (!value) return;

  loading.value.select = true;

  fetchSMM(
    'getTypes',
    {
      name_category: value.name_category,
      public_key: config.public_key,
    },
    'categories'
  ).then(() => (loading.value.select = false));
};

function filterCategory(val: string, update: any) {
  if (val === '') {
    update(() => {
      options.value = data.categories;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = data.categories.filter((v: any) =>
      v.name_category.toLowerCase().includes(needle)
    );
  });
}

function filterType(val: string, update: any) {
  update(() => {
    const needle = val.toLowerCase();
    options.value = data.types.filter((v: any) =>
      v.name.toLowerCase().includes(needle)
    );
  });
}
</script>

<style lang="scss" scoped>
.transition-visibility {
  transition: 0.3s ease visibility;
}
</style>
