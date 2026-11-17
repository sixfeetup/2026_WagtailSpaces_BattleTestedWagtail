<script setup lang="ts">
import SixieFrame from '../components/SixieFrame.vue'

defineProps<{ layoutClass?: string }>()
</script>

<template>
  <SixieFrame variant="two-cols">
    <div class="sixie-columns" :class="layoutClass">
      <div class="sixie-column"><slot /><slot name="left" /></div>
      <div class="sixie-column"><slot name="right" /></div>
    </div>
  </SixieFrame>
</template>
