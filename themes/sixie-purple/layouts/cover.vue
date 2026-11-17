<script setup lang="ts">
import logo from '../assets/title-logo.svg'

defineProps<{ speaker?: string; event?: string }>()
</script>

<template>
  <div class="slidev-layout sixie-cover">
    <img class="sixie-cover-logo" :src="logo" alt="Six Feet Up" />
    <div class="sixie-cover-content"><slot /></div>
    <div v-if="speaker" class="sixie-speaker">{{ speaker }}</div>
    <div v-if="event" class="sixie-event">{{ event }}</div>
  </div>
</template>
