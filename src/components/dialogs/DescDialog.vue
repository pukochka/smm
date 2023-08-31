<template>
  <q-dialog
    v-model="states.dialogs.desc"
    position="right"
    transition-duration="200"
    persistent
  >
    <q-card flat class="rounded-left q-ml-md">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold">
          {{ lang.desc }}
        </q-toolbar-title>
      </q-toolbar>

      <q-card-section class="q-pt-none">
        <div v-html="desc"></div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          no-caps
          size="md"
          :label="lang.close"
          class="rounded"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useStatesStore } from 'stores/states/statesStore';
import { useDataStore } from 'stores/data/dataStore';
import { useLang } from 'src/utils/use/useLang';

const states = useStatesStore();
const data = useDataStore();
const lang = computed(() => useLang());

const langStr = computed(() =>
  data.ordersPanel === 'new_order' ? 'type' : 'favorite'
);

const desc = computed(() =>
  data.user.language === 'eng'
    ? data.staticSelected[langStr.value]?.desc_eng
    : data.staticSelected[langStr.value]?.desc_ru
);
</script>

<style lang="scss" scoped></style>
