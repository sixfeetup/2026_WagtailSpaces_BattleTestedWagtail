<script setup lang="ts">
import logo from '../assets/title-logo.svg'

withDefaults(defineProps<{ variant?: string }>(), { variant: 'body' })
</script>

<template>
  <div class="slidev-layout sixie-frame" :class="'sixie-' + variant">
    <img class="sixie-brand" :src="logo" alt="Six Feet Up" />
    <div class="sixie-content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="sixie-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
