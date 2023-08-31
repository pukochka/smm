<template>
  <div class="row">
    <q-btn
      no-wrap
      no-caps
      dense
      unelevated
      color="primary"
      class="col-12 rounded"
      :label="lang.date_select"
    >
      <q-popup-proxy transition-show="fade" transition-hide="fade">
        <q-date flat bordered class="rounded" v-model="datePr">
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn
              padding="4px 8px"
              outline
              no-caps
              class="rounded"
              :label="lang.cancel"
              color="primary"
              v-close-popup
            />

            <q-btn
              padding="4px 8px"
              no-caps
              outline
              class="rounded"
              :label="lang.confirm"
              color="primary"
              @click="proxyDate = datePr"
              v-close-popup
            />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-btn>

    <div class="q-pt-sm text-center col-12">{{ hint }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { date } from 'quasar';
import { useDataStore } from 'stores/data/dataStore';
import { useLang } from 'src/utils/use/useLang';

const props = withDefaults(defineProps<FieldProps>(), {
  field: null,
});

const data = useDataStore();
const lang = computed(() => useLang());

const datePr = ref(null);
const proxyDate = ref(null);

const dateValue = computed(() =>
  proxyDate.value ? date.formatDate(proxyDate.value, 'D/M/YYYY') : ''
);

const hint = computed(() =>
  proxyDate.value
    ? date.formatDate(proxyDate.value, 'D/M/YYYY')
    : lang.value.date_notify
);

onMounted(() => data.updateSchema(props.field?.param, dateValue));

onUnmounted(() => data.deleteParam(props.field?.param));

interface FieldProps {
  field: SMMFieldsSchema | null;
}
</script>

<style lang="scss" scoped></style>
