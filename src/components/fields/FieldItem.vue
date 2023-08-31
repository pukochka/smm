<template>
  <div class="" v-if="!field.optional || optional">
    <div class="text-body1 text-weight-bold q-pb-sm">
      {{ field.label }}
    </div>

    <q-item-section side class="text-caption" v-if="field.caption">
      {{ field.caption }}
    </q-item-section>

    <component
      :is="typesComp[field.type]"
      :field="props.field"
      :grow="field.type === 'textarea'"
    ></component>

    <div class="text-caption text-grey">{{ hint }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import TextField from 'components/fields/TextField.vue';
import NumberField from 'components/fields/NumberField.vue';
import CountField from 'components/fields/CountField.vue';
import DateField from 'components/fields/DateField.vue';
import DelayField from 'components/fields/DelayField.vue';
import RangeField from 'components/fields/RangeField.vue';
import { useLang } from 'src/utils/use/useLang';

const props = withDefaults(defineProps<FieldItemProps>(), {
  field: null,
  optional: false,
});

const lang = computed(() => useLang());

const hint = computed(() =>
  props.field?.optional ? lang.value.optional_field : ''
);

const typesComp: Record<SMMFieldTypes, any> = {
  text: TextField,
  textarea: TextField,
  count: CountField,
  range: RangeField,
  date: DateField,
  delay: DelayField,
  number: NumberField,
};

interface FieldItemProps {
  field: SMMFieldsSchema | null;
  optional: boolean;
}
</script>

<style lang="scss" scoped></style>
