<template>
  <q-page class="q-px-sm q-py-md fit" style="overflow-x: hidden">
    <q-tab-panels
      animated
      class="bg-transparent"
      transition-duration="200"
      transition-next="jump-up"
      transition-prev="jump-down"
      v-model="states.tabs"
    >
      <q-tab-panel
        class="q-pa-none q-gutter-y-md"
        :name="tab.name"
        v-for="(tab, index) of tabs"
        :key="index"
        style="min-height: calc(100vh - 140px)"
      >
        <component :is="tab.component" />
      </q-tab-panel>
    </q-tab-panels>

    <desc-button></desc-button>
  </q-page>
</template>

<script setup lang="ts">
import { tabs } from 'stores/content';

import { useStatesStore } from 'stores/states/statesStore';

import DescButton from 'components/DescButton.vue';
const states = useStatesStore();
</script>
