<template>
  <div class="col-6">
    <q-btn
      no-wrap
      no-caps
      unelevated
      align="left"
      color="primary"
      padding="6px"
      class="fit rounded"
      :loading="loading"
      :disable="states.loadings.getCategories && !loading"
      :outline="data.staticSelected.social?.id !== item.id"
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
        <div
          v-html="
            item.name_en === 'VK' && data.isSaved
              ? '▽K'
              : replaceLettersWithNumbers(item.name_en)
          "
        ></div>
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
import { replaceLettersWithNumbers } from 'src/utils/common';

const props = withDefaults(defineProps<ServiceItemProps>(), {
  item: () => defaultSocial,
});

const vk = '<span>\/K</span>';

const data = useDataStore();
const states = useStatesStore();

const loading = ref(false);

const icon = computed(() => icons[props.item.id] || icons[8]);

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
