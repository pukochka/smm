<template>
  <q-input :autogrow="grow" dense outlined class="smm-input" v-model="text" />
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useDataStore } from 'stores/data/dataStore';

const props = withDefaults(defineProps<FieldProps>(), {
  field: null,
  grow: false,
});

const data = useDataStore();

const text = ref('');

onMounted(() => data.updateSchema(props.field?.param, text));

onUnmounted(() => data.deleteParam(props.field?.param));

interface FieldProps {
  field: SMMFieldsSchema | null;
  grow: boolean;
}
</script>

<style lang="scss" scoped></style>
