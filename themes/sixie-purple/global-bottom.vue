<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { resolveViewportBackground, viewportBackgrounds } from './viewport.mjs'

const { currentSlideRoute, isPlaying, isPrintMode } = useNav()
const background = computed(() => resolveViewportBackground(currentSlideRoute.value?.meta.slide.frontmatter))
</script>

<template>
  <template v-if="isPlaying && !isPrintMode && background">
    <span class="sixie-viewport" :data-background="background" hidden aria-hidden="true" />
    <!-- Outside the scaled/animated canvas. Stable keys preserve in-flight opacity.
         Deferred mounting lets Slidev create the container on the first render. -->
    <Teleport to="#slide-container" defer>
      <div class="sixie-backdrops" aria-hidden="true">
        <div
          v-for="kind in viewportBackgrounds"
          :key="kind"
          class="sixie-backdrop"
          :class="{ 'is-active': kind === background }"
          :data-background="kind"
        />
      </div>
    </Teleport>
  </template>
</template>
