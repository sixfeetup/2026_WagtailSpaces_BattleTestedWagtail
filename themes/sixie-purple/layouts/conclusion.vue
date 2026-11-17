<script setup lang="ts">
import SixieFrame from '../components/SixieFrame.vue'

defineProps<{ presenter?: string; email?: string; credit?: string; creditEvent?: string }>()
</script>

<template>
  <SixieFrame variant="conclusion">
    <slot />
    <template v-if="presenter || credit || $slots.footer" #footer>
      <div v-if="presenter || credit" class="sixie-contact-row">
        <div v-if="presenter" class="sixie-contact">
          <span class="sixie-contact-label">Presenter</span>
          <strong>{{ presenter }}</strong>
          <span v-if="email" class="sixie-contact-detail">{{ email }}</span>
        </div>
        <div v-if="credit" class="sixie-contact">
          <span class="sixie-contact-label">Original presentation</span>
          <strong>{{ credit }}</strong>
          <span v-if="creditEvent" class="sixie-contact-detail">{{ creditEvent }}</span>
        </div>
      </div>
      <slot name="footer" />
    </template>
  </SixieFrame>
</template>
