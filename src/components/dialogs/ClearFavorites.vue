<template>
  <q-dialog v-model="states.dialogs.clear">
    <q-card class="rounded">
      <q-card-section>
        {{ lang.delete_notify }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          size="md"
          :label="lang.confirmF"
          color="red"
          class="rounded"
          @click="clearFavorites"
          v-close-popup
        />

        <q-btn
          flat
          size="md"
          :label="lang.cancel"
          color="primary"
          class="rounded"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { LocalStorage } from 'quasar';

import { useDataStore } from 'stores/data/dataStore';
import { useStatesStore } from 'stores/states/statesStore';
import { computed } from 'vue';
import { useLang } from 'src/utils/use/useLang';

const states = useStatesStore();
const data = useDataStore();
const lang = computed(() => useLang());

const clearFavorites = () => {
  data.favorites = [];
  LocalStorage.set('favorites', []);

  data.staticSelected.favorite = null;
  data.staticSelected.favoriteArrange = null;
};
</script>

<style lang="scss" scoped></style>
