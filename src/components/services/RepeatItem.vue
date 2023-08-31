<template>
  <q-item dense class="rounded bordered">
    <q-item-section class="q-py-sm q-px-sm">
      <q-item-label class="ellipsis">{{ item.type_name }}</q-item-label>

      <q-item-label caption>За 1000 - {{ price }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-btn
        flat
        rounded
        size="md"
        color="primary"
        icon="close"
        @click="cancelRepeat"
      />
    </q-item-section>
  </q-item>
</template>

<script lang="ts" setup>
import { defaultOrder } from 'stores/content/defaults';
import { computed } from 'vue';
import { useStatesStore } from 'stores/states/statesStore';
import { useDataStore } from 'stores/data/dataStore';

const props = withDefaults(defineProps<RepeatItemProps>(), {
  item: () => defaultOrder,
});

const states = useStatesStore();
const data = useDataStore();

const price = computed(() => props.item.cost.comma());

const cancelRepeat = () => {
  data.staticSelected.repeat = null;

  states.toggleTab('orders');

  data.ordersPanel = 'new_order';
};

interface RepeatItemProps {
  item: SMMOrder;
}
</script>

<style lang="scss" scoped></style>
