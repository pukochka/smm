<template>
  <div class="q-py-sm text-body1 text-weight-bold">
    Повтор заказа № {{ data.staticSelected.repeat?.id }}
  </div>

  <repeat-item :item="data.staticSelected.repeat"></repeat-item>
</template>

<script lang="ts" setup>
import { useDataStore } from 'stores/data/dataStore';

import RepeatItem from 'components/services/RepeatItem.vue';

const data = useDataStore();
</script>

<style lang="scss" scoped></style>
