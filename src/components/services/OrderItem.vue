<template>
  <q-item :style="{ height: elHeight + 'px' }">
    <q-item-section>
      <q-item-label caption class="row no-wrap items-center">
        <div class="text-subtitle2">{{ lang.order }} № {{ item.id }}</div>

        <q-space></q-space>

        <div class="text-subtitle2">{{ cost }}</div>
      </q-item-label>

      <q-item-label class="ellipsis-2-lines">
        {{ replaceLettersWithNumbers(item.type_name) }}
      </q-item-label>

      <div class="row justify-end q-mt-sm">
        <q-btn
          dense
          no-caps
          outline
          size="md"
          color="primary"
          class="rounded col-6"
          :loading="loading"
          :label="lang.details"
          @click="openOrder"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script lang="ts" setup>
import config from 'src/config';
import { computed, ref } from 'vue';

import { useQuasar } from 'quasar';
import { useDataStore } from 'stores/data/dataStore';
import { useLang } from 'src/utils/use/useLang';
import { fetchSMM } from 'boot/queries';

import { defaultOrder } from 'stores/content/defaults';
import { useStatesStore } from 'stores/states/statesStore';
import { replaceLettersWithNumbers } from 'src/utils/common';

const props = withDefaults(defineProps<OrderItemProps>(), {
  item: () => defaultOrder,
});

const quasar = useQuasar();
const data = useDataStore();
const states = useStatesStore();
const lang = computed(() => useLang());

const loading = ref(false);

const cost = computed(() => props.item.cost.comma());
const elHeight = computed(() => quasar.screen.height / 6);

const openOrder = () => {
  loading.value = true;

  fetchSMM('getOrder', {
    user_secret_key: data.systemUser.secret_user_key,
    user_id: data.user.id,
    public_key: config.public_key,
    order_id: props.item.id,
  }).then(() => (loading.value = false));
};

const repeatOrder = () => {
  data.staticSelected.repeat = props.item;

  states.toggleTab('newOrder');

  data.ordersPanel = 'repeat';
};

interface OrderItemProps {
  item: SMMOrder;
}
</script>

<style lang="scss" scoped></style>
