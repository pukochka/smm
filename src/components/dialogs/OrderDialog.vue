<template>
  <q-dialog
    v-model="states.dialogs.order"
    persistent
    position="bottom"
    no-shake
  >
    <q-card style="width: 100%" flat class="rounded">
      <q-card-section class="row justify-between items-center no-wrap">
        <div class="text-h6 ellipsis">
          {{ lang.order }} № {{ data.selectedOrder.id }}
        </div>

        <q-btn
          flat
          size="md"
          color="primary"
          icon="close"
          class="rounded"
          v-close-popup
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row q-gutter-y-sm">
          <div
            class="row col-12 items-end"
            v-for="(item, index) in orderPanel"
            :key="index"
          >
            <div>{{ item.label }}</div>

            <div class="col-grow q-mx-sm relative-position">
              <div class="order-dashed"></div>
            </div>

            <div class="row items-end q-gutter-x-sm">
              <div class="">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </q-card-section>

      <div class="q-pa-md row">
        <q-btn
          no-caps
          outline
          size="md"
          color="primary"
          :label="lang.close"
          class="col rounded"
          v-close-popup
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { date } from 'quasar';
import 'src/utils/polifills';

import { useStatesStore } from 'stores/states/statesStore';
import { useDataStore } from 'stores/data/dataStore';
import { useLang } from 'src/utils/use/useLang';

const states = useStatesStore();
const data = useDataStore();
const lang = computed(() => useLang());

const orderPanel = computed(() => [
  {
    label: lang.value.date,
    value: date.formatDate(data.selectedOrder.created_at, 'DD-MM-YYYY'),
  },
  {
    label: lang.value.service,
    value: data.selectedOrder.type_name,
  },
  {
    label: lang.value.status,
    value: lang.value.statuses[data.selectedOrder.status],
  },
  {
    label: lang.value.cost,
    value: data.selectedOrder.cost.comma(),
  },
  {
    label: lang.value.remains,
    value: data.selectedOrder.remains,
  },
  {
    label: lang.value.start_count,
    value: data.selectedOrder.start_count,
  },
  {
    label: lang.value.link,
    value: data.selectedOrder.link,
  },
]);
</script>

<style lang="scss" scoped></style>
