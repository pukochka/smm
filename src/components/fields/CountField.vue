<template>
  <div class="">
    <q-item>
      <q-item-section side> {{ min }} </q-item-section>

      <q-item-section>
        <q-slider label color="primary" :min="min" :max="max" v-model="value" />
      </q-item-section>

      <q-item-section side> {{ max }}</q-item-section>
    </q-item>

    <div class="text-center text-body1 text-weight-bold q-py-xs">
      {{ value }}
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
        :label="lang.count_select"
        @click="states.openDialog('count')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useStatesStore } from 'stores/states/statesStore';
import { useDataStore } from 'stores/data/dataStore';
import { useLang } from 'src/utils/use/useLang';

const props = withDefaults(defineProps<FieldProps>(), {
  field: null,
});

const states = useStatesStore();
const data = useDataStore();
const lang = computed(() => useLang());

const value = ref(-1);

const min = computed(() =>
  Number(data.selectedType[data.ordersPanel]?.min ?? 1)
);
const max = computed(() =>
  Number(data.selectedType[data.ordersPanel]?.max ?? 2)
);

watch(min, (val, oldVal) => {
  if (val < oldVal) return;

  value.value = min.value;
});
watch(max, (val, oldVal) => {
  if (val > oldVal) return;

  value.value = min.value;
});

onMounted(() => {
  value.value = min.value;
  data.updateSchema(props.field?.param, value);
});

onUnmounted(() => data.deleteParam(props.field?.param));

interface FieldProps {
  field: SMMFieldsSchema | null;
}
</script>

<style lang="scss" scoped></style>
