<template>
  <div class="row col-12 items-end text-body1 text-weight-bold">
    <div>{{ label }}</div>

    <div class="col-grow q-mx-sm relative-position">
      <div class="order-dashed"></div>
    </div>

    <div class="row items-end q-gutter-x-sm">
      <div class="">{{ value }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<DashedItemProps>(), {
  label: '',
  value: '',
});

interface DashedItemProps {
  label: any;
  value: any;
}
</script>

<style lang="scss" scoped></style>
