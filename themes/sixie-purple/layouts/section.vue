<script setup lang="ts">
import logo from '../assets/title-logo.svg'

withDefaults(defineProps<{ number?: string | number; showLogo?: boolean }>(), { showLogo: false })
</script>

<template>
  <div class="slidev-layout sixie-section">
    <div v-if="number !== undefined" class="sixie-section-number">{{ String(number).padStart(2, '0') }}</div>
    <div class="sixie-section-content"><slot /></div>
    <img class="sixie-section-logo" :class="{ 'sixie-section-logo-hidden': !showLogo }" :src="logo" :alt="showLogo ? 'Six Feet Up' : ''" />
  </div>
</template>
