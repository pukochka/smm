<template>
  <div class="col-6">
    <q-btn
      no-wrap
      no-caps
      unelevated
      color="primary"
      class="fit rounded"
      padding="6px"
      align="left"
      :outline="data.staticSelected.social?.id !== item.id"
      :disable="states.loadings.getCategories && !loading"
      :loading="loading"
      @click="selectSocial"
    >
      <q-icon
        :name="icon.icon"
        :color="
          data.staticSelected.social?.id !== item.id ? icon.color : 'white'
        "
        size="23px"
      />

      <div
        class="ellipsis absolute-center"
        :class="[
          data.staticSelected.social?.id !== item.id
            ? ' smm-color__text-black'
            : '',
        ]"
      >
        {{ item.name_en }}
      </div>
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useDataStore } from 'stores/data/dataStore';
import { useStatesStore } from 'stores/states/statesStore';

import { defaultSocial } from 'stores/content/defaults';

import { fetchStatic } from 'boot/queries';
import { icons } from 'stores/content/icons';

const props = withDefaults(defineProps<ServiceItemProps>(), {
  item: () => defaultSocial,
});

const data = useDataStore();
const states = useStatesStore();

const loading = ref(false);

const icon = computed(() => icons[props.item.id] ?? icons[8]);

const selectSocial = () => {
  loading.value = true;
  states.loadings.getCategories = true;
  data.staticSelected.social = props.item;

  fetchStatic(props.item.id).then(() => {
    loading.value = false;
    states.loadings.getCategories = false;
  });
};

interface ServiceItemProps {
  item: SMMSocial;
}
</script>

<style lang="scss" scoped></style>
