<template>
  <q-input
    dense
    maxlength="6"
    mask="######"
    outlined
    class="smm-input"
    v-model="number"
  />
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useDataStore } from 'stores/data/dataStore';

const props = withDefaults(defineProps<FieldProps>(), {
  field: null,
});

const data = useDataStore();

const number = ref('');

onMounted(() => data.updateSchema(props.field?.param, number));

onUnmounted(() => data.deleteParam(props.field?.param));

interface FieldProps {
  field: SMMFieldsSchema | null;
}
</script>

<style lang="scss" scoped></style>
