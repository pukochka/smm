<template>
  <div class="">
    <div class="row q-col-gutter-xs">
      <div
        class="col-6"
        v-show="value.condition"
        v-for="([name, value], index) of Object.entries(statuses)"
        :key="index"
      >
        <q-btn
          no-caps
          no-wrap
          unelevated
          color="primary"
          class="rounded col-6 fit"
          align="left"
          :outline="statusFilter !== name"
          @click="statusFilter = name as SMMOrderStatuses"
        >
          <q-icon :name="value.icon" size="24px" />

          <div class="absolute-center">{{ value.label }}</div>

          <div class="absolute-right p-6-16" v-if="name === 'all'">
            {{ data.orders.length }}
          </div>
        </q-btn>
      </div>
    </div>
  </div>

  <pagination-list
    search=""
    :visible-items="3"
    :el-height="elHeight"
    :current-items="ordersValue"
  >
    <template v-slot="{ item }">
      <order-item :item="item"></order-item>
    </template>
  </pagination-list>

  <div
    class="bordered text-body1 column flex-center rounded q-pa-lg q-gutter-y-md"
    v-if="!ordersValue.length"
  >
    <q-icon
      :name="mdiInformation"
      color="primary"
      size="32px"
      class="q-mt-none"
    />

    <div class="">{{ notify }}</div>

    <q-btn
      v-if="statusFilter === 'all'"
      outline
      no-wrap
      no-caps
      size="md"
      color="primary"
      class="rounded"
      :label="lang.create_new"
      @click="states.toggleTab('newOrder')"
    />
  </div>

  <q-inner-loading
    transition-show="none"
    transition-hide="fade"
    :showing="loading"
    class="bg-page q-mt-none"
  >
    <q-spinner size="50px" color="primary" />
  </q-inner-loading>
</template>

<script lang="ts" setup>
import config from 'src/config';
import { computed, onBeforeMount, ref } from 'vue';
import { useQuasar } from 'quasar';

import { useLang } from 'src/utils/use/useLang';
import { useDataStore } from 'stores/data/dataStore';
import { useStatesStore } from 'stores/states/statesStore';

import PaginationList from 'components/services/PaginationList.vue';
import OrderItem from 'components/services/OrderItem.vue';

import { fetchSMM } from 'boot/queries';

const quasar = useQuasar();
const data = useDataStore();
const states = useStatesStore();
const lang = computed(() => useLang());

const statusFilter = ref<SMMOrderStatuses>('all');
const loading = ref(false);

const elHeight = computed(() => quasar.screen.height / 6);

const ordersValue = computed(() =>
  statusFilter.value !== 'all'
    ? data.orders.filter((item) =>
        statusFilter.value === 'Partial'
          ? item.status === 'In progress' || item.status === 'Partial'
          : item.status === statusFilter.value
      )
    : data.orders
);

const notify = computed(() => statuses.value[statusFilter.value].notify);

onBeforeMount(() => {
  loading.value = true;

  fetchSMM('orders', {
    user_id: data.user.id,
    public_key: config.public_key,
    user_secret_key: data.systemUser.secret_user_key,
  }).then(() => (loading.value = false));
});

import {
  mdiViewWeek,
  mdiTimerSandComplete,
  mdiCheckUnderline,
  mdiProgressHelper,
  mdiInformation,
} from '@quasar/extras/mdi-v7';
const statuses = computed((): Record<SMMOrderStatuses, any> => {
  return {
    all: {
      label: lang.value.statuses.all,
      icon: mdiViewWeek,
      notify: lang.value.orders_notify,
      condition: true,
    },
    Pending: {
      label: lang.value.statuses.Pending,
      icon: mdiTimerSandComplete,
      notify: lang.value.orders_pend_notify,
      condition: true,
    },
    Partial: {
      label: lang.value.statuses.Partial,
      icon: mdiProgressHelper,
      notify: lang.value.orders_part_notify,
      condition: true,
    },
    Completed: {
      label: lang.value.orders_completed,
      icon: mdiCheckUnderline,
      notify: lang.value.orders_comp_notify,
      condition: true,
    },
    Canceled: {
      label: '',
      icon: '',
      notify: '',
      condition: false,
    },
    'In progress': {
      label: '',
      icon: '',
      notify: '',
      condition: false,
    },
    Old: {
      label: '',
      icon: '',
      notify: '',
      condition: false,
    },
  };
});
</script>

<style lang="scss" scoped>
.p-6-16 {
  padding: 6px 16px;
}
</style>
