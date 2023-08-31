<template>
  <q-layout view="lHh lpR lFf">
    <q-inner-loading
      :showing="states.loadings.start"
      transition-show="none"
      transition-hide="fade"
      class="z-max bg-page"
      style="position: fixed"
    >
      <q-spinner-bars size="80px" color="primary" />
    </q-inner-loading>

    <q-header class="bg-page smm-header q-mx-sm rounded-bottom">
      <q-toolbar>
        <q-tab-panels
          v-model="states.tabs"
          animated
          transition-duration="200"
          transition-prev="slide-down"
          transition-next="slide-up"
          class="col-grow"
        >
          <q-tab-panel
            class="q-pa-sm"
            :name="tab.name"
            v-for="(tab, index) of tabs"
            :key="index"
          >
            <div class="text-h6 text-weight-bold smm-color__text">
              {{ tab.label }}
            </div>
          </q-tab-panel>
        </q-tab-panels>

        <lang-button></lang-button>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="smm-footer bg-page q-mx-sm rounded-top overflow-hidden">
      <div class="row no-wrap">
        <q-btn
          flat
          no-caps
          square
          class="col"
          color="primary"
          v-for="(tab, index) of tabs"
          :key="index"
          @click="states.toggleTab(tab.name)"
        >
          <div class="column items-center">
            <q-icon :name="tab.icon" color="primary" size="21px" />

            <div class="text-subtitle2">{{ tab.label }}</div>
          </div>
        </q-btn>
      </div>
    </q-footer>

    <desc-dialog></desc-dialog>

    <range-select></range-select>

    <count-select></count-select>

    <order-dialog></order-dialog>

    <clear-favorites></clear-favorites>
  </q-layout>
</template>

<script setup lang="ts">
import { tabs } from 'stores/content';

import { useStatesStore } from 'stores/states/statesStore';

import LangButton from 'components/LangButton.vue';
import DescDialog from 'components/dialogs/DescDialog.vue';
import RangeSelect from 'components/dialogs/RangeSelect.vue';
import CountSelect from 'components/dialogs/CountSelect.vue';
import OrderDialog from 'components/dialogs/OrderDialog.vue';
import ClearFavorites from 'components/dialogs/ClearFavorites.vue';

const states = useStatesStore();
</script>
