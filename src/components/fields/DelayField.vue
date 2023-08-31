<template>
  <q-select
    dense
    outlined
    options-html
    class="smm-input"
    options-dense
    behavior="dialog"
    popup-content-class="rounded no-shadow bordered"
    :options="delayValues"
    v-model="delay"
  />
</template>

<script lang="ts" setup>
import { useDataStore } from 'stores/data/dataStore';
import { onMounted, onUnmounted, ref } from 'vue';

const props = withDefaults(defineProps<FieldProps>(), {
  field: null,
});

const data = useDataStore();

const delay = ref(5);

const delayValues = [
  0, 5, 10, 15, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 360, 420, 480,
  540, 600,
];

onMounted(() => data.updateSchema(props.field?.param, delay));

onUnmounted(() => data.deleteParam(props.field?.param));

interface FieldProps {
  field: SMMFieldsSchema | null;
}
</script>

<style lang="scss" scoped></style>
