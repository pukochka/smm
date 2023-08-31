<template>
  <q-dialog @before-show="update" v-model="states.dialogs.count" persistent>
    <q-card style="width: 100%" flat class="rounded">
      <q-card-section>
        <div class="text-h6">{{ lang.quantity }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-y-sm">
        <q-input
          dense
          outlined
          autofocus
          mask="#######"
          class="smm-input"
          :rules="[() => !disable || lang.input_notify]"
          :hint="hint"
          v-model="count"
        />
      </q-card-section>

      <q-card-actions align="right" class="q-px-md q-pb-md q-pt-none">
        <q-btn
          no-caps
          flat
          padding="4px 8px"
          :label="lang.cancel"
          color="primary"
          class="rounded"
          v-close-popup
        />

        <q-btn
          no-caps
          flat
          padding="4px 8px"
          color="primary"
          class="rounded"
          v-close-popup
          :disable="disable"
          :label="lang.confirm"
          @click="data.updateSchema('quantity', countValue)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useStatesStore } from 'stores/states/statesStore';
import { useDataStore } from 'stores/data/dataStore';
import { useLang } from 'src/utils/use/useLang';

const states = useStatesStore();
const data = useDataStore();
const lang = computed(() => useLang());

const count = ref(0);
const countValue = computed(() => Number(count.value));

const min = computed(() =>
  Number(data.selectedType[data.ordersPanel]?.min ?? 1)
);
const max = computed(() =>
  Number(data.selectedType[data.ordersPanel]?.max ?? 2)
);

const hint = computed(
  () =>
    `${lang.value.from} ` +
    (data.selectedType[data.ordersPanel]?.min ?? 1) +
    ` ${lang.value.to} ` +
    (data.selectedType[data.ordersPanel]?.max ?? 2)
);

const disable = computed(
  () => min.value > countValue.value || max.value < countValue.value
);

const update = () => {
  count.value = Number(data.fieldsValues['quantity']);
};
</script>

<style lang="scss" scoped></style>
