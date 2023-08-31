<template>
  <q-dialog v-model="states.dialogs.range" @before-show="update" persistent>
    <q-card style="width: 100%" flat class="rounded">
      <q-card-section>
        <div class="text-h6">{{ lang.minmax }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-y-sm">
        <div class="">
          <div class="">{{ lang.min }}</div>

          <q-input
            dense
            outlined
            mask="#######"
            class="smm-input"
            v-model="range.min"
          />
        </div>

        <div class="">
          <div class="">{{ lang.max }}</div>

          <q-input
            dense
            outlined
            mask="#######"
            class="smm-input"
            v-model="range.max"
          />
        </div>

        <div class="" style="height: 30px">
          <transition name="q-transition--fade">
            <div class="text-caption text-red" v-show="disable">
              {{ hint }}
            </div>
          </transition>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          no-caps
          outline
          padding="4px 8px"
          :label="lang.cancel"
          color="primary"
          class="rounded"
          v-close-popup
        />

        <q-btn
          no-caps
          outline
          padding="4px 8px"
          :label="lang.confirm"
          color="primary"
          class="rounded"
          :disable="disable"
          @click="updateFields"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useStatesStore } from 'stores/states/statesStore';
import { useDataStore } from 'stores/data/dataStore';
import { useLang } from 'src/utils/use/useLang';

const states = useStatesStore();
const data = useDataStore();
const lang = computed(() => useLang());

const range = ref({
  min: -1,
  max: -1,
});

const min = computed(() => Number(data.staticSelected.type?.min ?? 1));
const max = computed(() => Number(data.staticSelected.type?.max ?? 2));

const minValue = computed(() => Number(data.fieldsValues?.['min']) ?? 0);
const maxValue = computed(() => Number(data.fieldsValues?.['max']) ?? 1);

const minRange = computed(() => Number(range.value.min));
const maxRange = computed(() => Number(range.value.max));

const hint = computed(
  () =>
    `${lang.value.from} ` +
    (data.staticSelected.type?.min ?? 1) +
    ` ${lang.value.to} ` +
    (data.staticSelected.type?.max ?? 2)
);

const disable = computed(
  () => min.value > minRange.value || max.value < maxRange.value
);

const update = () => {
  range.value.min = minValue.value;
  range.value.max = maxValue.value;
};

const updateFields = () => {
  data.fieldsValues['min'] = minRange.value;
  data.fieldsValues['max'] = maxRange.value;
};
</script>

<style lang="scss" scoped></style>
