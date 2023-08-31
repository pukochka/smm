<template>
  <div class="row q-gutter-y-sm">
    <div class="bordered rounded col-12 q-pa-lg">
      <div class="text-caption text-grey">{{ lang.user_value }}</div>

      <div class="row text-h6 text-weight-bold no-wrap">
        <q-icon :name="mdiAccount" color="primary" size="32px" />

        <div class="ellipsis q-pl-sm">{{ name }}</div>
      </div>
    </div>

    <div class="bordered rounded col-12 q-pa-lg">
      <div class="text-caption text-grey">{{ lang.balance }}</div>

      <div class="row text-h6 text-weight-bold no-wrap">
        <q-icon :name="mdiWallet" color="primary" size="32px" />

        <div class="q-pl-sm">{{ money }}</div>

        <q-space></q-space>

        <q-btn
          flat
          class="rounded"
          size="md"
          color="primary"
          icon="refresh"
          :loading="loading"
          @click="updateUser"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useDataStore } from 'stores/data/dataStore';
import { fetchUser } from 'boot/queries';
import { useLang } from 'src/utils/use/useLang';

import { mdiWallet, mdiAccount } from '@quasar/extras/mdi-v7';

const data = useDataStore();
const lang = computed(() => useLang());

const loading = ref(false);

const name = computed(
  () => data.systemUser.user.first_name + ' ' + data.systemUser.user.last_name
);

const money = computed(() => data.systemUser.money.comma());

const updateUser = () => {
  loading.value = true;

  fetchUser(true).then(() => (loading.value = false));
};
</script>

<style lang="scss" scoped></style>
