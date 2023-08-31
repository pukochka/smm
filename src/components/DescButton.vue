<template>
  <div
    class="fixed-right smm-description-container transition"
    :class="[classes]"
  >
    <q-btn
      unelevated
      size="md"
      color="primary"
      padding="30px 4px"
      class="rounded-left"
      @click="states.openDialog('desc')"
    >
      <div class="column">
        <q-icon :name="mdiChevronDoubleLeft" size="26px" />

        <q-icon :name="mdiTextBoxOutline" size="26px" />
      </div>
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
import { mdiTextBoxOutline, mdiChevronDoubleLeft } from '@quasar/extras/mdi-v7';
import { useDataStore } from 'stores/data/dataStore';
import { useStatesStore } from 'stores/states/statesStore';
import { computed } from 'vue';

const data = useDataStore();
const states = useStatesStore();

const classes = computed(() =>
  data.selectedType[data.ordersPanel] && states.tabs === 'newOrder'
    ? ' smm-description-container__active'
    : ''
);
</script>

<style lang="scss" scoped>
.smm-description-container {
  transform: translateY(-15%) translateX(100%);
  top: 50%;
  right: 0;

  &__active {
    transform: translateY(-15%) translateX(0);
  }
}
</style>
