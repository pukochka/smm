<template>
  <div class="row no-wrap q-gutter-x-sm">
    <q-btn
      no-caps
      no-wrap
      :outline="data.ordersPanel !== 'new_order'"
      unelevated
      align="left"
      padding="6px"
      color="primary"
      class="rounded col"
      @click="data.ordersPanel = 'new_order'"
    >
      <q-icon :name="mdiNewspaper" size="23px" />

      <div class="absolute-center">{{ lang.newOrder }}</div>
    </q-btn>

    <q-btn
      no-caps
      no-wrap
      :outline="data.ordersPanel !== 'favorites'"
      unelevated
      align="left"
      padding="6px"
      color="primary"
      class="rounded col"
      @click="data.ordersPanel = 'favorites'"
    >
      <q-icon :name="mdiHeart" size="23px" />

      <div class="absolute-center">{{ lang.favourites }}</div>
    </q-btn>
  </div>

  <q-tab-panels v-model="data.ordersPanel" animated>
    <q-tab-panel name="new_order" class="q-pa-none q-gutter-y-md">
      <new-order-panel></new-order-panel>
    </q-tab-panel>

    <q-tab-panel name="favorites" class="q-pa-none">
      <favourite-panel></favourite-panel>
    </q-tab-panel>

    <q-tab-panel name="repeat" class="q-pa-none">
      <repeat-panel></repeat-panel>
    </q-tab-panel>
  </q-tab-panels>

  <field-item
    v-for="(field, index) of data.schema"
    :key="index"
    :field="field"
    :optional="addict"
  />

  <q-item tag="label" dense class="rounded" v-if="addictVisible">
    <q-item-section avatar>
      <q-toggle v-model="addict" val="teal" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-center">{{ lang.addiction }}</q-item-label>
    </q-item-section>
  </q-item>

  <div class="row q-gutter-y-sm" v-if="launchView">
    <q-btn
      outline
      no-caps
      size="md"
      color="primary"
      :label="lang.desc"
      class="col-12 rounded"
      @click="states.openDialog('desc')"
    />

    <div class="text-caption text-grey">
      {{ lang.desc_notify }}
    </div>

    <dashed-item :label="lang.rate" :value="rate" />

    <dashed-item :label="lang.total" :value="total" />

    <q-btn
      unelevated
      no-caps
      padding="12px"
      size="md"
      color="primary"
      :label="lang.launch"
      class="col-12 rounded"
      :loading="loading.create"
      @click="createOrder"
    />
  </div>
</template>

<script lang="ts" setup>
import config from 'src/config';
import { computed, ref } from 'vue';

import { useLang } from 'src/utils/use/useLang';
import { useStatesStore } from 'stores/states/statesStore';
import { useDataStore } from 'stores/data/dataStore';

import { fetchSMM } from 'boot/queries';

import NewOrderPanel from 'src/panels/NewOrderPanel.vue';
import FavouritePanel from 'src/panels/FavouritePanel.vue';
import DashedItem from 'components/DashedItem.vue';
import FieldItem from 'components/fields/FieldItem.vue';

import { mdiHeart, mdiNewspaper } from '@quasar/extras/mdi-v7';
import RepeatPanel from 'src/panels/RepeatPanel.vue';

const lang = computed(() => useLang());
const states = useStatesStore();
const data = useDataStore();

const addict = ref(false);
const loading = ref({
  select: false,
  create: false,
});

const launchView = computed(() => data.selectedType[data.ordersPanel]);

const rate = computed(() => (data.staticSelected.type?.rate ?? 0).comma());

const price = computed(
  () =>
    ((data.staticSelected.type?.rate ?? 0) / 1000) *
    (Number(data.fieldsValues?.quantity) ?? 0)
);

const addictVisible = computed(
  () => data.schema.map((item) => item.optional).length
);

const total = computed(() =>
  (addict.value
    ? Number(data.fieldsValues['runs'] !== '' ? data.fieldsValues['runs'] : 1) *
      price.value
    : price.value
  ).comma()
);

const createOrder = () => {
  loading.value.create = true;

  fetchSMM('createOrder', {
    user_id: data.user.id,
    public_key: config.public_key,
    user_secret_key: data.systemUser.secret_user_key,
    type_id: launchView.value?.type_id,
    type: launchView.value?.type,
    ...data.fieldsValues,
  }).then(() => (loading.value.create = false));
};
</script>

<style lang="scss" scoped></style>
