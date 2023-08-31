<template>
  <div class="">
    <q-item>
      <q-item-section side> {{ min }} </q-item-section>

      <q-item-section>
        <q-range v-model="range" :min="min" :max="max" label color="primary" />
      </q-item-section>

      <q-item-section side>{{ max }} </q-item-section>
    </q-item>

    <div class="text-center text-weight-bold text-body1 q-py-xs">
      {{ hint }}
    </div>

    <div class="row">
      <q-btn
        no-caps
        no-wrap
        dense
        outline
        size="md"
        color="primary"
        class="rounded col"
        :label="lang.range_select"
        @click="states.openDialog('range')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
  WritableComputedRef,
} from 'vue';
import { useStatesStore } from 'stores/states/statesStore';
import { useDataStore } from 'stores/data/dataStore';
import { useLang } from 'src/utils/use/useLang';

const props = withDefaults(defineProps<FieldProps>(), {
  field: null,
});

const states = useStatesStore();
const data = useDataStore();
const lang = computed(() => useLang());

const range = ref({
  min: -1,
  max: -1,
});

const min = computed(() => Number(data.staticSelected.type?.min ?? 1));
const max = computed(() => Number(data.staticSelected.type?.max ?? 2));

const maxValue: WritableComputedRef<number> = computed({
  get(): number {
    return range.value.max;
  },
  set(newValue: number): void {
    range.value.max = newValue;
  },
});

const minValue: WritableComputedRef<number> = computed({
  get(): number {
    return range.value.min;
  },
  set(newValue: number): void {
    range.value.min = newValue;
  },
});

const hint = computed(
  () =>
    `${lang.value.from} ` +
    range.value.min +
    ` ${lang.value.to} ` +
    range.value.max
);

watch(min, (val, oldVal) => {
  if (val < oldVal) return;

  range.value.min = min.value;
});
watch(max, (val, oldVal) => {
  if (val > oldVal) return;

  range.value.max = max.value;
});

onMounted(() => {
  range.value.min = min.value;
  range.value.max = max.value;

  data.updateSchema('min', minValue);
  data.updateSchema('max', maxValue);
});

onUnmounted(() => {
  data.deleteParam('min');
  data.deleteParam('max');
});

interface FieldProps {
  field: SMMFieldsSchema | null;
}
</script>

<style lang="scss" scoped></style>
