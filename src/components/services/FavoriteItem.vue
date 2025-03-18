<template>
  <q-item @click="select" class="q-py-none">
    <q-item-section side v-if="!clearable">
      <q-btn
        dense
        round
        flat
        color="red"
        :icon="unChosen ? mdiHeartOutline : mdiHeart"
        @click="unFavorite"
      />
    </q-item-section>

    <q-item-section
      class="q-py-sm q-px-sm"
      v-clickable="clickable"
      @click="select"
    >
      <q-item-label class="ellipsis">
        {{ replaceLettersWithNumbers(item.name) }}
      </q-item-label>

      <q-item-label caption>{{ lang.behind }} 1000 - {{ price }}</q-item-label>
    </q-item-section>

    <q-item-section side v-if="clearable">
      <q-btn
        flat
        rounded
        size="md"
        icon="close"
        color="primary"
        @click="cancelArrange"
      />
    </q-item-section>

    <transition name="button">
      <q-btn
        v-if="selected && !clearable"
        square
        no-caps
        unelevated
        size="md"
        color="primary"
        class="absolute-right q-px-lg rounded-left"
        :label="lang.arrange"
        @click="arrange"
      />
    </transition>
  </q-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { defaultType } from 'stores/content/defaults';

import { useLang } from 'src/utils/use/useLang';
import { useDataStore } from 'stores/data/dataStore';

import { mdiHeart, mdiHeartOutline } from '@quasar/extras/mdi-v7';
import { useNotify } from 'src/utils/use/useNotify';
import { replaceLettersWithNumbers } from 'src/utils/common';

const props = withDefaults(defineProps<FavoriteItemProps>(), {
  item: () => defaultType,
  clickable: false,
  clearable: false,
});

const lang = computed(() => useLang());
const data = useDataStore();

const price = computed(() => props.item.rate.comma());

const selected = computed(
  () => data.staticSelected.favoriteArrange?.type_id === props.item.type_id
);

const unChosen = computed(() =>
  data.unFavorites.map((item) => item.type_id).includes(props.item.type_id)
);

const select = () => {
  if (data.staticSelected.favoriteArrange?.type_id === props.item.type_id) {
    data.staticSelected.favoriteArrange = null;
    return;
  }

  data.staticSelected.favoriteArrange = props.item;
};

const unFavorite = () => {
  const notification = (add?: boolean) =>
    useNotify(
      `${lang.value.type} <b>${props.item.name}</b> ${
        add ? lang.value.add_fav : lang.value.del_fav
      }`
    );

  if (unChosen.value) {
    notification(true);

    data.unFavorites = data.unFavorites.filter(
      (item) => item.type_id !== props.item.type_id
    );

    return;
  }
  notification();

  data.unFavorites.push(props.item);
};

const arrange = () => {
  data.staticSelected.favorite = props.item;
};

const cancelArrange = () => {
  data.staticSelected.favorite = null;
  data.staticSelected.favoriteArrange = null;
};

interface FavoriteItemProps {
  item: SMMType;
  clickable?: boolean;
  clearable?: boolean;
}
</script>

<style lang="scss" scoped></style>
