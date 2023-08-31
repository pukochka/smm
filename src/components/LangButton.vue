<template>
  <q-btn
    flat
    size="md"
    color="primary"
    :icon="mdiWeb"
    :label="data.user.language"
    :loading="loading"
    class="rounded"
  >
    <q-menu class="smm-portal-menu">
      <q-list dense style="min-width: 100px">
        <q-item
          clickable
          v-close-popup
          v-for="(item, index) of lang"
          :key="index"
          @click="changeLang(item.symbol)"
        >
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { fetchSMM } from 'boot/queries';
import { useDataStore } from 'stores/data/dataStore';

import { lang } from 'stores/content';
import { mdiWeb } from '@quasar/extras/mdi-v7';

const data = useDataStore();

const loading = ref(false);

const changeLang = (lang: string) => {
  if (data.user.language === lang) return;

  loading.value = true;

  fetchSMM('setLanguage', {
    language: lang,
    user_id: data.user.id,
    user_secret_key: data.systemUser.secret_user_key,
  }).then(() => (loading.value = false));
};
</script>

<style lang="scss" scoped></style>
